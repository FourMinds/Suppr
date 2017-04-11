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
      const {favoritesCount, followersCount, followsCount, recipesCount} = this.props.info[username]
      return (
        <p>recipes:{recipesCount}, followers:{followersCount}, following:{followsCount}, favorites: {favoritesCount}</p>
      )
    }
  }
  render() {
    const { username } = this.props
    const profileLink = `/profile/${username}`
    return (
      <a href={profileLink}><div className="author-box">
        <img className="profile-img" src="http://i.imgur.com/hfH9CiC.png" alt="profile" />
        <div className="profile-stats-box">
          <h5>{username}</h5>
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
