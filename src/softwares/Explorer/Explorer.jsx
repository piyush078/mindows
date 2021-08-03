import { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiHardDrive } from 'react-icons/fi';

import ExplorerRibbon from './components/Ribbon';
import ExplorerSidebar from './components/Sidebar';
import { selectDirectoryItems } from '../../redux/account/account.selectors';
import './Explorer.scss';
import { createNewDirectoryItem } from '../../redux/account/account.actions';
import { FcDocument } from 'react-icons/fc';

const rootDir = '_root';

const ItemIcon = ({ isDir }) => (
  isDir 
    ? <img src={process.env.PUBLIC_URL + '/icons/MiFolder.svg'} />
    : <FcDocument fill='white' />
);


const DirectoryView = ({
  selectedItems,
  items,
  onDoubleClickDir,
  onSelectItem,
  driveIcon,
  createItemMode,
  onCreateNewFolder
}) => {

  const [itemName, updateItemName] = useState('');
  const inputref = useRef(null);
  const sortItems = () => dirItems.sort((a, b) => a.name > b.name);

  const dirItems = items
    .concat(createItemMode
      ? {
        id: '_new',
        name: itemName,
        isDir: createItemMode === 'dir'
      }
      : []);

  useEffect(sortItems, [items]);
  useEffect(() => {
    if(createItemMode) {
      updateItemName(createItemMode === 'dir' ? 'New Folder' : 'New Document');
      inputref.current.focus();
    }
  }, [createItemMode]);

  return (
    <Fragment>
      {
        dirItems.map((item, i) => (
          <div key={i}
            className={'Explorer-fs-item' + (selectedItems.includes(item.id) ? ' Explorer-fs-item-selected' : '')}
            onClick={() => onSelectItem(item.id)}
            onDoubleClick={() => item.isDir ? onDoubleClickDir(item.id) : true}>
            <span>
              {driveIcon ? <FiHardDrive /> : <ItemIcon isDir={item.isDir} />}
            </span>
            <span className={item.id === '_new' ? 'Explorer-fs-item-hidden' : ''}>
              {item.name}
            </span>

            {
              item.id === '_new'
                && <input
                  type='text'
                  className='Explorer-fs-item-pseudo-name'
                  ref={inputref}
                  value={itemName}
                  onChange={e => updateItemName(e.target.value)}
                  onKeyUp={e => e.key === 'Enter' && onCreateNewFolder(itemName)}
                  onBlur={() => onCreateNewFolder(itemName)} />
            }
          </div>
        ))
      }
    </Fragment>
  );
};


const Explorer = () => {

  const dispatch = useDispatch();
  const [currentDir, updateCurrentDir] = useState(rootDir);
  const directoryData = useSelector(selectDirectoryItems(currentDir)) || [];
  const [selectedItems, updateSelected] = useState([rootDir]);
  const [createItemMode, updateCreateMode] = useState(false);

  const onGoToDirectory = (id) => updateCurrentDir(id);
  const onSelectItem = (id) => updateSelected([id]);
  const onCreateNewFolder = (name) => {
    const isDir = createItemMode === 'dir';
    updateCreateMode(false);
    dispatch(createNewDirectoryItem({ name: name, isDir: isDir, path: currentDir }));
  }

  return (
    <div className='Explorer'>

      <ExplorerRibbon 
        disableAll={currentDir === rootDir}
        currentDir={currentDir}
        onCreateNewItem={(isDir) => updateCreateMode(isDir ? 'dir' : 'file')}
      />

      <div className='Explorer-viewport'>
        <ExplorerSidebar
          selectedItems={selectedItems}
          rootDirectoryData={directoryData}
          onGoToDirectory={onGoToDirectory}
          onSelectItem={onSelectItem}
        />

        <div className='Explorer-fs'>
          <div className={
            currentDir === rootDir ? 'Explorer-rootdirectory' : 'Explorer-directory'
          }>
            <DirectoryView
              items={directoryData}
              selectedItems={selectedItems}
              onDoubleClickDir={onGoToDirectory}
              onSelectItem={onSelectItem}
              driveIcon={currentDir === rootDir}
              createItemMode={createItemMode}
              onCreateNewFolder={onCreateNewFolder}
            />
          </div>
        </div>
      </div>
    </div>
  );
};


export default Explorer;