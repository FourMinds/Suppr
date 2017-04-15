import {
  GET_PROFILE
} from '../actions/types';
const initialState = {
  data: {
    bio: '',
    image: '',
    style: '',
    location: ''
  }
}
export default function(state = initialState, action) {
  switch(action.type) {
    case GET_PROFILE:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}