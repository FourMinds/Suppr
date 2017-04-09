import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class RecipeStats extends Component {

  render() {
    const { difficulty, cookTime, prepTime, servings } = this.props.recipe
    return (
      <div className="recipe-stats-box">
        <div className="recipe-stats-box-column">
          <div className="recipe-stats-box-column-row"><img className="recipe-stats-icon" src="/assets/prep.png" alt="prep"/><div>Prep<br />{prepTime} min</div></div>
          <div className="recipe-stats-box-column-row"><img className="recipe-stats-icon" src="/assets/pot.png" alt="pot"/><div>Cook<br />{cookTime} min</div></div>
        </div>
        <div className="recipe-stats-box-column">
          <div className="recipe-stats-box-column-row"><img className="recipe-stats-icon" src="/assets/tray.png" alt="tray"/><div>Serves<br />{servings}</div></div>
          <div className="recipe-stats-box-column-row"><img className="recipe-stats-icon" src="/assets/chef.png" alt="chef"/><div>Skill<br />{difficulty}</div></div>
        </div>
      </div>    
    )
  }
}

function mapStateToProps(state) {
  return {
    recipe: state.recipes.selectedRecipe,
  }
}
  


export default connect(mapStateToProps, actions)(RecipeStats);