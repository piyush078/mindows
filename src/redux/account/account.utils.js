import { getUsername } from '../auth/auth.user';
import Node from './account.fs';

const storageKeys = {
  ACCOUNT_DATA: username => 'ACCOUNT_DATA__' + username
};

export const getAccountFromStorage = (user) => {
  const username = getUsername(user);
  const data = localStorage.getItem(storageKeys.ACCOUNT_DATA(username));
  return data ? JSON.parse(data) : {};
};

export const updateNodeChildren = (parentNode, childId) => {
  const children = parentNode.children.concat(childId);
  return { ...parentNode, children: children };
};