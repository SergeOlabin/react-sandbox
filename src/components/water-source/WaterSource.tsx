import React from 'react';
import { IWaterSource, waterColorType } from '../../TS-types';
import { selectedBulbStyles } from '../board-component/SelectedBulbStyles.const';
import { Water } from '../water/Water';
import './water-source.scss';

interface WaterSourceProps {
  onClick: Function;
  selected: boolean;
  waterColor?: waterColorType;
  value: IWaterSource;
}

export class WaterSource extends React.Component<WaterSourceProps> {
  public onClick(evt: React.MouseEvent<any>) {
    evt.stopPropagation();
    this.props.onClick(this.props.value);
  }

  public render() {
    return (
      <div
        style={this.props.selected ? selectedBulbStyles : undefined}
        onClick={this.onClick.bind(this)}
        className="water-source water-bulb"
      >
        <Water waterLevel="inf" waterColor={this.props.waterColor}></Water>
        <span className="water-level-label">
          <i className="fas fa-infinity"></i>
        </span>
      </div>
    );
  }
}
