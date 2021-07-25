import AuthActionTypes from './auth.types';

export const checkUserSession = () => ({
  type: AuthActionTypes.CHECK_USER_SESSION
});

export const createNewAccount = (userDetails) => ({
  type: AuthActionTypes.CREATE_NEW_ACCOUNT,
  payload: userDetails
});

