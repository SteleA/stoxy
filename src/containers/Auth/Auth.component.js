import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Auth.style.css';
import * as authModule from './Auth.module';
import { Cell, Textfield, Button } from 'react-mdc-web';
import { Redirect } from 'react-router-dom';

const buttonDivStyle = {
    width: '300px',
    margin: '10px auto',
    display: 'flex',
    justifyContent: 'space-between',
};

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.enterPress = this.enterPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keyup', this.enterPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.enterPress, false);
  }

  enterPress({key}) {
    if (key === 'Enter') {
      this.props.login(this.state.username, this.state.password);
    }
  };

  render() {
    return this.props.token ?
      <Redirect to="/"/> :
      (
        <div className="App">
              <Cell col={6}>{this.props.error}</Cell>
              <Cell col={6}>
                <Textfield
                  style={{width: '300px'}}
                  floatingLabel="Username"
                  value={this.state.username}
                  onChange={({target : {value : username}}) => {
                    this.setState({ username });
                  }}
                />
              </Cell>
              <Cell col={6}>
                <Textfield
                  style={{width: '300px'}}
                  floatingLabel="Password"
                  value={this.state.password}
                  type="password"
                  onChange={({target: {value: password}}) => {
                    this.setState({ password });
                  }}
                />
              </Cell>
              <Cell col={6}>
                <div style={ buttonDivStyle }>
                  <Button
                    onClick={() =>
                      this.props.signup(this.state.username, this.state.password)}
                  >Signup</Button>
                  <Button
                    raised
                    primary
                    onClick={() =>
                      this.props.login(this.state.username, this.state.password)}
                  >Login</Button>
                </div>
              </Cell>
        </div>
      );
  }
}

const mapStateToProps = state => ({
  token: authModule.getToken(state),
  error: authModule.getError(state),
});

const mapDispathToPros = (dispatch) => ({
  login: (username, password) => dispatch(authModule.loginAction(username, password)),
  signup: (username, password) => dispatch(authModule.signupAction(username, password)),
})

export default connect(mapStateToProps, mapDispathToPros)(Auth);
