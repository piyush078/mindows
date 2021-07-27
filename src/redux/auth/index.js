import AuthActionTypes from './auth.types';
import {
  checkForStoredUser, saveNewUser, safeguardUser, signInUser
} from './auth.utils';
import { Strings } from '../../data.store';

const initialState = {
  users: null,
  activeUser: null,
  success: false,
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

    case AuthActionTypes.SIGN_IN:
      const { userIndex, password } = action.payload;
      const signInSuccess = signInUser(userIndex, password);
      if(signInSuccess) {
        return { ...state, activeUser: userIndex, success: true };
      } else {
        return { ...state, error: { text: Strings.INCORRECT_PASSWORD, __id: (new Date()).getTime() } };
      }
      
    default:
      return { ...state, users: safeguardUser(state.users) };
  }
};

export default AuthReducer;