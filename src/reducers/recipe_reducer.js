import {
  GET_RECIPE,
  GET_RECIPE_ID,
  GET_RECIPE_USERNAME
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case GET_RECIPE:
      return { ...state, data: action.payload };
    case GET_RECIPE_ID:
      return { ...state, selectedRecipe: action.payload };
    case GET_RECIPE_USERNAME:
      return { ...state, userRecipes: action.payload };
  }

  return state;
}
