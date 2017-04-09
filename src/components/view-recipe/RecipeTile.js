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

  componentDidMount() {
    this.props.username ? this.props.getFavorites(this.props.username) : null;
    this.props.getUserInfo(this.props.recipe.username)
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
    return (
      <div className="favorite-button" onClick={this.handleFavoriteSubmit}>
        <img className="favorite-image" src={src}/>
      </div>
    )
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

          {this.renderHeart()}

        </div>
        <div className="recipe-header-container">
          <div className="recipe-title-box">
            <h6>{recipeName}</h6>
            <img className="rating-img" src="/assets/stars3.png" alt="rating" />
          </div>

          <AuthorTile username={this.props.recipe.username} />
          
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
  