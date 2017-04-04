import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class ProfileView extends Component {
  componentDidMount() {

  }

  render() {
    return <div>This is not my profile
      


    </div>
  }
}

function mapStateToProps(state) {
  return { username: state.auth.username, data: state.recipes.data }
}

export default connect(mapStateToProps, actions)(ProfileView);
