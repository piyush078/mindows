const accountState = state => state.account;

export const selectAccountSettings = store => {
  return accountState(store).settings;
};

export const selectTaskBarApps = store => {
  return accountState(store).taskbarApps;
};