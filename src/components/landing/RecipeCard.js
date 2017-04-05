import React, { Component } from 'react';
import { Link } from 'react-router';

class RecipeCard extends Component {
  render() {
    const {username, id, name, difficulty, cook_time, prep_time, servings, image, description} = this.props.recipe
    const recipeLink = `/recipe/${id}`
    const profileLink = `/profile/${username}`
    return (
      <div className="card">
        <img className="card-img-top" src={image} alt="Card image cap" />
        <div className="card-block">
          <h4 className="card-title">{name}</h4>
          <p className="card-text">{description}</p>
          <p className="card-text">Created by: <Link to={profileLink}>{username}</Link></p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
          <li className="list-group-item">Vestibulum at eros</li>
        </ul>
        <div className="card-block">
          <Link to={recipeLink} className="card-link">View Recipe</Link>
          <a href="#" className="card-link">Another link</a>
        </div>
      </div>
    )
  }
}

export default RecipeCard