import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';


class Personal extends Component {
  componentDidMount() {
    this.props.getProfileByUsername(this.props.username)
  }

  returnContent() {
    if (this.props.profile[this.props.username]) {
      const { bio, style, location } = this.props.profile[this.props.username];
      return [bio, style, location]
    } else {
      return ['', '', '']
    }
  }

  render(){
    const [bio, style, location] = this.returnContent();
    return (
      <div>
        <div className="profile-field-container">

          <label className="form-label">
            <span className="field-title">About Me</span>
          </label>
          <hr className="profile-field-divider" />
          <div className="profile-text">{bio}</div>

          <label className="form-label">
            <span className="field-title">Favorite Cooking Style</span>
          </label>
          <hr className="profile-field-divider" />
          <div className="profile-text">{style}</div>

          <label className="form-label">
            <span className="field-title">Location</span> 
          </label>
          <hr className="profile-field-divider" />
          <div className="profile-text">{location}</div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { 
    profile: state.profile
  };
}

export default connect(mapStateToProps, actions)(Personal);