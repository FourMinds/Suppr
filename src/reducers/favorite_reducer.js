import {
  GET_FAVORITE
} from '../actions/types';

const initialState = { data: [] }

export default function(state=initialState, action) {
  switch (action.type) {
    case GET_FAVORITE:
      return { ...state, data: action.payload }
  }
  return state;
}