import MemoryActionTypes from './memory.types';
import {
  loadProgram,
  removeAppInstance,
  removeProgram,
  updateAppsInstances,
  updateProgramsData,
} from './memory.utils';

const initialState = {
  appsInstances: {},
  programsData: {},
};

const MemoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case MemoryActionTypes.START_NEW_PROGRAM: {
      const newProgram = loadProgram(action.payload);
      return {
        ...state,
        programsData: updateProgramsData(state.programsData, newProgram),
        appsInstances: updateAppsInstances(state.appsInstances, newProgram),
      };
    }

    case MemoryActionTypes.TERMINATE_PROGRAM: {
      const pId = action.payload;
      const { id } = state.programsData[pId];
      return {
        ...state,
        programsData: removeProgram(state.programsData, pId),
        appsInstances: removeAppInstance(state.appsInstances, id, pId),
      };
    }

    default:
      return state;
  }
};

export default MemoryReducer;
