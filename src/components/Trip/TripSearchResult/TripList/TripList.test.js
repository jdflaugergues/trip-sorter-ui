import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import TripList from './TripList';
import getTripSorterTheme from '../../../../common/theme';
import {wrapWithContext} from '../../../../../tests/lib/utils';

const context = {muiTheme: getTripSorterTheme()};
const contextTypes = {
  muiTheme: PropTypes.object.isRequired
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  const cost = 0;
  const currency = '';
  const duration = 0;
  const steps = [];

  const output = wrapWithContext(context,
    contextTypes,
      <TripList
        cost={cost}
        currency={currency}
        duration={duration}
        steps={steps}
      />);

  ReactDOM.render(output, div);
});