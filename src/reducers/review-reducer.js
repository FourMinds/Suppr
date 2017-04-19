import {
  GET_REVIEW
} from '../actions/types';

const initialState = { data: [] };

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_REVIEW:
      return { ...state, data: action.payload };
    default:
      return state;
  }
  
}
