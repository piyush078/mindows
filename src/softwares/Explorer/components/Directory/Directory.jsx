import { useEffect, useRef, useState } from 'react';
import { FiHardDrive } from 'react-icons/fi';
import Icon from '../Icon/Icon';

const defaultName = (isDir) => (isDir === 'dir' ? 'New Folder' : 'New Document');
const newItem = (itemType) => ({
  id: '_new',
  name: defaultName(itemType === 'dir'),
  isDir: itemType === 'dir',
});
const formatDirectoryItems = (items, newItemMode) =>
  items.concat(newItemMode ? newItem(newItemMode) : []);

const Directory = ({
  items,
  clipboard,
  selectedItems,
  isRootDirectory,
  onDoubleClick,
  createMode,
  renameMode,
  onCreateItem,
  onRenameItem,
  onSelectItem,
  onCancelRename,
  onOpenDocument,
}) => {
  const [newName, updateNewName] = useState('');
  const inputRef = useRef(null);
  const onDoneRename = (toName) => (createMode ? onCreateItem(toName) : onRenameItem(toName));
  const dirItems = formatDirectoryItems(items, createMode);

  // on change of createMode or renameMode, update input field with name
  useEffect(() => {
    if (createMode) {
      updateNewName(defaultName(createMode));
      inputRef.current.focus();
    } else if (renameMode) {
      updateNewName(dirItems.filter((item) => item.id === selectedItems[0])[0].name);
      inputRef.current.focus();
    }
  }, [createMode, renameMode]);

  return (
    <div className={isRootDirectory ? 'Explorer-rootdirectory' : 'Explorer-directory'}>
      {dirItems.map((item) => {
        const toBeRenamed = item.id === '_new' || (selectedItems.includes(item.id) && renameMode);
        const className =
          `Explorer-fs-item ` +
          `${selectedItems.includes(item.id) ? ' Explorer-fs-item-selected' : ''} ` +
          `${clipboard.includes(item.id) ? ' Explorer-fs-item-cut' : ''}`;

        return (
          <div
            key={item.id}
            role="button"
            tabIndex="0"
            className={className}
            onClick={() => onSelectItem(item.id)}
            onDoubleClick={() =>
              item.isDir
                ? onDoubleClick(item.id)
                : onOpenDocument(item.id, item.name, item.extension)
            }
          >
            <span>{isRootDirectory ? <FiHardDrive /> : <Icon isDir={item.isDir} />}</span>
            <span className={toBeRenamed ? 'Explorer-fs-item-hidden' : ''}>
              {item.name}
              {item.extension ? `.${item.extension}` : ''}
            </span>

            {toBeRenamed && (
              <input
                type="text"
                ref={inputRef}
                value={newName}
                className="Explorer-fs-item-pseudo-name"
                onChange={(e) => updateNewName(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && onDoneRename(newName)}
                onBlur={() => onCancelRename(item.name)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Directory;
