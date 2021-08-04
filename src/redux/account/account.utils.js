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

export const saveAccountInStorage = (user, state) => {
  const username = getUsername(user);
  localStorage.setItem(storageKeys.ACCOUNT_DATA(username), JSON.stringify(state));
};

export const appendChild = (parentNode, childId) => {
  const children = parentNode.children.concat(childId);
  return { ...parentNode, children: children };
};

export const updateFs = (fs, parentNode, childNode) => {
  const newFs = { ...fs };
  newFs[parentNode.node.id] = parentNode;
  newFs[childNode.node.id] = childNode;
  return newFs;
};

export const renameNodes = (fs, ids, newName) => {
  const newFs = { ...fs };
  ids.forEach(id => newFs[id].node.name = newName);
  return newFs;
};

export const unlinkNodes = (fs, parentNode, ids) => {
  const newFs = { ...fs };
  newFs[parentNode.node.id] = {
    ...parentNode,
    children: parentNode.children.filter(cId => !ids.includes(cId))
  };
  ids.forEach(id => delete newFs[id]);
  return newFs;
};