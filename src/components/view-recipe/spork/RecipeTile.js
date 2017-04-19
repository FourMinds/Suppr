import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import AuthorTile from '../AuthorTile';
import RecipeStats from './RecipeStats';
import _ from 'lodash';


class RecipeTile extends Component {

  render() {
    const { name, image } = this.props.recipe;
    const url=`url("${image}")`;
    return (
      <div className="flex-body">
        <div className="food-img" style={{backgroundImage:url}}>


        </div>
        <div className="recipe-header-container">
          <div className="recipe-title-box">
            <h6>{name}</h6>
            {/*<img className="rating-img" src="/assets/stars3.png" alt="rating" />*/}
            {/*<h6>{this.state.score}</h6>*/}
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
    recipe: state.recipes.selectedVariation,
    username: state.auth.username,
    favorites: state.favorites,
    reviews: state.reviews.data
  }
}

export default connect(mapStatetoProps, actions)(RecipeTile)
