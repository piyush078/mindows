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