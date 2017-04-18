import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
} from '../actions/types';
const initialState = {
  username: null,
  authenticated: false
}
export default function(state = initialState, action) {
  switch(action.type) {
    case AUTH_USER:
    console.log(action.payload)
      return { ...state, error: '', authenticated: true, username: action.payload };
    case UNAUTH_USER:
      return { ...state, authenticated: false, username: null };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
