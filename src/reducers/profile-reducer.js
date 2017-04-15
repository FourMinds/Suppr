import {
  GET_PROFILE,
  GET_PROFILE_USER
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
    case GET_PROFILE_USER:
      const newState = {...state}
      newState[action.payload.username] = action.payload.data
      return newState;
    default:
      return state;
  }
}