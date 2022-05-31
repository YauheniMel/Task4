import React, { FC } from 'react';
import styles from './LoginPage.module.scss';

const LoginPage: FC = function () {
  return (
    <div className={`${styles.container} container`}>
      <div className={styles.wrapper}>
        <h2>Welcome!</h2>
      </div>
      <form action="" className={styles.form}>
        <fieldset>
          <legend>Login form</legend>
          <input className={styles.login} type="text" required />
          <input className={styles.password} type="password" required />
          <div className={styles.action}>
            <button className={styles.button_submit} type="submit">
              Authorization
            </button>
            <a href="/signup" className={styles.link}>
              SignUp
            </a>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default LoginPage;
