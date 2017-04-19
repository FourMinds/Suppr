import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { Link } from 'react-router';

const emailField = email => (
  <fieldset className="form-group">
    <input className="form-control auth-input" {...email.input} placeholder="Email"/>
    {email.meta.touched && email.meta.error && <div className="error">{email.meta.error}</div>}
  </fieldset>
)

const passwordField = password => (
  <fieldset className="form-group">
    <input className="form-control auth-input" type="password" {...password.input} placeholder="New Password"/>
    {password.meta.touched && password.meta.error && <div className="error">{password.meta.error}</div>}
  </fieldset>
)

const passwordConfirmField = passwordConfirm => (
  <fieldset className="form-group">
    <input className="form-control auth-input" type="password" {...passwordConfirm.input} placeholder="Confirm Password"/>
    {passwordConfirm.meta.touched && passwordConfirm.meta.error && <div className="error">{passwordConfirm.meta.error}</div>}
  </fieldset>
)

class Settings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 0
    }
  }
  handleFormSubmit(formProps) {
    const { username } = this.props
    this.props.pushSettings(formProps, username)
  } 

  changePage(e) {
    this.props.authError('')
    this.props.successMessage('')
    this.props.reset()
    this.setState({page: Number(e.target.name)})
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Error: </strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  renderSuccess() {
    if (this.props.message) {
      return (
        <div className="alert alert-success">
          <strong>Success! </strong> {this.props.message}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    const { page } = this.state
    return (
      <div>
      <ul className="nav nav-fill">
        <li className="nav-item">
          <a className={`nav-link ${page === 0 ? 'active' : ''}`} href="#" name="0" onClick={this.changePage.bind(this)}>Change Email</a>
        </li>
        <li className="nav-item">
          <a name="1" className={`nav-link ${page === 1 ? 'active' : ''}`} href="#" onClick={this.changePage.bind(this)}>Change Password</a>
        </li>
      </ul>

      {this.state.page === 0 && <div className="flex-body-auth">
        <h5 className="auth-title">Change your Email</h5>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="auth-flex-element">
          <Field name="email" component={emailField} />
          {this.renderAlert()}
          {this.renderSuccess()}
          <div>
            <button action="submit" className="btn btn-primary btn-padded">Submit <i className="fa fa-angle-right" style={{marginLeft:'10px'}} aria-hidden="true"></i></button>
          </div>
        </form>
        </div>}

      {this.state.page === 1 && <div className="flex-body-auth">
        <h5 className="auth-title">Change your Password</h5>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="auth-flex-element">
          <Field name="password" component={passwordField} />
          <Field name="passwordConfirm" component={passwordConfirmField} />
           {this.renderAlert()}
          {this.renderSuccess()}
          <div>
            <button action="submit" className="btn btn-primary btn-padded">Submit <i className="fa fa-angle-right" style={{marginLeft:'10px'}} aria-hidden="true"></i></button>
          </div>
        </form>
      </div>}

      </div>
    );
  }
}

function validate(formProps) {
  const errors = {};
  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (formProps.password && formProps.password.search(/\s/g) > 0) {
    errors.password = 'Password cannot have spaces';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }
  
  return errors;
}

function mapStateToProps(state) {
  return { 
    username: state.auth.username, 
    errorMessage: state.auth.error,
    message: state.auth.message
  };
}

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'settings',
  validate
})(Settings));
