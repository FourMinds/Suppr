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
    return (
      <div>

        <RecipeTile />
        <RecipeInfo />
        <div className='tags-flex-box-style'>
          <div>
            <ul style={{display: 'flex',flexFlow: 'row wrap', justifyContent: 'flex-start'}}>
              {tags?tags.map(tag => <li ><a className='tag'>{tag}</a></li>):''}
            </ul>
          </div>
        </div>
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
