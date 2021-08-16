import MemoryActionTypes from './memory.types';

export const startNewProgram = (app, metadata) => ({
  type: MemoryActionTypes.START_NEW_PROGRAM,
  payload: { app, metadata },
});

export const terminateProgram = (pId) => ({
  type: MemoryActionTypes.TERMINATE_PROGRAM,
  payload: pId,
});
