import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import RecipeCard from '../landing/RecipeCard';
import { CSSGrid, layout, makeResponsive, measureItems } from 'react-stonecutter';
import $ from 'jquery';

import SporkCard from './SporkCard';


class SporkModal extends Component {
  handleClick(recipe, variation) {
    this.props.selectVariation(recipe.id, variation.id)
    $("#ModalLong .closer").click();
  }


  renderVariations() {
    if (this.props.recipe && this.props.variations && this.props.variations[this.props.recipe.id]) {
      
      return this.props.variations[this.props.recipe.id].map((variation,i) => {
        return (
          <a key={i} 
              onClick={() => this.handleClick.call(this, this.props.recipe, variation)}>
              <SporkCard name={variation.name} image={variation.image} description={variation.description}/>
          </a>
        )
      })
      
    }
  }
  render() {
    const Grid = makeResponsive(measureItems(CSSGrid, { measureImages: true }), {
      maxWidth: 1800,
      minPadding: 0
    });
    const cards = this.renderVariations.call(this)
    return (
      <div className="modal fade bd-example-modal-lg" id="ModalLong" tabIndex="-1" role="dialog" aria-labelledby="ModalLongTitle" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ModalLongTitle">Sporks</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body row spork-columns">
              <div className="col-xs-6" >
                    {cards ? cards.slice(0,Math.ceil(cards.length/2)) : cards}
              </div>
              <div className="col-xs-6" >
                   {cards ? cards.slice(Math.ceil(cards.length/2)) : cards}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary closer" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    username: state.auth.username,
    variations: state.recipes.variations,
    selectedVariation: state.recipes.selectedVariation,
    reviews: state.reviews.data
  };
}

export default connect(mapStateToProps, actions)(SporkModal);