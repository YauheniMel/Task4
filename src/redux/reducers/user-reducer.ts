import requestAPI from '../../api/api';

export const getUsers = (users: any) => ({
  type: 'GET-USERS',
  users,
});
export const setUserInfo = (user: any) => ({
  type: 'SET-USER-INFO',
  user,
});

const initState = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  sex: null,
  meta: {
    registerDate: null,
    loginDate: null,
  },
  users: [],
};

// eslint-disable-next-line @typescript-eslint/default-param-last
function userReducer(state = initState, action: any) {
  switch (action.type) {
    case 'GET-USERS': {
      const stateCopy = {
        ...state,
        users: [...action.users],
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
        meta: { ...action.user.meta },
      };

      return stateCopy;
    }
    default:
      return state;
  }
}

export const getAllUsers = (payload: any) => (dispatch: any) => {
  requestAPI
    .getUsers(payload)
    .then((data: any) => {
      // eslint-disable-next-line no-debugger
      debugger;
      dispatch(setUserInfo(data.targetUser));

      dispatch(getUsers(data.users));
    })
    .catch((err: any) => {
      alert(err.response.data);
    });
};

export default userReducer;
