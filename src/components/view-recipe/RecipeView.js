import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import ShowRecipe from './ShowRecipe'
import ShowVariation from './ShowVariation'
import Sidebar from './Sidebar';

class RecipeView extends Component {
  componentWillMount() {
    this.props.getRecipeById(this.props.params.id);
    this.props.getVariations(this.props.params.id);
  }

  render() {
    const { id, recipeName, imageUrl, difficulty, cookTime, prepTime, servings, instructions, description, ingredients, tags, username} = this.props.recipe?this.props.recipe:'';
    return (
      <div id="recipe-view" className="recipe-view-margin">
        <Sidebar />
        {this.props.selectedVariation &&<ShowVariation />}
        {!this.props.selectedVariation &&<ShowRecipe />}
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    recipe: state.recipes.selectedRecipe,
    username: state.auth.username,
    variations: state.recipes.variations,
    selectedVariation: state.recipes.selectedVariation
  }
}
export default connect(mapStateToProps, actions)(RecipeView);
