import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import './Stox.style.css';
import * as stoxModule from './Stox.module';
import * as userModule from '../User/User.module';
import Card from '../../components/card';
import Grid from '../../components/grid';
import GridCell from '../../components/grid-cell';
import Loading from '../../components/Loading';
// import Slider from '../../components/slider';
import UserComponent from '../User/User.component';
import { Redirect } from 'react-router-dom';


class Stox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goToLogin: false,
    };
  }
  componentDidMount() {
    this.props.getStox();
  }

  componentDidUpdate() {
  }

  selectStox(stox) {
    const { user } = this.props;
    if (user.stox) {
      this.props.toggleStox(stox._id);
    } else {
      this.setState({ goToLogin: true });
    }
  }

  render() {
    return this.state.goToLogin ? <Redirect to="/login"/> : (
      <div className="App">
        <div className="App-header">
          <h2>Ride the wave</h2>
        </div>
        <UserComponent />
        {this.props.loading && <Loading />}
        {!this.props.loading && <Grid>
          showing {this.props.stox.length}
          {/* <Slider
            step={1}
            min={0}
            max={100}
            value={[1,100]}
            tipFormatter={value => `$${value}`}
            defaultValue={[1,100]}
            onAfterChange={priceRange => {
              debugger
            }}
          /> */}
        </Grid>}
        <Grid>
            {this.props.stox &&
                this.props.stox.map((s) =>
                <GridCell size={3} key={s._id}>
                  <Card
                    title={
                      <div>
                        {s.lengthOfTrend > 0 && <div><strong>{s.percent || 0}%</strong></div>}
                        <span>{s.name} <small style={{fontSize: '14px'}}>({s.ticker})</small></span>
                      </div>
                    }
                    subtitle={`${s.trend}(${s.DIFF}) - ${s.lengthOfTrend} days`}
                    description={
                      <div>
                        <button className="icobutton icobutton--heart" onClick={() => this.selectStox(s)}>
                          <span className="fa fa-heart"></span> x
                        </button>
                        <ul style={{listStyle: 'none', padding: 0}}>
                          <li><strong>${s.lastPrice}</strong></li>
                          {s.lengthOfTrend > 0 && <li>Start: ${s.startPrice[1]} - {moment(s.startPrice[0]).format('YYYY-MM-DD')}</li>}
                          {s.lengthOfTrend > 0 && <li>Max: ${s.maxPrice[1]} - {moment(s.maxPrice[0]).format('YYYY-MM-DD')}</li>}
                          {s.lengthOfTrend > 0 && <li>Min: ${s.minPrice[1]} - {moment(s.minPrice[0]).format('YYYY-MM-DD')}</li>}
                          {s.lengthOfTrend > 0 && <li>Diff: {s.DIFF}</li>}
                          <li><a target="_blank" href={`https://finance.yahoo.com/chart/${s.ticker}`}>Visit</a></li>
                        </ul>
                      </div>

                    }
                  />
                </GridCell>)}

        </Grid>

      </div>
    );
  }
}


const mapStateToProps = state => ({
  stox: stoxModule.getStox(state),
  loading: stoxModule.getLoading(state),
  user: userModule.getUser(state),
});

const mapDispatchToProps = dispatch => ({
  getStox: () => dispatch(stoxModule.getStoxAction()),
  updateUser: user => dispatch(userModule.updateUserAction(user)),
  toggleStox: stox => dispatch(userModule.addStoxAction(stox)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Stox);
