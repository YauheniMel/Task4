import { Dispatch } from 'react';
import { toast } from 'react-toastify';
import requestAPI from '../../api/api';
import { UserType } from '../../interfaces';

export const getUsersAction = (users: any) => ({
  type: 'GET-USERS',
  users,
});
export const setUserInfoAction = (user: any) => ({
  type: 'SET-USER-INFO',
  user,
});
export const deleteUserInfoAction = () => ({
  type: 'DELETE-USER-INFO',
});
export const updateUsersAction = (users: UserType[]) => ({
  type: 'UPDATE-USERS-ACTION',
  users,
});

export const getAllUsersAction = (
  payload:
  | false
  | {
    token: string;
    login: string;
  },
) => (dispatch: any) => {
  requestAPI
    .getUsers(payload)
    .then((data: any) => {
      dispatch(setUserInfoAction(data.targetUser));

      dispatch(getUsersAction(data.users));
    })
    .catch((err: any) => {
      toast.error(err.message);
    });
};

export const blockMeAction = (id: number) => (dispatch: Dispatch<any>) => {
  requestAPI
    .blockMe(id)
    .then(() => {
      dispatch(deleteUserInfoAction());
    })
    .catch((err: any) => {
      toast.error(err.message);
    });
};

export const blockUsersAction = (ids: number[]) => () => {
  requestAPI
    .block(ids)
    .then((data: any) => {
      toast.success(data);
    })
    .catch((err: any) => {
      toast.error(err.message);
    });
};

export const unblockUsersAction = (ids: number[]) => () => {
  requestAPI
    .unblock(ids)
    .then((data: any) => {
      toast.success(data);
    })
    .catch((err: any) => {
      toast.error(err.message);
    });
};

export const deleteMeAction = (id: number) => (dispatch: Dispatch<any>) => {
  requestAPI
    .delete(id)
    .then(() => {
      dispatch(deleteUserInfoAction());
    })
    .catch((err: any) => {
      toast.error(err.message);
    });
};

export const deleteUsersAction = (ids: number[]) => () => {
  requestAPI
    .delete(ids)
    .then((data: any) => {
      toast.success(data);
    })
    .catch((err: any) => {
      toast.error(err.message);
    });
};
