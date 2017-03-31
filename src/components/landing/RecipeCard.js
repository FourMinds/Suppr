import React, { Component } from 'react';
import { Link } from 'react-router';

class RecipeCard extends Component {
  render() {
    const {username, id, name, difficulty, cook_time, prep_time, servings, image, description} = this.props.recipe
    const recipeLink = `/recipe/${id}`
    return (
      <div className="card" style={{width: '20rem', flex: '1 1 250px', margin: '5px 10px', maxWidth: '300px'}} >
        <img className="card-img-top" src="http://www.employmentandlaborinsider.com/wp-content/uploads/sites/328/2017/01/San-Francisco.flickrCC.NicolasRaymond-300x200.jpg" alt="Card image cap" />
        <div className="card-block">
          <h4 className="card-title">{name}</h4>
          <p className="card-text">{description}</p>
          <p className="card-text">Created by: {username}</p>
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