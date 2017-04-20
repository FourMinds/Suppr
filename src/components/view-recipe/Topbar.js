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
    };

    this.handleFavoriteSubmit = this.handleFavoriteSubmit.bind(this);
  }

  componentDidMount() {
    $('#star').click(function () {
      let divID = '#review';
      $('html, body').animate({
          scrollTop: $(divID).offset().top
      }, 1000);
    });
    if(this.props.username) this.props.getFavorites(this.props.username);
    this.props.getUserInfo(this.props.recipe.username);
    renderStar(0);
  }

  componentWillUpdate(nextProps) {
    if (!_.isEqual(this.props.reviews, nextProps.reviews)) {
      const score = Math.round( ( nextProps.reviews.reduce((acc, val) => { return acc + val.rating;}, 0) / nextProps.reviews.length ) * 10 ) / 10;
      this.setState({ score });
      renderStar(isNaN(score) ? 0 : score);
    }
  }

  handleFavoriteSubmit() {
    if (this.props.selectedVariation) {
      let favorite = {username: this.props.username, recipeId: this.props.selectedVariation.id};
      this.props.postFavorite(favorite);
    } else {
      let favorite = {username: this.props.username, recipeId: this.props.recipe.id};
      this.props.postFavorite(favorite);
    }
    
  }

  renderHeart() {
    let favorited;
    if (this.props.selectedVariation) {
      let favorited = this.props.favorites.data.some(favorite => {
        return favorite.recipe_id === this.props.selectedVariation.id
      });
      const src = favorited ? '/assets/favorited.png' : '/assets/unfavorited.png';
      if (!this.props.username) {
        return <div className="favorite-button" ><img className="favorite-image" src='/assets/unfavorited.png' alt=""/></div>
      }
      return (
        <div className="favorite-button" onClick={this.handleFavoriteSubmit}>
          <img className="favorite-image" src={src} alt=""/>
        </div>
      );
    } else {
      let favorited = this.props.favorites.data.some(favorite => {
        return favorite.recipe_id === this.props.recipe.id
      });
      const src = favorited ? '/assets/favorited.png' : '/assets/unfavorited.png';
      if (!this.props.username) {
        return <div className="favorite-button" ><img className="favorite-image" src='/assets/unfavorited.png' alt=""/></div>
      }
      return (
        <div className="favorite-button" onClick={this.handleFavoriteSubmit}>
          <img className="favorite-image" src={src} alt=""/>
        </div>
      );
    }
  }

  renderBronze() {
    const ribbon3 = (this.props.recipeInfo.favoritesCount > 0) ? '/assets/ribbon3.png' : '/assets/ribbon3-grey.png';
    return (  
      <div className="medal">
        <img src={ribbon3} title="bronze likes"/>
      </div>
    );
  }

  renderSilver() {
    const ribbon2 = (this.props.recipeInfo.favoritesCount > 1) ? '/assets/ribbon2.png' : '/assets/ribbon2-grey.png';
    return (
      <div className="medal">
        <img src={ribbon2} title="silver likes"/>
      </div>
    );
  }

  renderGold() {
    const ribbon1 = (this.props.recipeInfo.favoritesCount > 2) ? '/assets/ribbon1.png' : '/assets/ribbon1-grey.png';
    return (
      <div className="medal">
        <img src={ribbon1} title="gold likes"/>
      </div>
    );
  }

  renderTrophy() {
    const trophy = (this.state.score >= 4 && this.props.reviews.length >= 5) ? '/assets/trophy.png' : '/assets/trophy-grey.png';
    return(
      <div className="medal">
        <img src={trophy} title="well recieved"/>
      </div>
    );
  }

  render () {
    return(
      <div className="topbar-box">
        
        {this.props.username && this.renderHeart()}

        <div className="medals-box">
          {this.renderGold()}
          {this.renderSilver()}
          {this.renderBronze()}
          {this.renderTrophy()}
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
    reviews: state.reviews.data,
    recipeInfo: state.recipeInfo.data,
    selectedVariation: state.recipes.selectedVariation
  };
}

export default connect(mapStateToProps, actions)(Topbar);
