import fetch from 'cross-fetch';


// Action on request cities
export const REQUEST_CITIES = 'REQUEST_CITIES';
function requestCities(searchWord) {
  return {
    type: REQUEST_CITIES,
    searchWord
  }
}

// Action on receive cities
export const RECEIVE_CITIES = 'RECEIVE_CITIES';
function receiveCities(searchWord, cities) {
  return {
    type: RECEIVE_CITIES,
    searchWord,
    cities,
    receivedAt: Date.now()
  }
}


// Fetch cities by a search word filter
export function fetchCities(searchWord) {
  return dispatch => {

    if (!searchWord) {
      return;
    }

    dispatch(requestCities(searchWord));
    const term = searchWord.trim().toLowerCase();
    // const resourcePath = `https://trip-sorter-api.herokuapp.com/api/trip-sorter/cities?searchWord=${term}`;
    const resourcePath = `/api/trip-sorter/cities?searchWord=${term}`;

    return fetch(resourcePath)
      .then(response => {
        const responseJson = response.json();

        if (response.status >= 400) {
          throw new Error('Bad response from server ')
        }
        return responseJson;
      })
      .then(json => {
        dispatch(receiveCities(searchWord, json))
      })
      .catch(err => console.error(err))
  }
}
