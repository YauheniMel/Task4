import React, { FC } from 'react';
import { connect } from 'react-redux';
import {
  createUserLogin,
  createUserPassword,
  login,
} from '../../redux/reducers/auth-reducer';
import LoginPage from './LoginPage';

const LoginPageApiContainer: FC<any> = function ({
  loginValue,
  passwordValue,
  setPassword,
  setLogin,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  login,
}) {
  function handleSubmit(event: any) {
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
    />
  );
};

function mapStateToProps(state: any) {
  return {
    loginValue: state.auth.loginValue,
    passwordValue: state.auth.passwordValue,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    setPassword: (event: any) => {
      const { value } = event.currentTarget;

      const action = createUserPassword(value);

      dispatch(action);
    },
    setLogin: (event: any) => {
      const { value } = event.currentTarget;

      const action = createUserLogin(value);

      dispatch(action);
    },
    login: (credentials: any) => dispatch(login(credentials)),
  };
}

const LoginPageContainer = connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPageApiContainer);

export default LoginPageContainer;
