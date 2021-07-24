import { combineReducers } from 'redux';

import AuthReducer from './auth';
import BootReducer from './boot';

const reducer = combineReducers({
  auth: AuthReducer,
  boot: BootReducer,
});

export default reducer;