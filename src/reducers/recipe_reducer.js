import {
  GET_RECIPE,
  GET_RECIPE_ID
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case GET_RECIPE:
      return { ...state, data: action.payload };
    case GET_RECIPE_ID:
      return { ...state, selectedRecipe: action.payload };
  }

  return state;
}
