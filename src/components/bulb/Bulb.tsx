import React from 'react';
import { Bulb } from '../board-component/Board';

interface BulbProps {
    value: Bulb,
}

interface BulbState {

}

export class BulbComponent extends React.Component<BulbProps, BulbState> {
    render() {
        return (
            <div className="water-bulb">
                <span className="water-level-label">someWater</span>
            </div>
        )
    }
}
