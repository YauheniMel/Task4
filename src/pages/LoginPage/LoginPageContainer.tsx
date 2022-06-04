import React, { FC } from 'react';
import { connect } from 'react-redux';
import { CredentialsType } from '../../interfaces';
import {
  createUserLoginAction,
  createUserPasswordAction,
  loginAction,
} from '../../redux/actions/auth-action';

import LoginPage from './LoginPage';

const LoginPageApiContainer: FC<any> = function ({
  loginValue,
  passwordValue,
  setPassword,
  setLogin,
  login,
}) {
  function handleSubmit(event: Event) {
    event.preventDefault();

    const credentials = {
      loginValue,
      passwordValue,
    };

    login(credentials);
  }

  return (
    <LoginPage
      submit={handleSubmit}
      setPassword={setPassword}
      setLogin={setLogin}
      login={loginValue}
      password={passwordValue}
    />
  );
};

function mapStateToProps(state: any) {
  return {
    loginValue: state.auth.login,
    passwordValue: state.auth.password,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    setPassword: (event: any) => {
      const { value } = event.currentTarget;

      dispatch(createUserPasswordAction(value));
    },
    setLogin: (event: any) => {
      const { value } = event.currentTarget;

      dispatch(createUserLoginAction(value));
    },
    login: (credentials: CredentialsType) => dispatch(loginAction(credentials)),
  };
}

const LoginPageContainer = connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPageApiContainer);

export default LoginPageContainer;
