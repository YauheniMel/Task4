import { Dispatch } from 'react';
import { toast } from 'react-toastify';
import requestAPI from '../../api/api';
import { CredentialsType, UserType } from '../../interfaces';
import logout from '../../services/logout';

export const loginUserAction = (): { type: 'LOGIN-USER' } => ({
  type: 'LOGIN-USER',
});
export const registerUserAction = (): { type: 'REGISTER-USER' } => ({
  type: 'REGISTER-USER',
});
export const logoutUserAction = (): { type: 'LOGOUT-USER' } => ({
  type: 'LOGOUT-USER',
});
export const createUserLoginAction = (
  login: any,
): {
  type: 'CREATE-USER-LOGIN';
  login: string;
} => ({
  type: 'CREATE-USER-LOGIN',
  login,
});
export const createUserPasswordAction = (
  password: any,
): {
  type: 'CREATE-USER-PASSWORD';
  password: string;
} => ({
  type: 'CREATE-USER-PASSWORD',
  password,
});
export const createUserAction = (value: any) => ({
  type: 'CREATE-USER',
  value,
});

export const loginAction = (credentials: CredentialsType) => (dispatch: Dispatch<any>) => {
  requestAPI
    .login(credentials)
    .then((data: any) => {
      dispatch(loginUserAction());
      toast.success(`Hello ${data.targetUser.firstName}`);

      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('login', data.targetUser.login);
    })
    .catch((err: any) => {
      toast.error(err.response.data);
    });
};

export const registerAction = (userInfo: UserType) => (dispatch: Dispatch<any>) => {
  requestAPI
    .register(userInfo)
    .then((data: any) => {
      dispatch(createUserAction(data.targetUser));
      dispatch(registerUserAction());
      toast.success(`Hello ${data.targetUser.firstName}`);
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('login', data.targetUser.login);
    })
    .catch((err: any) => {
      toast.error(err.response.data);
    });
};

export const logoutAction = (payload: { id: number; status: string }) => (dispatch: any) => {
  requestAPI
    .logout(payload)
    .then((data: string) => {
      toast.success(data);
      dispatch(logoutUserAction());
      logout();
    })
    .catch((err: any) => {
      toast.error(err.response.data);
    });
};
