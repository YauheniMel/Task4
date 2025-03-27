import { RootState } from '../store';

export const usersSelector = (state: RootState) => {
  return state.users;
};
