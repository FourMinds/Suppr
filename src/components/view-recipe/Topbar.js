import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {renderStar} from './render-star';
import _ from 'lodash';

class Topbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0
    }

    this.handleFavoriteSubmit = this.handleFavoriteSubmit.bind(this);
  }

  componentDidMount() {
    if(this.props.username) this.props.getFavorites(this.props.username);
    this.props.getUserInfo(this.props.recipe.username)
    renderStar(0);
  }

  componentWillUpdate(nextProps) {
    if (!_.isEqual(this.props.reviews, nextProps.reviews)) {
      const score = Math.round( ( nextProps.reviews.reduce((acc, val) => { return acc + val.rating;}, 0) / nextProps.reviews.length ) * 10 ) / 10;
      this.setState({ score })
      renderStar(score);
    }
  }

  handleFavoriteSubmit() {
    let favorite = {username: this.props.username, recipeId: this.props.recipe.id};
    this.props.postFavorite(favorite);
    // console.log("review obj ---------+--------", this.props.reviews)
  }

  renderHeart() {
    let favorited = this.props.favorites.data.some(favorite => {
      return favorite.recipe_id === this.props.recipe.id
    })
    const src = favorited ? '/assets/favorited.png' : '/assets/unfavorited.png'
    if (!this.props.username) {
      return <div className="favorite-button" ><img className="favorite-image" src='/assets/unfavorited.png' alt=""/></div>
    }
    return (
      <div className="favorite-button" onClick={this.handleFavoriteSubmit}>
        <img className="favorite-image" src={src} alt=""/>
      </div>
    )
  }

  render () {
    return(
      <div className="topbar-box">
        <div>
          {this.renderHeart()}
        </div>
        <div id="star"></div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    recipe: state.recipes.selectedRecipe,
    username: state.auth.username,
    favorites: state.favorites,
    reviews: state.reviews.data
  };
}

export default connect(mapStateToProps, actions)(Topbar);