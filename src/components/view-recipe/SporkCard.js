import React, { Component } from 'react';
import AuthorTile from './AuthorTile';

class RecipeCard extends Component {
  render() {
    const {name, image, description, username} = this.props;
    return (
      <div className="card spork-card" style={{width: '19em', margin: '5px'}}>
  <img className="card-img-top" src={image} alt="Card caption" />
  <div className="card-block">
    <h5 className="card-title">{name}</h5>
    <p className="card-text" style={{wordWrap: 'break-word'}}>{description}</p>
  </div>
  <div className="card-block">
    <AuthorTile username={username} />
  </div>
</div>
    )
  }
}

export default RecipeCard;
