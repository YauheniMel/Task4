import { toast } from 'react-toastify';
import requestAPI from '../../api/api';
import { CredentialsType } from '../../interfaces';

export const loginUserAction = () => ({ type: 'LOGIN-USER' });
export const logoutUserAction = () => ({ type: 'LOGOUT-USER' });
export const createUserLoginAction = (login: any) => ({
  type: 'CREATE-USER-LOGIN',
  login,
});
export const createUserPasswordAction = (password: any) => ({
  type: 'CREATE-USER-PASSWORD',
  password,
});
export const createUserAction = (value: any) => ({
  type: 'CREATE-USER',
  value,
});

const initState = {
  isAuth: false,
  loginValue: '',
  passwordValue: '',
};

// eslint-disable-next-line @typescript-eslint/default-param-last
function authReducer(state = initState, action: any) {
  switch (action.type) {
    case 'CREATE-USER-LOGIN': {
      const stateCopy = {
        ...state,
        loginValue: action.login,
      };

      return stateCopy;
    }
    case 'CREATE-USER-PASSWORD': {
      const stateCopy = {
        ...state,
        passwordValue: action.password,
      };

      return stateCopy;
    }
    case 'CREATE-USER': {
      const stateCopy = {
        ...state,
        ...action.value,
      };

      stateCopy.loginValue = '';
      stateCopy.passwordValue = '';

      return stateCopy;
    }
    case 'LOGIN-USER': {
      const stateCopy = {
        ...state,
        isAuth: true,
      };

      stateCopy.loginValue = '';
      stateCopy.passwordValue = '';

      return stateCopy;
    }
    case 'LOGOUT-USER': {
      const stateCopy = {
        ...state,
        isAuth: false,
      };

      return stateCopy;
    }
    default:
      return state;
  }
}

export const loginAction = (credentials: CredentialsType) => (dispatch: any) => {
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

export const registerAction = (userInfo: any) => (dispatch: any) => {
  requestAPI
    .register(userInfo)
    .then((data: any) => {
      dispatch(createUserAction(data.targetUser));
      dispatch(loginUserAction());
      toast.success(`Hello ${data.targetUser.firstName}`);
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('login', data.targetUser.login);
    })
    .catch((err: any) => {
      toast.error(err.response.data);
    });
};

export default authReducer;
