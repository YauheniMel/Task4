import { RootState } from '../store';

export const profileIdSelector = (state: RootState): number => {
  return state.profile.id;
};

export const profileFirstNameSelector = (state: RootState): string => {
  return state.profile.firstName;
};

export const profileLastNameSelector = (state: RootState): string => {
  return state.profile.lastName;
};
