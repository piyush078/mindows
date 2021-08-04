import AccountActionTypes from './account.types';

export const loadAccount = (activeUser) => ({
  type: AccountActionTypes.LOAD_ACCOUNT,
  payload: activeUser
});

export const getAccountSettings = () => ({
  type: AccountActionTypes.GET_ACCOUNT_SETTINGS
});

export const getAccountFileSystem = () => ({
  type: AccountActionTypes.GET_FILESYSTEM
});

export const createNewDirectoryItem = (item) => ({
  type: AccountActionTypes.CREATE_NEW_DIR_ITEM,
  payload: item
});
