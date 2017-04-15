import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class AuthorTile extends Component {
  componentWillMount() {
    this.props.getUserInfo(this.props.username)
    this.props.getProfileByUsername(this.props.username)
  }

  componentWillUpdate(nextProps) {
    if(!this.props.username && nextProps.username) {
      this.props.getUserInfo(nextProps.username)
      this.props.getProfileByUsername(nextProps.username)
    }
  }

  renderInfo() {
    const { username } = this.props;
    if(this.props.info[username]) {
      const {favoritesCount, followersCount, followsCount, recipesCount, sporksCount} = this.props.info[username]
      return (
        <div className="author-stats-box">
          <div className="inner-box-item"><img className="author-stats-icon" src="/assets/salad.png" alt="Recipes" title="recipes"/>{recipesCount}</div>
          <div className="inner-box-item"><img className="author-stats-icon" src="/assets/spork.png" alt="Sporks" title="sporks"/>{sporksCount}</div>
          <div className="inner-box-item"><img className="author-stats-icon" src="/assets/follower.png" alt="Followers" title="followers"/>{followersCount}</div>
          <div className="inner-box-item"><img className="author-stats-icon" src="/assets/favorited.png" alt="Favorited count" title="likes"/>{favoritesCount}</div>
        </div>
      )
    }
  }

  getProfilePic() {
    const { username } = this.props;
    if(this.props.profile[username]) {
      return this.props.profile[username].image
    } else {
      return 'https://secure.gravatar.com/avatar/6e9387de9c9dfa657aa9b518d92e6871?d=https%3A//daks2k3a4ib2z.cloudfront.net/img/profile-user.png'
    }
  }

  render() {
    const { username } = this.props
    const profileLink = `/profile/${username}`
    return (
      <div className="author-box">
        <a href={profileLink}>
          <div className="profile-img-container">
            <img className="profile-img" src={this.getProfilePic.call(this)} alt="profile" />
          </div>
        </a>
        <div className="profile-stats-box">
          <a href={profileLink}>
            <div className="author-name">{username}</div>
          </a>
          {this.renderInfo()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {info: state.userInfo, profile: state.profile}
}



export default connect(mapStateToProps, actions)(AuthorTile);
