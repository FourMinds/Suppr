import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class RecipeInfo extends Component {

  renderIngredients(ingredients) {
   if(ingredients){
     var quantities = ingredients.quantity;
     var items = ingredients.items;
     var lines = []
     for(var i = 0; i < quantities.length; i++){
       lines.push(<div className='flex-body' ><div><img className='emptyCheck' src="/assets/oval.png"/></div><div className='ingredientItem' key={i}> {quantities[i]}  | {items[i]}</div><br/></div>)
     }
     return lines.map((line) => line)
   }
  }

  renderInstructions(instructions) {
    if(instructions){
      var instructionsArr = instructions.split('\n');
      console.log(instructionsArr);

      return instructionsArr.map((instruct) => { return <div><p>{instruct}</p><br/></div> });
    }
  }
  render() {
    const {instructions, ingredients, prepTime, cookTime} = this.props.recipe ? this.props.recipe:''
    return (
      <div className='flex-body'>
       <div className='ingredientStyles'>
        <div className='ingredientTitle' >Ingredients:<br/></div>
        <hr/>
        {this.renderIngredients(ingredients)}
       </div>
       <div className='instructionsStyles'>
       <div className='instructionsTitle' >Instructions:<br/></div>
       <hr/>
       {this.renderInstructions(instructions)}
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
