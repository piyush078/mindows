import React from 'react';
import {
  VscChromeClose, VscChromeMinimize, VscChromeMaximize, VscChromeRestore
} from 'react-icons/vsc';
import { AppIcons } from '../../data.store';
import './TitleBar.scss';

const TitleBar = React.memo(({
  _id,
  appId,
  title,
  isMaximized,
  onMinimize,
  onMaximize,
  onRestore,
  onTerminate
}) => {
  return (
    <div className={'TitleBar TitleBar__' + _id.toString()}>
      <div className='TitleBar-details'>
        <div className='TitleBar-details-logo'>
          {AppIcons[appId]()}
        </div>
        <div className='TitleBar-details-title'>
          {title}
        </div>
      </div>
      <div className='TitleBar-buttons'>
        <div className='TitleBar-buttons-minimize'>
          <VscChromeMinimize onClick={onMinimize} />
        </div>
        <div className='TitleBar-buttons-maximize'>
          {
            isMaximized
              ? <VscChromeRestore onClick={onRestore} />
              : <VscChromeMaximize onClick={onMaximize} />
          }
        </div>
        <div className='TitleBar-buttons-close'>
          <VscChromeClose onClick={onTerminate} />
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => (
  prevProps.isMaximized === nextProps.isMaximized
));

export default TitleBar;