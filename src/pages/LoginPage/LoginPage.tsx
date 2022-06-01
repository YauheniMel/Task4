import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './LoginPage.module.scss';

const LoginPage: FC<any> = function ({ submit, setLogin, setPassword }) {
  return (
    <div className={`${styles.container} container`}>
      <div className={styles.wrapper}>
        <h2>Welcome!</h2>
      </div>
      <form action="" className={styles.form} onSubmit={submit}>
        <fieldset>
          <legend>Login form</legend>
          <input
            className={styles.login}
            type="text"
            onChange={setLogin}
            required
          />
          <input
            className={styles.password}
            type="password"
            onChange={setPassword}
            required
          />
          <div className={styles.action}>
            <button className={styles.button_submit} type="submit">
              Authorization
            </button>
            <NavLink className={styles.link} to="/signup">
              SignUp
            </NavLink>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default LoginPage;
