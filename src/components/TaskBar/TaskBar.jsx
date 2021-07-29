import { GrWindows } from 'react-icons/gr';
import { VscRss, VscSearch, VscTriangleUp, VscUnmute } from 'react-icons/vsc';
import { FaBatteryFull, FaCommentAlt } from 'react-icons/fa';

import { Strings, AppIcons } from '../../data.store';
import Clock from '../Clock/Clock';
import './TaskBar.scss';


const TaskBar = ({
  onMindowsIconClick, apps,
}) => {
  return (
    <div className='TaskBar'>
      <div className='TaskBar-left'>
        <div className='TaskBar-mindows-icon' onClick={onMindowsIconClick}>
          <GrWindows />
        </div>
        <div className='TaskBar-searchbar'>
          <div className='TaskBar-searchbar-pseudo'>
            <VscSearch />
            <span>{Strings.TASKBAR_SEARCH_PLACEHOLDER}</span>
          </div>
          <input type='text' required />
        </div>
        {
          apps.map((app, i) => (
            <div className='TaskBar-app' key={i}>
              {AppIcons[app]()}
            </div>
          ))
        }
      </div>
      <div className='TaskBar-right'>
        <div className='TaskBar-App'><VscTriangleUp /></div>
        <div className='TaskBar-App'><VscRss /></div>
        <div className='TaskBar-App'><FaBatteryFull /></div>
        <div className='TaskBar-App'><VscUnmute /></div>
        <div className='TaskBar-App'><FaCommentAlt /></div>
        <div className='TaskBar-App'><Clock /></div>
        <div className='TaskBar-App'>&nbsp;</div>
      </div>
    </div>
  );
}

export default TaskBar;