import { combineReducers } from 'redux';
import { transferLiquidReducer } from './transferLiquid';

export const rootReducer = combineReducers({
  transferLiquids: transferLiquidReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
