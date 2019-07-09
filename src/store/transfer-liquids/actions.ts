import { Bulb } from '../../components/board-component/Board';
import { TRANSFER_LIQUID } from './types';

export function transferLiquidAction(
    bulbs: Bulb[],
) {
    return {
        type: TRANSFER_LIQUID,
        data: bulbs,
    }
}
