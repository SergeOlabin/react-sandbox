import { isEqual, max } from 'lodash';
import React from 'react';
import { TransferLiquidsState } from '../../store/storeShapes';
import BulbComponent from '../bulb/Bulb';
import FooterComponent from '../footer/Footer';
import { WaterSource } from '../water-source/WaterSource';
import { Water } from '../water/Water';
import './board.scss';

interface BoardComponentProps {
  transferLiquidsState: TransferLiquidsState;
  transferLiquid: Function;
  removeBulbSelection: Function;
  selectBulb: Function;
  bulbs: Bulb[];
  selectedBulb: Bulb | WaterSource | null;
}

export interface Bulb {
  id: number;
  volume: number;
  waterLevel: number;
}

export default class BoardComponent extends React.Component<BoardComponentProps> {
  public bubleClick(bulb: Bulb | WaterSource) {
    if (!this.props.selectedBulb) this.props.selectBulb(bulb);
    else if (isEqual(bulb, this.props.selectedBulb)) this.props.removeBulbSelection();
    else this.props.transferLiquid(bulb);
  }

  public render() {
    const bulbs = this.props.bulbs.map((bulb: Bulb) =>
      <BulbComponent
        key={bulb.id}
        value={bulb}
        selected={isEqual(this.props.selectedBulb, bulb)}
        onClick={this.bubleClick.bind(this)}
      />,
    );

    return (
      <div className="board" onClick={this.props.removeBulbSelection.bind(this)}>
        <div className="bulbs-container">
          <div className="bulbs">{bulbs}</div>
          <WaterSource
            selected={this.props.selectedBulb instanceof WaterSource}
            onClick={this.bubleClick.bind(this)}
            ><Water waterLevel='inf'/>
          </WaterSource>
        </div>

        <FooterComponent />
      </div>
    );
  }

  private _transferLiquid(destinationBulb: Bulb | WaterSource) {
    if (destinationBulb instanceof WaterSource) return;

    const destinationBulbIndex = this.props.bulbs.findIndex((elem: Bulb) => destinationBulb === elem);
    const newBulbs = [...this.props.bulbs];
    const destinationBulbNew = newBulbs[destinationBulbIndex];

    if (this.props.selectedBulb instanceof WaterSource) {
      destinationBulbNew.waterLevel = destinationBulbNew.volume;

    } else {
      const selectedBulb = (this.props.selectedBulb as Bulb);
      const possibleAmountOfLiquidToAdd = destinationBulbNew.volume - destinationBulbNew.waterLevel;

      const rest = max([
        selectedBulb.waterLevel - possibleAmountOfLiquidToAdd,
        0,
      ]) as number;
      const addition = selectedBulb.waterLevel - rest;

      const selectedBulbIndex = this.props.bulbs
        .findIndex((elem: Bulb) => selectedBulb === elem);
      const selectedBulbNew = newBulbs[selectedBulbIndex];

      destinationBulbNew.waterLevel = destinationBulbNew.waterLevel + addition;
      selectedBulbNew.waterLevel = rest;
    }

    this.props.transferLiquid(newBulbs);
    this.setState({ bulbs: newBulbs });
    this.props.removeBulbSelection();
  }
}
