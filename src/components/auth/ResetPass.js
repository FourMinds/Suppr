import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { server } from '../../config.js';
import { signupFields } from './form-fields';

const {
  passwordField
} = signupFields;

class ResetPass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: window.location.href.split('/auth/reset/')[1]
    }
  }

  handleFormSubmit( {password} ) {
    // synchronously submit a post request and redirect to browser; does not have to be asynchronous because we're sending a password
    // get the token from the url
    axios.post(`${server}/reset`, { password, token: this.state.token });
    browserHistory.push('/auth/signin');
  }

  componentWillMount() {
    // will not load unless token is valid
    try {
      jwtDecode(this.state.token);
    }
    catch(err) {
      browserHistory.push('/');
    }
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div className="flex-body-auth">
        <h5 className="auth-title">What's your new password?</h5>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="auth-flex-element">
          <Field name="password" type="password" component={passwordField} />
          <button action="submit" className="btn btn-primary btn-padded" disabled={submitting}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (formProps.password && formProps.password.search(/\s/g) > 0) {
    errors.password = 'Password cannot have spaces';
  }

  return errors;
}

export default connect()(reduxForm({
  form: 'resetpass',
  validate
})(ResetPass));
