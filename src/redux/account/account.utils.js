import { getUsername } from '../auth/auth.user';

const storageKeys = {
  ACCOUNT_DATA: username => 'ACCOUNT_DATA__' + username
};

export const getAccountFromStorage = (user) => {
  const username = getUsername(user);
  const data = localStorage.getItem(storageKeys.ACCOUNT_DATA(username));
  return data ? JSON.parse(data) : {};
};