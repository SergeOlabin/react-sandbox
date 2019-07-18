import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
// import { colorMixerReducer } from './color-mixer/reducers';
import {
  colorMixerReducer,
  transferLiquidReducer,
} from './transfusion/reducers';

export const rootReducer = combineReducers({
  transferLiquids: transferLiquidReducer,
  colorMixer: colorMixerReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const middlewares = [thunkMiddleware];
const middleWareEnhancer = applyMiddleware(...middlewares);

export const store = createStore(
  rootReducer,
  // composeWithDevTools(middleWareEnhancer),
  composeWithDevTools(middleWareEnhancer),
);
