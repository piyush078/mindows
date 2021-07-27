import { PublicUser } from "./auth.user";

const storageKeys = {
  PERSISTENT_USERS: 'PERSISTENT_USERS'
};

export const checkForStoredUser = () => {
  const users = localStorage.getItem(storageKeys.PERSISTENT_USERS);
  return users ? JSON.parse(users) : [];
};

export const saveNewUser = (user) => {
  const users = checkForStoredUser().concat(user);
  localStorage.setItem(storageKeys.PERSISTENT_USERS, JSON.stringify(users));
  return users;
};

export const safeguardUser = (users) => {
  return users ? users.map(user => PublicUser(user)) : users;
};

export const signInUser = (userIndex, password) => {
  const users = checkForStoredUser();
  return users[userIndex].password === password;
};