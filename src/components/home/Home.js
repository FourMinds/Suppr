import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Home extends Component {

  render() {
    return <div>hello</div>
  }
}

function mapStateToProps(state) {
  return { username: state.auth.username };
}

export default connect(mapStateToProps, actions)(Home);