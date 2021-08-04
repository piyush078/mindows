import AccountActionTypes from './account.types';
import { renameNodes, getAccountFromStorage, appendChild, updateFs, unlinkNodes } from './account.utils';
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
    case AccountActionTypes.LOAD_ACCOUNT: {
      const loadedAccount = getAccountFromStorage(action.payload);
      return { ...state, ...loadedAccount };
    }

    case AccountActionTypes.CREATE_NEW_DIR_ITEM: {
      const item = action.payload;
      const newItem = Node(item.name, item.isDir, item.path);
      const parent = appendChild(state.filesystem[item.path], newItem.node.id);
      const newFs = updateFs(state.filesystem, parent, newItem);
      return { ...state, filesystem: newFs };
    }

    case AccountActionTypes.RENAME_DIR_ITEM: {
      const itemsId = action.payload.items;
      const newName = action.payload.newName;
      const newFs = renameNodes(state.filesystem, itemsId, newName);
      return { ...state, filesystem: newFs };
    }

    case AccountActionTypes.DELETE_DIR_ITEM: {
      const parent = action.payload.path;
      const idsToDelete = action.payload.ids;
      console.log(parent, idsToDelete)
      const newFs = unlinkNodes(state.filesystem, state.filesystem[parent], idsToDelete);
      return { ...state, filesystem: newFs };
    }

    default:
      return state;
  }
};

export default AccountReducer;