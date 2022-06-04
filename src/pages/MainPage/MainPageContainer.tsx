import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import { UserType } from '../../interfaces';
import { loginUserAction, logoutAction } from '../../redux/actions/auth-action';
import {
  blockMeAction,
  blockUsersAction,
  deleteMeAction,
  deleteUserInfoAction,
  deleteUsersAction,
  getAllUsersAction,
  unblockUsersAction,
  updateUsersAction,
} from '../../redux/actions/user-action';

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
  updateUsers,
}) {
  const [isFetching, setIsFetching] = useState(false);
  const [newUsers, setNewUsers] = useState();

  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('time', (data) => setNewUsers(data));
    if (newUsers) {
      const [targetUser] = JSON.parse(newUsers).filter(
        (user: UserType) => user.id === id,
      );
      updateUsers(
        JSON.parse(newUsers).filter((user: UserType) => user.id !== id),
      );
      if (!targetUser) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        window.addEventListener('click', handlePolicy, {
          capture: true,
          once: true,
        });
      } else if (targetUser.state === 'blocked') {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        window.addEventListener('click', handlePolicy, {
          capture: true,
          once: true,
        });
      }
    }
  }, [newUsers]);

  async function handlePolicy(event: any) {
    event.stopPropagation();

    try {
      await logoutUser(id, 'blocked');

      deleteUserInfo();

      window.removeEventListener('click', handlePolicy, { capture: true });
    } catch (err: any) {
      toast.error(err.message);
    }
  }

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
    logoutUser: (id: number, status: string) => {
      const action = logoutAction({ id, status });

      dispatch(action);
    },
    updateUsers: (users: UserType[]) => {
      const action = updateUsersAction(users);

      dispatch(action);
    },
  };
}

const MainPageContainer = connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(MainPageApiContainer);

export default MainPageContainer;
