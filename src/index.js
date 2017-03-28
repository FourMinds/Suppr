import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Thunk from 'redux-thunk';

import '../public/style.css';
import reducers from './reducers';

import App from './components/App';
import Signin from './components/auth/Signin';
import Signout from './components/auth/Signout';
import Signup from './components/auth/Signup';
import HomeNoAuth from './components/HomeNoAuth';
import RequireAuth from './components/auth/require_auth';

const store = applyMiddleware(Thunk)(createStore)(reducers)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={HomeNoAuth} />
        <Route path='auth/signin' component={Signin} />
        <Route path='auth/signup' component={Signup} />
        <Route path='auth/signout' component={Signout} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
