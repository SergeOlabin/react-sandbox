import React from 'react';
import { BulbComponent } from '../bulb/Bulb';
import { FooterComponent } from '../footer/Footer';
import { WaterSource } from '../water-source/WaterSource';
import './board.scss';
import { Water } from '../water/Water';

interface BoardComponentState {
    bulbs: Bulb[],
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
    };

    constructor(props: any) {
        super(props);
    }

    addBulb(volume: number) {
        const bulbs = [...this.state.bulbs];
        bulbs.push({
            id: id++,
            volume,
            waterLevel: 0,
        })
        this.setState({ bulbs });
    }

    render() {
        const bulbs = this.state.bulbs.map((bulb: Bulb) =>
            <li key={bulb.id}><BulbComponent value={bulb} /></li>
        );

        return(
            <div className="board">
                <div className="bulbs-container">
                    <ul className="bulbs">{bulbs}</ul>
                    <WaterSource>
                        <Water></Water>
                    </WaterSource>
                </div>

                <FooterComponent />
            </div>
        )
    }
}
