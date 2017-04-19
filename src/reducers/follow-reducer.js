import {
  GET_FOLLOWS,
  GET_FOLLOWS_USER,
} from '../actions/types';

const initialState = {
  data: [],
  dataForUser: []
};
export default function(state = initialState, action) {
  switch(action.type) {
    case GET_FOLLOWS:
      return { ...state, data: action.payload };
    case GET_FOLLOWS_USER:
      return { ...state, dataForUser: action.payload };
    default:
      return state;
  }
}
