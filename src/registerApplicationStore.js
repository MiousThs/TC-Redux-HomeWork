import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import productReducer from './reducers/shop.reducer';

export default function setupStore() {
  return createStore(productReducer, applyMiddleware(thunk))
}

