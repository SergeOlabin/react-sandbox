import { isEqual } from 'lodash';
import React from 'react';
import { TransferLiquidsState } from '../../store/storeShapes';
import { Bulb } from '../../TS-types';
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
}
