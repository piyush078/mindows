const authState = state => state.auth;

export const selectUsers = store => {
  return authState(store).users;
};

export const selectActiveUser = store => {
  return authState(store).activeUser;
};

export const selectAuthError = store => {
  return authState(store).error;
};

export const selectAuthSuccess = store => {
  return authState(store).success;
};