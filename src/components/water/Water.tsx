import React from 'react';
import { waterColorType } from '../../TS-types';
import { ColorMixerHelper } from '../color-mixer/color-mixer-helper';

interface WaterProps {
  waterLevel: number | 'inf';
  waterColor?: waterColorType;
}

export class Water extends React.Component<WaterProps> {
  get backgroundColor() {
    if (!this.props.waterColor) return 'aqua';

    switch (this.props.waterColor) {
      case 'b':
        return ColorMixerHelper.BLUE;
      case 'g':
        return ColorMixerHelper.GREEN;
      case 'r':
        return ColorMixerHelper.RED;

      default:
        return ColorMixerHelper.formatColorToRGBA((this.props
          .waterColor as unknown) as number[]);
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
