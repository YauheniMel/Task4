import requestAPI from '../../api/api';

export const getUsers = (users: any) => ({
  type: 'GET-USERS',
  users,
});
export const setUserInfo = (user: any) => ({
  type: 'SET-USER-INFO',
  user,
});
export const deleteUserInfo = () => ({
  type: 'DELETE-USER-INFO',
});

const initState = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  sex: null,
  state: null,
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
        state: action.user.state,
        meta: { ...action.user.meta },
      };

      return stateCopy;
    }
    case 'DELETE-USER-INFO': {
      const stateCopy = {
        ...state,
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        sex: null,
        state: null,
        meta: {
          registerDate: null,
          loginDate: null,
        },
        users: [],
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
      dispatch(setUserInfo(data.targetUser));

      dispatch(getUsers(data.users));
    })
    .catch((err: any) => {
      alert(err.response.data);
    });
};
export const blockMe = (id: any) => (dispatch: any) => {
  requestAPI
    .blockMe(id)
    .then((data: any) => {
      console.log(data);
      dispatch(deleteUserInfo());
    })
    .catch((err: any) => {
      alert(err.response.data);
    });
};

export const blockUsers = (ids: any) => (dispatch: any) => {
  // eslint-disable-next-line no-debugger
  debugger;
  requestAPI
    .block(ids)
    .then((data: any) => {
      console.log(data);
      dispatch(getUsers(data.users));
    })
    .catch((err: any) => {
      alert(err.response.data);
    });
};

export const unblockUsers = (ids: any) => (dispatch: any) => {
  // eslint-disable-next-line no-debugger
  debugger;
  requestAPI
    .unblock(ids)
    .then((data: any) => {
      console.log(data);
      // need to get a new users array
      dispatch(getUsers(data.users));
    })
    .catch((err: any) => {
      alert(err.response.data);
    });
};

export const deleteMe = (id: any) => (dispatch: any) => {
  requestAPI
    .deleteMe(id)
    .then((data: any) => {
      console.log(data);
      dispatch(deleteUserInfo());
    })
    .catch((err: any) => {
      alert(err.response.data);
    });
};

export const deleteUsers = (ids: any) => (dispatch: any) => {
  requestAPI
    .deleteMe(ids)
    .then((data: any) => {
      console.log(data);
      dispatch(getUsers(data.users));
    })
    .catch((err: any) => {
      alert(err.response.data);
    });
};

export default userReducer;
