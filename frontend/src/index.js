import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { combineReducers } from 'redux';
import Auth from './reducers/auth';

export default combineReducers({
  Auth
});
