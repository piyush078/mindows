import MemoryActionTypes from './memory.types';
import { loadProgram, updateAppsInstances, updateProgramsData } from './memory.utils';

const initialState = {
  appsInstances: {},
  programsData: {},
};

const MemoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case MemoryActionTypes.START_NEW_PROGRAM:
      const newProgram = loadProgram(action.payload);
      return {
        ...state,
        programsData: updateProgramsData(state.programsData, newProgram),
        appsInstances: updateAppsInstances(state.appsInstances, newProgram)
      };

    default:
      return state;
  }
};

export default MemoryReducer;