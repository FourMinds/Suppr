import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import RecipeCard from '../../landing/RecipeCard';
import FollowTile from './FollowTile';
import UserStats from '../UserStats';
import Personal from './Personal';
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
    this.props.getRecipes();
    this.props.getProfileByUsername(this.props.viewUsername)
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
      minPadding: 0
    });
    if (this.state.page === 0) {
      return <Personal username={this.props.viewUsername}/>
    }
    if (this.state.page === 1) {
      const cards = this.props.userData.map(recipe => !recipe.parent_id&&<li key={recipe.id}><RecipeCard recipe={recipe} /></li>)
      return (
        <div className="card-display">
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
      const cards = this.props.userData.map(recipe => recipe.parent_id&&<li key={recipe.id}><RecipeCard recipe={recipe} /></li>)
      return (
        <div className="card-display">
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
    if (this.state.page === 3) {
      const {data, favorites} = this.props
      const tiles = favorites.map(recipe => {
        const recipeProp = data.filter(item => item.id === recipe.recipe_id)[0]
        return <li><RecipeCard key={recipeProp.id} recipe={recipeProp} /></li>
      })
      return (
        <div className="card-display">
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
        {tiles}
      </Grid>
      </div>
      )
    }
    if (this.state.page === 4) {
      let { follows } = this.props.viewFollows
      return (
        follows.map((user,i) => <div key={i}><FollowTile user={user}/></div>)
      )
    }
    if (this.state.page === 5) {
      let { followers } = this.props.viewFollows
      return (
        followers.map((user,i) => <div key={i}><FollowTile user={user}/></div>)
      )
    }
  }

  renderButtonCaption() {
    const { follows } = this.props.followList;
    if (follows && follows.some(follow => follow === this.props.viewUsername)) {
      return <span><i className="fa fa-user-plus icon-gap" aria-hidden="true"></i>Unfollow</span>
    }
    return <span><i className="fa fa-user-plus icon-gap" aria-hidden="true"></i>Follow</span>
  }

  handleFollowButton() {
    this.props.postFollow({ username: this.props.username, followName: this.props.viewUsername })
  }

  getProfilePic() {
    const { viewUsername } = this.props;
    if(this.props.profile[viewUsername] && this.props.profile[viewUsername].image) {
      return this.props.profile[viewUsername].image
    } else {
      return 'https://secure.gravatar.com/avatar/6e9387de9c9dfa657aa9b518d92e6871?d=https%3A//daks2k3a4ib2z.cloudfront.net/img/profile-user.png'
    }
  }

  render() {
    return (
      <div>
      <div className="profile-header">
        <span className="profile-title">{this.props.viewUsername}</span>
        <span className="btn-follow" onClick={this.handleFollowButton.bind(this)}>{this.renderButtonCaption()}</span>
      </div>
      <UserStats username={this.props.viewUsername} />
      <div className="profile-top-box">
        <div className="profile-pic">
          <a href="#" className="profile-link">
          <img className="profile-img-top x-large" 
              src={this.getProfilePic()} />
          </a>
        </div>
      </div>
      <ul className="nav profile-bottom">
        <li className="nav-item tab">
          <a className="nav-link active" href="#" name="0" onClick={this.handleClick}>Profile</a>
        </li>
        <li className="nav-item tab" >
          <a className="nav-link" href="#" name="1" onClick={this.handleClick}>Recipes</a>
        </li>
        <li className="nav-item tab" >
          <a className="nav-link" href="#" name="2" onClick={this.handleClick}>Sporks</a>
        </li>
        <li className="nav-item tab">
          <a className="nav-link" href="#" name="3" onClick={this.handleClick}>Favorites</a>
        </li>
        <li className="nav-item tab" >
          <a className="nav-link" href="#" name="4" onClick={this.handleClick}>Following</a>
        </li>
        <li className="nav-item tab" >
          <a className="nav-link" href="#" name="5" onClick={this.handleClick}>Followers</a>
        </li>
      </ul>
      <div>
      <hr className="no-top-margin"/>
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
    data: state.recipes.data,
    profile: state.profile,
  }
}

export default connect(mapStateToProps, actions)(ProfileView);
