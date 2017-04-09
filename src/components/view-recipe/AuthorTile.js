import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router';

class AuthorTile extends Component {
  componentWillMount() {
    this.props.getUserInfo(this.props.username)
  }

  renderInfo() {
    const { username, info } = this.props;
    if(info[username]) {
      const {favoritesCount, followersCount, followsCount, recipesCount} = info[username]
      return (
        <p>recipes:{recipesCount}, followers:{followersCount}, following:{followsCount}, favorites: {favoritesCount}</p>
      )
    }
  }
  render() {
    const {username} = this.props
    const profileLink = `/profile/${username}`
    return (
      <Link to={profileLink}><div className="author-box">
        <img className="profile-img" src="http://orig01.deviantart.net/aa15/f/2014/203/d/1/profile_picture_by_dogeshibee-d7rthy6.jpg" alt="profile" />
        <div className="profile-stats-box">
          <h5>{username}</h5>
          {this.renderInfo()}
        </div>
      </div></Link>
    )
  }
}

function mapStateToProps(state) {
  return {info: state.userInfo}
}
  


export default connect(mapStateToProps, actions)(AuthorTile);