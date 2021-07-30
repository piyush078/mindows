import { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import TitleBar from '../../components/TitleBar/TitleBar';
import './Program.scss';

const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
const leftOffset = w => (windowWidth - w) * .25;
const topOffset = h => (windowHeight - h) * .5;
const defaultHeight = '480px', defaultWidth = '640px';

const Program = (props) => {

  const programRef = useRef(null);
  const { program, initWindowHeight, initWindowWidth } = props;
  const [dimensions, updateDimensions] = useState({
    delta: {
      x: leftOffset(initWindowWidth),
      y: topOffset(initWindowHeight),
      reset: false,
    },
    defaultStyle: {
      height: initWindowHeight || defaultHeight,
      width: initWindowWidth || defaultWidth
    },
    style: {
      height: initWindowHeight || defaultHeight,
      width: initWindowWidth || defaultWidth
    },
    isMaximized: false,
    isMinimized: false,
  });

  const handleDrag = (e, ui) => {
    const { x, y } = dimensions.delta;
    if(!dimensions.isMaximized)
      updateDimensions({ ...dimensions, delta: { x: x + ui.deltaX, y: y + ui.deltaY } });
  };

  const maximize = () => {
    updateDimensions({
      ...dimensions,
      style: {
        top: '0', bottom: '48px', left: '0', right: '0'
      },
      delta: { ...dimensions.delta, reset: true, },
      isMaximized: true,
    });
  };

  const restore = () => {
    console.log('restore');
    updateDimensions({
      ...dimensions,
      style: { ...dimensions.defaultStyle },
      delta: { ...dimensions.delta, reset: false, },
      isMaximized: false,
    });
  };

  return (
    <Draggable
      onDrag={handleDrag}
      handle='.TitleBar'
      bounds='parent'
      nodeRef={programRef}
      position={
        dimensions.delta.reset
          ? { x: 0, y: 0 }
          : null
      }>

      <div className='Program' style={dimensions.style} ref={programRef}>

        <TitleBar 
          _id={'randomString'}
          appId={'fsexplorer'}
          title={'Mindows Explorer'}
          isMaximized={dimensions.isMaximized}
          onMinimize={() => console.log('Minimized')}
          onMaximize={maximize}
          onRestore={restore}
          onTerminate={() => console.log('Terminate')} />
      </div>
    </Draggable>
  );

};

export default Program;