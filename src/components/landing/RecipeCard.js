import React, { Component } from 'react';

class RecipeCard extends Component {
  render() {
    const {id, name, difficulty, cook_time, prep_time, servings, image, description} = this.props.recipe
    console.log(this.props.recipe)
    return (
      <div className="card" style={{width: '20rem', flex: '1 1 250px', margin: '5px 10px', maxWidth: '300px'}} >
        <img className="card-img-top" src="http://www.employmentandlaborinsider.com/wp-content/uploads/sites/328/2017/01/San-Francisco.flickrCC.NicolasRaymond-300x200.jpg" alt="Card image cap" />
        <div className="card-block">
          <h4 className="card-title">{name}</h4>
          <p className="card-text">{description}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
          <li className="list-group-item">Vestibulum at eros</li>
        </ul>
        <div className="card-block">
          <a href="#" className="card-link">Card link</a>
          <a href="#" className="card-link">Another link</a>
        </div>
      </div>
    )
  }
}

export default RecipeCard