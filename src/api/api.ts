import axios from 'axios';

const requestAPI = {
  login(credentials: any) {
    // eslint-disable-next-line no-debugger
    debugger;
    return axios
      .post('/api/login', credentials)
      .then((response) => response.data);
  },
};

export default requestAPI;
