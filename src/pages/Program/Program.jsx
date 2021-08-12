import React, { useEffect, useRef, useState } from 'react';

import Draggable from 'react-draggable';
import { useSelector } from 'react-redux';
import TitleBar from '../../components/TitleBar/TitleBar';
import './Program.scss';

const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
const leftOffset = (w) => (windowWidth - w) * 0.25;
const topOffset = (h) => (windowHeight - h) * 0.5;
const defaultHeight = '480px';
const defaultWidth = '640px';

const ProgramComponent = React.memo(
  ({ component, ...props }) => component(props),
  () => true
);

const Program = React.memo(
  (props) => {
    const { app } = props;
    const initWindowHeight = app.config?.initWindowHeight || defaultHeight;
    const initWindowWidth = app.config?.initWindowWidth || defaultWidth;
    const programRef = useRef(null);

    // bring the program to foreground on componentDidMount
    useEffect(() => props.onClickWindow(app.pId), []);

    const [dimensions, updateDimensions] = useState({
      delta: {
        x: leftOffset(initWindowWidth),
        y: topOffset(initWindowHeight),
        reset: false,
      },
      defaultStyle: { height: initWindowHeight, width: initWindowWidth },
      style: { height: initWindowHeight, width: initWindowWidth },
      isMaximized: false,
    });

    const handleDrag = (e, ui) => {
      const { x, y } = dimensions.delta;
      if (!dimensions.isMaximized)
        updateDimensions({ ...dimensions, delta: { x: x + ui.deltaX, y: y + ui.deltaY } });
    };

    const maximize = () => {
      updateDimensions({
        ...dimensions,
        style: { top: '0', bottom: '48px', left: '0', right: '0' },
        delta: { ...dimensions.delta, reset: true },
        isMaximized: true,
      });
    };

    const restore = () => {
      updateDimensions({
        ...dimensions,
        style: { ...dimensions.defaultStyle },
        delta: { ...dimensions.delta, reset: false },
        isMaximized: false,
      });
    };

    return (
      <Draggable
        onDrag={handleDrag}
        handle=".TitleBar"
        bounds="parent"
        nodeRef={programRef}
        position={dimensions.delta.reset ? { x: 0, y: 0 } : null}
      >
        <div
          className="Program"
          style={{
            ...dimensions.style,
            zIndex: props.zIndex,
            display: props.isMinimized ? 'none' : 'flex',
          }}
          ref={programRef}
          onClick={() => props.onClickWindow(app.pId)}
        >
          <TitleBar
            app={app}
            programId={app.pId}
            title={app.title}
            isMaximized={dimensions.isMaximized}
            onMinimize={() => props.onMinimize(app.pId)}
            onMaximize={maximize}
            onRestore={restore}
            onTerminate={() => props.onTerminate(app.pId)}
          />

          <div className="Program-component">
            <ProgramComponent component={app.component} onOpenDocument={props.onOpenDocument} />
          </div>
        </div>
      </Draggable>
    );
  },
  (prevProps, nextProps) =>
    // in case minimized state is same, it should be in the background or foreground in prev and new state
    prevProps.isMinimized === nextProps.isMinimized &&
    ((prevProps.zIndex === 'auto' && nextProps.zIndex === 'auto') ||
      (prevProps.zIndex !== 'auto' && nextProps.zIndex !== 'auto'))
);

export default Program;
