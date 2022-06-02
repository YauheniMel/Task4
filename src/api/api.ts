import axios from 'axios';

const requestAPI = {
  login(credentials: any) {
    return axios
      .put('/api/login', credentials)
      .then((response) => response.data);
  },
  register(userInfo: any) {
    return axios
      .post('/api/register', userInfo)
      .then((response) => response.data);
  },
  getUsers(payload: any) {
    return axios.post('/api/users', payload).then((response) => response.data);
  },
  blockMe(id: any) {
    return axios.put('/api/block/', { id }).then((response) => response.data);
  },
  block(ids: any) {
    return axios.put('/api/block/', ids).then((response) => response.data);
  },
  unblock(ids: any) {
    return axios.put('/api/unblock/', ids).then((response) => response.data);
  },
  deleteMe(id: any) {
    return axios.post('/api/del/', { id }).then((response) => response.data);
  },
  delete(ids: any) {
    return axios.post('/api/del/', ids).then((response) => response.data);
  },
};

export default requestAPI;
