import {
  GET_RECIPE,
  GET_RECIPE_ID,
  GET_RECIPE_USERNAME,
  PUSH_UPDATE,
  GET_VARIATIONS,
  PUSH_VARIATION
} from '../actions/types';

const initialState = {
  data: [],
  selectedRecipe: [],
  userRecipes: []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_RECIPE:
      return { ...state, data: action.payload };
    case GET_RECIPE_ID:
      return { ...state, selectedRecipe: action.payload };
    case GET_RECIPE_USERNAME:
      return { ...state, userRecipes: action.payload };
    case PUSH_UPDATE:
      return { ...state, pushUpdate: action.payload };
    case PUSH_VARIATION:
      return { ...state, pushVariation: action.payload };
    case GET_VARIATIONS:
      let newState = { variations: { } }
      newState.variations[action.payload.id] = action.payload.data
      return {...state, ...newState};
    default:
      return state;
  } 

}
