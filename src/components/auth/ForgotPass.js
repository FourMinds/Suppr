import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { signupFields } from './form-fields';
import { Link } from 'react-router';

const {
  emailField
} = signupFields;

class ForgotPass extends Component {
  handleFormSubmit() {

  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div className="flex-body-auth">
        <h5 className="auth-title">What's your e-mail address?</h5>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="auth-flex-element">
        <Field name="email" type="email" component={emailField} />
          <button action="submit" className="btn btn-primary btn-padded" disabled={submitting}>
            Submit
          </button>
          <p className="pull-right auth-check">Check your e-mail to reset your password.</p>
        </form>
      </div>
    );
  }
}

export default connect()(reduxForm({
  form: 'forgotpass'
})(ForgotPass));
