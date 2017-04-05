import React, { Component } from 'react';
import ProfileOwn from './ProfileOwn';
import ProfileView from './ProfileView';
import ProfileUnauth from './ProfileUnauth';
import { connect } from 'react-redux';

class Profile extends Component {

  renderComponent() {
    if(!this.props.username) {
      return <ProfileUnauth viewUsername={this.props.params.username}/>
    } else if(this.props.params.username === this.props.username) {
      return <ProfileOwn /> 
    } else {
      return <ProfileView viewUsername={this.props.params.username}/>
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
