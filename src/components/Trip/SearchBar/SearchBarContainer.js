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

const SearchBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);

export default SearchBarContainer;
