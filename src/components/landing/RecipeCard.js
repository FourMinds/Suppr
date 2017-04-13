import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import AuthorTile from '../view-recipe/AuthorTile';

class RecipeCard extends Component {
  render() {
    const {username, id, parent_id, name, cook_time, prep_time, image, description} = this.props.recipe;
    const recipeLink = !parent_id ? `/recipe/${id}` : `/recipe/${parent_id}/${id}`;

    return (
      <div className="card" style={{width: '19em'}}>
        <a href={recipeLink}><img className="card-img-top" src={image} alt="Card img cap" style={{width:'100%'}}/></a>
        <div className="card-block">
          <a href={recipeLink}><h5>{name}</h5></a>
          {parent_id && <p>this is a spork</p>}
          <p className="card-text">{description}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><div className='flex-body'><img className="recipe-stats-icon" src="/assets/prep.png" alt=""/>Prep: {prep_time}</div>  |  <div className='flex-body'><img className="recipe-stats-icon" src="/assets/pot.png" alt=""/>Cook: {cook_time}</div> </li>
        </ul>
        <div className="card-block">
          <AuthorTile username={username} />
        </div>
      </div>
    )
  }
}

export default connect(null, actions)(RecipeCard);
