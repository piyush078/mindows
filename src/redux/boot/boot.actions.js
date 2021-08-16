import BootActionTypes from './boot.types';

export const getBootBackgrounds = () => ({
  type: BootActionTypes.GET_BACKGROUNDS,
});

export const setLockScreenBackground = () => ({
  type: BootActionTypes.SET_LOCK_SCREEN_BACKGROUND,
});

export const setLoginScreenBackground = () => ({
  type: BootActionTypes.SET_LOGIN_SCREEN_BACKGROUND,
});
