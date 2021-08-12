import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiHardDrive } from 'react-icons/fi';
import { FcDocument } from 'react-icons/fc';

import Ribbon from './components/Ribbon';
import Sidebar from './components/Sidebar';
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

const ItemIcon = ({ isDir }) =>
  isDir ? (
    <img alt="Folder" src={`${process.env.PUBLIC_URL}/icons/MiFolder.svg`} />
  ) : (
    <FcDocument fill="white" />
  );

const DirectoryView = ({
  items,
  selectedItems,
  clipboard,
  driveIcon,
  onSelectItem,
  onDoubleClick,
  createMode,
  renameMode,
  onCreateItem,
  onRenameItem,
  onCancelRename,
  onOpenDocument,
}) => {
  const [newName, updateNewName] = useState('');
  const inputRef = useRef(null);
  const onDoneRename = (toName) => (createMode ? onCreateItem(toName) : onRenameItem(toName));

  const dirItems = items.concat(
    createMode
      ? {
          id: '_new',
          name: newName,
          isDir: createMode === 'dir',
        }
      : []
  );
  const sortItems = () => dirItems.sort((a, b) => a.name > b.name);

  useEffect(() => {
    if (createMode) {
      updateNewName(createMode === 'dir' ? 'New Folder' : 'New Document');
      inputRef.current.focus();
    } else if (renameMode) {
      updateNewName(dirItems.filter((item) => item.id === selectedItems[0])[0].name);
      inputRef.current.focus();
    }
  }, [createMode, renameMode]);

  return (
    <>
      {dirItems.map((item, i) => (
        <div
          key={i}
          role="button"
          className={`Explorer-fs-item${
            selectedItems.includes(item.id) ? ' Explorer-fs-item-selected' : ''
          }${clipboard.includes(item.id) ? ' Explorer-fs-item-cut' : ''}`}
          onClick={() => onSelectItem(item.id)}
          onDoubleClick={() =>
            item.isDir ? onDoubleClick(item.id) : onOpenDocument(item.name, item.extension)
          }
        >
          <span>{driveIcon ? <FiHardDrive /> : <ItemIcon isDir={item.isDir} />}</span>
          <span
            className={
              item.id === '_new' || (selectedItems.includes(item.id) && renameMode)
                ? 'Explorer-fs-item-hidden'
                : ''
            }
          >
            {item.name}
            {item.extension ? `.${item.extension}` : ''}
          </span>

          {(item.id === '_new' || (selectedItems.includes(item.id) && renameMode)) && (
            <input
              type="text"
              className="Explorer-fs-item-pseudo-name"
              ref={inputRef}
              value={newName}
              onChange={(e) => updateNewName(e.target.value)}
              onKeyUp={(e) => e.key === 'Enter' && onDoneRename(newName)}
              onBlur={() => onCancelRename(item.name)}
            />
          )}
        </div>
      ))}
    </>
  );
};

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

  const onGoToDirectory = (id) => updateCurrentDir(id) || updateSelected([]);
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
          <div className={currentDir === rootDir ? 'Explorer-rootdirectory' : 'Explorer-directory'}>
            <DirectoryView
              items={directoryData}
              selectedItems={selectedItems}
              clipboard={!clipboard.mode ? clipboard.items : []}
              onDoubleClick={onGoToDirectory}
              onSelectItem={onSelectItem}
              driveIcon={currentDir === rootDir}
              createMode={createMode}
              onCreateItem={onCreateItem}
              onCancelRename={onCancelRename}
              renameMode={renameMode}
              onRenameItem={onRenameItem}
              onOpenDocument={onOpenDocument}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explorer;
