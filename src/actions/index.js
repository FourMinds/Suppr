import axios from 'axios';
import { server } from '../config.js'
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  GET_RECIPE,
  GET_RECIPE_ID,
  GET_REVIEW,
  GET_RECIPE_USERNAME,
  GET_FAVORITE,
  GET_FOLLOWS,
  GET_FOLLOWS_USER,
  GET_FAVORITE_USER
} from './types';

/*****************
* * * AUTH * * *
*****************/
export function signinUser({ username, password }) {
  return function(dispatch) {
    axios.post(`${server}/signin`, { username, password })
      .then(response => {
        dispatch({ type: AUTH_USER, payload: username });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/');
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
        browserHistory.push('/');
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
      dispatch(getFavorites(username))
    })
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

/*****************
* * * Recipe * * *
*****************/

export function postRecipe(recipe) {
  return function(dispatch) {
    axios.post(`${server}/recipe`, recipe, {
      headers: {authorization: localStorage.getItem('token')}
    })
      .then(res => {
        console.log(res)
        const recipePath = `/recipe/${res.data.id}`
        dispatch(getRecipes())
        browserHistory.push(recipePath)
      })
  }
}

export function getRecipes() {
  return function(dispatch) {
    axios.get(`${server}/recipe`, {
      headers: {authorization: localStorage.getItem('token')}
    })
      .then(res => {
        dispatch({ type: GET_RECIPE, payload: res.data })
      })
  }
}

export function getRecipeById(id) {
  return function(dispatch) {
    axios.get(`${server}/recipe`, {
      headers: {authorization: localStorage.getItem('token')},
      params: { id }
    })
      .then(res => {
        dispatch({ type: GET_RECIPE_ID, payload: res.data });
        dispatch(getReview(id));
      })
  }
}

export function getRecipesByUsername(username) {
  return function(dispatch) {
    axios.get(`${server}/recipe`, {
      headers: {authorization: localStorage.getItem('token')},
      params: { username }
    })
      .then(res => {
        // this is necessary to give a username for the recipe (which is not given by the request)
        res.data.map(recipe => recipe.username = username);
        dispatch({ type: GET_RECIPE_USERNAME, payload: res.data });
      })
  }
}

/*****************
* * * Review * * *
*****************/

export function postReview(review) {
  return function(dispatch) {
    axios.post(`${server}/review`, review, {
      headers: {authorization: localStorage.getItem('token')}
      })
      .then(res => {
        dispatch(getReview(review.recipeId))
      })
  }
}

export function getReview(id) {
  return function(dispatch) {
    axios.get(`${server}/review`, {
      headers: {authorization: localStorage.getItem('token')},
      params: { id }
    })
      .then(res => {
        dispatch({ type: GET_REVIEW, payload: res.data })
      })
  }
}

/*****************
* * Favorite * * 
*****************/

export function postFavorite(favorite) {
  return function(dispatch) {
    axios.post(`${server}/favorite`, favorite, {
      headers: {authorization: localStorage.getItem('token')},
    })
      .then(res => {
        dispatch(getFavorites(favorite.username));
      })
  }
}

export function getFavorites(username, isSignedinUser = true) {
  return function(dispatch) {
    axios.get(`${server}/favorite`, {
      headers: {authorization: localStorage.getItem(('token'))},
      params: { username }
    })
      .then(res => {
        if (!isSignedinUser) {
          return dispatch({ type: GET_FAVORITE_USER, payload: res.data })
        }
        dispatch({ type: GET_FAVORITE, payload: res.data })
      })
  }
}

/*****************
* * Follows * * 
*****************/

export function postFollow(follow) {
  return function(dispatch) {
    axios.post(`${server}/follow`, follow, {
      headers: {authorization: localStorage.getItem(('token'))}
    })
      .then(res => {
        dispatch(getFollows(follow.username))
        dispatch(getFollows(follow.followName, false))
      })
  }
}

export function getFollows(username, isSignedinUser = true) {
  return function(dispatch) {
    axios.get(`${server}/follow`, {
      headers: {authorization: localStorage.getItem(('token'))},
      params: { username }
    })
      .then(res => {
        if (!isSignedinUser) {
          return dispatch({ type: GET_FOLLOWS_USER, payload: res.data })
        }
        dispatch({ type: GET_FOLLOWS, payload: res.data })
      })
  }
}

