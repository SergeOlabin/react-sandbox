import { Bulb, selectedBulbType } from '../TS-types';

export interface StoreState {
  colorMixerState: TransferLiquidsState;
  transferLiquids: TransferLiquidsState;
}

export interface TransferLiquidsState {
  bulbs: Bulb[];
  selectedBulb: selectedBulbType;
  bulbId: number;
}

export type screenType = 'transf' | 'mixer';

export interface ITransferLiquidActions {
  type: string;
  data?: any;
  screen: screenType;
}
