import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Thunk from 'redux-thunk';

import '../public/style.css';
import reducers from './reducers';

import App from './components/App';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import RequireAuth from './components/auth/require_auth';

const store = applyMiddleware(Thunk)(createStore)(reducers)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>

      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
