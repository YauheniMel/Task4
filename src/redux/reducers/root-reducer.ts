import { AnyAction } from 'redux';
import { shareReducer } from './share-reducer';
import { profileReducer } from './profile-reducer';
import { combineReducers } from '@reduxjs/toolkit';
import { rootActionType } from '../actions/root-action';
import { usersReducer } from './users-reducer';

const combinedReducer = combineReducers({
  share: shareReducer,
  profile: profileReducer,
  users: usersReducer
});

export const rootReducer = (
  state = {
    share: { isLoading: false },
    profile: {}
  },
  action: AnyAction
) => {
  if (action.type === rootActionType.LOGOUT) {
    return combinedReducer(undefined, action);
  }

  return combinedReducer(state, action);
};
