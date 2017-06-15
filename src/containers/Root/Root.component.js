import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import store from 'store';
import StoxComponent from '../Stox/Stox.component';
import AuthComponent from '../Auth/Auth.component';
import * as authMethods from '../Auth/Auth.module';

class Root extends Component {
  specifiedRoutes = ['/login'];

  componentDidMount() {
    // run bootstrap
    const token = store.get('token');
    if (token) {
      this.props.setToken(token);
    }
  }

  render() {
    return (
      <Switch>
        <Route path="/login" component={ AuthComponent } />
        <Route path="/" component={ StoxComponent } />
      </Switch>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setToken: token => dispatch(authMethods.setTokenAction(token))
});

export default connect(null, mapDispatchToProps)(Root);
