const authState = state => state.auth;

export const selectUsers = store => {
  return authState(store).users;
};

export const selectAuthError = store => {
  return authState(store).error;
};

export const selectAuthSuccess = store => {
  return authState(store).success;
};