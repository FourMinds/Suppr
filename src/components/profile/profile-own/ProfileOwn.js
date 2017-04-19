import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import RecipeCard from '../../landing/RecipeCard';
import FollowTile from './FollowTile';
import UserStats from '../UserStats';
import Personal from './Personal';
import { CSSGrid, layout, makeResponsive, measureItems } from 'react-stonecutter';
import $ from 'jquery';

class ProfileOwn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount() {
    this.props.getProfile(this.props.username);
    this.props.getFavorites(this.props.username, true);
    this.props.getFollows(this.props.username);
    this.props.getRecipesByUsername(this.props.username);
    $('body').on('click','.tab', function() {
      $('.active').removeClass('active');
      $(this).find('a').addClass('active');
    })
  }

  handleClick(e) {
    this.setState({ page: Number(e.target.name) });
  }

  renderPage() {
    const Grid = makeResponsive(measureItems(CSSGrid, { measureImages: true }), {
      maxWidth: 1920,
      minPadding: 0
    });
    if (this.state.page === 0) {
      return <Personal />
    }
    if (this.state.page === 1) {
      const cards = this.props.userData.map(recipe => !recipe.parent_id&&<li key={recipe.id}><RecipeCard  recipe={recipe} /></li>);
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
      );
    }
    if (this.state.page === 2) {
      const cards = this.props.userData.map(recipe => recipe.parent_id&&<li key={recipe.id}><RecipeCard  recipe={recipe} /></li>);
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
      const {data, favorites, variations} = this.props;
      const tiles = favorites.map(recipe => {
        const recipeProp = data.filter(item => item.id === recipe.recipe_id)[0] || 
                          variations.filter(item => item.id === recipe.recipe_id)[0];                    
        return <li key={recipe.id}><RecipeCard key={recipeProp.id} recipe={recipeProp}/></li>
      });
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
        {tiles}
      </Grid>
      </div>
      );
    }
    if (this.state.page === 4) {
      let { follows } = this.props.followList;
      return (
        <div>
        {follows.map((user,i) => <div key={i}><FollowTile user={user}/></div>)}
        </div>
      );
    }
    if (this.state.page === 5) {
      let { followers } = this.props.followList;
      return (
        followers.map((user,i) => <div key={i}><FollowTile user={user}/></div>)
      );
    }
  }

  render() {
    const profilePic = this.props.profile && this.props.profile.image ? this.props.profile.image : "https://secure.gravatar.com/avatar/6e9387de9c9dfa657aa9b518d92e6871?d=https%3A//daks2k3a4ib2z.cloudfront.net/img/profile-user.png";
    return (
      <div>

      <div className="profile-header">
        <span className="profile-title">{this.props.username}</span>
      </div>
      <UserStats username={this.props.username} />
      <div className="profile-top-box">
        <div className="profile-pic">
          <a href="#" className="profile-link">
          <img className="profile-img-top x-large" 
              src={profilePic}
              alt="Profile"/>
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
    username: state.auth.username, 
    userData: state.recipes.userRecipes, 
    favorites: state.favorites.data,
    data: state.recipes.data,
    followList: state.follows.data,
    variations: state.recipes.userVariations,
    profile: state.profile.data
  };
}

export default connect(mapStateToProps, actions)(ProfileOwn);
