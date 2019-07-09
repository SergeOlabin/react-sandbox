import React, { RefObject } from 'react';
import { BulbComponent } from '../bulb/Bulb';
import { FooterComponent } from '../footer/Footer';
import { WaterSource } from '../water-source/WaterSource';
import './board.scss';
import { Water } from '../water/Water';
import { isEqual, max } from 'lodash';
import { connect } from 'react-redux';
import { AppState } from '../../store/reducers/rootReducer';

interface BoardComponentState {
  bulbs: Bulb[],
  selectedBulb: Bulb | WaterSource | null,
  bulbId: number,
}

export interface Bulb {
  id: number,
  volume: number,
  waterLevel: number,
}

class BoardComponent extends React.Component<{}, BoardComponentState> {
  state: BoardComponentState = {
    bulbId: 2,
    bulbs: [
      {
        id: 0,
        volume: 10,
        waterLevel: 0,
      },
      {
        id: 1,
        volume: 10,
        waterLevel: 2,
      }
    ],
    selectedBulb: null,
  };

  addBulb({ volume, waterLevel = 0 }: { volume: number, waterLevel: number }) {
    const bulbs = [...this.state.bulbs];
    const volumeValidated = volume || 1;

    bulbs.push({
      id: this.state.bulbId++,
      volume: volumeValidated,
      waterLevel,
    });
    this.setState({ bulbs });
  }

  emptyBulb(bulb: Bulb) {
    this.setState((currentState: BoardComponentState) => {
      const newState = { ...currentState };
      const bulbIndex = newState.bulbs.findIndex((elem: Bulb) => bulb === elem);
      newState.bulbs[bulbIndex].waterLevel = 0;

      return newState;
    });
  }

  removeBulb(bulb: Bulb) {
    this.setState((currentState: BoardComponentState) => {
      const newState = { ...currentState };
      const bulbIndex = newState.bulbs.findIndex((elem: Bulb) => bulb === elem);
      newState.bulbs.splice(bulbIndex, 1);

      return newState;
    });
  }

  bubleClick(bulb: Bulb | WaterSource) {
    if (!this.state.selectedBulb) this.setState({ selectedBulb: bulb });
    else if (isEqual(bulb, this.state.selectedBulb)) this.removeBulbSelection();
    else this._transferLiquid(bulb);
  }

  private _transferLiquid(destinationBulb: Bulb | WaterSource) {
    if (destinationBulb instanceof WaterSource) return;

    const destinationBulbIndex = this.state.bulbs.findIndex((elem: Bulb) => destinationBulb === elem);
    const newBulbs = [...this.state.bulbs];
    const destinationBulbNew = newBulbs[destinationBulbIndex];

    if (this.state.selectedBulb instanceof WaterSource) {
      destinationBulbNew.waterLevel = destinationBulbNew.volume;

    } else {
      const selectedBulb = (this.state.selectedBulb as Bulb);
      const possibleAmountOfLiquidToAdd = destinationBulbNew.volume - destinationBulbNew.waterLevel;

      const rest = max([
        selectedBulb.waterLevel - possibleAmountOfLiquidToAdd,
        0,
      ]) as number;
      const addition = selectedBulb.waterLevel - rest;

      const selectedBulbIndex = this.state.bulbs
        .findIndex((elem: Bulb) => selectedBulb === elem);
      const selectedBulbNew = newBulbs[selectedBulbIndex];

      destinationBulbNew.waterLevel = destinationBulbNew.waterLevel + addition;
      selectedBulbNew.waterLevel = rest;
    }

    this.setState({ bulbs: newBulbs });
    this.removeBulbSelection();
  }

  removeBulbSelection() {
    this.setState({ selectedBulb: null });
  }

  render() {
    const bulbs = this.state.bulbs.map((bulb: Bulb) =>
      <BulbComponent
        key={bulb.id}
        value={bulb}
        selected={isEqual(this.state.selectedBulb, bulb)}
        onClick={this.bubleClick.bind(this)}
        emptyBulb={this.emptyBulb.bind(this)}
        removeBulb={this.removeBulb.bind(this)}
      />

    );

    return (
      <div className="board" onClick={this.removeBulbSelection.bind(this)}>
        <div className="bulbs-container">
          <div className="bulbs">{bulbs}</div>
          <WaterSource
            selected={this.state.selectedBulb instanceof WaterSource}
            onClick={this.bubleClick.bind(this)}
          ><Water waterLevel='inf'></Water>
          </WaterSource>
        </div>

        <FooterComponent addBulb={this.addBulb.bind(this)} />
      </div>
    )
  }
}


const mapStateToProps = (state: AppState) => ({
  transferLiquidsState: state.transferLiquids,
});

export default connect(
  mapStateToProps,
)(BoardComponent);
