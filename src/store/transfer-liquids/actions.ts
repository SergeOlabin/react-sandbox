import { Bulb } from '../../components/board-component/Board';
import * as actionsTypes from './types';
import { WaterSource } from '../../components/water-source/WaterSource';

export function transferLiquid(
  bulbs: Bulb[],
) {
  return {
    type: actionsTypes.TRANSFER_LIQUID,
    data: bulbs,
  }
}

export const emptyBulb = (bulb: Bulb) => ({
  type: actionsTypes.EMPTY_BULB,
  data: bulb,
});

export const removeBulb = (bulb: Bulb) => ({
  type: actionsTypes.REMOVE_BULB,
  data: bulb,
});

export const selectBulb = (bulb: Bulb | WaterSource) => ({
  type: actionsTypes.SELECT_BULB,
  data: bulb,
});

export const removeBulbSelection = () => ({
  type: actionsTypes.REMOVE_BULB_SELECTION,
});

export const addBulb = ({ volume, waterLevel = 0 }: { volume: number, waterLevel: number }) => ({
  type: actionsTypes.ADD_BULB,
  data: {
    volume,
    waterLevel,
  },
});
