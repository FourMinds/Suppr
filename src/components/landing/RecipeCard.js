import React, { Component } from 'react';
import AuthorTile from '../view-recipe/AuthorTile';

class RecipeCard extends Component {
  render() {
    const {username, id, parent_id, name, cook_time, prep_time, image, description} = this.props.recipe;
    const recipeLink = parent_id ? `/recipe/${parent_id}/${id}` : `/recipe/${id}`;

    return (
      <div className="card" style={{width: '19em'}}>
        <a href={recipeLink}>
          {parent_id && <img src="/assets/spork.png" className="card-spork"/>}
            <img className="card-img-top" src={image} alt="Card img cap" style={{width:'100%'}}/>
        </a>
        <div className="card-block">
          <a href={recipeLink}><h5>{name}</h5></a>
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

export default RecipeCard;
