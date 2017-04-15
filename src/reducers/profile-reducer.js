import {
  GET_PROFILE
} from '../actions/types';
const initialState = {
  username: null,
  authenticated: false
}
export default function(state = initialState, action) {
  switch(action.type) {
    case GET_PROFILE:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}