import MemoryActionTypes from './memory.types';

const initialState = {
  programs: [],
  programData: {}
};

const MemoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case MemoryActionTypes.START_NEW_PROGRAM:
      
    default:
      return state;
  }
};

export default BootReducer;