import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware, compose } from 'redux';

import { rootReducer, rootEpic } from './reducer';
const epicMiddleware = createEpicMiddleware(rootEpic);

let middleware = [createLogger(), epicMiddleware];
// if (NODE_ENV === 'development') middleware = [...middleware, createLogger()];


const isDevToolsInstalled = window.__REDUX_DEVTOOLS_EXTENSION__;

const composed =
  isDevToolsInstalled ?
    compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__()) :
    compose(applyMiddleware(...middleware));

const configureStore = function configureStore() {
  const store = createStore(
    rootReducer,
    {},
    compose(
      // applyMiddleware(...middleware),
      composed,
    ),
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
      store.replaceReducer(require('./reducer').default);
    });
  }

  return store;
};

const store = configureStore();
export default store;
