import fetch from 'cross-fetch';
import contentRange from 'content-range';
import _ from 'lodash';

// Action on request trips
export const REQUEST_TRIPS = 'REQUEST_TRIPS';
function requestCities(searchCriteria) {
  return {
    type: REQUEST_TRIPS,
    searchCriteria
  }
}

// Action on receive trips
export const RECEIVE_TRIPS = 'RECEIVE_TRIPS';
function receivetrips(searchCriteria, totalTrips, results) {
  return {
    type: RECEIVE_TRIPS,
    searchCriteria,
    totalTrips,
    results,
    receivedAt: Date.now()
  }
}

// Action on get the last search value
export const GET_LAST_SEARCH_CRITERIA = 'GET_LAST_SEARCH_CRITERIA';
function getLastSearchCriteria(lastSearchCriteria) {
  return {
    type: GET_LAST_SEARCH_CRITERIA,
    lastSearchCriteria,
  }
}

// Get the last search criteria in the local storage
function getLocaleStorageSearchCriteria() {
  return JSON.parse(_.get(window.localStorage, 'lastSearchCriteria', '{}'));
}

// Store the current search criteria in the local storage
function saveLastSearchCriteria(searchCriteria) {
  window.localStorage.lastSearchCriteria = JSON.stringify(searchCriteria);
}

// Fetch trips
export function fetchTrips(searchCriteria) {
  return dispatch => {
    let lastSearchCriteria;

    if (!searchCriteria) {
      lastSearchCriteria = getLocaleStorageSearchCriteria();
    } else {
      saveLastSearchCriteria(searchCriteria);
    }
    dispatch(getLastSearchCriteria(lastSearchCriteria));

    const {from, to, sort = 'duration', transports = [], nbConnections = ''} = lastSearchCriteria || searchCriteria;

    dispatch(requestCities({from, to, sort, transports, nbConnections}));
    const resourcePath = `https://trip-sort-api.herokuapp.com/api/trip-sorter/trips?from=${from}&to=${to}&sort=${sort}&transports=${transports.join(',')}&nbConnections=${nbConnections}`;

    return fetch(resourcePath)
      .then(response => {
        const responseJson = response.json();

        if (response.status >= 400) {
          return console.error('Bad response from server');
          // throw new Error('Bad response from server ')
        }

        const parts = contentRange.parse(response.headers.map['content-range']);

        return responseJson
          .then(json => {
            dispatch(receivetrips({from, to, sort, transports, nbConnections}, parts.length, json))
          })
          .catch(err => console.error(err));
      })
  }
}
