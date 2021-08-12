import React from 'react';
import './Notepad.scss';

const Notepad = (props) => {
  const { updateDocument, createMenubar } = props;
  const menu = createMenubar([
    {
      title: 'File',
      submenu: [
        {
          title: 'Save',
          action: () => console.log('Update document'),
        },
        {
          title: 'Exit',
          action: () => console.log('Terminate program'),
        },
      ],
    },
    {
      title: 'View',
      submenu: [
        {
          title: 'Word Wrap',
          action: () => console.log('Word Wrap'),
        },
      ],
    },
  ]);

  return (
    <div className="Notepad">
      {menu}
      <textarea className="Notepad-content" />
    </div>
  );
};

export default Notepad;
