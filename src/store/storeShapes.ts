import { Bulb } from '../components/board-component/Board';
import { WaterSource } from '../components/water-source/WaterSource';

export interface TransferLiquidsState {
    bulbs: Bulb[],
    selectedBulb: Bulb | WaterSource | null,
    bulbId: number,
}
export interface StoreState {
    transferLiquids: TransferLiquidsState,
};
