import {
  SEARCH
} from '../actions/types';

const initialState = { 
  searchResults: []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case SEARCH:
      return {...state, searchResults: action.payload};
    default:
      return state;
  } 
}
