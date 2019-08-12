import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import {
  colorMixerReducer,
  transferLiquidReducer,
} from './transfusion/reducers';
import { postsData } from './user-data/reducers';

export const history = createBrowserHistory();
export const rootReducer = combineReducers({
  transferLiquids: transferLiquidReducer,
  colorMixer: colorMixerReducer,
  postsData, // the same name can be used for key and reducer value without specifiyng 'reducer'
  router: connectRouter(history),
});

export type AppState = ReturnType<typeof rootReducer>;

const middlewares = [thunkMiddleware, routerMiddleware(history)];
const middleWareEnhancer = applyMiddleware(...middlewares);

export const store = createStore(
  rootReducer,
  composeWithDevTools(middleWareEnhancer),
);
