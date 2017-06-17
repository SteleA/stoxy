import { createSelector } from 'reselect';
import 'rxjs';
import { Observable } from 'rxjs';

const initialState = {
  fetching: false,
  trend: 'bullish',
  sort: 'lengthOfTrend',
  desc: false,
  stox: [],
};

// ACTION TYPES
export const GET_STOX = '[STOX] GET_STOX';
export const GET_STOX_COMPLETE = '[STOX] GET_STOX_COMPLETE';

// ACTIONS
export const getStoxAction = () => ({ type: GET_STOX });
export const getStoxCompleteAction = stox => ({ type: GET_STOX_COMPLETE, payload: stox });

// EPICS
export const getStoxEpic = (action$, state) =>
  action$
    .ofType(GET_STOX)
    .switchMap(() =>
      Observable.ajax
        .get(`${process.env.REACT_APP_PUBLIC_URL}/api/stox` || 'http://localhost:3000/api/stox')
        .map(({ response }) => getStoxCompleteAction(response))
    )

// SELECTORS
const stoxState = (state) => state.stox;
export const getStox = createSelector(stoxState, state => {
  return state.stox
    .filter(({trend}) => trend === state.trend)
    .sort((a, b) => a[state.sort] - b[state.sort]);
});
export const getLoading = createSelector(stoxState, state => state.fetching)

// REDUCER
export default (state = initialState, action) => {
  switch (action.type) {
    case (GET_STOX):
      return Object.assign({}, state, { fetching: true });
    case (GET_STOX_COMPLETE):
      return Object.assign({}, state, { fetching: false, stox: action.payload });
    default:
      return state;
  }
}
