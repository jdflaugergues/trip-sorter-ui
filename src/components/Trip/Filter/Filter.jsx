import React, {Component} from 'react';
import PropTypes from 'prop-types'
import cxs from 'cxs';

import Checkbox from 'material-ui/Checkbox';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';


import {colors, font} from '../../../common/theme';

const propTypes = {
  searchCriteria: PropTypes.any
};

const styles = {
  filter: {
    padding: '15px',
    width: '200px',
    float: 'left',
    backgroundColor: '#fff',
    color: '#000',
    height: '-webkit-fill-available'
  },
  checkbox: {
    marginBottom: 5
  },
  radioButton: {
    marginBottom: 5
  }
};



// Component containing filter search trips
class Filter extends Component {

  constructor(props) {
    super(props);

    this.toggleCarFilter = this.fetchTrips.bind(this, 'car');
    this.toggleBusFilter = this.fetchTrips.bind(this, 'bus');
    this.toggleTrainFilter = this.fetchTrips.bind(this, 'train');

    this.handleNbConnections = this.handleNbConnections.bind(this);
  }

  fetchTrips(transport) {
    const {searchCriteria, fetchTrips} = this.props;
    const transports = searchCriteria.transports;

    const transportIndex = transports.indexOf(transport);
    if (transportIndex === -1) {
      transports.push(transport);
    } else {
      transports.splice(transportIndex, 1);
    }

    fetchTrips({...searchCriteria, transports});
  }

  handleNbConnections(event, value) {
    const {searchCriteria, fetchTrips} = this.props;

    fetchTrips({...searchCriteria, nbConnections: value});
  }

  render() {

    return (
      <div className={cxs(styles.filter)}>
        <h3>Transport</h3>
        <Checkbox
          label="Car"
          style={styles.checkbox}
          onCheck={this.toggleCarFilter}
        />
        <Checkbox
          label="Bus"
          style={styles.checkbox}
          onCheck={this.toggleBusFilter}
        />
        <Checkbox
          label="Train"
          style={styles.checkbox}
          onCheck={this.toggleTrainFilter}
        />
        <h3>Connections</h3>
        <RadioButtonGroup
          name="nbConnections"
          defaultSelected=""
          onChange={this.handleNbConnections}>
          <RadioButton
            value=""
            label="Never mind"
            style={styles.radioButton}
          />
          <RadioButton
            value="0"
            label="No connection"
            style={styles.radioButton}
          />
          <RadioButton
            value="1"
            label="Until one connection"
            style={styles.radioButton}
          />
          <RadioButton
            value="2"
            label="Until 2 connections"
            style={styles.radioButton}
          />
          <RadioButton
            value="3"
            label="Until 3 connections"
            style={styles.radioButton}
          />
          <RadioButton
            value="4"
            label="Until 4 connections"
            style={styles.radioButton}
          />
          <RadioButton
            value="5"
            label="Until 5 connections"
            style={styles.radioButton}
          />

        </RadioButtonGroup>
      </div>
    );
  }
}

Filter.propTypes = propTypes;

export default Filter;