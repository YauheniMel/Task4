import { ChangeEvent, FC, FormEvent, useState } from 'react';
import {
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material';
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SignupPage.module.scss';
import { useAppDispatch } from '../../redux/store';
import { ICreateUser } from '../../types';
import { signupThunk } from '../../redux/actions/profile-action';
import { ROUTES_APP } from '../../constants/routes';

const initUserInfo: ICreateUser = {
  firstName: '',
  lastName: '',
  login: '',
  email: '',
  sex: 'male',
  state: 'online',
  password: ''
};

export const SignupPage: FC<any> = () => {
  const [user, setUser] = useState(initUserInfo);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await dispatch(signupThunk({ ...user, state: 'online' }));

    navigate(ROUTES_APP.root);
  };

  const handleReset = () => {
    setUser(initUserInfo);
  };

  const handleChangeUserInfo = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget;

    setUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className={classNames(styles.container, 'container')}>
      <div className={styles.wrapper}>
        <h2>Welcome!</h2>
      </div>
      <form
        action=""
        className={styles.form}
        autoComplete="none"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <fieldset className={styles.fieldset}>
          <legend>Please sign up!</legend>
          <TextField
            required
            onChange={handleChangeUserInfo}
            label="Name"
            name="firstName"
            autoFocus
            value={user.firstName}
            fullWidth
            size="small"
          />
          <TextField
            required
            onChange={handleChangeUserInfo}
            label="Surname"
            value={user.lastName}
            name="lastName"
            fullWidth
            size="small"
          />
          <TextField
            required
            onChange={handleChangeUserInfo}
            label="Login"
            name="login"
            value={user.login}
            fullWidth
            size="small"
          />
          <TextField
            required
            onChange={handleChangeUserInfo}
            type="email"
            label="Email"
            value={user.email}
            name="email"
            fullWidth
            size="small"
          />
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="sex"
            onChange={handleChangeUserInfo}
            value={user.sex}
          >
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <FormControlLabel
              value="male"
              control={<Radio required />}
              label="Male"
            />
            <FormControlLabel
              value="female"
              control={<Radio required />}
              label="Female"
            />
          </RadioGroup>
          <TextField
            required
            label="Password"
            type="password"
            name="password"
            onChange={handleChangeUserInfo}
            size="small"
            value={user.password}
            fullWidth
          />
          <div className={styles.action}>
            <div className={styles.buttons}>
              <Button type="reset" variant="contained" onClick={handleReset}>
                Reset
              </Button>
              <Button type="submit" variant="contained">
                Signup
              </Button>
            </div>
            <Link className="link" to={'/' + ROUTES_APP.login}>
              Login
            </Link>
          </div>
        </fieldset>
      </form>
    </div>
  );
};
