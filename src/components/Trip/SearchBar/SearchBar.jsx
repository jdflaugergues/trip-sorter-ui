import React, {Component} from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce';
import cxs from 'cxs';

import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import ActionSearch from 'material-ui/svg-icons/action/search';

import getTripSorterTheme from '../../../common/theme';

const muiTheme = getTripSorterTheme();

const propTypes = {
  cities: PropTypes.array.isRequired,
  searchCriteria: PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string,
  }),
  fetchCities: PropTypes.func.isRequired,
  fetchTrips: PropTypes.func.isRequired
};

const defaultProps = {
  searchCriteria: {
    from: '',
    to: ''
  }
};

const styles = {
  searchBar: {
    backgroundColor: muiTheme.palette.canvasColor,
    height: '150px',
    padding: '50px 25px 25px 25px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'baseline',
    borderBottom: `solid 2px ${muiTheme.palette.accent3Color}`
  }
};


// Component of the trips search bar.
class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataSource: []
    };
    this.searchTrips = this.searchTrips.bind(this);
    this.searchFromCities = debounce(this.searchCities.bind(this, 'from'), 250);
    this.searchToCities = debounce(this.searchCities.bind(this, 'to'), 250);
    this.selectDepartureCity = this.selectDepartureCity.bind(this);
    this.selectArrivalCity = this.selectArrivalCity.bind(this);
  }

  searchCities(direction, value) {
    this.props.fetchCities(value);
    this.setState({
      [direction]: ''
    });
  }

  selectDepartureCity(departureCity) {
    this.setState({
      from: departureCity
    });
  }

  selectArrivalCity(arrivalCity) {
    this.setState({
      to: arrivalCity
    });
  }

  searchTrips() {
    const {searchCriteria, fetchTrips} = this.props;
    fetchTrips({...searchCriteria, from: this.state.from, to: this.state.to});
  }

  render() {
    const {cities = []} = this.props;
    return (
      <div className={cxs(styles.searchBar)}>
        <AutoComplete
          hintText="Departure"
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={cities}
          onUpdateInput={this.searchFromCities}
          onNewRequest={this.selectDepartureCity}
        />
        <AutoComplete
          hintText="Arrival"
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={cities}
          onUpdateInput={this.searchToCities}
          onNewRequest={this.selectArrivalCity}
        />
        <div>
        <RaisedButton
          label="search trips"
          labelPosition="before"
          primary={true}
          icon={<ActionSearch />}
          onClick={this.searchTrips}
          disabled={!this.state.from || !this.state.to}
        />
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = propTypes;
SearchBar.defaultProps = defaultProps;
SearchBar.contextTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default SearchBar;
