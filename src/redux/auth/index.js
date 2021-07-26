import AuthActionTypes from './auth.types';
import { checkForStoredUser, saveNewUser, safeguardUser } from './auth.utils';

const initialState = {
  users: null,
  activeUser: null,
  loading: false,
  error: null
};

const AuthReducer = (state = initialState, action) => {
  switch(action.type) {
    case AuthActionTypes.CHECK_USER_SESSION:
      const users = state.users || checkForStoredUser();
      return { ...state, users: safeguardUser(users) };
    case AuthActionTypes.CREATE_NEW_ACCOUNT:
      const newUsers = saveNewUser(action.payload);
      return { ...state, users: safeguardUser(newUsers) };
    default:
      return { ...state, users: safeguardUser(state.users) };
  }
};

export default AuthReducer;