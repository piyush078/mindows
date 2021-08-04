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

export const linkNodes = (fs, parentNode, childNodes) => {
  const newFs = { ...fs };
  const newChildren = [...parentNode.children].concat(childNodes.map(node => node.node.id));
  newFs[parentNode.node.id] = { ...parentNode, children: newChildren };
  childNodes.forEach(node => {
    newFs[node.node.id] = node;
  });
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

export const copyNodes = (fs, childNodes, toParentNode) => {
  return linkNodes(fs, toParentNode, childNodes);
};

export const moveNodes = (fs, childNodes, fromParentNode, toParentNode) => {
  return linkNodes(
    unlinkNodes(
      fs, fromParentNode, childNodes.map(node => node.node.id)),
    toParentNode,
    childNodes
  );
}