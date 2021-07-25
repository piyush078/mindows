import AuthActionTypes from './auth.types';
import { checkForStoredUser, saveNewUser } from './auth.utils';

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
      return { ...state, users: users };
    case AuthActionTypes.CREATE_NEW_ACCOUNT:
      const newUsers = saveNewUser(action.payload);
      return { ...state, users: newUsers };
    default:
      return state;
  }
};

export default AuthReducer;