import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

import { combineReducers } from 'redux';
import { transferLiquidReducer } from './transfer-liquids/reducers';

export const rootReducer = combineReducers({
  transferLiquids: transferLiquidReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
const middlewares = [thunkMiddleware];
const middleWareEnhancer = applyMiddleware(...middlewares);

export const store = createStore(
  rootReducer,
  // composeWithDevTools(middleWareEnhancer),
  composeWithDevTools(middleWareEnhancer)
);

