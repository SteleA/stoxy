import { createSelector } from 'reselect';
import 'rxjs';
import { Observable } from 'rxjs';
import store from 'store';
import * as authService from '../../services/auth';
import { GET_USER_FAILED } from '../User/User.module'

const initialState = {
  loading: false,
  token: null,
  error: null,
};

// ACTION TYPES
export const LOGIN = '[AUTH] LOGIN';
export const LOGIN_COMPLETE = '[AUTH] LOGIN_COMPLETE';
export const LOGIN_FAILED = '[AUTH] LOGIN_FAILED';
export const SIGNUP = '[AUTH] SIGNUP';
export const SIGNUP_COMPLETE = '[AUTH] SIGNUP_COMPLETE';
export const SIGNUP_FAILED = '[AUTH] SIGNUP_FAILED';
export const SET_TOKEN = '[AUTH] SET_TOKEN';
export const REMOVE_TOKEN = '[AUTH] REMOVE_TOKEN';

// ACTIONS
export const loginAction = (username, password) => ({ type: LOGIN, payload: {username, password} });
export const loginCompleteAction = token => ({ type: LOGIN_COMPLETE, payload: token });
export const loginFailedAction = error => ({ type: LOGIN_FAILED, payload: error  });
export const signupAction = (username, password) => ({ type: SIGNUP, payload: {username, password} });
export const signupCompleteAction = token => ({ type: SIGNUP_COMPLETE, payload: token });
export const signupFailedAction = error => ({ type: SIGNUP_FAILED, payload: error  });
export const setTokenAction = token => ({ type: SET_TOKEN, payload: token });
export const removeTokenAction = () => ({ type: REMOVE_TOKEN });

// EPICS
export const loginEpic = (action$, state) =>
  action$
    .ofType(LOGIN)
    .switchMap(({payload}) =>
      Observable.fromPromise(authService.login(payload.username, payload.password))
        .map(({data}) => loginCompleteAction(data))
        .catch(({response: {data}}) => Observable.of(loginFailedAction(data.message))))

export const signupEpic = (action$, state) =>
  action$
    .ofType(SIGNUP)
    .switchMap(({payload}) =>
      Observable.fromPromise(authService.signup(payload.username, payload.password))
        .map(({data}) => signupCompleteAction(data))
        .catch(({response: {data}}) => Observable.of(loginFailedAction(data.message))))

export const setTokenEpic = (action$, state) =>
  action$
    .ofType(LOGIN_COMPLETE, SIGNUP_COMPLETE)
    .switchMap(({payload}) => Observable.of(setTokenAction(payload)))

export const removeTokenEpic = (action$, state) =>
  action$
    .ofType(LOGIN_FAILED, SIGNUP_FAILED, GET_USER_FAILED)
    .switchMap(({payload}) => Observable.of(removeTokenAction()))

// SELECTORS
const authState = (state) => state.auth;
export const getToken = createSelector(authState, state => state.token);
export const getError = createSelector(authState, state => state.error);

// REDUCER
export default (state = initialState, action) => {
  switch (action.type) {
    case (LOGIN):
      store.clearAll();
      return Object.assign({}, state, { loading: true, error: null });
    case (LOGIN_COMPLETE):
      return Object.assign({}, state, { loading: false, token: action.payload });
    case (LOGIN_FAILED):
      return Object.assign({}, state, { loading: false, token: null, error: action.payload });
    case (SIGNUP):
      store.clearAll();
      return Object.assign({}, state, { loading: true, error: null });
    case (SIGNUP_COMPLETE):
      return Object.assign({}, state, { loading: false, token: action.payload });
    case (SIGNUP_FAILED):
      return Object.assign({}, state, { loading: false, token: null, error: action.payload });
    case (SET_TOKEN):
      store.set('token', action.payload);
      return Object.assign({}, state, { token: action.payload });
    case (REMOVE_TOKEN):
      store.remove('token');
      return Object.assign({}, state, { token: null });

    default:
      return state;
  }
}
