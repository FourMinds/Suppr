import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import RecipeTile from './RecipeTile';
import Reviews from './Reviews';
import RecipeInfo from './RecipeInfo';
import Sidebar from './Sidebar';

class RecipeView extends Component {
  componentWillMount() {
    this.props.getRecipeById(this.props.params.id);
    this.props.getVariations(this.props.params.id);
  }

  handleDelete() {
    this.props.deleteRecipe(this.props.recipe.id)
  }

  handleEdit() {
    this.props.pushUpdate(this.props.recipe)
  }

  handleVariation() {
    this.props.pushVariation(this.props.recipe)
  }

  render() {
    console.log(this.props.recipe)
    const { id, recipeName, imageUrl, difficulty, cookTime, prepTime, servings, instructions, description, ingredients, tags, username} = this.props.recipe?this.props.recipe:'';
    console.log(id&&this.props.variations?this.props.variations[id]:null)
    return (
      <div  className="recipe-view-margin">
        <Sidebar />

        <RecipeTile />
        {this.props.username===username &&
          <button className="btn btn-primary" onClick={this.handleDelete.bind(this)}>Delete</button>
        }
        {this.props.username===username &&
          <button className="btn btn-primary" onClick={this.handleEdit.bind(this)}>Edit</button>
        }
        {this.props.username &&
          <button className="btn btn-primary" onClick={this.handleVariation.bind(this)}>Spork this recipe</button>
        }
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
export default connect(mapStateToProps, actions)(RecipeView);
