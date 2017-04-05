import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../actions';


class RecipeTile extends Component {
  render() {
    const { id, recipeName, imageUrl, difficulty, cookTime, prepTime, servings } = this.props.recipe?this.props.recipe:'';
    const { username } = this.props.username?this.props.username:'';
    return (
      <div>
        <div>
          <img src={imageUrl} alt="recipe image" />
        </div>
        <div>
          <div>
            <h2>{name}</h2>
            <img src="/assets/stars3.png" alt="rating" />
          </div>
          <div>
            <img src="http://i.imgur.com/6jr3M0j.png" alt="profile image" />
            <div>
              <p>{username}</p>
              <p># of recipies, # of followers</p>
            </div>
          </div>
          <div>
            <p>{cookTime}</p>
            <p>{prepTime}</p>

            <p>{servings}</p>
            <p>{difficulty}</p>
          </div>
        </div>
      </div>
    )
  }
}


function mapStatetoProps(state) {
  return {
    recipe: state.recipes.selectedRecipe,
    username: state.auth.username
  }
}

export default connect(mapStatetoProps, actions)(RecipeTile)