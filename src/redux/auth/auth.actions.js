import AuthActionTypes from './auth.types';

export const checkUserSession = () => ({
  type: AuthActionTypes.CHECK_USER_SESSION
});

export const createNewAccount = (userDetails) => ({
  type: AuthActionTypes.CREATE_NEW_ACCOUNT,
  payload: userDetails
});

export const signInUser = (userIndex, password) => ({
  type: AuthActionTypes.SIGN_IN,
  payload: { userIndex: userIndex, password: password }
});

