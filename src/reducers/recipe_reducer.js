import {
  GET_RECIPE,
  GET_RECIPE_ID,
  GET_RECIPE_USERNAME,
  PUSH_UPDATE,
  GET_VARIATIONS,
  PUSH_VARIATION,
  SELECT_VARIATION,
  DESELECT_VARIATION,
  GET_VARIATIONS_USERNAME 
} from '../actions/types';

const initialState = {
  data: [],
  selectedRecipe: [],
  userRecipes: [],
  selectedVariation: null,
  userVariations: []
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
    case SELECT_VARIATION:
      return { ...state, selectedVariation: action.payload }
    case DESELECT_VARIATION:
      return { ...state, selectedVariation: null }
    case GET_VARIATIONS_USERNAME:
      return { ...state, userVariations: action.payload }
    case GET_VARIATIONS:
      let newState = { variations: { } }
      newState.variations[action.payload.id] = action.payload.data
      return {...state, ...newState};
    default:
      return state;
  } 

}
