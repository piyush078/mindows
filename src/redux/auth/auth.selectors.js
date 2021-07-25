const authState = state => state.auth;

export const selectUsers = store => {
  return authState(store).users;
};