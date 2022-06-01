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
export const setUserInfo = (user: any) => ({
  type: 'SET-USER-INFO',
  user,
});

const initState = {
  id: null,
  isAuth: false,
  firstName: null,
  lastName: null,
  email: null,
  loginValue: null,
  passwordValue: null,
  sex: null,
  meat: {
    registerDate: null,
    loginDate: null,
  },
};

// eslint-disable-next-line @typescript-eslint/default-param-last
function authReducer(state = initState, action: any) {
  switch (action.type) {
    case 'LOGIN-USER': {
      const stateCopy = {
        ...state,
        isAuth: true,
      };

      stateCopy.loginValue = null;
      stateCopy.passwordValue = null;

      return stateCopy;
    }
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
    case 'SET-USER-INFO': {
      const stateCopy = {
        ...state,
        id: action.user.id,
        firstName: action.user.firstName,
        lastName: action.user.lastName,
        email: action.user.email,
        sex: action.user.sex,
        meat: { ...action.user.meta },
      };

      return stateCopy;
    }
    default:
      return state;
  }
}

export const login = (credentials: any) => (dispatch: any) => {
  requestAPI
    .login(credentials)
    .then((data) => {
      console.log(data);
      dispatch(setUserInfo(data));
      dispatch(loginUser());
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export default authReducer;
