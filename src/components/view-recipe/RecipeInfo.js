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
       lines.push(<div className='flex-body-ingredients' key={i}><div><img className='empty-check' src="/assets/oval.png"/></div><div className='ingredient-item' > {quantities[i]}  | {items[i]}</div><br/></div>)
     }
     return lines.map((line) => line)
   }
  }

  renderInstructions(instructions) {
    if(instructions){
      var instructionsArr = instructions.split('\n');
      var counter = 0;
      return instructionsArr.map((instruct, i) => {
        if(instruct !== ""){
          counter++;
          return <div className="flex-body-instruction" key={i} ><div className="counter-style">{counter}.</div>
            <div className="instruction-item" >{instruct.trim()}</div><br/></div>
        }
      });
    }
  }
  render() {
    const {instructions, ingredients, prepTime, cookTime} = this.props.recipe ? this.props.recipe:''
    return (
      <div className='flex-body'>
       <div className='ingredient-styles'>
        <div className='ingredient-title' >Ingredients:<br/></div>
        <hr/>
        {this.renderIngredients(ingredients)}
       </div>
       <div className='instructions-styles'>
       <div className='instructions-title' >Instructions:<br/></div>
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
