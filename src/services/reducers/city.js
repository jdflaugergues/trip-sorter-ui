import _ from 'lodash';

import {
  REQUEST_CITIES,
  RECEIVE_CITIES} from '../actions';

// Reducers managing cities data
export function cities(state = {}, action) {
  const newState =_.merge(state, {
    isFetching: false,
    items: []
  });

  switch (action.type) {

    case REQUEST_CITIES:
      return Object.assign({}, newState, {
        isFetching: true
      });

    case RECEIVE_CITIES:
      return Object.assign({}, newState, {
        isFetching: false,
        items: action.cities,
        lastUpdated: action.receivedAt
      });

    default:
      return newState;
  }
}
