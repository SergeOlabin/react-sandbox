import { WaterSource } from '../../components/water-source/WaterSource';
import { Bulb, waterColorType } from '../../TS-types';
import { screenType } from '../storeShapes';
import * as actionsTypes from './types';

export function transferLiquid({
  bulbs,
  screen,
}: {
  bulbs: Bulb[];
  screen: screenType;
}) {
  return {
    type: actionsTypes.TRANSFER_LIQUID,
    data: bulbs,
    screen,
  };
}

export function actionOnBulb({
  type,
  bulb,
  screen,
}: {
  type: actionsTypes.BULB_ACTION_TYPE;
  bulb: Bulb | WaterSource;
  screen: screenType;
}) {
  console.log({
    data: bulb,
    type,
    screen,
  });
  return {
    type,
    data: bulb,
    screen,
  };
}

export const removeBulbSelection = ({ screen }: { screen: screenType }) => ({
  type: actionsTypes.REMOVE_BULB_SELECTION,
  screen,
});

export const addBulb = (opts: {
  data: {
    volume: number;
    waterLevel: number;
    waterColor?: waterColorType;
  };
  screen: screenType;
}) => ({
  type: actionsTypes.ADD_BULB,
  ...opts,
});
