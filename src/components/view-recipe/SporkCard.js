import React, { Component } from 'react';
import AuthorTile from './AuthorTile';
import * as actions from '../../actions';
import { connect } from 'react-redux'

class SporkCard extends Component {
  componentWillMount() {
    this.props.getUserInfo(this.props.username);
    this.props.getProfileByUsername(this.props.username)
  }

  render() {
    const {name, image, description, username} = this.props;
    return (
      <div className="card spork-card" style={{width: '19em', margin: '5px'}}>
        <img className="card-img-top" src={image} alt="Card caption" />
        <div className="card-block">
          <h5 className="card-title">{name}</h5>
          <p className="card-text card-nowrap">{description}</p>
        </div>
        <div className="card-block top-border-box" >
          <AuthorTile username={username} />
        </div>
      </div>
    )
  }
}

export default connect(null, actions)(SporkCard);
