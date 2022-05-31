import React, { FC } from 'react';
import styles from './RegisterPage.module.scss';

const RegisterPage: FC = function () {
  return (
    <div className={`${styles.container} container`}>
      <div className={styles.wrapper}>
        <h2>Welcome!</h2>
      </div>
      <form
        action=""
        className={styles.form}
        autoComplete="off"
        encType="multipart/form-data"
      >
        <fieldset>
          <legend>Please sign up!</legend>
          <input placeholder="Name..." type="text" name="firstName" required />
          <input
            placeholder="Surname..."
            type="text"
            name="lastName"
            required
          />
          <input
            className={styles.login}
            placeholder="login..."
            type="text"
            name="login"
            required
          />
          <div className={styles.gender}>
            <p>Choose your gender</p>
            <label htmlFor="male">
              <input id="male" type="radio" name="sex" value="male" />
              <span>male</span>
            </label>
            <label htmlFor="female">
              <input type="radio" name="sex" id="female" value="female" />
              <span>female</span>
            </label>
          </div>
          <input
            className={styles.password}
            placeholder="Password..."
            type="text"
            name="password"
            required
          />
          <input
            className={styles.password}
            placeholder="Confirm password..."
            type="text"
            required
          />
          <div className={styles.action}>
            <div className={styles.buttons}>
              <button type="button">Reset</button>
              <button type="submit">Register</button>
            </div>
            <a href="/login" className={styles.link}>
              Login
            </a>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default RegisterPage;
