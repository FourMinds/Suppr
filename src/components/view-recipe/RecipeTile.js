import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import AuthorTile from './AuthorTile';
import RecipeStats from './RecipeStats';


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
    const url=`url("${imageUrl}")`
    return (
      <div className="flex-body">
        <div className="image-preview-recipe" style={{backgroundImage:url}}>

          {favorited
            ? (<div className="favorite-button" onClick={this.handleFavoriteSubmit}>
              <img className="favorite-image" src="/assets/favorited.png"/>
            </div>)
            : (<div className="favorite-button" onClick={this.handleFavoriteSubmit}>
              <img className="favorite-image" src="/assets/unfavorited.png"/>
            </div>)}
            
        </div>
        <div className="recipe-header-container">
          <div className="recipe-title-box">
            <h6>{recipeName}</h6>
            <img className="rating-img" src="/assets/stars3.png" alt="rating" />
          </div>

          <AuthorTile username={username} />
          
          <RecipeStats />

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
  