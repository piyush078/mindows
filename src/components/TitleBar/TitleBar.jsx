import React from 'react';
import {
  VscChromeClose,
  VscChromeMinimize,
  VscChromeMaximize,
  VscChromeRestore,
} from 'react-icons/vsc';
import './TitleBar.scss';

const TitleBar = React.memo(
  ({ app, programId, title, isMaximized, onMinimize, onMaximize, onRestore, onTerminate }) => (
    <div className={`TitleBar TitleBar__${programId.toString()}`}>
      <div className="TitleBar-details">
        <div className="TitleBar-details-logo">{app.icon()}</div>
        <div className="TitleBar-details-title">{title}</div>
      </div>
      <div className="TitleBar-buttons">
        <div className="TitleBar-buttons-minimize" onClick={onMinimize}>
          <VscChromeMinimize />
        </div>
        <div className="TitleBar-buttons-maximize" onClick={isMaximized ? onRestore : onMaximize}>
          {isMaximized ? <VscChromeRestore /> : <VscChromeMaximize />}
        </div>
        <div className="TitleBar-buttons-close" onClick={onTerminate}>
          <VscChromeClose />
        </div>
      </div>
    </div>
  ),
  (prevProps, nextProps) => prevProps.isMaximized === nextProps.isMaximized
);

export default TitleBar;
