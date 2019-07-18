import { WaterSource } from '../components/water-source/WaterSource';
import { Bulb } from '../TS-types';

export interface StoreState {
  colorMixerState: TransferLiquidsState;
  transferLiquids: TransferLiquidsState;
}

export interface TransferLiquidsState {
  bulbs: Bulb[];
  selectedBulb: Bulb | WaterSource | null;
  bulbId: number;
}

export type screenType = 'transf' | 'mixer';

export interface transferLiquidActions {
  type: string;
  data?: any;
  screen: screenType;
}
