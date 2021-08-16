import Wallpapers from '../../config/wallpapers';

const storageKeys = {
  LOCK_SCREEN_BACKGROUND: 'LOCK_SCREEN_BACKGROUND',
  LOGIN_SCREEN_BACKGROUND: 'LOGIN_SCREEN_BACKGROUND',
};

export const getLockScreenBackground = () => {
  const name = localStorage.getItem(storageKeys.LOCK_SCREEN_BACKGROUND);
  return name in Wallpapers.list ? name : Wallpapers.list[0].name;
};

export const getLoginScreenBackground = () => {
  const name = localStorage.getItem(storageKeys.LOGIN_SCREEN_BACKGROUND);
  return name in Wallpapers.list ? name : Wallpapers.list[Wallpapers.defaultWallpaper].name;
};
