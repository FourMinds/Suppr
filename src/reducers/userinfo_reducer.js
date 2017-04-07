import {
  GET_USER_INFO
} from '../actions/types';

const initialState = { };

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_USER_INFO:
      let newState = { ...state }
      newState[action.payload.username] = action.payload.data
      return newState;
    default:
      return state;
  } 
}