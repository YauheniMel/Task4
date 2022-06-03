import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  loginUserAction,
  logoutUserAction,
} from '../../redux/reducers/auth-reducer';
import {
  blockMeAction,
  blockUsersAction,
  deleteMeAction,
  deleteUserInfoAction,
  deleteUsersAction,
  getAllUsersAction,
  unblockUsersAction,
} from '../../redux/reducers/user-reducer';
import checkSessionStorage from '../../services/checkSessionStorage';
import MainPage from './MainPage';

const MainPageApiContainer: FC<any> = function ({
  id,
  users,
  getUsers,
  firstName,
  lastName,
  blockMe,
  blockUsers,
  unblockUsers,
  deleteMe,
  deleteUsers,
  deleteUserInfo,
  logoutUser,
  status,
}) {
  const [isFetching, setIsFetching] = useState(false);

  // function handleClick() {
  //   console.log(status);

  //   if (status === 'blocked') {
  //     logoutUser();
  //     logout();
  //   }
  // }

  useEffect(() => {
    getUsers();

    setIsFetching(false);
  }, [isFetching]);

  return (
    <MainPage
      id={id}
      users={users}
      deleteUserInfo={deleteUserInfo}
      firstName={firstName}
      lastName={lastName}
      blockMe={blockMe}
      deleteMe={deleteMe}
      deleteUsers={deleteUsers}
      blockUsers={blockUsers}
      unblockUsers={unblockUsers}
      logoutUser={logoutUser}
      status={status}
      isFetching={isFetching}
      setIsFetching={setIsFetching}
    />
  );
};

function mapStateToProps(state: any) {
  return {
    users: state.user.users,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    status: state.user.state,
    id: state.user.id,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getUsers: () => {
      if (checkSessionStorage()) {
        const action = getAllUsersAction(checkSessionStorage());

        dispatch(action);
      }
    },
    blockMe: (id: number) => {
      const action = blockMeAction(id);

      dispatch(action);
    },
    blockUsers: (ids: number[]) => {
      const action = blockUsersAction(ids);

      dispatch(action);
    },
    unblockUsers: (ids: number[]) => {
      const action = unblockUsersAction(ids);

      dispatch(action);
    },
    deleteMe: (id: number) => {
      const action = deleteMeAction(id);

      dispatch(action);
    },
    deleteUsers: (ids: number[]) => {
      const action = deleteUsersAction(ids);

      dispatch(action);
    },
    deleteUserInfo: () => {
      const action = deleteUserInfoAction();

      dispatch(action);
    },
    loginUser: () => {
      const action = loginUserAction();

      dispatch(action);
    },
    logoutUser: () => {
      const action = logoutUserAction();

      dispatch(action);
    },
  };
}

const MainPageContainer = connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(MainPageApiContainer);

export default MainPageContainer;
