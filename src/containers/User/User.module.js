import { createSelector } from 'reselect';
import 'rxjs';
import { Observable } from 'rxjs';
import { SET_TOKEN } from '../Auth/Auth.module';
import * as userService from '../../services/user.service';
import _ from 'lodash';

const initialState = {
  fetching: false,
  user: {},
};

// ACTION TYPES
export const GET_USER = '[USER] GET_USER';
export const GET_USER_COMPLETE = '[USER] GET_USER_COMPLETE';
export const GET_USER_FAILED = '[USER] GET_USER_FAILED';
export const UPDATE_USER = '[USER] UPDATE_USER';
export const UPDATE_USER_COMPLETE = '[USER] UPDATE_USER_COMPLETE';
export const UPDATE_USER_FAILED = '[USER] UPDATE_USER_COMPLETE';
export const TOGGLE_STOX_USER = '[USER] TOGGLE_STOX_USER';
export const TOGGLE_STOX_USER_COMPLETE = '[USER] TOGGLE_STOX_USER_COMPLETE';
export const REMOVE_STOX_USER = '[USER] REMOVE_STOX_USER';
export const REMOVE_STOX_USER_COMPLETE = '[USER] REMOVE_STOX_USER_COMPLETE';
export const ADD_STOX_USER = '[USER] ADD_STOX_USER';
export const ADD_STOX_USER_COMPLETE = '[USER] ADD_STOX_USER_COMPLETE';
export const UPDATE_STOX_USER = '[USER] UPDATE_STOX_USER';
export const UPDATE_STOX_USER_COMPLETE = '[USER] UPDATE_STOX_USER_COMPLETE';

// ACTIONS
export const getUserAction = () => ({ type: GET_USER });
export const getUserCompleteAction = user => ({ type: GET_USER_COMPLETE, payload: user });
export const getUserFailedAction = () => ({ type: GET_USER_FAILED });
export const updateUserAction = user => ({ type: UPDATE_USER, payload: user });
export const updateUserCompleteAction = user => ({ type: UPDATE_USER_COMPLETE, payload: user });
export const updateUserFailedAction = user => ({ type: UPDATE_USER_FAILED });
export const toggleStoxAction = (stox) => ({ type: TOGGLE_STOX_USER, payload: stox});
export const toggleStoxCompleteAction = (stox) => ({ type: TOGGLE_STOX_USER_COMPLETE, payload: stox});
export const removeStoxAction = (stox) => ({ type: REMOVE_STOX_USER, payload: stox});
export const removeStoxCompleteAction = (stox) => ({ type: REMOVE_STOX_USER_COMPLETE, payload: stox});
export const addStoxAction = (stox) => ({ type: ADD_STOX_USER, payload: stox});
export const addStoxCompleteAction = (stox) => ({ type: ADD_STOX_USER_COMPLETE, payload: stox});
export const updateStoxAction = (stox) => ({ type: UPDATE_STOX_USER, payload: stox});
export const updateStoxCompleteAction = (stox) => ({ type: UPDATE_STOX_USER_COMPLETE, payload: stox});

// const findStox = (stoxId, allStox) => {
//   return allStox.find(({_id}) => _id === stoxId) || {};
// }
//
// const userHasStox = (stoxId, userStox) => {
//   return userStox.some(({_id}) => _id === stoxId);
// }
//
// const removeStox = (stoxId, allStox) => {
//   return allStox.filter(({_id}) => _id !== stoxId);
// }
//
// const addStoxToUser = (user, stox) => {
//   return Object.assign({}, user, { stox });
// }
//
// const toggleStox = (stoxId, user, allStox) => {
//   const stox = findStox(stoxId, allStox);
//   const stoxExists = userHasStox(stoxId, user.stox);
//   const userStox = stoxExists ? removeStox(stoxId, user.stox) : [ ...user.stox, stox ];
//   const updatedUser = addStoxToUser(user, userStox);
//
//   return updatedUser;
// }


// EPICS
export const getUserEpic = (action$, {getState}) =>
  action$
    .ofType(SET_TOKEN, GET_USER, UPDATE_USER_COMPLETE, REMOVE_STOX_USER_COMPLETE, ADD_STOX_USER_COMPLETE)
    .switchMap((action) => {
      return Observable.ajax({
        url: `${process.env.REACT_APP_PUBLIC_URL}/api/user/me`,
        responseType: 'json',
        headers: { Authorization: `bearer ${getState().auth.token}` }
      })
        .map(({ response }) => getUserCompleteAction(response))
        .catch(() => Observable.of(getUserFailedAction()))
    })

export const updateUserEpic = (action$, {getState}) =>
  action$
    .ofType(UPDATE_USER)
    .switchMap((action) => {
      return Observable.from(userService.update(getState().auth.token, action.payload))
        .map(({ response }) => updateUserCompleteAction(response))
        .catch(() => Observable.of(updateUserFailedAction()))
    })

export const addUserStoxEpic = (action$, {getState}) =>
  action$
    .ofType(ADD_STOX_USER)
    .switchMap((action) =>
      Observable.from(userService.addUserStox(getState().auth.token, {data: action.payload}))
        .map(({data}) => addStoxCompleteAction()))

export const removeUserStoxEpic = (action$, {getState}) =>
  action$
    .ofType(REMOVE_STOX_USER)
    .switchMap((action) =>
      Observable.from(userService.removeUserStox(getState().auth.token, action.payload))
        .map(({data}) => removeStoxCompleteAction()))

export const updateUserStoxEpic = (action$, {getState}) =>
  action$
    .ofType(UPDATE_STOX_USER)
    .switchMap((action) =>
      Observable.from(userService.updateUserStox(getState().auth.token, action.payload))
        .map(({data}) => updateStoxCompleteAction()))

// SELECTORS
const userState = (state) => state.user;
export const getUser = createSelector(userState, state => state.user);
export const getUserStox = createSelector(userState, state => state.user.stox);
export const getUserId = createSelector(userState, state => state.user._id);
export const getUserEmail = createSelector(userState, state => state.user.email);

// REDUCER
export default (state = initialState, action) => {
  switch (action.type) {
    case (GET_USER):
      return Object.assign({}, state, { fetching: true });
    case (GET_USER_COMPLETE):
      return Object.assign({}, state, { fetching: false, user: action.payload });
    case (GET_USER_FAILED):
      return Object.assign({}, state, { fetching: false, user: {} });
    case (UPDATE_USER):
      return Object.assign({}, state, { fetching: true });
    case (UPDATE_USER_COMPLETE):
      return Object.assign({}, state, { fetching: false });
    case (UPDATE_USER_FAILED):
      return Object.assign({}, state, { fetching: false });
    case (TOGGLE_STOX_USER):
      return Object.assign({}, state, { fetching: true });
    case (TOGGLE_STOX_USER_COMPLETE):
      return Object.assign({}, state, { fetching: true });
    case (ADD_STOX_USER):
      return Object.assign({}, state, { fetching: true });
    case (ADD_STOX_USER_COMPLETE):
      return Object.assign({}, state, { fetching: false });
    case (REMOVE_STOX_USER):
      return Object.assign({}, state, { fetching: true });
    case (REMOVE_STOX_USER_COMPLETE):
      return Object.assign({}, state, { fetching: false });
    case (UPDATE_STOX_USER):
      return Object.assign({}, state, { fetching: true });
    case (UPDATE_STOX_USER_COMPLETE):
      return Object.assign({}, state, { fetching: false });
    default:
      return state;
  }
}
