import React from 'react';
import { BulbComponent } from '../bulb/Bulb';
import { FooterComponent } from '../footer/Footer';

interface BoardComponentState {
    bulbs: Bulb[],
}

export interface Bulb {
    id: number,
    waterLevel: number,
}


export class BoardComponent extends React.Component<{}, BoardComponentState> {
    state: BoardComponentState = {
        bulbs: [],
    };

    constructor(props: any) {
        super(props);
    }

    render() {
        const bulbs = this.state.bulbs.map((bulb: Bulb) =>
            <li key={bulb.id}><BulbComponent value={bulb} /></li>
        );

        return(
            <div>
                <ul className="bulbs">{bulbs}</ul>
                <FooterComponent />
            </div>
        )
    }
}
