import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import RootComponent from './containers/Root/Root.component';

const routes = (
  <Provider store={store}>
    <BrowserRouter>
      <Route component={ RootComponent } />
    </BrowserRouter>
  </Provider>
);

export default routes;
