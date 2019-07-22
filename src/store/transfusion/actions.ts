import { Bulb, IWaterSource, waterColorType } from '../../TS-types';
import { routeToStateMap } from '../router-config';
import { store } from '../store';
import * as actionsTypes from './types';

const getScreenName = () => {
  const route = store.getState().router.location.pathname.replace('/', '');
  return routeToStateMap[route];
};

export function transferLiquid({ bulbs }: { bulbs: Bulb[] }) {
  return {
    type: actionsTypes.TRANSFER_LIQUID,
    data: bulbs,
    screen: getScreenName(),
  };
}

export function actionOnBulb({
  type,
  bulb,
}: {
  type: actionsTypes.BULB_ACTION_TYPE;
  bulb: Bulb | IWaterSource;
}) {
  return {
    type,
    data: bulb,
    screen: getScreenName(),
  };
}

export const removeBulbSelection = () => ({
  type: actionsTypes.REMOVE_BULB_SELECTION,
  screen: getScreenName(),
});

export const addBulb = (data: {
  volume: number;
  waterLevel: number;
  waterColor?: waterColorType;
}) => ({
  type: actionsTypes.ADD_BULB,
  screen: getScreenName(),
  data,
});
