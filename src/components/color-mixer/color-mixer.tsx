import * as React from 'react';
import { connect } from 'react-redux';
import { transferLiquid } from '../../store/transfusion/actions';

export interface IColorMixerProps {
}

class ColorMixerC extends React.Component<IColorMixerProps> {
  public render() {
    return (
      <div>
        COLOR MIXER
      </div>
    );
  }
}

const ColorMixer = connect(
  null,
  { transferLiquid },
)(ColorMixerC);
export default ColorMixer;
