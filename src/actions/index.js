import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
} from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ username, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signin`, { username, password })
      .then(response => {
        dispatch({ type: AUTH_USER, payload: username });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', username);
        browserHistory.push('/home');
      })
      .catch(() => {
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function signupUser({ email, username, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, username, password })
      .then(response => {
        dispatch({ type: AUTH_USER, payload: username });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', username);
        browserHistory.push('/home');
      })
      .catch(response => dispatch(authError(response.data.error)));
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');

  return { type: UNAUTH_USER };
}