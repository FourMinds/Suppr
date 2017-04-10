import React, { Component } from 'react';
import { Link } from 'react-router';
import AuthorTile from '../view-recipe/AuthorTile';

class RecipeCard extends Component {
  render() {
    const {username, id, name, difficulty, cook_time, prep_time, servings, image, description} = this.props.recipe;
    const recipeLink = `/recipe/${id}`;

    return (
      <div className="card" style={{width: '19em'}}>
        <a href={recipeLink}><img className="card-img-top" src={image} alt="Card img cap" /></a>
        <div className="card-block">
          <a href={recipeLink}><h5>{name}</h5></a>
          <p className="card-text">{description}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><div className='flex-body'><img className="recipe-stats-icon" src="/assets/prep.png"/>Prep: {prep_time}</div>  |  <div className='flex-body'><img className="recipe-stats-icon" src="/assets/pot.png"/>Cook: {cook_time}</div> </li>
        </ul>
        <div className="card-block">
          <AuthorTile username={username} />
        </div>
      </div>
    )
  }
}

export default RecipeCard;
