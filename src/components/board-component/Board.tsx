import React, { RefObject } from 'react';
import BulbComponent from '../bulb/Bulb';
import FooterComponent from '../footer/Footer';
import { WaterSource } from '../water-source/WaterSource';
import './board.scss';
import { Water } from '../water/Water';
import { isEqual, max } from 'lodash';
import { connect } from 'react-redux';
import { AppState } from '../../store/store';
import { transferLiquid, removeBulbSelection, selectBulb, addBulb } from '../../store/transfer-liquids/actions';
import { TransferLiquidsState } from '../../store/storeShapes';

interface BoardComponentProps {
  transferLiquidsState: TransferLiquidsState,
  transferLiquid: typeof transferLiquid,
  removeBulbSelection: typeof removeBulbSelection,
  selectBulb: typeof selectBulb,
}

export interface Bulb {
  id: number,
  volume: number,
  waterLevel: number,
}

class BoardComponent extends React.Component<BoardComponentProps> {
  get bulbs(): Bulb[] {
    return this.props.transferLiquidsState.bulbs;
  }

  // TODO: get type from storeShapes
  get selectedBulb(): Bulb | WaterSource | null {
    return this.props.transferLiquidsState.selectedBulb;
  }

  bubleClick(bulb: Bulb | WaterSource) {
    if (!this.selectedBulb) this.props.selectBulb(bulb);
    else if (isEqual(bulb, this.selectedBulb)) this.props.removeBulbSelection();
    else this._transferLiquid(bulb);
  }

  private _transferLiquid(destinationBulb: Bulb | WaterSource) {
    if (destinationBulb instanceof WaterSource) return;

    const destinationBulbIndex = this.bulbs.findIndex((elem: Bulb) => destinationBulb === elem);
    const newBulbs = [...this.bulbs];
    const destinationBulbNew = newBulbs[destinationBulbIndex];

    if (this.selectedBulb instanceof WaterSource) {
      destinationBulbNew.waterLevel = destinationBulbNew.volume;

    } else {
      const selectedBulb = (this.selectedBulb as Bulb);
      const possibleAmountOfLiquidToAdd = destinationBulbNew.volume - destinationBulbNew.waterLevel;

      const rest = max([
        selectedBulb.waterLevel - possibleAmountOfLiquidToAdd,
        0,
      ]) as number;
      const addition = selectedBulb.waterLevel - rest;

      const selectedBulbIndex = this.bulbs
        .findIndex((elem: Bulb) => selectedBulb === elem);
      const selectedBulbNew = newBulbs[selectedBulbIndex];

      destinationBulbNew.waterLevel = destinationBulbNew.waterLevel + addition;
      selectedBulbNew.waterLevel = rest;
    }

    this.props.transferLiquid(newBulbs);
    this.setState({ bulbs: newBulbs });
    this.props.removeBulbSelection();
  }

  render() {
    const bulbs = this.bulbs.map((bulb: Bulb) =>
      <BulbComponent
        key={bulb.id}
        value={bulb}
        selected={isEqual(this.selectedBulb, bulb)}
        onClick={this.bubleClick.bind(this)}
      />
    );

    return (
      <div className="board" onClick={this.props.removeBulbSelection.bind(this)}>
        <div className="bulbs-container">
          <div className="bulbs">{bulbs}</div>
          <WaterSource
            selected={this.selectedBulb instanceof WaterSource}
            onClick={this.bubleClick.bind(this)}
          ><Water waterLevel='inf'></Water>
          </WaterSource>
        </div>

        <FooterComponent />
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  transferLiquidsState: state.transferLiquids,
});

export default connect(
  mapStateToProps,
  { transferLiquid, removeBulbSelection, selectBulb },
)(BoardComponent);
