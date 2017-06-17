import React, { Component } from 'react';
import { connect } from 'react-redux';
import './User.style.css';
import * as userModule from './User.module';
import UserStox from '../../components/UserStox';

class User extends Component {
  render() {
    return (
      <div className="user-stox-wrapper">
        {this.props.stox &&
          this.props.stox.map((s) => <UserStox key={s._id} {...s} removeStox={s => this.props.removeStox(s)} />)}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  email: userModule.getUserEmail(state),
  stox: userModule.getUserStox(state),
  id: userModule.getUserId(state),
})

const mapDispatchToProps = (dispatch, getState) => ({
  removeStox: (stox) => dispatch(userModule.removeStoxAction(stox))
})

export default connect(mapStateToProps, mapDispatchToProps)(User);
