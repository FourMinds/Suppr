import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import recipeReducer from './recipe_reducer';
import reviewReducer from './review_reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  recipes: recipeReducer,
  reviews: reviewReducer
});
export default rootReducer;
