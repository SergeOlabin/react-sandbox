import React from 'react';
import { selectedBulbStyles } from '../board-component/SelectedBulbStyles.const';
import './water-source.scss';

interface WaterSourceProps {
  onClick: Function;
  selected: boolean;
}

export class WaterSource extends React.Component<WaterSourceProps> {
  public onClick(evt: React.MouseEvent<any>) {
    evt.stopPropagation();
    this.props.onClick(this);
  }

  public render() {
    return (
      <div
        style={this.props.selected ? selectedBulbStyles : undefined}
        onClick={this.onClick.bind(this)}
        className="water-source water-bulb"
      >
        {this.props.children}
        <span className="water-level-label">
          <i className="fas fa-infinity"></i>
        </span>
      </div>
    );
  }
}
