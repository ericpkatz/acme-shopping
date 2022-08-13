import { createStore, combineReducers, applyMiddleware } from 'redux';
import auth from './auth';
import cart from './cart';
import products from './products';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const reducer = combineReducers({
  auth,
  cart,
  products
});

const store = createStore(reducer, applyMiddleware(thunk, logger));


export default store;
export * from './auth';
export * from './cart';
export * from './products';