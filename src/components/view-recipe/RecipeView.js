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
    const { id, recipeName, imageUrl, difficulty, cookTime, prepTime, servings, instructions, description, ingredients, tags} = this.props.recipe?this.props.recipe:''
    console.log(tags)
    return (
      <div>
        
        <RecipeTile />
        <div className="tags" style={{display: 'flex',flexFlow: 'row nowrap', justifyContent: 'center'}}>
          <ul>
          {tags?tags.map(tag => <li><a className='tag'>{tag}</a></li>):''}
          </ul>
        </div>
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
