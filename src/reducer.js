import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import user, { getUserEpic, updateUserEpic, addUserStoxEpic, removeUserStoxEpic, updateUserStoxEpic } from './containers/User/User.module';
import stox, { getStoxEpic } from './containers/Stox/Stox.module';
import auth, { loginEpic, signupEpic, removeTokenEpic, setTokenEpic } from './containers/Auth/Auth.module';

export const rootReducer = combineReducers({
  stox,
  auth,
  user,
});

export const rootEpic = combineEpics(
  getStoxEpic,
  loginEpic,
  signupEpic,
  getUserEpic,
  setTokenEpic,
  removeTokenEpic,
  updateUserEpic,
  addUserStoxEpic,
  removeUserStoxEpic,
  updateUserStoxEpic,
)
