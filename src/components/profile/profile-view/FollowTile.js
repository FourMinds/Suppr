import React, { Component } from 'react'

class FollowTile extends Component {

  render() {
    const userLink = `/profile/${this.props.user}`
    return (
      <div className="col-md-4">
        <div className="well well-sm">
            <div className="media">
                <a className="thumbnail pull-left" href="#">
                    <img className="media-object" src="http://placehold.it/80" alt="placeholder" />
                </a>
                <div className="media-body">
                    <h4 className="media-heading">{this.props.user}</h4>
                <p><span className="label label-info">10 photos</span> <span className="label label-primary">89 followers</span></p>
                    <p>
                        <a href={userLink} className="btn btn-xs btn-default">View Profile</a>
                    </p>
                </div>
            </div>
        </div>
      </div>
    )
  }

}

export default FollowTile;
