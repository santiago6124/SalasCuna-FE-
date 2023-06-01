import {applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../src/reducers/auth";
import { legacy_createStore as createStore } from 'redux';

const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware))
);

export default store;