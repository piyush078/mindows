import AccountActionTypes from './account.types';
import {
  renameNodes,
  getAccountFromStorage,
  unlinkNodes,
  linkNodes,
  copyNodes,
  moveNodes,
  saveAccountInStorage,
} from './account.utils';
import Node from './account.fs';
import Wallpapers from '../../config/wallpapers';

const initialState = {
  settings: {
    background: Wallpapers.list[Wallpapers.defaultWallpaper].name,
  },
  taskbarApps: ['fsexplorer', 'notepad'],
  filesystem: {
    _root: Node('', true, null, ['C:', 'D:'], null, '_root'),
    'C:': Node('Local Drive (C:)', true, '_root', [], null, 'C:'),
    'D:': Node('Local Drive (D:)', true, '_root', [], null, 'D:'),
  },
  defaultApps: {
    '*': 'notepad',
  },
};

const AccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case AccountActionTypes.LOAD_ACCOUNT: {
      const loadedAccount = getAccountFromStorage(action.payload);
      return { ...state, ...loadedAccount };
    }

    case AccountActionTypes.SAVE_ACCOUNT: {
      const activeAccount = action.payload;
      saveAccountInStorage(activeAccount, state);
      return state;
    }

    case AccountActionTypes.CREATE_NEW_DIR_ITEM: {
      const item = action.payload;
      const newNode = Node(item.name, item.isDir, item.path);
      const newFs = linkNodes(state.filesystem, state.filesystem[item.path], [newNode]);
      return { ...state, filesystem: newFs };
    }

    case AccountActionTypes.RENAME_DIR_ITEM: {
      const itemsId = action.payload.items;
      const { newName } = action.payload;
      const newFs = renameNodes(state.filesystem, itemsId, newName);
      return { ...state, filesystem: newFs };
    }

    case AccountActionTypes.DELETE_DIR_ITEM: {
      const parent = action.payload.path;
      const idsToDelete = action.payload.ids;
      const newFs = unlinkNodes(state.filesystem, state.filesystem[parent], idsToDelete);
      return { ...state, filesystem: newFs };
    }

    case AccountActionTypes.COPY_DIR_ITEM: {
      const { toPath } = action.payload;
      const idsToCopy = action.payload.ids;
      const nodesToCopy = idsToCopy.map((id) => state.filesystem[id]);
      const newFs = copyNodes(
        state.filesystem,
        nodesToCopy.map((node) => Node(node.node.name, node.node.isDir, toPath)),
        state.filesystem[toPath]
      );
      return { ...state, filesystem: newFs };
    }

    case AccountActionTypes.MOVE_DIR_ITEM: {
      const { toPath } = action.payload;
      const idsToMove = action.payload.ids;
      const fromPath = state.filesystem[idsToMove[0]].parent;
      const nodesToMove = idsToMove.map((id) => state.filesystem[id]);
      const newFs = moveNodes(
        state.filesystem,
        nodesToMove,
        state.filesystem[fromPath],
        state.filesystem[toPath]
      );
      return { ...state, filesystem: newFs };
    }

    default:
      return state;
  }
};

export default AccountReducer;
