import { max } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/store';
import { TransferLiquidsState } from '../../store/storeShapes';
import {
  actionOnBulb,
  removeBulbSelection,
  transferLiquid,
} from '../../store/transfusion/actions';
import {
  Bulb,
  IWaterSource,
  selectedBulbType,
  shorthandColorType,
} from '../../TS-types';
import BoardComponent from '../board-component/Board';
import { ColorMixerHelper } from './color-mixer-helper';
import './color-mixer.scss';

export interface IColorMixerProps {
  colorMixerState: TransferLiquidsState;
  removeBulbSelection: typeof removeBulbSelection;
  actionOnBulb: typeof actionOnBulb;
  transferLiquid: typeof transferLiquid;
}

class ColorMixerC extends React.Component<IColorMixerProps> {
  get selectedBulb(): selectedBulbType {
    return this.props.colorMixerState.selectedBulb;
  }

  get bulbs(): Bulb[] {
    return this.props.colorMixerState.bulbs;
  }
  public waterSourceConfig: IWaterSource[] = [
    { waterColor: 'r', id: 1 },
    { waterColor: 'g', id: 2 },
    { waterColor: 'b', id: 3 },
  ];

  private _isBulbWaterSource(bulb: Bulb | IWaterSource) {
    const typeChecker = bulb as Bulb;
    return !typeChecker.volume;
  }

  // TODO: refactor
  public transferLiquid(destinationBulb: Bulb | IWaterSource) {
    if (this._isBulbWaterSource(destinationBulb)) return;

    const destinationBulbIndex = this.bulbs.findIndex(
      (elem: Bulb) => destinationBulb === elem,
    );
    const newBulbs = [...this.bulbs];
    const destinationBulbNew = newBulbs[destinationBulbIndex];

    if (this.selectedBulb && this._isBulbWaterSource(this.selectedBulb)) {
      const selectedBulb = this.selectedBulb;

      const destinationBulbColor = destinationBulb.waterColor as shorthandColorType;
      const selectedBulbColor = selectedBulb.waterColor as shorthandColorType;
      const addition =
        destinationBulbNew.volume - destinationBulbNew.waterLevel;
      const colorRatio = addition / (destinationBulbNew.waterLevel + addition);
      const resultColor = ColorMixerHelper.mixColors(
        selectedBulbColor,
        destinationBulbColor,
        colorRatio,
      );
      destinationBulbNew.waterLevel = destinationBulbNew.volume;
      destinationBulbNew.waterColor = resultColor;
    } else {
      const selectedBulb = this.selectedBulb as Bulb;
      const possibleAmountOfLiquidToAdd =
        destinationBulbNew.volume - destinationBulbNew.waterLevel;

      const rest = max([
        selectedBulb.waterLevel - possibleAmountOfLiquidToAdd,
        0,
      ]) as number;
      const addition = selectedBulb.waterLevel - rest;

      const selectedBulbIndex = this.bulbs.findIndex(
        (elem: Bulb) => selectedBulb === elem,
      );
      const selectedBulbNew = newBulbs[selectedBulbIndex];

      // TODO: work on as numbers
      const destinationBulbColor = destinationBulb.waterColor as shorthandColorType;
      const selectedBulbColor = selectedBulb.waterColor as shorthandColorType;
      const colorRatio = addition / (destinationBulbNew.waterLevel + addition);
      const resultColor = ColorMixerHelper.mixColors(
        selectedBulbColor,
        destinationBulbColor,
        colorRatio,
      );

      selectedBulbNew.waterLevel = rest;
      destinationBulbNew.waterLevel = destinationBulbNew.waterLevel + addition;
      destinationBulbNew.waterColor = resultColor;
    }

    this.props.transferLiquid({ bulbs: newBulbs });
    this.props.removeBulbSelection();
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
    transferLiquid,
  },
)(ColorMixerC);
export default ColorMixer;
