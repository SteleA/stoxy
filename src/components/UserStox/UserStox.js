import React, { Component } from 'react';
import './UserStox.css';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSettings: false,
    }
  }

  render() {
    return (
      <div className="user-stox">
        <div>{this.props.data.name}</div>
        <div>${this.props.data.lastPrice}</div>

        <div className="remove" onClick={() => this.props.removeStox(this.props._id)}>X</div>
        <div className="settings" onClick={() => this.setState({showSettings: !this.state.showSettings})}>Settings</div>

        {this.state.showSettings && <div>
          <div><input className="buy-date" type="date" value={this.props.buyDate} /></div>
          <div className="buy-price"><input placeholder="Buy"/></div>
          <div className="sell-price"><input placeholder="Sell"/></div>
        </div>}
      </div>
    )
  }

}
