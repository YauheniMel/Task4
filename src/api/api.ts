import { ICredentials, ICreateUser, IUser } from '../types';
import { pathApi } from '../constants/pathApi';
import { axiosInstance } from './axios.instance';

export const requestAPI = {
  login: async (credentials?: ICredentials) => {
    const { data } = await axiosInstance.put<{
      user: IUser;
      accessToken: string;
    }>(pathApi.login, credentials);

    return data;
  },
  signup: async (userInfo: ICreateUser) => {
    const { data } = await axiosInstance.post<{ message: string }>(
      pathApi.signup,
      userInfo
    );

    return data;
  },
  logout: async () => {
    const { data } = await axiosInstance.put<{ message: string }>(
      pathApi.logout
    );

    return data;
  },
  getUsers: async () => {
    const { data } = await axiosInstance.get<{ users: IUser[] }>(
      pathApi.getUsers
    );

    return data.users;
  },
  block: async (ids: number[]) => {
    const { data } = await axiosInstance.put<{ message: string }>(
      pathApi.block,
      ids
    );

    return data;
  },
  unblock: async (ids: number[]) => {
    const { data } = await axiosInstance.put<{ message: string }>(
      pathApi.unblock,
      ids
    );

    return data;
  },
  delete: async (ids: number[]) => {
    const { data } = await axiosInstance.delete<{ message: string }>(
      pathApi.delete,
      {
        data: ids
      }
    );

    return data;
  }
};
