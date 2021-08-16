const authState = (state) => state.auth;

export const selectUsers = (store) => authState(store).users;

export const selectActiveUser = (store) => authState(store).activeUser;

export const selectAuthError = (store) => authState(store).error;

export const selectAuthSuccess = (store) => authState(store).success;
