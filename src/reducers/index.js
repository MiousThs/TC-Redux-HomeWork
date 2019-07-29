// not successful:(
import { combineReducers } from 'redux';
import shopReducer from './shop.reducer';
import dataReducer from './data.reducer';

export const rootReducer = combineReducers({
    shopReducer,
    dataReducer
});