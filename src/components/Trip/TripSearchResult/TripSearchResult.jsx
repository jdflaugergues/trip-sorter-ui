import React from 'react';
import PropTypes from 'prop-types';
import cxs from 'cxs';

import {TripList} from './TripList';
import {TripHeader} from './TripHeader';

import getTripSorterTheme from '../../../common/theme';

const muiTheme = getTripSorterTheme();

const propTypes = {
  trips: PropTypes.any.isRequired,
  fetchTrips: PropTypes.func.isRequired
};

const tripSearchResultStyle = cxs({
  marginLeft: '200px',
  backgroundColor: muiTheme.palette.canvasColor,
  padding: '25px 10px'
});

// Component which contains the search trips results
function TripSearchResult({trips, fetchTrips}) {

  return (
    <div className={tripSearchResultStyle}>
      <TripHeader trips={trips} fetchTrips={fetchTrips} />
      {trips.items && trips.items.map((trip, index) =>
        <TripList
          key={index}
          cost={trip.cost}
          currency={trips.currency}
          duration={trip.duration}
          steps={trip.steps} />
      )}
    </div>
  );
}

TripSearchResult.propTypes = propTypes;
TripSearchResult.contextTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default TripSearchResult;
