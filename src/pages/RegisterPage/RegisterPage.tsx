import React, { FC } from 'react';
import {
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './RegisterPage.module.scss';

const RegisterPage: FC<any> = function ({
  submit,
  onChange,
  firstName,
  lastName,
  email,
  sex,
  login,
  password,
}) {
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
        onSubmit={submit}
      >
        <fieldset className={styles.fieldset}>
          <legend>Please sign up!</legend>
          <TextField
            required
            onChange={onChange}
            label="Name"
            name="firstName"
            autoFocus
            value={firstName}
            fullWidth
            size="small"
          />
          <TextField
            required
            onChange={onChange}
            label="Surname"
            value={lastName}
            name="lastName"
            fullWidth
            size="small"
          />
          <TextField
            required
            onChange={onChange}
            label="Login"
            name="login"
            value={login}
            fullWidth
            size="small"
          />
          <TextField
            required
            onChange={onChange}
            type="email"
            label="Email"
            value={email}
            name="email"
            fullWidth
            size="small"
          />
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="sex"
            onChange={onChange}
            value={sex}
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
            onChange={onChange}
            size="small"
            value={password}
            fullWidth
          />
          <div className={styles.action}>
            <div className={styles.buttons}>
              <Button type="reset" variant="contained">
                Reset
              </Button>
              <Button type="submit" variant="contained">
                Register
              </Button>
            </div>
            <NavLink className="link" to="/login">
              Login
            </NavLink>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default RegisterPage;
