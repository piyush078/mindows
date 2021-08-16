import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Ribbon from './components/Ribbon/Ribbon';
import Sidebar from './components/Sidebar/Sidebar';
import Directory from './components/Directory/Directory';
import { selectDirectoryItems } from '../../redux/account/account.selectors';
import './Explorer.scss';
import {
  copyDirectoryItems,
  createNewDirectoryItem,
  moveDirectoryItems,
  renameDirectoryItems,
  unlinkDirectoryItems,
} from '../../redux/account/account.actions';

const rootDir = '_root';

const Explorer = (props) => {
  const { onOpenDocument } = props;
  const dispatch = useDispatch();
  const [currentDir, updateCurrentDir] = useState(rootDir);
  const directoryData = useSelector(selectDirectoryItems(currentDir)) || [];
  const [selectedItems, updateSelected] = useState([]);
  const [chosenCategory, chooseCategory] = useState(rootDir);
  const [createMode, updateCreateMode] = useState(false);
  const [renameMode, updateRenameMode] = useState(false);
  const [clipboard, updateClipboard] = useState({ mode: -1, items: [] });

  const onGoToDirectory = (id) =>
    updateCurrentDir(id) || updateSelected([]) || (rootDir === currentDir && chooseCategory(id));
  const onSelectItem = (id) => updateSelected([id]);
  const onCancelRename = () => (renameMode ? updateRenameMode(false) : updateCreateMode(false));

  // delete selected items
  const onDeleteItem = () => {
    dispatch(unlinkDirectoryItems(currentDir, selectedItems));
    updateSelected([]);
  };

  // dispatch to create a new file/folder
  const onCreateItem = (name) => {
    const isDir = createMode === 'dir';
    updateCreateMode(false);
    dispatch(createNewDirectoryItem({ name, isDir, path: currentDir }));
  };

  // dispatch to rename a file/folder
  const onRenameItem = (newName) => {
    updateRenameMode(false);
    dispatch(renameDirectoryItems(selectedItems, newName));
  };

  // on paste the copy/cut items
  const onPasteItems = () => {
    if (clipboard.mode === 0) {
      dispatch(moveDirectoryItems(currentDir, clipboard.items));
      updateClipboard({ mode: -1, items: [] });
    } else {
      dispatch(copyDirectoryItems(currentDir, clipboard.items));
    }
  };

  return (
    <div className="Explorer">
      <Ribbon
        disableAll={currentDir === rootDir}
        selectedItems={selectedItems}
        isClipboardEmpty={clipboard.items.length === 0}
        onCreateItem={(isDir) =>
          updateCreateMode(isDir ? 'dir' : 'file') || updateSelected(['_new'])
        }
        onRenameItem={() => updateRenameMode(true)}
        onDeleteItem={onDeleteItem}
        onSelectAll={() => updateSelected(directoryData.map((item) => item.id))}
        onSelectNone={() => updateSelected([])}
        onCopyItems={() => updateClipboard({ mode: 1, items: [...selectedItems] })}
        onCutItems={() => updateClipboard({ mode: 0, items: [...selectedItems] })}
        onPasteItems={onPasteItems}
      />

      <div className="Explorer-viewport">
        <Sidebar
          selectedItem={chosenCategory}
          rootDirectoryData={directoryData}
          onGoToDirectory={onGoToDirectory}
          onSelectItem={(id) => chooseCategory(id)}
        />

        <div className="Explorer-fs">
          <Directory
            items={directoryData}
            isRootDirectory={rootDir === currentDir}
            clipboard={!clipboard.mode ? clipboard.items : []}
            selectedItems={selectedItems}
            onDoubleClick={onGoToDirectory}
            createMode={createMode}
            renameMode={renameMode}
            onSelectItem={onSelectItem}
            onCreateItem={onCreateItem}
            onCancelRename={onCancelRename}
            onRenameItem={onRenameItem}
            onOpenDocument={onOpenDocument}
          />
        </div>
      </div>
    </div>
  );
};

export default Explorer;
