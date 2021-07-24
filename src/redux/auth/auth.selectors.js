const authState = state => state.auth;

export const selectCurrentUser = store => {
  return authState(store).currentUser;
};