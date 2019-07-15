import React from 'react';
import { waterColorType } from '../../TS-types';

interface WaterProps {
	waterLevel: number | 'inf';
	waterColor?: waterColorType;
}

export class Water extends React.Component<WaterProps> {
  get backgroundColor() {
    switch (this.props.waterColor) {
      case ('b'): return 'aqua';
      case ('g'): return 'green';
      case ('r'): return 'red';

      default: return 'aqua';
    }
  }

  public getWaterLevel() {
    return this.props.waterLevel === 'inf'
      ? '100%'
      : `${this.props.waterLevel * 10}px`;
  }

  public render() {
    return (
      <div
        style={{
          height: this.getWaterLevel(),
          backgroundColor: this.backgroundColor,
        }}
        className="water"
      ></div>
    );
  }
}
