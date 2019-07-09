import { TransferLiquidsState } from '../storeShapes';
import * as actionsTypes from './types';
import { Bulb } from '../../components/board-component/Board';

type transferLiquidActions = {
    type: string,
    data: any,
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
    switch (action.type) {
        case actionsTypes.TRANSFER_LIQUID:
            return {
                ...state,
                bulbId: state.bulbId++,
                bulbs: action.data,
            }

        default:
            return state;
    }
}
