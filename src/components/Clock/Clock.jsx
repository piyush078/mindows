import { useEffect, useState } from 'react';
import { subscribeClock, unsubscribeClock, formatDateTime } from '../../app.util';
import './Clock.scss';

const dateOptions = { weekday: 'short', month: 'long', day: 'numeric' };
const timeOptions = { hour12: true, hour: 'numeric', minute: '2-digit', hour12suffix: true };

const Clock = () => {

  const [currentDateTime, updateCurrentDateTime] = useState(new Date());
  const dateTimeFormat = formatDateTime(currentDateTime, dateOptions, timeOptions);

  // set time interval for current time clock
  useEffect(() => {
    const clockRef = subscribeClock(updateCurrentDateTime);
    return () => unsubscribeClock(clockRef);
  }, []);

  return (
    <div className='Clock'>
      <div className='Clock-time'>{dateTimeFormat.time}</div>
      <div className='Clock-date'>{dateTimeFormat.date}</div>
    </div>
  );
};

export default Clock;