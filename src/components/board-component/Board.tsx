import { isEqual, map } from 'lodash';
import React from 'react';
import {
  actionOnBulb,
  removeBulbSelection,
} from '../../store/transfusion/actions';
import { SELECT_BULB } from '../../store/transfusion/types';
import { Bulb, IWaterSource, selectedBulbType } from '../../TS-types';
import BulbComponent from '../bulb/Bulb';
import { WaterSource } from '../water-source/WaterSource';
import './board.scss';

interface BoardComponentProps {
  transferLiquid: (destinationBulb: Bulb | IWaterSource) => void;
  removeBulbSelection: typeof removeBulbSelection;
  selectBulb: typeof actionOnBulb;
  bulbs: Bulb[];
  selectedBulb: selectedBulbType;
  waterSourceConfig: IWaterSource[];
}

export default class BoardComponent extends React.Component<
  BoardComponentProps
> {
  public bubleClick(bulb: Bulb | IWaterSource) {
    if (!this.props.selectedBulb) {
      this.props.selectBulb({ bulb, type: SELECT_BULB });
    } else if (isEqual(bulb, this.props.selectedBulb)) {
      this.props.removeBulbSelection();
    } else this.props.transferLiquid(bulb);
  }

  public isWaterSourceSelected(waterSource: IWaterSource) {
    return this.props.selectedBulb === waterSource;
  }

  public render() {
    const bulbs = this.props.bulbs.map((bulb: Bulb) => (
      <BulbComponent
        key={bulb.id}
        value={bulb}
        selected={isEqual(this.props.selectedBulb, bulb)}
        onClick={this.bubleClick.bind(this)}
      />
    ));

    const WaterSources = map(this.props.waterSourceConfig, (value, key) => {
      return (
        <WaterSource
          key={value.id}
          value={value}
          selected={this.isWaterSourceSelected(value)}
          onClick={this.bubleClick.bind(this)}
          waterColor={value.waterColor}
        ></WaterSource>
      );
    });

    return (
      <div
        className="board"
        onClick={this.props.removeBulbSelection.bind(this)}
      >
        <div className="bulbs-container">
          <div className="bulbs">{bulbs}</div>
          <div className="water-sources">{WaterSources}</div>
        </div>
      </div>
    );
  }
}
