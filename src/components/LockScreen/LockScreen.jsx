import { useEffect, useState } from 'react';
import './LockScreen.scss';

const LockScreen = () => {

  const styles = {
    background: 'url(' + (
      process.env.PUBLIC_URL + '"/images/9fa80fd805562a6bc817f01f48b8b93e.jpg") no-repeat center center fixed'),
    backgroundSize: 'cover'
  };

  const onPressEscape = function(event) {
    if(event.key === 'Escape') updateClass('LockScreen');
  }

  useEffect(() => {
    document.addEventListener('keydown', onPressEscape, false);
    return () => document.removeEventListener('keydown', onPressEscape);
  });

  const [currentDateTime, updateCurrentDateTime] = useState((new Date()));
  const [classes, updateClass] = useState('LockScreen');
  setInterval(() => {
    updateCurrentDateTime((new Date()));
  }, 60 * 1000);

  const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
  const title = currentDateTime.getHours() % 12 + ':' + (
    '0' + currentDateTime.getMinutes().toString()).slice(-2);
  const subtitle = currentDateTime.toLocaleDateString('en-UK', dateOptions);

  return (
    <div className={classes}
      style={styles}
      onClick={() => updateClass('LockScreen LockScreenHidden')}>

      <div className='currentTime'>
        <p className='title'>
          {title}
        </p>
        <p className='subtitle'>
          {subtitle}
        </p>
      </div>

    </div>
  );
}

export default LockScreen;