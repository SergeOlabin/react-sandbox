import React from 'react';
import { Button } from 'react-bootstrap';
import './footer.scss';
import { AddBulbModal } from '../add-bulb-modal/AddBulbModal';
import { connect } from 'react-redux';
import { addBulb } from '../../store/transfer-liquids/actions';

interface FooterState {
  showAddBulbModal: boolean,
}

interface FooterProps {
  addBulb: typeof addBulb,
}

class FooterComponent extends React.Component<FooterProps, FooterState> {
  state: FooterState = {
    showAddBulbModal: false,
  }

  addBubl({ volume, waterLevel = 0 }: { volume: number, waterLevel: number }) {
    this.props.addBulb({ volume, waterLevel });
  }

  render() {
    return (
      <div className="footer">
        <Button
          onClick={() => this.setState({ showAddBulbModal: true })}
          variant="light"
          className="add-bulb-button"
        // disabled={true}
        ><i className="fas fa-plus-circle"></i>
        </Button>
        <AddBulbModal
          show={this.state.showAddBulbModal}
          onSuccess={this.addBubl.bind(this)}
          onClose={() => this.setState({ showAddBulbModal: false })}
        />
      </div>
    )
  }
}

export default connect(
  null,
  { addBulb },
)(FooterComponent);
