import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import AuthorTile from '../AuthorTile';
import RecipeStats from './RecipeStats';


class RecipeTile extends Component {
  constructor(props) {
    super(props);

    this.handleFavoriteSubmit = this.handleFavoriteSubmit.bind(this);
  }

  componentDidMount() {
    if(this.props.username) this.props.getFavorites(this.props.username);
    this.props.getUserInfo(this.props.recipe.username)
  }

  handleFavoriteSubmit() {
    let favorite = {username: this.props.username, recipeId: this.props.recipe.id};
    this.props.postFavorite(favorite);
    console.log("review obj ---------+--------", this.props.reviews)
  }

  renderHeart() {
    let favorited = this.props.favorites.data.some(favorite => {
      return favorite.recipe_id === this.props.recipe.id
    })
    const src = favorited ? '/assets/favorited.png' : '/assets/unfavorited.png'
    if (!this.props.username) return <div></div>
    return (
      <div className="favorite-button" onClick={this.handleFavoriteSubmit}>
        <img className="favorite-image" src={src} alt=""/>
      </div>
    )
  }

  recipeScore() {
    let score = this.props.reviews.reduce((acc, val) => { return acc + val.rating;}, 0) / this.props.reviews.length
    score = Math.round( score * 10 ) / 10;
    // console.log("SCORE -----+-----", score)

  }

  render() {
    const { recipeName, imageUrl } = this.props.recipe;
    const url=`url("${imageUrl}")`
    return (
      <div className="flex-body">
        {/*{this.recipeScore()}*/}
        <div className="food-img" style={{backgroundImage:url}}>

          {this.renderHeart()}

        </div>
        <div className="recipe-header-container">

          <div className="recipe-title-box">
            <h6>{recipeName}</h6>
            <img className="rating-img" src="/assets/stars3.png" alt="rating" />
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
  