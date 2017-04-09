import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { CSSGrid, layout, makeResponsive, measureItems } from 'react-stonecutter';
import RecipeCard from './RecipeCard';

class HomeNoAuth extends Component {
  componentWillMount() {
    this.props.getRecipes();
  }

  renderCards() {
    return this.props.data ? this.props.data.map((recipe, i) => <li key={i}><RecipeCard recipe={recipe} key={i}/></li>) : ''
  }

  render() {
    const Grid = makeResponsive(measureItems(CSSGrid, { measureImages: true }), {
      maxWidth: 1920,
      minPadding: 100
    });
    const cards = this.renderCards.call(this);
    return (
      <div className="card-display">
        <Grid
          component="ul"
          columns={5}
          columnWidth={330}
          gutterWidth={5}
          gutterHeight={15}
          layout={layout.pinterest}
          duration={200}
          easing="ease-out"
        >
        {cards}
      </Grid>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return { data: state.recipes.data };
}


export default connect(mapStateToProps, actions)(HomeNoAuth);