import React from 'react';

interface WaterProps {
    waterLevel: number | 'inf',
}

interface WaterState {

}

export class Water extends React.Component<WaterProps, WaterState> {
    getWaterLevel() {
        return this.props.waterLevel === 'inf'
            ? '100%'
            : `${this.props.waterLevel * 10}px`;
    }

    render() {
        return (
            <div style={{ height: this.getWaterLevel() }} className="water"></div>
        )
    }
}
