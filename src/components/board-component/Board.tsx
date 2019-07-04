import React from 'react';
import { BulbComponent } from '../bulb/Bulb';
import { FooterComponent } from '../footer/Footer';
import { WaterSource } from '../water-source/WaterSource';
import './board.scss';
import { Water } from '../water/Water';
import { isEqual, max } from 'lodash';

interface BoardComponentState {
    bulbs: Bulb[],
    selectedBulb: Bulb | WaterSource | null,
}

let id = 0;
export interface Bulb {
    id: number,
    volume: number,
    waterLevel: number,
}

export class BoardComponent extends React.Component<{}, BoardComponentState> {
    state: BoardComponentState = {
        bulbs: [],
        selectedBulb: null,
    };

    // MOCK
    componentDidMount() {
        this.addBulb({
            volume: 10,
            waterLevel: 0,
        });
        this.addBulb({
            volume: 10,
            waterLevel: 5,
        });
    }

    addBulb({ volume, waterLevel = 0 }: { volume: number,  waterLevel: number}) {
        const bulbs = [...this.state.bulbs];
        const volumeValidated = volume || 1;

        bulbs.push({
            id: id++,
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

    private _transferLiquid(bulb: Bulb | WaterSource) {
        const destinationBulbIndex = this.state.bulbs.findIndex((elem: Bulb) => bulb === elem);
        const newBulbs = [...this.state.bulbs];
        const destinationBulb = newBulbs[destinationBulbIndex];

        if (this.state.selectedBulb instanceof WaterSource) {
            destinationBulb.waterLevel = destinationBulb.volume;

        } else {
            const selectedBulb = (this.state.selectedBulb as Bulb);
            const possibleAmountOfLiquidToAdd = destinationBulb.volume - destinationBulb.waterLevel;

            const rest = max([
                selectedBulb.waterLevel - possibleAmountOfLiquidToAdd,
                0,
            ]) as number;
            const addition = selectedBulb.waterLevel - rest;

            const selectedBulbIndex = this.state.bulbs
                .findIndex((elem: Bulb) => selectedBulb === elem);
            const selectedBulbNew = newBulbs[selectedBulbIndex];

            destinationBulb.waterLevel = destinationBulb.waterLevel + addition;
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
            <li key={bulb.id}>
                <BulbComponent
                    value={bulb}
                    selected={isEqual(this.state.selectedBulb, bulb)}
                    onClick={this.bubleClick.bind(this)}
                    emptyBulb={this.emptyBulb.bind(this)}
                    removeBulb={this.removeBulb.bind(this)}
                    />

            </li>
        );

        return(
            <div className="board" onClick={this.removeBulbSelection.bind(this)}>
                <div className="bulbs-container">
                    <ul className="bulbs">{bulbs}</ul>
                    <WaterSource
                        selected={this.state.selectedBulb instanceof WaterSource}
                        onClick={this.bubleClick.bind(this)}>
                        <Water waterLevel='inf'></Water>
                    </WaterSource>
                </div>

                <FooterComponent addBulb={this.addBulb.bind(this)}/>
            </div>
        )
    }
}
