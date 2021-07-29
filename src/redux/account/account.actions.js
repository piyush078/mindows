import AccountActionTypes from './account.types';

export const loadAccount = (activeUser) => ({
  type: AccountActionTypes.LOAD_ACCOUNT,
  payload: activeUser
});

export const getAccountSettings = () => ({
  type: AccountActionTypes.GET_ACCOUNT_SETTINGS
});