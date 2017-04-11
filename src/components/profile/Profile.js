import React, { Component } from 'react';
import ProfileOwn from './profile-own/ProfileOwn';
import ProfileView from './profile-view/ProfileView';
import ProfileUnauth from './profile-unauth/ProfileUnauth';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Profile extends Component {

  renderComponent() {
    if(!this.props.username) {
      return <ProfileUnauth viewUsername={this.props.params.username}/>
    } else if(this.props.params.username === this.props.username) {
      this.props.getFavorites(this.props.username, true);
      this.props.getFollows(this.props.username);
      this.props.getRecipesByUsername(this.props.username);
      this.props.getVariationsByUsername(this.props.username)
      return <ProfileOwn /> 
    } else {
      this.props.getRecipes();
      this.props.getFavorites(this.props.params.username, false)
      this.props.getRecipesByUsername(this.props.params.username)
      this.props.getVariationsByUsername(this.props.params.username)
      this.props.getFollows(this.props.username)
      this.props.getFollows(this.props.params.username, false)
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

export default connect(mapStateToProps, actions)(Profile);
