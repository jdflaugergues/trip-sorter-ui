import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import SearchBar from './SearchBar';
import getTripSorterTheme from '../../../common/theme';
import {wrapWithContext} from '../../../../tests/lib/utils';


const context = {muiTheme: getTripSorterTheme()};
const contextTypes = {
  muiTheme: PropTypes.object.isRequired
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  const searchCriteria = {};
  const fetchCities = function(){};
  const fetchTrips = function(){};
  const cities = [];

  const output = wrapWithContext(context,
    contextTypes,
    <SearchBar
      searchCriteria={searchCriteria}
      fetchCities={fetchCities}
      fetchTrips={fetchTrips}
      cities={cities}
    />);

  ReactDOM.render(output, div);
});