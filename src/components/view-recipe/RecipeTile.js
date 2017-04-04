import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class RecipeTile extends Component {
  render() {
    return (
      <div className="card-block">
      <p>Recipe Tile Matt's Work</p>
        <button>Favorite</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

export default connect(null, actions)(RecipeTile);