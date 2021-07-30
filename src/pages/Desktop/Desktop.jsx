import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import TaskBar from '../../components/TaskBar/TaskBar';
import StartMenu from '../../components/StartMenu/StartMenu';
import Program from '../Program/Program';
import { InstalledApps } from '../../data.store';
import { selectAccountSettings, selectTaskBarApps } from '../../redux/account/account.selectors';
import { selectActiveUser } from '../../redux/auth/auth.selectors';
import { loadAccount } from '../../redux/account/account.actions';
import { startNewProgram } from '../../redux/memory/memory.action';
import { selectAppsInstances, selectProgramsData } from '../../redux/memory/memory.selectors';
import './Desktop.scss';


const Desktop = ({ activeUser }) => {

  const accountSettings = useSelector(selectAccountSettings);
  const [startMenu, toggleStartMenu] = useState(false);
  const dispatch = useDispatch();
  const programsData = useSelector(selectProgramsData);
  const appsInstances = useSelector(selectAppsInstances);
  const runningPrograms = Object.keys(programsData);
  const [windows, updateWindows] = useState({ maxZIndex: 100, pIds: {} });

  useEffect(() => dispatch(loadAccount(activeUser)), []);

  const style = { backgroundImage: 'url(' + process.env.PUBLIC_URL + '"/images/' + accountSettings.background + '")' };
  const taskbarApps = useSelector(selectTaskBarApps);
  const taskbarAppsData = taskbarApps.map(id => InstalledApps[id]);

  const onClickProgramWindow = pId => {
    const activeWindows = { ...windows.pIds };
    activeWindows[pId] = windows.maxZIndex + 1;
    updateWindows({ maxZIndex: windows.maxZIndex + 1, pIds: activeWindows });
  };

  return (
    <div className='Desktop' style={style}>
      {
        runningPrograms.map((pId) => (
          <Program
            key={pId}
            app={programsData[pId]}
            zIndex={windows.pIds[pId] || 100}
            onClickWindow={e => onClickProgramWindow(pId)} />
        ))
      }

      <StartMenu user={activeUser} hide={!startMenu} />
      <TaskBar
        apps={taskbarAppsData}
        programs={appsInstances}
        onIconClick={app => dispatch(startNewProgram(app))}
        onMindowsClick={() => toggleStartMenu(!startMenu)} />
    </div>
  )

};

export default Desktop;