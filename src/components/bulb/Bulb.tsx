import React from 'react';
import { connect } from 'react-redux';
import { actionOnBulb } from '../../store/transfusion/actions';
import { Bulb } from '../../TS-types';
import { selectedBulbStyles } from '../board-component/SelectedBulbStyles.const';
import { Water } from '../water/Water';
import './bulb.scss';

interface BulbProps {
  value: Bulb;
  onClick: Function;
  selected: boolean;
  actionOnBulb: typeof actionOnBulb;
}

class BulbComponent extends React.Component<BulbProps> {
  public getSetyles() {
    return {
      height: `${this.props.value.volume * 10}px`,
      boxShadow: this.props.selected ? selectedBulbStyles.boxShadow : 'none',
    };
  }

  public onClick(evt: React.MouseEvent<any>) {
    evt.stopPropagation();
    this.props.onClick(this.props.value);
  }

  public emptyBulb(evt: React.MouseEvent<any>) {
    evt.stopPropagation();
    this.props.actionOnBulb({
      type: 'EMPTY_BULB',
      bulb: this.props.value,
    });
  }

  public removeBulb(evt: React.MouseEvent<any>) {
    evt.stopPropagation();
    this.props.actionOnBulb({
      type: 'REMOVE_BULB',
      bulb: this.props.value,
    });
  }

  public render() {
    return (
      <div
        onClick={this.onClick.bind(this)}
        className="water-bulb"
        style={this.getSetyles()}
      >
        <Water waterLevel={this.props.value.waterLevel}></Water>
        <span className="water-level-label">
          {this.props.value.waterLevel} / {this.props.value.volume}
        </span>
        <span onClick={this.emptyBulb.bind(this)} className="empty corner-icon">
          <i className="fab fa-bitbucket"></i>
        </span>
        <span
          className="remove corner-icon"
          onClick={this.removeBulb.bind(this)}
        >
          <i className="far fa-times-circle"></i>
        </span>
      </div>
    );
  }
}

export default connect(
  null,
  { actionOnBulb },
)(BulbComponent);
