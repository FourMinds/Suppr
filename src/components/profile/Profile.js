import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Profile extends Component {
  componentDidMount() {

  }

  render() {
    console.log(this.props.data)
    return <div>{this.props.params.username}{' is not '}{this.props.username}



    </div>
  }
}

function mapStateToProps(state) {
  return { username: state.auth.username, data: state.recipes.data }
}

export default connect(mapStateToProps, actions)(Profile);
