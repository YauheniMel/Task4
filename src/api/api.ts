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
  blockMe(id: any, payload: any) {
    return axios
      .put(`/api/update/${id}`, payload)
      .then((response) => response.data);
  },
  deleteMe(id: any) {
    return axios.delete(`/api/del/${id}`).then((response) => response.data);
  },
};

export default requestAPI;
