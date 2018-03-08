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


// Component which contains the content of the application
class Trip extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchTrips();
  }

  render() {
    const {trips, ...fetchingProps} = this.props;
    return (
      <div className={mainContentStyle}>
        <SearchBarContainer searchCriteria={trips.searchCriteria} {...fetchingProps} />
        <Filter searchCriteria={trips.searchCriteria} {...fetchingProps} />
        <TripSearchResult trips={trips} {...fetchingProps} />
      </div>
    );
  }
}

Trip.propTypes = propTypes;

export default Trip;
