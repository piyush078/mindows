export const User = (name, username, password) => ({
  name,
  username,
  password,
});

export const PublicUser = (user) => ({
  name: user.name,
  username: user.username,
});

export const getName = (user) => user.name;
export const getUsername = (user) => user.username;
