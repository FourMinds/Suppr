import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import ShowRecipe from './ShowRecipe'
import ShowVariation from './ShowVariation'
import Sidebar from './Sidebar';
import Topbar from './Topbar';

class RecipeView extends Component {
  componentDidMount() {
    this.props.getRecipeById(this.props.params.id);
    this.props.getVariations(this.props.params.id, this.props.params.sporkId);
  }

  render() {
    // if selected variation exists, it's true and we go to the variation
    // otherwise we go to the original recipe
    return (
      <div id="recipe-view" className="recipe-view-margin">
        <Sidebar sporkId={Number(this.props.params.sporkId)} recipe={this.props.recipe}/>
        <Topbar />
        {this.props.selectedVariation &&<ShowVariation/>}
        {!this.props.selectedVariation &&<ShowRecipe/>}
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
