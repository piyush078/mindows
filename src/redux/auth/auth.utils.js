const storageKeys = {
  PERSISTENT_USER: 'PERSISTENT_USER'
};

export const checkForStoredUser = () => {
  const user = localStorage.getItem(storageKeys.PERSISTENT_USER);
  return user ? JSON.parse(user) : {};
};