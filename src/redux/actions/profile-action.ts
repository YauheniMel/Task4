import { Dispatch } from 'react';
import { toast } from 'react-toastify';
import { requestAPI } from '../../api/api';
import { ICreateUser, ICredentials, IUser } from '../../types';
import { isLoadingAction } from './share-action';
import { AppDispatch } from '../store';
import { logoutAction } from './root-action';
import { AxiosError } from 'axios';
import { setAuthorizationHeader } from '../../api/axios.instance';

export const profileActionType = {
  SET_PROFILE: 'SET-PROFILE'
};

const setProfileAction = (payload: IUser) => ({
  type: profileActionType.SET_PROFILE,
  payload
});

export const loginThunk =
  (credentials?: ICredentials) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(isLoadingAction(true));

      const { user } = await requestAPI.login(credentials);

      dispatch(setProfileAction(user));

      toast.success(`Hello ${user.firstName}`);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.message);
      } else {
        throw error;
      }
    } finally {
      dispatch(isLoadingAction(false));
    }
  };

export const signupThunk =
  (userInfo: ICreateUser) => async (dispatch: AppDispatch) => {
    try {
      await requestAPI.signup(userInfo);

      return dispatch(
        loginThunk({ login: userInfo.login, password: userInfo.password })
      );
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.message);
      } else {
        throw error;
      }
    }
  };

export const logoutThunk = () => async (dispatch: AppDispatch) => {
  try {
    const { message } = await requestAPI.logout();

    toast.success(message);

    dispatch(logoutAction());
    setAuthorizationHeader(undefined);

    sessionStorage.removeItem('token');
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        dispatch(logoutAction());
      }

      toast.error(error.message);
    } else {
      throw error;
    }
  }
};

export const blockMeThunk =
  (ids: number[]) => async (dispatch: AppDispatch) => {
    try {
      dispatch(logoutThunk());

      await requestAPI.block(ids);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.message);
      } else {
        throw error;
      }
    }
  };

export const deleteMeThunk =
  (ids: number[]) => async (dispatch: AppDispatch) => {
    try {
      dispatch(logoutThunk());

      await requestAPI.delete(ids);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.message);
      } else {
        throw error;
      }
    }
  };
