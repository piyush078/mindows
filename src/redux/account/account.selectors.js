const accountState = (state) => state.account;

export const selectAccountSettings = (store) => accountState(store).settings;

export const selectTaskBarApps = (store) => accountState(store).taskbarApps;

export const selectDirectoryItems = (id) => (store) => {
  const fs = accountState(store).filesystem;
  return fs[id] ? fs[id].children.map((child) => fs[child].node) : [];
};
