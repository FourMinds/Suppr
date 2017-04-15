import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import AuthorTile from '../AuthorTile';
import RecipeStats from './RecipeStats';
// import _ from 'lodash';


class RecipeTile extends Component {

  render() {
    // console.log(this.state.score)
    const { recipeName, imageUrl } = this.props.recipe;
    const url=`url("${imageUrl}")`
    return (
      <div className="flex-body">
        <div className="food-img" style={{backgroundImage:url}}>


        </div>
        <div className="recipe-header-container">

          <div className="recipe-title-box">
            <h6>{recipeName}</h6>
          </div>

          <AuthorTile username={this.props.recipe.username} />
          
          <RecipeStats />

        </div>
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return {
    recipe: state.recipes.selectedRecipe,
    username: state.auth.username,
    favorites: state.favorites,
    reviews: state.reviews.data
  }
}

export default connect(mapStatetoProps, actions)(RecipeTile)
  