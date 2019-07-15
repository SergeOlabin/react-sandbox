import React from 'react';
import { waterColorType } from '../../TS-types';

interface WaterProps {
	waterLevel: number | 'inf';
	waterColor?: waterColorType;
}

export class Water extends React.Component<WaterProps> {
  public getWaterLevel() {
    return this.props.waterLevel === 'inf'
      ? '100%'
      : `${this.props.waterLevel * 10}px`;
  }

  public render() {
    return (
      <div style={{ height: this.getWaterLevel() }} className="water"></div>
    );
  }
}
