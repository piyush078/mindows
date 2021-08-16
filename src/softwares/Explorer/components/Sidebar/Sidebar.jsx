import React, { useEffect, useState } from 'react';
import { MdDesktopWindows } from 'react-icons/md';
import { FiHardDrive } from 'react-icons/fi';
import Strings from '../../../../config/strings';
import './Sidebar.scss';

const Sidebar = React.memo(
  ({ selectedItem, rootDirectoryData, onSelectItem, onGoToDirectory }) => {
    const [directoryData, updateDirectoryData] = useState([]);
    useEffect(() => updateDirectoryData(rootDirectoryData), []);

    const SideNavbarItem = ({ item }) => (
      <div
        className={`Explorer-sidebar-item${
          selectedItem === item.id ? ' Explorer-item-selected' : ''
        }`}
        onClick={() => onGoToDirectory(item.id) || onSelectItem(item.id)}
      >
        <span>
          <FiHardDrive />
        </span>
        <span>{item.name}</span>
      </div>
    );

    return (
      <div className="Explorer-sidebar">
        <div
          className={`Explorer-sidebar-item${
            selectedItem === '_root' ? ' Explorer-item-selected' : ''
          }`}
          onClick={() => onGoToDirectory('_root') || onSelectItem('_root')}
        >
          <span>
            <MdDesktopWindows />
          </span>
          <span>{Strings.PC_FILESYSTEM_ROOT_NAME}</span>
        </div>
        <div className="Explorer-sidebar-item-subitems">
          {directoryData.map((item) => (
            <SideNavbarItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.selectedItem === nextProps.selectedItem
);

export default Sidebar;
