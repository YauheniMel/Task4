import { RootState } from '../store';

export const shareIsLoadingSelector = (state: RootState) => {
  return state.share.isLoading;
};
