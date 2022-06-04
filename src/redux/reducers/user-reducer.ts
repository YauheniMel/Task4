import moment from 'moment';

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

export default userReducer;
