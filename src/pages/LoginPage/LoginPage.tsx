import { Button, TextField } from '@mui/material';
import classNames from 'classnames';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './LoginPage.module.scss';

const LoginPage: FC<any> = function ({
  submit,
  setLogin,
  setPassword,
  login,
  password,
}) {
  return (
    <div className={classNames(styles.container, 'container')}>
      <div className={styles.wrapper}>
        <h2>Welcome!</h2>
      </div>
      <form action="" className={styles.form} onSubmit={submit}>
        <fieldset className={styles.fieldset}>
          <legend>Login form</legend>
          <TextField
            required
            onChange={setLogin}
            label="Login"
            value={login}
            name="login"
            size="small"
            fullWidth
            autoFocus
          />
          <TextField
            required
            label="Password"
            type="password"
            name="password"
            fullWidth
            onChange={setPassword}
            value={password}
            size="small"
            autoComplete="current-password"
          />
          <div className={styles.action}>
            <Button type="submit" variant="contained">
              Authorization
            </Button>
            <NavLink className="link" to="/signup">
              SignUp
            </NavLink>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default LoginPage;
