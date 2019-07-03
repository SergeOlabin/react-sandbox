import React from 'react';

interface WaterSourceProps {
}

interface WaterSourceState {

}

export class WaterSource extends React.Component<WaterSourceProps, WaterSourceState> {
    render() {
        return (
            <div className="water-source water-bulb">
                {this.props.children}
                <span className="water-level-label">DOHUYA</span>
            </div>
        )
    }
}
