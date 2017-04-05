import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class ProfileOwn extends Component {
  componentWillMount() {
    this.props.getRecipesByUsername(this.props.username)
  }

  render() {
    return <div>this is my profile
    RECIPES!!
    {this.props.data.map(recipe => <div key={recipe.id}>{recipe.name}</div>)}
    </div>
  }
}

function mapStateToProps(state) {
  return { username: state.auth.username, data: state.recipes.userRecipes  }
}

export default connect(mapStateToProps, actions)(ProfileOwn);
