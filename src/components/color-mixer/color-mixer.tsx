import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/store';
import { TransferLiquidsState } from '../../store/storeShapes';
import {
  actionOnBulb,
  removeBulbSelection,
} from '../../store/transfusion/actions';
import { Bulb, IWaterSource, selectedBulbType } from '../../TS-types';
import BoardComponent from '../board-component/Board';
import './color-mixer.scss';

export interface IColorMixerProps {
  colorMixerState: TransferLiquidsState;
  removeBulbSelection: typeof removeBulbSelection;
  actionOnBulb: typeof actionOnBulb;
}

class ColorMixerC extends React.Component<IColorMixerProps> {
  public waterSourceConfig: IWaterSource[] = [
    { waterColor: 'r', id: 1 },
    { waterColor: 'g', id: 2 },
    { waterColor: 'b', id: 3 },
  ];

  get selectedBulb(): selectedBulbType {
    return this.props.colorMixerState.selectedBulb;
  }

  get bulbs(): Bulb[] {
    return this.props.colorMixerState.bulbs;
  }

  public transferLiquid() {
    console.log('TRANSFER LIQUID');
  }

  public render() {
    return (
      <div className="color-mixer">
        <BoardComponent
          transferLiquid={this.transferLiquid.bind(this)}
          removeBulbSelection={this.props.removeBulbSelection.bind(this)}
          selectBulb={this.props.actionOnBulb}
          bulbs={this.bulbs}
          selectedBulb={this.selectedBulb}
          waterSourceConfig={this.waterSourceConfig}
        ></BoardComponent>
      </div>
    );
  }
}
const mapStateToProps = (state: AppState) => ({
  colorMixerState: state.colorMixer,
});

const ColorMixer = connect(
  mapStateToProps,
  {
    removeBulbSelection,
    actionOnBulb,
  },
)(ColorMixerC);
export default ColorMixer;
