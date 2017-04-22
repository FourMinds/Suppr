import { createStore, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';
import reducers from '../reducers/';

const createRecipeState = {
  form: {},
  auth: {username: null, authenticated: false},
  userInfo: {
    Bluzkry: {
      favoritesCount: 6,
      followersCount: 3,
      followsCount: 3,
      recipesCount: 2,
      sporksCount: 6
    }
  },
  profile: {
    data: {
      bio: 'I hope to share all my cooking recipes and tips with everybody here.',
      image: '',
      style: 'See my recipes!',
      location: 'San Francisco'
    }
  }
};

export const createRecipeStore = applyMiddleware(Thunk)(createStore)(reducers, createRecipeState);

