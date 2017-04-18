import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {renderStar} from './render-star';
import _ from 'lodash';
import $ from 'jquery';

class Topbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0
    }

    this.handleFavoriteSubmit = this.handleFavoriteSubmit.bind(this);
  }

  componentDidMount() {
    $('#star').click(function () {
      var divID = '#review';
      $('html, body').animate({
          scrollTop: $(divID).offset().top
      }, 1000);
    });
    if(this.props.username) this.props.getFavorites(this.props.username);
    this.props.getUserInfo(this.props.recipe.username)
    renderStar(0);
  }

  componentWillUpdate(nextProps) {
    if (!_.isEqual(this.props.reviews, nextProps.reviews)) {
      const score = Math.round( ( nextProps.reviews.reduce((acc, val) => { return acc + val.rating;}, 0) / nextProps.reviews.length ) * 10 ) / 10;
      this.setState({ score })
      renderStar(isNaN(score) ? 0 : score);
    }
  }

  handleFavoriteSubmit() {
    let favorite = {username: this.props.username, recipeId: this.props.recipe.id};
    this.props.postFavorite(favorite);
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
        
        {this.props.username && this.renderHeart()}
        <div className="medals-box">
        </div>
        <a href="#review"><div id="star"></div></a>
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