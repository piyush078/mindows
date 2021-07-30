import AccountActionTypes from './account.types';
import { getAccountFromStorage } from './account.utils';
import { Wallpapers } from '../../data.store';

const initialState = {
  settings: {
    background: Wallpapers.list[Wallpapers.defaultWallpaper].name,
  },
  desktopFiles: [
    {
      id: '$_RECYCLE_BIN',
      name: 'Recycle Bin',
    }
  ],
  taskbarApps: ['fsexplorer', 'notepad']
};

const AccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case AccountActionTypes.LOAD_ACCOUNT:
      const loadedAccount = getAccountFromStorage(action.payload);
      return { ...state, ...loadedAccount };
    default:
      return state;
  }
};

export default AccountReducer;