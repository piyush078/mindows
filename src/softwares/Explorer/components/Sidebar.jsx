import React, { useEffect, useState } from 'react';
import { MdDesktopWindows } from 'react-icons/md';
import { FiHardDrive } from 'react-icons/fi';
import { Strings } from '../../../data.store';
import './Sidebar.scss';


const ExplorerSidebar = React.memo(({
  selectedItems, rootDirectoryData, onSelectItem, onGoToDirectory
}) => {

  const [directoryData, updateDirectoryData] = useState([]);
  useEffect(() => updateDirectoryData(rootDirectoryData), []);

  const SideNavbarItem = ({ item }) => (
    <div
      className={'Explorer-sidebar-item' + (
        selectedItems.includes(item.id) ? ' Explorer-item-selected' : '')}
      onClick={() => onGoToDirectory(item.id) || onSelectItem(item.id)}>

      <span><FiHardDrive /></span>
      <span>{item.name}</span>
    </div>
  );

  return (
    <div className='Explorer-sidebar'>
      <div
        className={'Explorer-sidebar-item' + (
          selectedItems.includes('_root') ? ' Explorer-item-selected' : '')}
        onClick={() => onGoToDirectory('_root') || onSelectItem('_root')}>
        
        <span><MdDesktopWindows /></span>
        <span>{Strings.PC_FILESYSTEM_ROOT_NAME}</span>
      </div>
      <div className='Explorer-sidebar-item-subitems'>
        {directoryData.map((item, i) => <SideNavbarItem key={i} item={item} />)}
      </div>
    </div>
  );
}, (prevProps, nextProps) => (
  prevProps.selectedItems === nextProps.selectedItems
));


export default ExplorerSidebar;