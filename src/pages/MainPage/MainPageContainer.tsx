import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllUsers } from '../../redux/reducers/user-reducer';
import checkLocalStorage from '../../services/checkLocalStorage';
import MainPage from './MainPage';

const MainPageApiContainer: FC<any> = function ({
  users,
  getUsers,
  firstName,
  lastName,
}) {
  useEffect(() => {
    getUsers();
  }, []);

  return <MainPage users={users} firstName={firstName} lastName={lastName} />;
};

function mapStateToProps(state: any) {
  return {
    users: state.user.users,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getUsers: () => {
      if (checkLocalStorage()) {
        // need refactor
        const action = getAllUsers(checkLocalStorage());
        dispatch(action);
      }
    },
  };
}

const MainPageContainer = connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(MainPageApiContainer);

export default MainPageContainer;
