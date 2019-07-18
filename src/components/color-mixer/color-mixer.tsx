import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/store';
import { TransferLiquidsState } from '../../store/storeShapes';

export interface IColorMixerProps {
  colorMixerState: TransferLiquidsState;
}

class ColorMixerC extends React.Component<IColorMixerProps> {
  public componentDidMount() {}

  public render() {
    return <div>COLOR MIXER</div>;
  }
}
const mapStateToProps = (state: AppState) => ({
  colorMixerState: state.colorMixer,
});

const ColorMixer = connect(mapStateToProps)(ColorMixerC);
export default ColorMixer;
