import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Thunk from 'redux-thunk';

import '../public/style.css';
import reducers from './reducers';

import App from './components/App';

const store = applyMiddleware(Thunk)(createStore)(reducers)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
