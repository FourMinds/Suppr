import axios from 'axios';
import { server } from '../config.js'
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
} from './types';

export function signinUser({ username, password }) {
  return function(dispatch) {
    axios.post(`${server}/signin`, { username, password })
      .then(response => {
        dispatch({ type: AUTH_USER, payload: username });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/home');
      })
      .catch((res) => {
        if (!res.response) return dispatch(authError('Could not connect to server'))
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function signupUser({ email, username, password }) {
  return function(dispatch) {
    axios.post(`${server}/signup`, { email, username, password })
      .then(response => {
        dispatch({ type: AUTH_USER, payload: username });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/home');
      })
      .catch(response => dispatch(authError(response.data.error)));
  }
}

export function getUsername(token) {
  return function(dispatch) {
    dispatch({ type: AUTH_USER })
    axios.get(`${server}/username`, {
      headers: {
        authorization: token
      }
    }).then(res => {
      const { username } = res.data
      dispatch({ type: AUTH_USER, payload: username });
    }).catch(response => dispatch({ type: UNAUTH_USER }))
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

  return { type: UNAUTH_USER };
}