import requestAPI from '../../api/api';

export const loginUser = () => ({ type: 'LOGIN-USER' });
export const createUserLogin = (login: any) => ({
  type: 'CREATE-USER-LOGIN',
  login,
});
export const createUserPassword = (password: any) => ({
  type: 'CREATE-USER-PASSWORD',
  password,
});
export const createUser = (value: any) => ({
  type: 'CREATE-USER',
  value,
});

const initState = {
  isAuth: false,
  loginValue: null,
  passwordValue: null,
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

      stateCopy.loginValue = null;
      stateCopy.passwordValue = null;

      return stateCopy;
    }
    case 'LOGIN-USER': {
      const stateCopy = {
        ...state,
        isAuth: true,
      };

      stateCopy.loginValue = null;
      stateCopy.passwordValue = null;

      return stateCopy;
    }
    default:
      return state;
  }
}

export const login = (credentials: any) => (dispatch: any) => {
  requestAPI
    .login(credentials)
    .then((data: any) => {
      dispatch(loginUser());
      alert(`Hello ${data.targetUser.firstName}`);
      localStorage.setItem('token', data.token);
      localStorage.setItem('login', data.targetUser.login);
    })
    .catch((err: any) => {
      alert(err.response.data);
    });
};

export const register = (userInfo: any) => (dispatch: any) => {
  requestAPI
    .register(userInfo)
    .then((data: any) => {
      dispatch(createUser(data.targetUser));
      alert(`Hello ${data.targetUser.firstName}`);
      localStorage.setItem('token', data.token);
      localStorage.setItem('login', data.targetUser.login);
    })
    .catch((err: any) => {
      alert(err.response);
    });
};

export default authReducer;
