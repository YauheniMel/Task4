import { requestAPI } from '../../api/api';
import { AxiosError } from 'axios';
import { logoutAction } from './root-action';
import { toast } from 'react-toastify';
import { IUser } from '../../types';
import { AppDispatch } from '../store';

export const usersActionType = {
  SET_USERS: 'SET_USERS',
  BLOCK_USERS: 'BLOCK_USERS',
  UNBLOCK_USERS: 'UNBLOCK_USERS',
  DELETE_USERS: 'DELETE_USERS'
};

const setUsersAction = (payload: IUser[]) => ({
  type: usersActionType.SET_USERS,
  payload
});

const blockUsersAction = (payload: number[]) => ({
  type: usersActionType.BLOCK_USERS,
  payload
});

const unblockUsersAction = (payload: number[]) => ({
  type: usersActionType.UNBLOCK_USERS,
  payload
});

const deleteUsersAction = (payload: number[]) => ({
  type: usersActionType.DELETE_USERS,
  payload
});
export const getUsersThunk = () => async (dispatch: AppDispatch) => {
  try {
    const users = await requestAPI.getUsers();

    dispatch(setUsersAction(users));
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        dispatch(logoutAction());

        sessionStorage.removeItem('token');
      }

      toast.error(error.message);
    } else {
      throw error;
    }
  }
};

export const blockUsersThunk =
  (ids: number[]) => async (dispatch: AppDispatch) => {
    try {
      await requestAPI.block(ids);

      dispatch(blockUsersAction(ids));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          dispatch(logoutAction());

          sessionStorage.removeItem('token');
        }

        toast.error(error.message);
      } else {
        throw error;
      }
    }
  };

export const unblockUsersThunk =
  (ids: number[]) => async (dispatch: AppDispatch) => {
    try {
      await requestAPI.unblock(ids);

      dispatch(unblockUsersAction(ids));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          dispatch(logoutAction());

          sessionStorage.removeItem('token');
        }

        toast.error(error.message);
      } else {
        throw error;
      }
    }
  };

export const deleteUsersThunk =
  (ids: number[]) => async (dispatch: AppDispatch) => {
    try {
      await requestAPI.delete(ids);

      dispatch(deleteUsersAction(ids));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          dispatch(logoutAction());

          sessionStorage.removeItem('token');
        }

        toast.error(error.message);
      } else {
        throw error;
      }
    }
  };
