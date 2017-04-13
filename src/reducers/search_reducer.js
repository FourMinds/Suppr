import {
  SEARCH
} from '../actions/types';

const initialState = { 
  searchResults: []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case SEARCH:
      return {...state, searchResults: action.payload.data, query: action.payload.query };
    default:
      return state;
  } 
}
