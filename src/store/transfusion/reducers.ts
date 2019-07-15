import { Bulb } from '../../TS-types';
import { TransferLiquidsState } from '../storeShapes';
import * as actionsTypes from './types';

// tslint:disable-next-line: class-name
interface transferLiquidActions {
  type: string;
  data?: any;
};
const initialState: TransferLiquidsState = {
  bulbId: 2,
  bulbs: [
    {
      id: 0,
      volume: 10,
      waterLevel: 0,
    },
    {
      id: 1,
      volume: 10,
      waterLevel: 2,
    },
  ],
  selectedBulb: null,
};

export function transferLiquidReducer(
  state = initialState,
  action: transferLiquidActions,
): TransferLiquidsState {
  switch (action.type) {
    case actionsTypes.TRANSFER_LIQUID:
      return {
        ...state,
        bulbs: action.data,
      };

    case actionsTypes.EMPTY_BULB:
      return (() => {
        const bulbs = { ...state }.bulbs;
        const bulbIndex = bulbs.findIndex((elem: Bulb) => action.data === elem);
        bulbs[bulbIndex].waterLevel = 0;

        return {
          ...state,
          bulbs,
        };
      })();

    case actionsTypes.REMOVE_BULB:
      return (() => {
        const bulb = action.data;
        const bulbs = { ...state }.bulbs;
        const bulbIndex = bulbs.findIndex((elem: Bulb) => bulb === elem);
        bulbs.splice(bulbIndex, 1);

        return {
          ...state,
          bulbs,
        };
      })();

    case actionsTypes.SELECT_BULB:
      return {
        ...state,
        selectedBulb: action.data,
      };

    case actionsTypes.REMOVE_BULB_SELECTION:
      return {
        ...state,
        selectedBulb: null,
      };

    case actionsTypes.ADD_BULB:
      return (() => {
        const id = state.bulbId++;

        const { volume, waterLevel } = action.data;
        const volumeValidated = volume || 1;

        const bulbs = [...state.bulbs];
        bulbs.push({
          id,
          volume: volumeValidated,
          waterLevel,
        });
        return {
          ...state,
          bulbs,
        };
      })();

    default:
      return state;
  }
}
