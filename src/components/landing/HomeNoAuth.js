import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import RecipeCard from './RecipeCard';

class HomeNoAuth extends Component {
  componentWillMount() {
    this.props.getRecipes();
  }

  renderCards() {
    return this.props.data ? this.props.data.map((recipe, i) => <RecipeCard recipe={recipe} key={i}/>) : ''
  }

  render() {
    const cards = this.renderCards.call(this);
    return <div className="card-columns" style={{margin: '0px 20px 10px 20px'}}>
      {cards}
    </div>
  }
}


function mapStateToProps(state) {
  return { data: state.recipes.data };
}


export default connect(mapStateToProps, actions)(HomeNoAuth);