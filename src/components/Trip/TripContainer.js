import {connect} from 'react-redux';

import Trip from './Trip';
import {fetchTrips} from '../../services/actions';


function mapStateToProps(state) {
  return {
    trips: state.trips
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTrips: searchCriteria => dispatch(fetchTrips(searchCriteria))
  }
}

// Container of the trip page to add trips data and fetching trips service props.
const TripContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Trip);

export default TripContainer;
