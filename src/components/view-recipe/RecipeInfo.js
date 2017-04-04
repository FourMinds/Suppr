import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

var ingredientStyles = {
  width: '200px',
  padding: '10px',
  border: '2px solid black',
  margin: '30px'
}

var instructionsStyles = {
  width: '500px',
  height: '500px',
  overflow: 'scroll',
  padding: '10px',
  border: '2px solid black',
  margin: '30px'
}

class RecipeInfo extends Component {

  renderIngredients(ingredients) {
   if(ingredients){
     var quantities = ingredients.quantity;
     var items = ingredients.items;
     var lines = []
     for(var i = 0; i < quantities.length; i++){
       lines.push(<li>{quantities[i]} {items[i]}</li>)
     }
     return lines.map((line) => line)
   }
  }
  render() {
    const {instructions, ingredients} = this.props.recipe ? this.props.recipe:''
    return (
      <div className='flex-body'>
       <div style={ingredientStyles}>
        Ingredients:<br/>
        {this.renderIngredients(ingredients)}
       </div>
       <div style={instructionsStyles}>
       Instructions:<br/>
       {instructions}
       </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    recipe: state.recipes.selectedRecipe
  }
}
export default connect(mapStateToProps, actions)(RecipeInfo);
