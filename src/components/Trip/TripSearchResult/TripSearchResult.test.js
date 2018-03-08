import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import TripSearchResult from './TripSearchResult';
import getTripSorterTheme from '../../../common/theme';
import {wrapWithContext} from '../../../../tests/lib/utils';

import configureStore from '../../../configureStore';

const context = {muiTheme: getTripSorterTheme()};
const contextTypes = {
  muiTheme: PropTypes.object.isRequired
};

it('renders without crashing', () => {
  const store = configureStore();
  const div = document.createElement('div');
  const fetchTrips = function(){};
  const trips = {
    items: [],
    searchCriteria: {}
  };

  const output = wrapWithContext(context,
    contextTypes,
    <Provider store={store}>
      <TripSearchResult
        fetchTrips={fetchTrips}
        trips={trips}
      />
    </Provider>);

  ReactDOM.render(output, div);
});