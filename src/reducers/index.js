import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth-reducer';
import recipeReducer from './recipe-reducer';
import reviewReducer from './review-reducer';
import followReducer from './follow-reducer';
import userInfoReducer from './userinfo-reducer';
import favoriteReducer from './favorite-reducer';
import searchReducer from './search-reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  recipes: recipeReducer,
  reviews: reviewReducer,
  favorites: favoriteReducer,
  follows: followReducer,
  userInfo: userInfoReducer,
  search: searchReducer
});
export default rootReducer;
