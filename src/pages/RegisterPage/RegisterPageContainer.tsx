import React, { FC } from 'react';
import { connect } from 'react-redux';
import {
  createUserAction,
  registerAction,
} from '../../redux/actions/auth-action';
import RegisterPage from './RegisterPage';

const RegisterPageApiContainer: FC<any> = function ({
  register,
  firstName,
  lastName,
  email,
  sex,
  login,
  password,
  createUser,
}) {
  function handleSubmit(event: any) {
    event.preventDefault();

    const userInfo = {
      firstName,
      lastName,
      email,
      sex,
      login,
      password,
      state: 'online',
    };

    register(userInfo);
  }

  return (
    <RegisterPage
      submit={handleSubmit}
      onChange={createUser}
      firstName={firstName}
      lastName={lastName}
      email={email}
      sex={sex}
      login={login}
      password={password}
    />
  );
};

function mapStateToProps(state: any) {
  return {
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    email: state.auth.email,
    login: state.auth.login,
    sex: state.auth.sex,
    password: state.auth.password,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    register: (userInfo: any) => {
      const action = registerAction(userInfo);

      dispatch(action);
    },
    createUser: (event: any) => {
      const { value, name } = event.currentTarget;
      const action = createUserAction({
        [name]: value,
      });

      dispatch(action);
    },
  };
}

const RegisterPageContainer = connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterPageApiContainer);

export default RegisterPageContainer;
