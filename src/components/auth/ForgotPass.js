import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { signupFields } from './form-fields';
import { server } from '../../config.js';
import axios from 'axios';
import { browserHistory } from 'react-router';

const {
  emailField
} = signupFields;

class ForgotPass extends Component {
  handleFormSubmit( {email} ) {
    // synchronously submit a post request and redirect to browser; does not have to be asynchronous because we're sending an e-mail
    axios.post(`${server}/forgot`, { email });
    browserHistory.push('/');
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
