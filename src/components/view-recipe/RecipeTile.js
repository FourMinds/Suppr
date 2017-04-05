import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class RecipeTile extends Component {
  constructor(props) {
    super(props);

    this.handleFavoriteSubmit = this.handleFavoriteSubmit.bind(this);
  }

  componentWillMount() {
    this.props.getFavorites(this.props.username);
  }

  handleFavoriteSubmit() {
    let favorite = {username: this.props.username, recipeId: this.props.recipe.id};
    this.props.postFavorite(favorite);
  }

  render() {
    console.log('THESE ARE THE FAVORITES: ', this.props.favorites.data);
    let favorited = this.props.favorites.data ? this.props.favorites.data.reduce((result, favorite) => {
      if (favorite.recipe_id === this.props.recipe.id) {
        result = true;
      }
      return result;
    }, false) : false;
    return (
      <div className="card-block">
      <p>Recipe Tile Matt's Work</p>
        <button
          className={favorited ? "btn btn-warning btn-sm" : "btn btn-success"}
          onClick={this.handleFavoriteSubmit}>
          {favorited ? "Unfavorite" : "Favorite"}
          </button>
        {favorited
        ? <p id="fadeout-text">Favorited!</p>
        : null}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    username: state.auth.username,
    recipe: state.recipes.selectedRecipe,
    favorites: state.favorites
  }
}

export default connect(mapStateToProps, actions)(RecipeTile);
