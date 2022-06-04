import axios from 'axios';
import { CredentialsType, UserType } from '../interfaces';
import Routes from './Routes';

const requestAPI = {
  login(credentials: CredentialsType) {
    return axios
      .put(Routes.login, credentials)
      .then((response) => response.data);
  },
  register(userInfo: UserType) {
    return axios
      .post(Routes.register, userInfo)
      .then((response) => response.data);
  },
  getUsers(
    payload:
    | false
    | {
      token: string;
      login: string;
    },
  ) {
    return axios
      .post(Routes.getUsers, payload)
      .then((response) => response.data);
  },
  blockMe(id: number) {
    return axios.put(Routes.block, { id }).then((response) => response.data);
  },
  block(ids: number[]) {
    return axios.put(Routes.block, ids).then((response) => response.data);
  },
  unblock(ids: number[]) {
    return axios.put(Routes.unblock, ids).then((response) => response.data);
  },
  delete(id: number | number[]) {
    return axios
      .delete(`${Routes.delete}${id}`)
      .then((response) => response.data);
  },
  logout(payload: { id: number; status: string }) {
    return axios
      .post(Routes.logout, { ...payload })
      .then((response) => response.data);
  },
};

export default requestAPI;
