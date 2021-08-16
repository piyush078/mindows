import React, { useEffect, useRef, useState } from 'react';
import './Notepad.scss';

const STORENAME = 'documents';
const formMenubarItems = (onSave, onExit, wordWrap, onWordWrap) => [
  {
    title: 'File',
    submenu: [
      { title: 'Save', action: onSave },
      { title: 'Exit', action: onExit },
    ],
  },
  {
    title: 'View',
    submenu: [{ title: 'Word Wrap', toggleValue: wordWrap, action: onWordWrap }],
  },
];

const Notepad = (props) => {
  const { docId, onTerminate, updateProgramData, getProgramData, createMenubar } = props;
  const textRef = useRef(null);
  const [text, updateText] = useState('');
  const onExit = onTerminate;
  const [wordWrap, onToggleWordWrap] = useState(false);
  const style = { whiteSpace: wordWrap ? 'nowrap' : 'pre-wrap' };

  const onSave = () => {
    const data = {
      id: docId,
      content: textRef.current.value,
    };
    updateProgramData(STORENAME, data);
  };

  // get text from storage
  useEffect(() => {
    if (docId) {
      getProgramData(STORENAME, docId, (res) => updateText(res.data?.content || ''));
    }
  }, []);

  const menu = createMenubar(
    formMenubarItems(onSave, onExit, wordWrap, () => onToggleWordWrap(!wordWrap))
  );

  return (
    <div className="Notepad">
      {menu}
      <div className="Notepad-content">
        <textarea
          className="Notepad-content-textarea"
          style={style}
          ref={textRef}
          defaultValue={text}
        />
      </div>
    </div>
  );
};

export default Notepad;
