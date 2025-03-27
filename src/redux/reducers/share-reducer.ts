import { AnyAction } from 'redux';
import { shareActionType } from '../actions/share-action';

interface IShareState {
  isLoading: boolean;
}

const initState: IShareState = {
  isLoading: false
};

export const shareReducer = (state = initState, action: AnyAction) => {
  switch (action.type) {
    case shareActionType.IS_LOADING: {
      const stateCopy = {
        ...state,
        isLoading: action.payload
      };

      return stateCopy;
    }
    default:
      return state;
  }
};
