import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import RecipeTile from './RecipeTile';
import Reviews from './Reviews';
import RecipeInfo from './RecipeInfo';

class RecipeView extends Component {
  componentWillMount() {
    this.props.getRecipeById(this.props.params.id);
  }
  render() {
    const { id, recipeName, imageUrl, difficulty, cookTime, prepTime, servings, instructions, description, ingredients} = this.props.recipe?this.props.recipe:''

    return (
      <div>
        <RecipeTile />
        <RecipeInfo />
        <Reviews />
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    recipe: state.recipes.selectedRecipe,
    username: state.auth.username
  }
}
export default connect(mapStateToProps, actions)(RecipeView);
