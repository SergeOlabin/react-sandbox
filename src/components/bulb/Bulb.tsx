import React from 'react';
import { Bulb } from '../board-component/Board';
import { Water } from '../water/Water';
import { selectedBulbStyles } from '../board-component/SelectedBulbStyles.const';

interface BulbProps {
    value: Bulb,
    onClick: Function,
    selected: boolean,
}

interface BulbState {

}

export class BulbComponent extends React.Component<BulbProps, BulbState> {
    getSetyles() {
        return {
            height: `${this.props.value.volume * 10}px`,
            boxShadow: this.props.selected
                ? selectedBulbStyles.boxShadow
                : 'none',
        }
    }

    onClick(evt: React.MouseEvent<any>) {
        evt.stopPropagation();
        this.props.onClick(this.props.value)
    }

    render() {
        return (
            <div
                onClick={this.onClick.bind(this)}
                className="water-bulb"
                style={this.getSetyles()} >
                    <Water waterLevel={this.props.value.waterLevel}></Water>
                <span className="water-level-label">
                    {this.props.value.waterLevel} / {this.props.value.volume}
                </span>
            </div>
        )
    }
}
