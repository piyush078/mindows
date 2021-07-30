import React from 'react';
import {
  VscChromeClose, VscChromeMinimize, VscChromeMaximize, VscChromeRestore
} from 'react-icons/vsc';
import './TitleBar.scss';

const TitleBar = React.memo(({
  app,
  programId,
  title,
  isMaximized,
  onMinimize,
  onMaximize,
  onRestore,
  onTerminate
}) => {

  return (
    <div className={'TitleBar TitleBar__' + programId.toString()}>
      <div className='TitleBar-details'>
        <div className='TitleBar-details-logo'>
          {app.icon()}
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