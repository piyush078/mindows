import BootActionTypes from './boot.types';
import { getLockScreenBackground, getLoginScreenBackground } from './boot.utils';

const initialState = {
  backgrounds: { lock: null, login: null },
};

const BootReducer = (state = initialState, action) => {
  switch (action.type) {
    case BootActionTypes.GET_BACKGROUNDS: {
      const lockBackground = getLockScreenBackground();
      const loginBackground = getLoginScreenBackground();
      return { ...state, backgrounds: { lock: lockBackground, login: loginBackground } };
    }

    default:
      return state;
  }
};

export default BootReducer;
