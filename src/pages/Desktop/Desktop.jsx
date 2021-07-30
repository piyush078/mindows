import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import TaskBar from '../../components/TaskBar/TaskBar';
import StartMenu from '../../components/StartMenu/StartMenu';
import Program from '../Program/Program';
import { selectAccountSettings, selectTaskBarApps } from '../../redux/account/account.selectors';
import { selectActiveUser } from '../../redux/auth/auth.selectors';
import { loadAccount } from '../../redux/account/account.actions';
import { InstalledApps } from '../../data.store';
import './Desktop.scss';


const Desktop = ({ activeUser }) => {

  const accountSettings = useSelector(selectAccountSettings);
  const [startMenu, toggleStartMenu] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const style = { backgroundImage: 'url(' + process.env.PUBLIC_URL + '"/images/' + accountSettings.background + '")' };
  const taskbarApps = useSelector(selectTaskBarApps);
  const taskbarAppsData = taskbarApps.map(id => InstalledApps[id]);

  useEffect(() => {
    activeUser
      ? dispatch(loadAccount(activeUser))
      : history.push('/');
  }, []);

  return (
    <div className='Desktop' style={style}>
      <Program app={InstalledApps['fsexplorer']} />

      <StartMenu user={activeUser} hide={!startMenu} />
      <TaskBar
        apps={taskbarAppsData}
        onMindowsClick={() => toggleStartMenu(!startMenu)} />
    </div>
  )

};

export default Desktop;