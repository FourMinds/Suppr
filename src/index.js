import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Thunk from 'redux-thunk';

import { getUsername } from './actions';
import '../public/bootstrap/css/bootstrap.css';
import '../public/style.css';
import reducers from './reducers';

import App from './components/App';
import Signin from './components/auth/Signin';
import Signout from './components/auth/Signout';
import Signup from './components/auth/Signup';
import ForgotPass from './components/auth/ForgotPass';
import ResetPass from './components/auth/ResetPass';
import HomeNoAuth from './components/landing/HomeNoAuth';
import SearchPage from './components/search/SearchPage';
import Create from './components/create-recipe/Create';
import Update from './components/update-recipe/Update';
import Spork from './components/recipe-variation/Spork';
import Settings from './components/profile/Settings';
import RecipeView from './components/view-recipe/RecipeView';
import RequireAuth from './components/auth/require-auth';
import Profile from './components/profile/Profile';
import FourOFour from './components/auth/FourOFour';

const store = applyMiddleware(Thunk)(createStore)(reducers);

const token = localStorage.getItem('token');
if(token) {
  store.dispatch(getUsername(token))
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={HomeNoAuth} />
        <Route path='auth/signin' component={Signin} />
        <Route path='auth/signup' component={Signup} />
        <Route path='auth/signout' component={Signout} />
        <Route path='auth/forgot' component={ForgotPass} />
        <Route path='auth/reset/:token' component={ResetPass} />
        <Route path='recipe/:id' component={RecipeView} />
        <Route path='recipe/:id/:sporkId' component={RecipeView} />
        <Route path='search' component={SearchPage} />
        <Route path='create' component={RequireAuth(Create)} />
        <Route path='edit' component={RequireAuth(Update)} />
        <Route path='spork' component={RequireAuth(Spork)} />
        <Route path='profile/:username' component={Profile} />
        <Route path='/settings' component={Settings} />
        <Route path='*' component={FourOFour} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
