import axios from 'axios';

const requestAPI = {
  login(credentials: any) {
    return axios
      .post('/api/login', credentials)
      .then((response) => response.data);
  },
  register(userInfo: any) {
    return axios
      .post('/api/register', userInfo)
      .then((response) => response.data);
  },
};

export default requestAPI;
