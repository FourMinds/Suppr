import {
  GET_RECIPE
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case GET_RECIPE:
      return { ...state, data: action.payload };
  }

  return state;
}
