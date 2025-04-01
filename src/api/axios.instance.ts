import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true
});

axiosInstance.interceptors.response.use((response) => {
  if (response.data.accessToken) {
    setAuthorizationHeader(response.data.accessToken);

    sessionStorage.setItem('token', response.data.accessToken);
  }

  if (response.status === 401) {
    sessionStorage.removeItem('token');
  }

  return response;
});

export function setAuthorizationHeader(token?: string) {
  if (token) {
    axiosInstance.defaults.headers.common.authorization = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common.authorization;
  }
}
