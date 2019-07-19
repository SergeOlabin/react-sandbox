import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
// import { colorMixerReducer } from './color-mixer/reducers';
import {
  colorMixerReducer,
  transferLiquidReducer,
} from './transfusion/reducers';

export const history = createBrowserHistory();
export const rootReducer = combineReducers({
  transferLiquids: transferLiquidReducer,
  colorMixer: colorMixerReducer,
  router: connectRouter(history),
});

export type AppState = ReturnType<typeof rootReducer>;

const middlewares = [thunkMiddleware, routerMiddleware(history)];
const middleWareEnhancer = applyMiddleware(...middlewares);

export const store = createStore(
  rootReducer,
  composeWithDevTools(middleWareEnhancer),
);
