import AccountActionTypes from './account.types';
import { getAccountFromStorage, updateNodeChildren } from './account.utils';
import Node from './account.fs.js';
import { Wallpapers } from '../../data.store';

const initialState = {
  settings: {
    background: Wallpapers.list[Wallpapers.defaultWallpaper].name,
  },
  taskbarApps: ['fsexplorer', 'notepad'],
  filesystem: {
    '_root': Node('', true, null, ['C:', 'D:'], null, '_root'),
    'C:': Node('Local Drive (C:)', true, '_root', [], null, 'C:'),
    'D:': Node('Local Drive (D:)', true, '_root', [], null, 'D:'),
  }
};


const AccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case AccountActionTypes.LOAD_ACCOUNT:
      const loadedAccount = getAccountFromStorage(action.payload);
      return { ...state, ...loadedAccount };

    case AccountActionTypes.CREATE_NEW_DIR_ITEM:
      const item = action.payload;
      const newItem = Node(item.name, item.isDir, item.path);
      const parent = updateNodeChildren(state.filesystem[item.path], newItem.node.id);
      const newFs = { ...state.filesystem };
      newFs[parent.node.id] = parent;
      newFs[newItem.node.id] = newItem;
      console.log(newFs);
      return { ...state, filesystem: newFs };

    default:
      return state;
  }
};

export default AccountReducer;