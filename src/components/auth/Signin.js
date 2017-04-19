import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { signinFields } from './form-fields'
import { Link } from 'react-router';

const { usernameField, passwordField } = signinFields;

class Signin extends Component {
  handleFormSubmit({ username, password }) {
    this.props.signinUser({ username, password });
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

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="flex-body-auth">
      <h5 className="auth-title">Sign in to your account</h5>
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="auth-flex-element">
        <Field name="username" component={usernameField} />
        <Field name="password" component={passwordField} />
        {this.renderAlert()}
        <div>
          <button action="submit" className="btn btn-primary btn-padded">Sign in <i className="fa fa-angle-right" style={{marginLeft:'10px'}} aria-hidden="true"></i></button>
          <Link className="pull-right auth-check" to='/auth/signup'>Don't have an account?</Link>
          <Link className="pull-right auth-check" to='/auth/forgot'>Forgot password?</Link>
        </div>
      </form>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.username) {
    errors.username = 'Please enter an username';
  }

  if (formProps.username) {
    const { username } = formProps;
    if (username[username.length-1] === username[username.length-1].toUpperCase()) {
      formProps.username = formProps.username.slice(0,username.length)
    }
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }
  
  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'signin',
  validate,
})(Signin));
