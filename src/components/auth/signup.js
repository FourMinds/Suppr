import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { signupFields } from './form-fields'

const {emailField, usernameField, passwordField, passwordConfirmField} = signupFields


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

  componentWillReceiveProps(nextProps){
    console.log(nextProps)
  }

  render() {
    const { error, pristine, reset, submitting } = this.props
    const { handleSubmit } = this.props;
    return (
      <div className="flex-body">
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="auth-flex-element">
        <Field name="email" type="email" component={emailField} />
        <Field name="username" component={usernameField} />
        <Field name="password" type="password" component={passwordField} />
        <Field name="passwordConfirm" type="password" component={passwordConfirmField} />
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary" disabled={submitting}>Sign up</button>
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
