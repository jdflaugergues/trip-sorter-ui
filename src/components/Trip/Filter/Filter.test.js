import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Filter from './Filter';
import getTripSorterTheme from '../../../common/theme';
import {wrapWithContext} from '../../../../tests/lib/utils';


const context = {muiTheme: getTripSorterTheme()};
const contextTypes = {
  muiTheme: PropTypes.object.isRequired
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  const searchCriteria = {};
  const fetchTrips = function(){};

  const output = wrapWithContext(context,
    contextTypes,
    <Filter searchCriteria={searchCriteria} fetchTrips={fetchTrips} />);

  ReactDOM.render(output, div);
});