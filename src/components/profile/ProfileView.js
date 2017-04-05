import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class ProfileView extends Component {
  componentDidMount() {
    console.log(this.props.username)
    this.props.getRecipesByUsername(this.props.username)
  }

  render() {
    return <div>This is not my profile
      {this.props.data.map(recipe => <div key={recipe.id}>{recipe.name}</div>)}


    </div>
  }
}

function mapStateToProps(state) {
  return { data: state.recipes.userRecipes }
}

export default connect(mapStateToProps, actions)(ProfileView);
