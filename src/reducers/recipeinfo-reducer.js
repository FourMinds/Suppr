import {
  GET_RECIPE_INFO
} from '../actions/types';

const initialState = { data: [] }

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_RECIPE_INFO:
    
      return { ...state, data: action.payload };
    default:
      return state;
  }
}