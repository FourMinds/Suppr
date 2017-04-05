import {
  GET_FAVORITE,
  GET_FAVORITE_USER
} from '../actions/types';

const initialState = { data: [] }

export default function(state=initialState, action) {
  switch (action.type) {
    case GET_FAVORITE:
      return { ...state, data: action.payload }
    case GET_FAVORITE_USER:
      return { ...state, dataForUser: action.payload }
  }
  return state;
}