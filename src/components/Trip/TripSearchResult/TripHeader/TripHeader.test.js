import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import TripHeader from './TripHeader';
import getTripSorterTheme from '../../../../common/theme';
import {wrapWithContext} from '../../../../../tests/lib/utils';

const context = {muiTheme: getTripSorterTheme()};
const contextTypes = {
  muiTheme: PropTypes.object.isRequired
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  const fetchTrips = function(){};
  const trips = {
    items: [],
    searchCriteria: {}
  };
  const searchCriteria = {};

  const output = wrapWithContext(context,
    contextTypes,
      <TripHeader
        fetchTrips={fetchTrips}
        trips={trips}
        searchCriteria={searchCriteria}
      />);

  ReactDOM.render(output, div);
});