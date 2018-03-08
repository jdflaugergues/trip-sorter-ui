import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cxs from 'cxs';

import {SearchBarContainer} from './SearchBar';
import {Filter} from './Filter';
import {TripSearchResult} from './TripSearchResult';


const propTypes = {
  cities: PropTypes.shape({
    items: PropTypes.array.isRequired
  }),
  trips: PropTypes.shape({
    items: PropTypes.array.isRequired,
    totalTrips: PropTypes.number
  })
};

const mainContentStyle = cxs({
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '1100px'
});


// Component of the trip page.
class Trip extends Component {

  render() {
    const {trips, fetchTrips} = this.props;
    return (
      <div className={mainContentStyle}>
        <SearchBarContainer searchCriteria={trips.searchCriteria} fetchTrips={fetchTrips} />
        <Filter searchCriteria={trips.searchCriteria} fetchTrips={fetchTrips} />
        <TripSearchResult {...this.props} />
      </div>
    );
  }
}

Trip.propTypes = propTypes;

export default Trip;
