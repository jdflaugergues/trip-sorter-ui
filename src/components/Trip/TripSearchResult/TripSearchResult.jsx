import React from 'react';
import PropTypes from 'prop-types';
import cxs from 'cxs';

import {TripList} from './TripList';
import {TripSorter} from './TripSorter';

const propTypes = {
  trips: PropTypes.any
};

const tripSearchResultStyle = cxs({
  marginLeft: '200px',
  backgroundColor: '#fff',
  padding: '25px 10px'
});

// Component which contains the search trips results
function TripSearchResult({trips, fetchTrips}) {

  return (
    <div className={tripSearchResultStyle}>
      <TripSorter trips={trips} fetchTrips={fetchTrips} />
      {trips.items && trips.items.map((trip, index) =>
        <TripList cost={trip.cost} duration={trip.duration} steps={trip.steps} key={index} />
      )}
    </div>
  );
}

TripSearchResult.propTypes = propTypes;

export default TripSearchResult;
