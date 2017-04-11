import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import RecipeTile from './recipe/RecipeTile';
import Reviews from './recipe/Reviews';
import RecipeInfo from './recipe/RecipeInfo';

class ShowRecipe extends Component {
  render() {
    const { id, recipeName, imageUrl, difficulty, cookTime, prepTime, servings, instructions, description, ingredients, tags, username} = this.props.recipe?this.props.recipe:'';
    return (
      <div>

        <RecipeTile />
    
        <RecipeInfo />
        <div className='tags-flex-box-style'>
          <div>
            <ul style={{display: 'flex',flexFlow: 'row wrap', justifyContent: 'flex-start'}}>
              {tags?tags.map((tag, index) => <li key={index}><a className='tag'>{tag}</a></li>):''}
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
    username: state.auth.username,
    variations: state.recipes.variations
  }
}

export default connect(mapStateToProps, actions)(ShowRecipe);