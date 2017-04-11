import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

class RecipeInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.doneClick = this.doneClick.bind(this);
  }

  doneClick(event) {
    let index = event.target.name;
    let state = {};
    state[index] = !this.state[index];
    this.setState(state)
  }

  renderIngredients(ingredients) {
   if(ingredients){
     var quantities = ingredients.quantity;
     var items = ingredients.items;
     var lines = []
     for(var i = 0; i < quantities.length; i++){
       if(ingredients[i] !== ""){
         lines.push(<div className='flex-body-ingredients' key={i}>
         <div onClick={this.doneClick} id={i} >
         {this.state[i] ? (<img  className='empty-check' src="/assets/success.png" alt="success" name={i} />) :
         (<img  className='empty-check' src="/assets/oval.png" name={i} alt="oval" />)}
         </div>
         <div className='ingredient-item'  style={{width: '400px'}}>
         <span className='quantity-style'>{quantities[i]}</span>| {items[i]}
         </div>
         </div>)
       }
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
        return undefined;
      });
    }
  }
  render() {
    const { instructions, ingredients } = this.props.recipe ? this.props.recipe:''
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
