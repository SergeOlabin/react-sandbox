import React from 'react';
import { selectedBulbStyles } from '../board-component/SelectedBulbStyles.const';

interface WaterSourceProps {
    onClick: Function,
    selected: boolean,
}

interface WaterSourceState {

}

export class WaterSource extends React.Component<WaterSourceProps, WaterSourceState> {
    onClick(evt: React.MouseEvent<any>) {
        evt.stopPropagation();
        this.props.onClick(this)
    }

    render() {
        return (
            <div
                style={this.props.selected ? selectedBulbStyles : undefined}
                onClick={this.onClick.bind(this)}
                className="water-source water-bulb">
                {this.props.children}
                <span className="water-level-label">
                    <i className="fas fa-infinity"></i>
                </span>
            </div>
        )
    }
}
