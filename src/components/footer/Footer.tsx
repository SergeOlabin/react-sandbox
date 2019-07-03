import React from 'react';
import { Button } from 'react-bootstrap';
import './footer.scss';

export class FooterComponent extends React.Component {
    render() {
        return (
            <div className="footer">
                <Button variant="light" className="add-bulb-button">
                    <i className="fas fa-plus-circle"></i>
                </Button>
            </div>
        )
    }
}
