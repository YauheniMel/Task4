import React, { FC } from 'react';
import { connect } from 'react-redux';
import { createUser, register } from '../../redux/reducers/auth-reducer';
import RegisterPage from './RegisterPage';

const RegisterPageApiContainer: FC<any> = function ({
  // eslint-disable-next-line @typescript-eslint/no-shadow
  register,
  firstName,
  lastName,
  email,
  sex,
  login,
  password,
  // eslint-disable-next-line @typescript-eslint/no-shadow
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
    };

    register(userInfo);
  }

  return <RegisterPage submit={handleSubmit} onChange={createUser} />;
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
      const action = register(userInfo);

      dispatch(action);
    },
    createUser: (event: any) => {
      const { value, name } = event.currentTarget;
      const action = createUser({
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
