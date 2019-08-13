import { Bulb } from '../../TS-types';
import { screenType, TransferLiquidsState } from '../storeShapes';
import * as actionsTypes from './types';

export interface ITransferLiquidActions {
  type: string;
  data?: any;
  screen: screenType;
}

const transfusionInitialState: TransferLiquidsState = {
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

const colorMixerInitialState: TransferLiquidsState = {
  bulbId: 10,
  bulbs: [
    {
      id: 0,
      volume: 2,
      waterLevel: 0,
    },
    {
      id: 2,
      volume: 2,
      waterLevel: 0,
    },
    {
      id: 3,
      volume: 10,
      waterLevel: 0,
    },
  ],
  selectedBulb: null,
};

export function transferLiquidReducer(
  state = transfusionInitialState,
  action: ITransferLiquidActions,
): TransferLiquidsState {
  return action.screen === 'transf'
    ? commonLiquidsReducer(state, action)
    : state;
}

export function colorMixerReducer(
  state = colorMixerInitialState,
  action: ITransferLiquidActions,
): TransferLiquidsState {
  return action.screen === 'mixer'
    ? commonLiquidsReducer(state, action)
    : state;
}

export function commonLiquidsReducer(
  state = transfusionInitialState,
  action: ITransferLiquidActions,
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
        bulbs[bulbIndex].waterColor = [0, 0, 0];

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
