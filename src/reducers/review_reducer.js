import {
  GET_REVIEW
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case GET_REVIEW:
      return { ...state, data: action.payload };
    default:
      return state;
  }
  
}
