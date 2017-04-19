import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as actions from '../../actions';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  componentDidMount() {
    setTimeout(_ => browserHistory.push('/'), 2000);
  }

  render() {
    return (
      <div className="flex-body-auth signout">
        <h5 className="auth-title">You've signed out!</h5>
        <h3>You will be redirected to the main page in three seconds.</h3>
      </div>
    );
  }
}

export default connect(null, actions);