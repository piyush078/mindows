import { useEffect, useState } from 'react';
import {
  subscribeClock, unsubscribeClock, formatDateTime, addKeyListener, removeKeyListener,
} from '../../app.util';
import './LockCover.scss';

const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
const timeOptions = { hour12: true, hour: 'numeric', minute: '2-digit' };

const LockCover = ({ background, onDoneLoading }) => {

  const [classes, updateClass] = useState('LockCover');
  const [opacity, updateOpacity] = useState(0);
  const styles = {backgroundImage: 'url(' + process.env.PUBLIC_URL + '"/images/' + background + '")' };

  // add escape key event listener
  const onPressEscape = function(event) {
    if(event.key === 'Escape') updateClass('LockCover');
  };

  useEffect(() => {
    addKeyListener(onPressEscape);
    setTimeout(() => updateOpacity(1), 1500);
    return () => removeKeyListener(onPressEscape);
  }, []);

  // set time interval for current time clock
  useEffect(() => {
    const clockRef = subscribeClock(updateCurrentDateTime);
    return () => unsubscribeClock(clockRef);
  }, []);

  useEffect(() => opacity && onDoneLoading(true), [opacity]);

  const [currentDateTime, updateCurrentDateTime] = useState(new Date());
  const dateTimeFormat = formatDateTime(currentDateTime, dateOptions, timeOptions);
  
  return (
    <div className={classes} style={{...styles, opacity: opacity}}
      onClick={() => updateClass('LockCover LockCoverHidden')}>

      <div className='currentTime'>
        <p className='title'>{dateTimeFormat.time}</p>
        <p className='subtitle'>{dateTimeFormat.date}</p>
      </div>

    </div>
  );
}

export default LockCover;