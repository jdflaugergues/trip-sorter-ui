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

const TripContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Trip);

export default TripContainer;
