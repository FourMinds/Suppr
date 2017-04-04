import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class ProfileOwn extends Component {
  componentDidMount() {
    this.props.getRecipesByUsername(this.props.username)
  }

  render() {
    console.log(this.props.data)
    return <div>this is my profile

    </div>
  }
}

function mapStateToProps(state) {
  return { username: state.auth.username, data: state.recipes.userRecipes  }
}

export default connect(mapStateToProps, actions)(ProfileOwn);
