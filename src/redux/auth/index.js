import AuthActionTypes from './auth.types';
import { checkForStoredUser } from './auth.utils';

const initialState = {
  currentUser: null,
  loading: false,
  error: null
};

const AuthReducer = (state = initialState, action) => {
  switch(action.type) {
    case AuthActionTypes.CHECK_USER_SESSION:
      const user = state.currentUser || checkForStoredUser();
      return { ...state, currentUser: user };
    default:
      return state;
  }
};

export default AuthReducer;