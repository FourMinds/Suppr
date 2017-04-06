import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class RecipeTile extends Component {
  constructor(props) {
    super(props);

    this.handleFavoriteSubmit = this.handleFavoriteSubmit.bind(this);
  }

  componentWillMount() {
    this.props.username ? this.props.getFavorites(this.props.username) : null;
  }

  handleFavoriteSubmit() {
    let favorite = {username: this.props.username, recipeId: this.props.recipe.id};
    this.props.postFavorite(favorite);
  }

  render() {
    const { id, recipeName, imageUrl, difficulty, cookTime, prepTime, servings, username } = this.props.recipe;

    let favorited = this.props.favorites.data.some(favorite => {
      return favorite.recipe_id === this.props.recipe.id
    })

    return (
      <div className="flex-body">
        <div className="food-img-container">
          {favorited
            ? (<div className="favorite-button" onClick={this.handleFavoriteSubmit}>
              <img className="favorite-image" src="/assets/favorited.png"/>
            </div>)
            : (<div className="favorite-button" onClick={this.handleFavoriteSubmit}>
              <img className="favorite-image" src="/assets/unfavorited.png"/>
            </div>)}
          <img className="food-img" src={imageUrl} alt="recipe image" />
        </div>
        <div className="recipe-header-container">
          <div className="recipe-title-box">
            <h6>{recipeName}</h6>
            <div className="rating-box">
              <img className="rating-img" src="/assets/stars3.png" alt="rating" />
            </div>
          </div>

          <div className="recipe-author-box">
            <img className="profile-img" src="http://orig01.deviantart.net/aa15/f/2014/203/d/1/profile_picture_by_dogeshibee-d7rthy6.jpg" alt="profile image" />
            <div className="profile-stats-box">
              <h5>{username}</h5>
              <p># of recipes, # of followers</p>
            </div>
          </div>
          
          <div className="recipe-stats-box">
            <div className="recipe-stats-box-row">
              <div><img className="recipe-stats-icon" src="/assets/bowl.png"/> {prepTime} min</div>
              <div><img className="recipe-stats-icon" src="/assets/pot.png"/> {cookTime} min</div>
            </div>
            <div className="recipe-stats-box-row">
              <div><img className="recipe-stats-icon" src="/assets/tray.png"/> {servings} servings</div>
              <div><img className="recipe-stats-icon" src="/assets/chef.png"/> {difficulty} difficulty</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return {
    recipe: state.recipes.selectedRecipe,
    username: state.auth.username,
    favorites: state.favorites
  }
}

export default connect(mapStatetoProps, actions)(RecipeTile)
  