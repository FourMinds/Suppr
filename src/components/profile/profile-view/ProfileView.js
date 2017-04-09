import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import RecipeCard from '../../landing/RecipeCard';
import FollowTile from './FollowTile';
import { CSSGrid, layout, makeResponsive, measureItems } from 'react-stonecutter';
import $ from 'jquery';

class ProfileView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 0,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    console.log('THE COMPONENT IS MOUNTING');
    this.props.getRecipes();
    this.props.getFavorites(this.props.viewUsername, false)
    this.props.getFollows(this.props.username)
    this.props.getFollows(this.props.viewUsername, false)
    this.props.getRecipesByUsername(this.props.viewUsername)
    $('body').on('click','.tab', function() {
      $('.active').removeClass('active')
      $(this).find('a').addClass('active')
    })
  }

  handleClick(e) {
    this.setState({ page: Number(e.target.name) })
  }

  renderPage() {
    const Grid = makeResponsive(measureItems(CSSGrid, { measureImages: true }), {
      maxWidth: 1920,
      minPadding: 100
    });
    if (this.state.page === 0) {
      return <div>Under Construction... </div>
    }
    if (this.state.page === 1) {
      const cards = this.props.userData.map(recipe => <li><RecipeCard key={recipe.id} recipe={recipe} /></li>)
      return (
        <div className="card-display" style={{paddingTop: '10px', paddingLeft:'5px'}}>
        <Grid
          component="ul"
          columns={5}
          columnWidth={315}
          gutterWidth={5}
          gutterHeight={15}
          layout={layout.pinterest}
          duration={200}
          easing="ease-out"
        >
        {cards}
      </Grid>
      </div>
      )
    }
    if (this.state.page === 2) {
      const {data, favorites} = this.props
      const tiles = favorites.map(recipe => {
        const recipeProp = data.filter(item => item.id === recipe.recipe_id)[0]
        return <li><RecipeCard key={recipeProp.id} recipe={recipeProp} /></li>
      })
      return (
        <div className="card-display" style={{paddingTop: '10px', paddingLeft:'5px'}}>
        <Grid
          component="ul"
          columns={5}
          columnWidth={330}
          gutterWidth={5}
          gutterHeight={15}
          layout={layout.pinterest}
          duration={200}
          easing="ease-out"
        >
        {tiles}
      </Grid>
      </div>
      )
    }
    if (this.state.page === 3) {
      let { follows } = this.props.viewFollows
      return (
        follows.map(user => <div key={Math.random()}><FollowTile user={user}/></div>)
      )
    }
    if (this.state.page === 4) {
      let { followers } = this.props.viewFollows
      return (
        followers.map(user => <div key={Math.random()}><FollowTile user={user}/></div>)
      )
    }
  }

  renderButtonCaption() {
    const { follows } = this.props.followList;
    if (follows && follows.some(follow => follow === this.props.viewUsername)) {
      return 'Unfollow'
    }
    return 'Follow'
  }

  handleFollowButton() {
    this.props.postFollow({ username: this.props.username, followName: this.props.viewUsername })
  }

  render() {
    return (
      <div>
      <span style={{fontSize: '30px'}}>{this.props.viewUsername}</span>
      <button className="btn btn-primary" onClick={this.handleFollowButton.bind(this)}>{this.renderButtonCaption()}</button>
      <ul className="nav nav-tabs">
        <li className="nav-item tab">
          <a className="nav-link active" href="#" name="0" onClick={this.handleClick}>Profile</a>
        </li>
        <li className="nav-item tab" >
          <a className="nav-link" href="#" name="1" onClick={this.handleClick}>Recipes</a>
        </li>
        <li className="nav-item tab">
          <a className="nav-link" href="#" name="2" onClick={this.handleClick}>Favorites</a>
        </li>
        <li className="nav-item tab" >
          <a className="nav-link" href="#" name="3" onClick={this.handleClick}>Following</a>
        </li>
        <li className="nav-item tab" >
          <a className="nav-link" href="#" name="4" onClick={this.handleClick}>Followers</a>
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
  return {
    userData: state.recipes.userRecipes,
    viewFollows: state.follows.dataForUser,
    username: state.auth.username,
    followList: state.follows.data,
    favorites: state.favorites.dataForUser,
    data: state.recipes.data
  }
}

export default connect(mapStateToProps, actions)(ProfileView);
