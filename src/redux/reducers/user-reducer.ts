import moment from 'moment';
import { toast } from 'react-toastify';
import requestAPI from '../../api/api';
import { UserType } from '../../interfaces';

export const getUsersAction = (users: any) => ({
  type: 'GET-USERS',
  users,
});
export const setUserInfoAction = (user: any) => ({
  type: 'SET-USER-INFO',
  user,
});
export const deleteUserInfoAction = () => ({
  type: 'DELETE-USER-INFO',
});
export const updateUsersAction = (users: UserType[]) => ({
  type: 'UPDATE-USERS-ACTION',
  users,
});

const initState = {
  id: null,
  firstName: '',
  lastName: '',
  email: '',
  sex: '',
  state: '',
  meta: {
    registerDate: '',
    loginDate: '',
  },
  users: [],
};

// eslint-disable-next-line @typescript-eslint/default-param-last
function userReducer(state = initState, action: any) {
  switch (action.type) {
    case 'GET-USERS': {
      const stateCopy = {
        ...state,
        users: [
          ...action.users.map((user: any) => {
            // eslint-disable-next-line no-param-reassign
            user.loginDate = moment(user.loginDate).format('DD.MM.YYYY HH:MM');
            // eslint-disable-next-line no-param-reassign
            user.registerDate = moment(user.registerDate).format(
              'DD.MM.YYYY HH:MM',
            );

            return user;
          }),
        ],
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
        meta: {
          loginDate: moment(action.user.loginDate).format('DD.MM.YYYY HH:MM'),
          registerDate: moment(action.user.registerDate).format(
            'DD.MM.YYYY HH:MM',
          ),
        },
      };

      return stateCopy;
    }
    case 'DELETE-USER-INFO': {
      const stateCopy = {
        ...state,
        id: null,
        firstName: '',
        lastName: '',
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
    case 'UPDATE-USERS-ACTION': {
      const stateCopy = {
        ...state,
        users: [
          ...action.users.map((user: any) => {
            // eslint-disable-next-line no-param-reassign
            user.loginDate = moment(user.loginDate).format('DD.MM.YYYY HH:MM');
            // eslint-disable-next-line no-param-reassign
            user.registerDate = moment(user.registerDate).format(
              'DD.MM.YYYY HH:MM',
            );

            return user;
          }),
        ],
      };

      return stateCopy;
    }
    default:
      return state;
  }
}

export const getAllUsersAction = (payload: any) => (dispatch: any) => {
  requestAPI
    .getUsers(payload)
    .then((data: any) => {
      dispatch(setUserInfoAction(data.targetUser));

      dispatch(getUsersAction(data.users));
    })
    .catch((err: any) => {
      toast.error(err.message);
    });
};
export const blockMeAction = (id: any) => (dispatch: any) => {
  requestAPI
    .blockMe(id)
    .then(() => {
      dispatch(deleteUserInfoAction());
    })
    .catch((err: any) => {
      toast.error(err.message);
    });
};

export const blockUsersAction = (ids: any) => () => {
  requestAPI
    .block(ids)
    .then((data: any) => {
      toast.success(data);
    })
    .catch((err: any) => {
      toast.error(err.message);
    });
};

export const unblockUsersAction = (ids: any) => () => {
  requestAPI
    .unblock(ids)
    .then((data: any) => {
      toast.success(data);
    })
    .catch((err: any) => {
      toast.error(err.message);
    });
};

export const deleteMeAction = (id: any) => (dispatch: any) => {
  requestAPI
    .deleteMe(id)
    .then(() => {
      dispatch(deleteUserInfoAction());
    })
    .catch((err: any) => {
      toast.error(err.message);
    });
};

export const deleteUsersAction = (ids: any) => () => {
  requestAPI
    .deleteMe(ids)
    .then((data: any) => {
      toast.success(data);
    })
    .catch((err: any) => {
      toast.error(err.message);
    });
};

export default userReducer;
