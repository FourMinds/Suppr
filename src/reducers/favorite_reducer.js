import {
  GET_FAVORITE
} from '../actions/types';

export default function(state={}, action) {
  switch (action.type) {
    case GET_FAVORITE:
      return { ...state, data: action.payload }
  }
  return state;
}