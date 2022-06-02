import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  blockMe,
  deleteMe,
  deleteUserInfo,
  getAllUsers,
} from '../../redux/reducers/user-reducer';
import checkLocalStorage from '../../services/checkLocalStorage';
import MainPage from './MainPage';

const MainPageApiContainer: FC<any> = function ({
  id,
  users,
  getUsers,
  firstName,
  lastName,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  blockMe,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  deleteMe,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  deleteUserInfo,
}) {
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <MainPage
      id={id}
      users={users}
      deleteUserInfo={deleteUserInfo}
      firstName={firstName}
      lastName={lastName}
      blockMe={blockMe}
      deleteMe={deleteMe}
    />
  );
};

function mapStateToProps(state: any) {
  return {
    users: state.user.users,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    id: state.user.id,
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
    blockMe: (id: any, state: any) => {
      const action = blockMe(id, state);

      dispatch(action);
    },
    deleteMe: (id: any) => {
      const action = deleteMe(id);

      dispatch(action);
    },
    deleteUserInfo: () => {
      const action = deleteUserInfo();

      dispatch(action);
    },
  };
}

const MainPageContainer = connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(MainPageApiContainer);

export default MainPageContainer;
