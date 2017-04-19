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
  GET_FAVORITE_USER,
  GET_USER_INFO,
  GET_VARIATIONS,
  PUSH_UPDATE,
  PUSH_VARIATION,
  SELECT_VARIATION,
  DESELECT_VARIATION,
  GET_VARIATIONS_USERNAME,
  SEARCH,
  GET_PROFILE,
  GET_PROFILE_USER,
  SUCCESS
} from './types';

// all get requests are parsed for special characters and then modified based on the regex service in this folder
const regex = require('../../server/services/regex');

/*****************
* * * AUTH * * *
*****************/
export function signinUser({ username, password }) {
  return function(dispatch) {
    axios.post(`${server}/signin`, { username, password })
      .then(response => {
        dispatch({ type: AUTH_USER, payload: username });
        localStorage.setItem('token', response.data.token);
        dispatch(getProfile(username));
        browserHistory.push('/');
      })
      .catch((res) => {
        if (!res.response) return dispatch(authError('Could not connect to server'));
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
        dispatch(getProfile(username));
        browserHistory.push('/');
      })
      .catch(response => dispatch(authError(response.response.data.error)));
  }
}

export function getUsername(token) {
  return function(dispatch) {
    axios.get(`${server}/username`, {
      headers: {
        authorization: token
      }
    }).then(res => {
      const { username } = res.data;
      dispatch({ type: AUTH_USER, payload: username });
      dispatch(getFavorites(username));
      dispatch(getProfile(username));
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

export function postRecipe(recipe, isVariation) {
  return function(dispatch) {
    axios.post(`${server}/recipe`, recipe, {
      headers: {authorization: localStorage.getItem('token')}
    })
      .then(res => {
        let recipePath = `/recipe/${res.data.id}`;
        if(isVariation) {
          recipePath = `/recipe/${recipe.parentId}`;
        }
        dispatch(getRecipes());
        browserHistory.push(recipePath);
      })
  }
}

export function getRecipes() {
  return function(dispatch) {
    axios.get(`${server}/recipe`, {
      headers: {authorization: localStorage.getItem('token')}
    })
      .then(res => {
        res.data = regex.parseData(res.data, false);
        return res;
      })
      .then(res => {
        res.data.map(recipe => dispatch(getProfileByUsername(recipe.username)));
        res.data.map(recipe => dispatch(getUserInfo(recipe.username)));
        dispatch({ type: GET_RECIPE, payload: res.data });
      })
  }
}

export function getVariations(id, setId) {
  return function(dispatch) {
    axios.get(`${server}/recipe`, {
      headers: {authorization: localStorage.getItem('token')},
      params: { variation:true, id }
    })
      .then(res => {
        res.data = regex.parseData(res.data, false);
        return res;
      })
      .then(res => {
        dispatch({ type: GET_VARIATIONS, payload: {
            id,
            data: res.data
          }
        });
        //setId for setting selected variation after retrieval
        if(setId) {
          dispatch(selectVariation(id, setId));
        }
      })
  }
}

export function selectVariation(recipeId, id) {
  return function(dispatch, getState) {
    const display = getState().recipes.variations[recipeId].filter(variation => variation.id === Number(id));
    dispatch({ type: SELECT_VARIATION, payload: display[0] });
    dispatch(getReview(id));
  }
}

export function deselectVariation() {
  return function(dispatch) {
    dispatch({ type: DESELECT_VARIATION });
  }
}


export function getRecipeById(id) {
  return function(dispatch) {
    axios.get(`${server}/recipe`, {
      headers: {authorization: localStorage.getItem('token')},
      params: { id }
    })
      .then(res => {
        res.data = regex.parseData(res.data, false);
        return res;
      })
      .then(res => {
        dispatch({ type: GET_RECIPE_ID, payload: res.data });
        dispatch(getReview(id));
        dispatch(getProfileByUsername(res.data.username));
        dispatch(getUserInfo(res.data.username));
      })
        .catch(e => browserHistory.replace('/error'));
  }
}

export function getRecipesByUsername(username) {
  return function(dispatch) {
    axios.get(`${server}/recipe`, {
      headers: {authorization: localStorage.getItem('token')},
      params: { username }
    })
      .then(res => {
        res.data = regex.parseData(res.data, false);
        return res;
      })
      .then(res => {
        // this is necessary to give a username for the recipe (which is not given by the request)
        res.data.map(recipe => recipe.username = username);
        dispatch({ type: GET_RECIPE_USERNAME, payload: res.data });
      })
  }
}

export function getVariationsByUsername(username) {
  return function(dispatch) {
    axios.get(`${server}/recipe`, {
      headers: {authorization: localStorage.getItem('token')},
      params: { username, variation: true }
    })
      .then(res => {
        res.data = regex.parseData(res.data, false);
        return res;
      })
      .then(res => {
        dispatch({ type: GET_VARIATIONS_USERNAME, payload: res.data });
      })
  }
}

export function deleteRecipe(id, deleteSpork) {
  return function(dispatch, getState) {
    axios.delete(`${server}/recipe`, {
      headers: {authorization: localStorage.getItem('token')},
      params: { id }
    })
      .then(res => {
      dispatch(getRecipes());
      dispatch(getVariations(getState().recipes.selectedRecipe.id));
      if (deleteSpork) dispatch(deselectVariation());
      if (!deleteSpork) browserHistory.push('/');
    })
  }
}

export function pushUpdate(recipe) {
  return function(dispatch) {
    dispatch({ type: PUSH_UPDATE, payload: recipe });
    browserHistory.push('/edit');
  }
}

export function pushVariation(recipe) {
  return function(dispatch) {
    dispatch({ type: PUSH_VARIATION, payload: recipe });
    browserHistory.push('/spork');
  }
}

export function updateRecipe(update) {
  return function(dispatch) {
    axios.put(`${server}/recipe`, update, {
      headers: {authorization: localStorage.getItem('token')}
    })
      .then(res => {
        const recipePath = !update.parentId ? `/recipe/${update.id}` : `/recipe/${update.parentId}/${update.id}`;
        dispatch(getRecipes());
        dispatch(getRecipeById(update.id));
        dispatch(getVariations(update.parentId));
        browserHistory.push(recipePath);
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
        dispatch(getReview(review.recipeId));
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
        dispatch({ type: GET_REVIEW, payload: res.data });
        res.data.map(review => dispatch(getProfileByUsername(review.username)));
        res.data.map(review => dispatch(getUserInfo(review.username)));
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
        dispatch(getUserInfo(favorite.username));
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
          return dispatch({ type: GET_FAVORITE_USER, payload: res.data });
        }
        dispatch({ type: GET_FAVORITE, payload: res.data });
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
        dispatch(getFollows(follow.username));
        dispatch(getFollows(follow.followName, false));
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
          return dispatch({ type: GET_FOLLOWS_USER, payload: res.data });
        }
        dispatch({ type: GET_FOLLOWS, payload: res.data });
      })
  }
}

/*****************
* * Userinfo * * 
*****************/

export function getUserInfo(username) { 
  return function(dispatch) {
    if(!username) return;
    axios.get(`${server}/info`, {
      headers: {authorization: localStorage.getItem(('token'))},
      params: { username }
    })
      .then(res => {
        dispatch({ type: GET_USER_INFO, payload: {
          username, 
          data:res.data 
        }
      })
    })
  }
}

/*****************
* * * Search * * *
*****************/

export function search(query) {
  return function(dispatch) {
    axios.get(`${server}/search`, {
      headers: {authorization: localStorage.getItem(('token'))},
      params: { query }
    })
      .then(res => {
        dispatch({ type: SEARCH, payload: {
          data: res.data,
          query
        } 
      });
        res.data.map(recipe => dispatch(getProfileByUsername(recipe.username)));
        res.data.map(recipe => dispatch(getUserInfo(recipe.username)));
    })
  }
}

export function triggerSearch(query) {
  return function(dispatch) {
    dispatch(search(query));
    browserHistory.push('/search');
  }
}

/*****************
* * * Profile * * *
*****************/

export function postProfile(profile) {
  return function(dispatch) {
    axios.post(`${server}/profile`, profile, {
      headers: {authorization: localStorage.getItem(('token'))}
    })
      .then(res => {
        dispatch(getProfile(profile.username));
      })
  }
}

export function getProfile(username) {
  return function(dispatch) {
    axios.get(`${server}/profile`, {
      headers: {authorization: localStorage.getItem(('token'))},
      params: { username }
    })
      .then(res => {
        dispatch({ type: GET_PROFILE, payload: res.data })
      })
  }
}

export function getProfileByUsername(username) {
  return function(dispatch) {
    axios.get(`${server}/profile`, {
      headers: {authorization: localStorage.getItem(('token'))},
      params: { username }
    })
      .then(res => {
        dispatch({ type: GET_PROFILE_USER, payload: {
            data: res.data,
            username
          } 
        })
      })
  }
}

/*****************
* * Settings * *
*****************/

export function pushSettings(settings, username) {
  return function(dispatch) {
    const { email, password } = settings
    if (email) {
      console.log(email)
      axios.post(`${server}/settings/email`, { email, username }, {
        headers: {authorization: localStorage.getItem(('token'))}
      }).then(() => {
        dispatch(authError(''));
        dispatch(successMessage('Your email was changed'));
        setTimeout(() => dispatch(successMessage('')), 5000)
      }).catch((res) => {
        if (!res.response) return dispatch(authError('Could not connect to server'));
        dispatch(authError('Email is in use'));
      });
    } else {
      axios.post(`${server}/settings/password`, { password, username }, {
        headers: {authorization: localStorage.getItem(('token'))}
      }).then(() => {
        dispatch(authError(''));
        dispatch(successMessage('Your password was changed'));
        setTimeout(() => dispatch(successMessage('')), 5000)
      })
    }
  }
}

export function successMessage(message) {
  return {
    type: SUCCESS,
    payload: message
  }
}

