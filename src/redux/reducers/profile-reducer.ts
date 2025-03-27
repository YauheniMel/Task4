import { AnyAction } from 'redux';
import { profileActionType } from '../actions/profile-action';

// TODO: Set type
const initState = {};

export const profileReducer = (state = initState, action: AnyAction) => {
  switch (action.type) {
    case profileActionType.SET_PROFILE: {
      const stateCopy = {
        ...state,
        ...action.payload
      };

      return stateCopy;
    }
    default:
      return state;
  }
};
