const initState = {
  isAuth: false,
  firstName: '',
  lastName: '',
  email: '',
  sex: '',
  login: '',
  password: '',
};

// eslint-disable-next-line @typescript-eslint/default-param-last
function authReducer(state = initState, action: any) {
  switch (action.type) {
    case 'CREATE-USER-LOGIN': {
      const stateCopy = {
        ...state,
        login: action.login,
      };

      return stateCopy;
    }
    case 'CREATE-USER-PASSWORD': {
      const stateCopy = {
        ...state,
        password: action.password,
      };

      return stateCopy;
    }
    case 'CREATE-USER': {
      const stateCopy = {
        ...state,
        ...action.value,
      };

      return stateCopy;
    }
    case 'LOGIN-USER': {
      const stateCopy = {
        ...state,
        isAuth: true,
      };

      stateCopy.login = '';
      stateCopy.password = '';

      return stateCopy;
    }
    case 'REGISTER-USER': {
      const stateCopy = {
        ...state,
        isAuth: true,
      };

      stateCopy.login = '';
      stateCopy.password = '';

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

export default authReducer;
