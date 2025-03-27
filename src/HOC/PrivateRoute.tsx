import { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { setAuthorizationHeader } from '../api/axios.instance';

export const PrivateRoute: FC<{ children: ReactElement }> = ({ children }) => {
  const token = sessionStorage.getItem('token');

  if (!token) return <Navigate to="login" />;

  setAuthorizationHeader(token);

  return children;
};
