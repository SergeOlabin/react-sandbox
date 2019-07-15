import { max } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/store';
import { TransferLiquidsState } from '../../store/storeShapes';
import { addBulb, removeBulbSelection, selectBulb, transferLiquid } from '../../store/transfusion/actions';
import { Bulb, waterColorType } from '../../TS-types';
import BoardComponent from '../board-component/Board';
import FooterComponent from '../footer/Footer';
import { WaterSource } from '../water-source/WaterSource';

export interface ITransfusionComponentProps {
  transferLiquidsState: TransferLiquidsState;
  transferLiquid: typeof transferLiquid;
  removeBulbSelection: typeof removeBulbSelection;
  selectBulb: typeof selectBulb;
  addBulb: typeof addBulb;
}

class TransfusionComponentC extends React.Component<
  ITransfusionComponentProps
> {
  public waterSourceConfig = [{ waterColor: 'b' as waterColorType }];

  get bulbs(): Bulb[] {
    return this.props.transferLiquidsState.bulbs;
  }

  // TODO: get type from storeShapes
  get selectedBulb(): Bulb | WaterSource | null {
    return this.props.transferLiquidsState.selectedBulb;
  }

  public transferLiquid(destinationBulb: Bulb | WaterSource) {
    if (destinationBulb instanceof WaterSource) return;

    const destinationBulbIndex = this.bulbs.findIndex(
      (elem: Bulb) => destinationBulb === elem,
    );
    const newBulbs = [...this.bulbs];
    const destinationBulbNew = newBulbs[destinationBulbIndex];

    if (this.selectedBulb instanceof WaterSource) {
      destinationBulbNew.waterLevel = destinationBulbNew.volume;
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

      destinationBulbNew.waterLevel = destinationBulbNew.waterLevel + addition;
      selectedBulbNew.waterLevel = rest;
    }

    this.props.transferLiquid(newBulbs);
    this.props.removeBulbSelection();
  }

  public render() {
    return (
      <div>
        <BoardComponent
          transferLiquid={this.transferLiquid.bind(this)}
          removeBulbSelection={this.props.removeBulbSelection.bind(this)}
          selectBulb={this.props.selectBulb}
          bulbs={this.bulbs}
          selectedBulb={this.selectedBulb}
          waterSourceConfig={this.waterSourceConfig}
        ></BoardComponent>
        <FooterComponent addBulb={this.props.addBulb} />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  transferLiquidsState: state.transferLiquids,
});

const TransfusionComponent = connect(
  mapStateToProps,
  { transferLiquid, removeBulbSelection, selectBulb, addBulb },
)(TransfusionComponentC);
export default TransfusionComponent;

