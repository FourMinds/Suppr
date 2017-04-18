import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class UserStats extends Component {
  componentWillMount() {
    this.props.getUserInfo(this.props.username)
  }

  componentWillUpdate(nextProps) {
    if(!this.props.username && nextProps.username) {
      this.props.getUserInfo(nextProps.username)
    }
  }

  render() {
    const { username } = this.props;
    if(this.props.info[username]) {
      const {favoritesCount, followersCount, followsCount, recipesCount, sporksCount} = this.props.info[username];
      return (
        <div className="author-stats-box profile-stats">
          <div className="inner-box-item"><img className="author-stats-icon" src="/assets/salad.png" alt="Recipes" title="recipes"/>{recipesCount}</div>
          <div className="inner-box-item"><img className="author-stats-icon" src="/assets/spork2.png" alt="Sporks" title="sporks"/>{sporksCount}</div>
          <div className="inner-box-item"><img className="author-stats-icon" src="/assets/follower.png" alt="Followers" title="followers"/>{followersCount}</div>
          <div className="inner-box-item"><img className="author-stats-icon" src="/assets/favorited.png" alt="Favorited count" title="likes"/>{favoritesCount}</div>
        </div>
      )
    } else {
    return <div />
  }
  } 
}

function mapStateToProps(state) {
  return {info: state.userInfo}
}



export default connect(mapStateToProps, actions)(UserStats);
