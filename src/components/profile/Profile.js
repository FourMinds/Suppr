import React, { Component } from 'react';
import ProfileOwn from './profile-own/ProfileOwn';
import ProfileView from './ProfileView';
import { connect } from 'react-redux';

class Profile extends Component {

  renderComponent() {
    if(!this.props.username) {
      return <div></div>
    } else if(this.props.params.username === this.props.username) {
      return <ProfileOwn /> 
    } else {
      return <ProfileView username={this.props.params.username}/>
    }
  }

  render() {
    return (
      <div>
        {this.renderComponent()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { username: state.auth.username }
}

export default connect(mapStateToProps)(Profile);
