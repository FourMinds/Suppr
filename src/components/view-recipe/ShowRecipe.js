import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import RecipeTile from './recipe/RecipeTile';
import Reviews from './recipe/Reviews';
import RecipeInfo from './recipe/RecipeInfo';
import { browserHistory } from 'react-router';

class ShowRecipe extends Component {

  componentDidMount() {
    if (this.props.recipe && this.props.recipe.parent_id) {
      browserHistory.push('/error')
    }
  }

  componentDidUpdate(nextProps) {
    if (nextProps.recipe && nextProps.recipe.parent_id) {
      browserHistory.push('/error')
    }
  }

  triggerSearch(tag) {
    this.props.triggerSearch(tag)
  }

  render() {
    const { tags } = this.props.recipe?this.props.recipe:'';
    return (
      <div>

        <RecipeTile />
    
        <RecipeInfo />
        <div className='tags-flex-box-style'>
          <div>
            <ul style={{display: 'flex',flexFlow: 'row wrap', justifyContent: 'flex-start'}}>
              {tags?tags.map((tag, index) => <li style={{ cursor: 'pointer' }} key={index} onClick={()=>this.triggerSearch.call(this, tag)}><a className='tag'>{tag}</a></li>):''}
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