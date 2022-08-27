import { createStore, combineReducers, applyMiddleware } from 'redux';
import auth from './store/auth';
import cart from './store/cart';
import products from './store/products';
import orders from './store/orders';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import users from './store/users';

const reducer = combineReducers({
  auth,
  cart,
  products,
  users,
  orders
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
export * from './store/auth';
export * from './store/cart';
export * from './store/products';
export * from './store/orders';
export * from './store/users';

