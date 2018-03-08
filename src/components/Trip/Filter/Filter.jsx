import React, {Component} from 'react';
import PropTypes from 'prop-types'
import cxs from 'cxs';
import _ from 'lodash';

import Checkbox from 'material-ui/Checkbox';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';


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



// Component containing filter of the search trips results
class Filter extends Component {

  constructor(props) {
    super(props);

    this.toggleCarFilter = this.handleTransport.bind(this, 'car');
    this.toggleBusFilter = this.handleTransport.bind(this, 'bus');
    this.toggleTrainFilter = this.handleTransport.bind(this, 'train');

    this.handleNbConnections = this.handleNbConnections.bind(this);
  }

  handleTransport(transport) {
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
    const {searchCriteria} = this.props;
    const disabled = !_.get(searchCriteria, 'from') || !_.get(searchCriteria, 'to');

    return (
      <div className={cxs(styles.filter)}>
        <h3>Transport</h3>
        <Checkbox
          label="Car"
          disabled={disabled}
          style={styles.checkbox}
          onCheck={this.toggleCarFilter}
        />
        <Checkbox
          label="Bus"
          disabled={disabled}
          style={styles.checkbox}
          onCheck={this.toggleBusFilter}
        />
        <Checkbox
          label="Train"
          disabled={disabled}
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
            disabled={disabled}
            label="Never mind"
            style={styles.radioButton}
          />
          <RadioButton
            value="0"
            disabled={disabled}
            label="No connection"
            style={styles.radioButton}
          />
          <RadioButton
            value="1"
            disabled={disabled}
            label="Until one connection"
            style={styles.radioButton}
          />
          <RadioButton
            value="2"
            disabled={disabled}
            label="Until 2 connections"
            style={styles.radioButton}
          />
          <RadioButton
            value="3"
            disabled={disabled}
            label="Until 3 connections"
            style={styles.radioButton}
          />
          <RadioButton
            value="4"
            disabled={disabled}
            label="Until 4 connections"
            style={styles.radioButton}
          />
          <RadioButton
            value="5"
            disabled={disabled}
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