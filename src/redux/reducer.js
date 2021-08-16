import { combineReducers } from 'redux';

import AuthReducer from './auth';
import BootReducer from './boot';
import AccountReducer from './account';
import MemoryReducer from './memory';

const reducer = combineReducers({
  auth: AuthReducer,
  boot: BootReducer,
  account: AccountReducer,
  memory: MemoryReducer,
});

export default reducer;
