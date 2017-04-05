import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import RecipeCard from '../../landing/RecipeCard'
import $ from 'jquery';

class ProfileOwn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 0,
    }
    this.handleClick = this.handleClick.bind(this)
  }
  componentWillMount() {
    this.props.getRecipesByUsername(this.props.username)
    $('body').on('click','.tab', function() {
      $('.active').removeClass('active')
      $(this).find('a').addClass('active')
    })
  }

  handleClick(e) {
    this.setState({ page: Number(e.target.name) })
  }

  renderPage() {
    if (this.state.page === 0) {
      return <div>Under Construction... </div>
    }
    if (this.state.page === 1) {
      return (
        <div className="card-columns" style={{margin: '5px 20px 10px 20px'}}>
        {this.props.userData.slice(0,2).map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
        </div>
      )
    }
    if (this.state.page === 2) {
      console.log(this.props.favorites)
      return (
        <div className="card-columns" style={{margin: '5px 20px 10px 20px'}}>
        {this.props.favorites.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
        </div>
      )
    }
    if (this.state.page === 3) {
      return <div>Under Construction... </div>
    }
  }

  render() {
    console.log(this.props.favorites)
    return (
      <div>
      <span style={{fontSize: '30px'}}>{this.props.username}</span>
      <ul className="nav nav-tabs">
        <li className="nav-item tab">
          <a className="nav-link active" href="#" name="0" onClick={this.handleClick}>Profile</a>
        </li>
        <li className="nav-item tab" >
          <a className="nav-link" href="#" name="1" onClick={this.handleClick}>My Recipes</a>
        </li>
        <li className="nav-item tab">
          <a className="nav-link" href="#" name="2" onClick={this.handleClick}>Favorites</a>
        </li>
        <li className="nav-item tab" >
          <a className="nav-link" href="#" name="3" onClick={this.handleClick}>Friends</a>
        </li>
      </ul>
      <div>
      {this.renderPage()}
    </div>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return { username: state.auth.username, userData: state.recipes.userRecipes, favorites: state.favorites.data, data: state.recipes.data  }
}

export default connect(mapStateToProps, actions)(ProfileOwn);
