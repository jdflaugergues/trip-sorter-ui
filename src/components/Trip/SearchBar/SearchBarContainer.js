import {connect} from 'react-redux';

import SearchBar from './SearchBar';
import {fetchCities} from '../../../services/actions';


function mapStateToProps(state) {
  return {
    cities: state.cities.items
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCities: searchWord => dispatch(fetchCities(searchWord)),
  }
}

// Container of the search bar component to add cities list data and fetching cities service props.
const SearchBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);

export default SearchBarContainer;
