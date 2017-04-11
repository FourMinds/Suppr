import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import RecipeTile from './spork/RecipeTile';
import Reviews from './spork/Reviews';
import RecipeInfo from './spork/RecipeInfo';

class ShowVariation extends Component {
  
  render() {
    const { tags } = this.props.selectedVariation?this.props.selectedVariation:'';
    
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
    variations: state.recipes.variations,
    selectedVariation: state.recipes.selectedVariation
  }
}

export default connect(mapStateToProps, actions)(ShowVariation);