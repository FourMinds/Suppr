import React, { Component } from 'react';
import { Link } from 'react-router';
import AuthorTile from '../view-recipe/AuthorTile';

class RecipeCard extends Component {
  render() {
    const {username, id, name, difficulty, cook_time, prep_time, servings, image, description} = this.props.recipe
    const recipeLink = `/recipe/${id}`
    
    return (
      <div className="card">
        <Link to={recipeLink}><img className="card-img-top" src={image} alt="Card image cap" /></Link>
        <div className="card-block">
          <Link to={recipeLink}><h5>{name}</h5></Link>
          <p className="card-text">{description}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Basic Info</li>
        </ul>
        <div className="card-block">
          <AuthorTile username={username} />
        </div>
      </div>
    )
  }
}

export default RecipeCard