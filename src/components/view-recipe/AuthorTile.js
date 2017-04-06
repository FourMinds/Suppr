import React from 'react';

const AuthorTile = ({ username }) => (
  <div className="recipe-author-box">
    <img className="profile-img" src="http://orig01.deviantart.net/aa15/f/2014/203/d/1/profile_picture_by_dogeshibee-d7rthy6.jpg" alt="profile image" />
    <div className="profile-stats-box">
      <h5>{username}</h5>
      <p># of recipes, # of followers</p>
    </div>
  </div>
)

export default AuthorTile;