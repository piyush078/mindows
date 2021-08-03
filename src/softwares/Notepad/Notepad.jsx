import React from 'react';
import './Notepad.scss';


const Notepad = (props) => {
  return (
    <div className='Notepad'>
      <textarea className='Notepad-content'></textarea>
    </div>
  )
};


export default Notepad;