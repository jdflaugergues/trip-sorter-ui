import _ from 'lodash';

import {
  GET_LAST_SEARCH_CRITERIA,
  REQUEST_TRIPS,
  RECEIVE_TRIPS} from '../actions';

// Reducers managing trips data
export function trips(state = {}, action) {
  const newState =_.merge(state, {
    isFetching: false,
    items: []
  });
  const {searchCriteria, totalTrips, results} = action;

  switch (action.type) {

    case GET_LAST_SEARCH_CRITERIA:
      return {...newState, ...{
        lastSearchCriteria: action.lastSearchCriteria
      }};

    case REQUEST_TRIPS:
      return Object.assign({}, newState, {
        isFetching: true,
        searchCriteria
      });

    case RECEIVE_TRIPS:
      return Object.assign({}, newState, {
        isFetching: false,
        searchCriteria,
        totalTrips,
        count: results.count,
        currency: results.currency,
        items: results.trips,
        lastUpdated: action.receivedAt
      });

    default:
      return newState;
  }
}
