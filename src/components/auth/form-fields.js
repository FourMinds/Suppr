import React from 'react';

export const signinFields = {
  usernameField: username => (
    <fieldset className="form-group">
      <input {...username.input} className="form-control auth-input" placeholder="Username"/>
      {username.meta.touched && username.meta.error && <div className="error">{username.meta.error}</div>}
    </fieldset>
  ),

  passwordField: password => (
    <fieldset className="form-group">
      <input {...password.input} type="password" className="form-control auth-input" placeholder="Password"/>
      {password.meta.touched && password.meta.error && <div className="error">{password.meta.error}</div>}
    </fieldset>
  )
}

export const signupFields = {
  emailField: email => (
    <fieldset className="form-group">
      <input className="form-control auth-input" {...email.input} placeholder="Email"/>
      {email.meta.touched && email.meta.error && <div className="error">{email.meta.error}</div>}
    </fieldset>
  ),

  usernameField: username => (
    <fieldset className="form-group">
      <input className="form-control auth-input" {...username.input} placeholder="Username"/>
      {username.meta.touched && username.meta.error && <div className="error">{username.meta.error}</div>}
    </fieldset>
  ),

  passwordField: password => (
    <fieldset className="form-group">
      <input className="form-control auth-input" type="password" {...password.input} placeholder="Password"/>
      {password.meta.touched && password.meta.error && <div className="error">{password.meta.error}</div>}
    </fieldset>
  ), 

  passwordConfirmField: passwordConfirm => (
    <fieldset className="form-group">
      <input className="form-control auth-input" type="password" {...passwordConfirm.input} placeholder="Confirm Password"/>
      {passwordConfirm.meta.touched && passwordConfirm.meta.error && <div className="error">{passwordConfirm.meta.error}</div>}
    </fieldset>
  )
}