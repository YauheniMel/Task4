export const shareActionType = {
  IS_LOADING: 'IS-LOADING'
};

export const isLoadingAction = (payload: boolean) => ({
  type: shareActionType.IS_LOADING,
  payload
});
