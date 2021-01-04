import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import routes from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
/*import { Provider } from 'react-redux'
import user from './reducers/user'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxPromise from 'redux-promise';

const reducer = combineReducers({
  user
});

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);*/

ReactDOM.render(
  <>
    <Router>{routes}</Router>
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
