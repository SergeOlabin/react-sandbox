import { WaterSource } from '../components/water-source/WaterSource';
import { Bulb } from '../TS-types';

export interface StoreState {
  transferLiquids: TransferLiquidsState;
}

export interface TransferLiquidsState {
    bulbs: Bulb[];
    selectedBulb: Bulb | WaterSource | null;
    bulbId: number;
}
