import React from 'react';

interface WaterSourceProps {
}

interface WaterSourceState {

}

export class WaterSource extends React.Component<WaterSourceProps, WaterSourceState> {
    render() {
        return (
            <div className="water-source">
                {this.props.children}
            </div>
        )
    }
}
