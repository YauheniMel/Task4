import classNames from 'classnames';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './RegisterPage.module.scss';

const RegisterPage: FC<any> = function ({ submit, onChange }) {
  return (
    <div className={classNames(styles.container, 'container')}>
      <div className={styles.wrapper}>
        <h2>Welcome!</h2>
      </div>
      <form
        action=""
        className={styles.form}
        autoComplete="off"
        encType="multipart/form-data"
        onSubmit={submit}
      >
        <fieldset>
          <legend>Please sign up!</legend>
          <input
            onChange={onChange}
            placeholder="Name..."
            type="text"
            name="firstName"
            required
          />
          <input
            onChange={onChange}
            placeholder="Surname..."
            type="text"
            name="lastName"
            required
          />
          <input
            onChange={onChange}
            className={styles.login}
            placeholder="login..."
            type="text"
            name="login"
            required
          />
          <input
            onChange={onChange}
            className={styles.email}
            placeholder="email..."
            type="text"
            name="email"
            required
          />
          <div className={styles.gender}>
            <p>Choose your gender</p>
            <label htmlFor="male">
              <input
                onChange={onChange}
                id="male"
                type="radio"
                name="sex"
                value="male"
              />
              <span>male</span>
            </label>
            <label htmlFor="female">
              <input
                onChange={onChange}
                type="radio"
                name="sex"
                id="female"
                value="female"
              />
              <span>female</span>
            </label>
          </div>
          <input
            onChange={onChange}
            className={styles.password}
            placeholder="Password..."
            type="text"
            name="password"
            required
          />
          <input
            onChange={onChange}
            className={styles.password}
            placeholder="Confirm password..."
            type="text"
            name="confirm-password"
            required
          />
          <div className={styles.action}>
            <div className={styles.buttons}>
              <button type="button">Reset</button>
              <button type="submit">Register</button>
            </div>
            <NavLink className={styles.link} to="/login">
              Login
            </NavLink>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default RegisterPage;
