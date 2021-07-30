import { GrWindows } from 'react-icons/gr';
import { VscRss, VscSearch, VscTriangleUp, VscUnmute } from 'react-icons/vsc';
import { FaBatteryFull, FaCommentAlt } from 'react-icons/fa';

import Clock from '../Clock/Clock';
import { Strings } from '../../data.store';
import './TaskBar.scss';


const TaskBar = ({ apps, programs, onIconClick, onMindowsClick }) => {
  return (
    <div className='TaskBar'>
      <div className='TaskBar-left'>
        <div className='TaskBar-mindows-icon' onClick={onMindowsClick}>
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
            <div key={i}
              className='TaskBar-app'
              title={app.name}
              onClick={() => onIconClick(app)}>
              {app.icon()}
              <span>{programs[app.id]?.length || 0}</span>
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