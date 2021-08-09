import MemoryActionTypes from './memory.types';

export const startNewProgram = (program) => ({
  type: MemoryActionTypes.START_NEW_PROGRAM,
  payload: program,
});

export const terminateProgram = (pId) => ({
  type: MemoryActionTypes.TERMINATE_PROGRAM,
  payload: pId,
});
