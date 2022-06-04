import axios from 'axios';
import { CredentialsType, UserType } from '../interfaces';

const requestAPI = {
  login(credentials: CredentialsType) {
    return axios
      .put('/api/login', credentials)
      .then((response) => response.data);
  },
  register(userInfo: UserType[]) {
    return axios
      .post('/api/register', userInfo)
      .then((response) => response.data);
  },
  getUsers(payload: any) {
    return axios.post('/api/users', payload).then((response) => response.data);
  },
  blockMe(id: number) {
    return axios.put('/api/block/', { id }).then((response) => response.data);
  },
  block(ids: number[]) {
    return axios.put('/api/block/', ids).then((response) => response.data);
  },
  unblock(ids: number[]) {
    return axios.put('/api/unblock/', ids).then((response) => response.data);
  },
  deleteMe(id: number) {
    return axios.delete(`/api/del/${id}`).then((response) => response.data);
  },
  delete(ids: number[]) {
    return axios.delete(`/api/del/${ids}`).then((response) => response.data);
  },
  logout(payload: { id: number; status: string }) {
    return axios
      .post('/api/logout', { ...payload })
      .then((response) => response.data);
  },
};

export default requestAPI;
