import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class AuthorTile extends Component {
  componentWillMount() {
    this.props.getUserInfo(this.props.username)
  }

  componentWillUpdate(nextProps) {
    if(!this.props.username && nextProps.username) {
      this.props.getUserInfo(nextProps.username)
    }
  }

  renderInfo() {
    const { username } = this.props;
    if(this.props.info[username]) {
      const {favoritesCount, followersCount, followsCount, recipesCount, sporksCount} = this.props.info[username]
      return (
        <div className="author-stats-box">
          <div><img className="author-stats-icon" src="/assets/salad.png" alt="Recipes" title="recipes"/>{recipesCount}</div>
          <div><img className="author-stats-icon" src="/assets/spork.png" alt="Sporks" title="sporks"/>{sporksCount}</div>
          <div><img className="author-stats-icon" src="/assets/follower.png" alt="Followers" title="followers"/>{followersCount}</div>
          <div><img className="author-stats-icon" src="/assets/favorited.png" alt="Favorited count" title="likes"/>{favoritesCount}</div>
        </div>
      )
    }
  }

  render() {
    const { username } = this.props
    const profileLink = `/profile/${username}`
    return (
      <a href={profileLink}><div className="author-box">
        <div className="profile-img-container">
          <img className="profile-img" src="http://i.imgur.com/hfH9CiC.png" alt="profile" />
        </div>
        <div className="profile-stats-box">
          <div className="author-name">{username}</div>
          {this.renderInfo()}
        </div>
      </div></a>
    )
  }
}

function mapStateToProps(state) {
  return {info: state.userInfo}
}



export default connect(mapStateToProps, actions)(AuthorTile);
