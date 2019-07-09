import { TransferLiquidsState } from '../storeShapes';
import * as actions from '../actions/transferLiquids.actions';

type transferLiquidActions = {
    type: string,
}
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
        }
    ],
    selectedBulb: null,
};

export function transferLiquidReducer(
    state = initialState,
    action: transferLiquidActions,
): TransferLiquidsState {
    return state;
}
