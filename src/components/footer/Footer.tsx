import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addBulb } from '../../store/transfusion/actions';
import { AddBulbModal } from '../add-bulb-modal/AddBulbModal';
import './footer.scss';

interface FooterState {
  showAddBulbModal: boolean;
}

interface FooterProps {
  addBulb: typeof addBulb;
}

class FooterComponentC extends React.Component<FooterProps, FooterState> {
  public state: FooterState = {
    showAddBulbModal: false,
  };

  public addBubl({
    volume,
    waterLevel = 0,
  }: {
    volume: number;
    waterLevel: number;
  }) {
    this.props.addBulb({ volume, waterLevel });
  }

  public render() {
    return (
      <div className="footer">
        <Button
          onClick={() => this.setState({ showAddBulbModal: true })}
          variant="light"
          className="add-bulb-button"
          // disabled={true}
        >
          <i className="fas fa-plus-circle"></i>
        </Button>
        <AddBulbModal
          show={this.state.showAddBulbModal}
          onSuccess={this.addBubl.bind(this)}
          onClose={() => this.setState({ showAddBulbModal: false })}
        />
      </div>
    );
  }
}

const FooterComponent = connect(
  null,
  { addBulb },
)(FooterComponentC);

export default FooterComponent;
