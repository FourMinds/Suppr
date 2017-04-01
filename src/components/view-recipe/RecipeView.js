import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Reviews from './Reviews';

class RecipeView extends Component {
  componentWillMount() {
    this.props.getRecipeById(this.props.params.id)
  }
  render() {
    const { id, recipeName, imageUrl, difficulty, cookTime, prepTime, servings, instructions, description } = this.props.recipe?this.props.recipe:''
    console.log(this.props.recipe)
    return (
      <div>
        {recipeName}
        <Reviews />
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    recipe: state.recipes.selectedRecipe
  }
}
export default connect(mapStateToProps, actions)(RecipeView);