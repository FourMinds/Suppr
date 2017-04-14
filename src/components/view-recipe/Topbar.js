import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {renderStar} from './render-star';

class Topbar extends Component {
  
  componentDidMount() {
    renderStar(4.3);
  }

  render () {
    return(
      <div className="topbar-box">
        <div id="star"></div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {

  };
}

export default connect(null, actions)(Topbar);