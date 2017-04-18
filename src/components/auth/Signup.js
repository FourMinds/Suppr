import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { signupFields } from './form-fields';
import { Link } from 'react-router';

const {
  emailField, 
  usernameField, 
  passwordField, 
  passwordConfirmField
} = signupFields;


class Signup extends Component {
  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
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
    const { handleSubmit, submitting } = this.props;
    return (
      <div className="flex-body-auth">
      <h5 className="auth-title">Sign up for a new account</h5>
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="auth-flex-element">
        <Field name="email" type="email" component={emailField} />
        <Field name="username" component={usernameField} />
        <Field name="password" component={passwordField} />
        <Field name="passwordConfirm" component={passwordConfirmField} />
        {this.renderAlert()}
        <div>
          <button action="submit" className="btn btn-primary btn-padded" disabled={submitting}>
            Create Account 
            <i className="fa fa-angle-right" style={{marginLeft:'10px'}} aria-hidden="true"></i>
          </button>
          <Link className="pull-right auth-check" to='/auth/signin'>Have an account?</Link>
        </div>
      </form>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.username) {
    errors.username = 'Please enter an username';
  }

  if (formProps.username && formProps.username.search(/\s/g) > 0) {
    errors.username = 'Username cannot have spaces';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
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
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'signup',
  validate
})(Signup));
