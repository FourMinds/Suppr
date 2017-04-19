import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import Imgur from './imgur-profile.js';
import { reduxForm, Field } from 'redux-form';
import $ from 'jquery';

const bioField = bio => (
    <textarea {...bio.input} className="form-control profile-input" />
);

const styleField = style => (
    <input {...style.input} className="form-control profile-input" />
);

const locationField = location => (
    <input {...location.input} className="form-control profile-input" />
);

class Personal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: '',
      edit: 0
    };

    this.handlePictureEdit = this.handlePictureEdit.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    let feedback = (res) => {
      if (res.success === true) {
        this.setState({ imageUrl: res.data.link, imageError: false });
        $('.profile-drop-text').text('Press submit to upload this picture');
      }
    };
    new Imgur({
        clientid: '2f82e4d530661d9',
        callback: feedback
    });
  }

  handlePictureEdit() {
    const current = this.state.edit;
    this.setState({edit: current === 1 ? 0 : 1});
  }

  handleEdit(e) {
    const current = this.state.edit;
    if (current === Number(e.target.name)) return this.setState({edit: 0});
    this.setState({edit: Number(e.target.name)});
  }

  handleFormSubmit(formProps) {
    const { bio, style, location } = formProps;
    const { imageUrl } = this.state;
    const { username } = this.props;
    this.props.postProfile({
      image: imageUrl,
      username,
      bio,
      style,
      location
    });
    this.setState({edit: 0});
  }
  render(){
    const { profile:{image, bio, style, location}, handleSubmit} = this.props;
    const editButtonCaption = this.state.edit === 1 ? 'Cancel' : 'Change Profile Picture';
    const bioButtonCaption = this.state.edit === 2 ? 'Cancel' : 'Edit';
    const styleButtonCaption = this.state.edit === 3 ? 'Cancel' : 'Edit';
    const locationButtonCaption = this.state.edit === 4 ? 'Cancel' : 'Edit';
    return <div>
      <span className="btn-edit-profile" onClick={this.handlePictureEdit}>{editButtonCaption}</span>
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <div className="drop-box" style={{display: this.state.edit === 1 ? 'block' : 'none'}}>
          <div className="dropzone-profile" id="drop"></div>
          <button action="submit" className="btn btn-primary form-control" >Submit</button> 
        </div>
        <div className="profile-field-container">

          <label className="form-label">
            <span className="field-title">About Me</span>
            {this.state.edit === 2 ?
              <i className="fa fa-times profile-edit-icon" aria-hidden="true"></i> : 
              <i className="fa fa-pencil-square-o profile-edit-icon" aria-hidden="true"></i>
            }
            <a name="2" onClick={this.handleEdit} className="edit-link">{bioButtonCaption}</a>
          </label>
          <hr className="profile-field-divider" />
          {this.state.edit !== 2 && <div className="profile-text">{this.props.profile.bio}</div>} {/*CAN WE CHANGE THIS TO !==*/}
          <fieldset className="form-group profile-form" style={{display: this.state.edit === 2 ? 'block' : 'none'}}>
          <Field name="bio" component={bioField} />
          <button action="submit" className="btn btn-primary form-control" >Submit</button> 
          </fieldset>

          <label className="form-label">
            <span className="field-title">Favorite Cooking Style</span>
            {this.state.edit === 3 ?
              <i className="fa fa-times profile-edit-icon" aria-hidden="true"></i> : 
              <i className="fa fa-pencil-square-o profile-edit-icon" aria-hidden="true"></i>
            }
            <a name="3" onClick={this.handleEdit} className="edit-link">{styleButtonCaption}</a>
          </label>
          <hr className="profile-field-divider" />
          {this.state.edit !== 3 && <div className="profile-text">{this.props.profile.style}</div>} {/*CAN WE CHANGE THIS TO !==*/}
          <fieldset className="form-group profile-form" style={{display: this.state.edit === 3 ? 'block' : 'none'}}>
          <Field name="style" component={styleField} />
          <button action="submit" className="btn btn-primary form-control" >Submit</button> 
          </fieldset>

          <label className="form-label">
            <span className="field-title">Location</span> 
            {this.state.edit === 4 ?
              <i className="fa fa-times profile-edit-icon" aria-hidden="true"></i> : 
              <i className="fa fa-pencil-square-o profile-edit-icon" aria-hidden="true"></i>
            }
            <a name="4" onClick={this.handleEdit} className="edit-link">{locationButtonCaption}</a>
          </label>
          <hr className="profile-field-divider" />
          {this.state.edit !== 4 && <div className="profile-text">{this.props.profile.location}</div>}
          <fieldset className="form-group profile-form" style={{display: this.state.edit === 4 ? 'block' : 'none'}}>
          <Field name="location" component={locationField} />
          <button action="submit" className="btn btn-primary form-control" >Submit</button> 
          </fieldset>

        </div>
        
      </form>
    </div>
  }
}

function mapStateToProps(state) {
  return { 
    username: state.auth.username,
    profile: state.profile.data
  };
}

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'personal',
})(Personal));
