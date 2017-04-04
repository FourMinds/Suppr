import React, { Component } from 'react';
import ProfileOwn from './ProfileOwn';
import ProfileView from './ProfileView';
import { connect } from 'react-redux';

class Profile extends Component {
  render() {
    return (
      <div>
        {this.props.params.username === this.props.username && <ProfileOwn />}
        {this.props.params.username !== this.props.username && <ProfileView />}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { username: state.auth.username }
}

export default connect(mapStateToProps)(Profile);
