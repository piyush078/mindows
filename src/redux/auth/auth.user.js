export const User = (name, username, password) => ({
  name: name,
  username: username,
  password: password
});

export const PublicUser = (user) => ({
  name: user.name,
  username: user.username
});