import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import RecipeCard from './RecipeCard';

class HomeNoAuth extends Component {
  componentWillMount() {
    this.props.getRecipes();
  }

  renderCards() {
    return this.props.data ? this.props.data.map(recipe => <RecipeCard recipe={recipe} />) : ''
  }

  render() {
    const cards = this.renderCards.call(this);
    return <div className="flex-card-container">
      {cards}
    </div>
  }
}


function mapStateToProps(state) {
  return { data: state.recipes.data };
}


export default connect(mapStateToProps, actions)(HomeNoAuth);