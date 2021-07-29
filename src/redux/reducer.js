import { combineReducers } from 'redux';

import AuthReducer from './auth';
import BootReducer from './boot';
import AccountReducer from './account';

const reducer = combineReducers({
  auth: AuthReducer,
  boot: BootReducer,
  account: AccountReducer,
});

export default reducer;