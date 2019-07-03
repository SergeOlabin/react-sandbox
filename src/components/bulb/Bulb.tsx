import React from 'react';
import { Bulb } from '../board-component/Board';
import { Water } from '../water/Water';

interface BulbProps {
    value: Bulb,
}

interface BulbState {

}

export class BulbComponent extends React.Component<BulbProps, BulbState> {
    styles = {
        height: `${this.props.value.volume * 10}px`,
    }

    render() {
        return (
            <div
                className="water-bulb"
                style={this.styles} >
                    <Water waterLevel={this.props.value.waterLevel}></Water>
                <span className="water-level-label">
                    {this.props.value.waterLevel} / {this.props.value.volume}
                </span>
            </div>
        )
    }
}
