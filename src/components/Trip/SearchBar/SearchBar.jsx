import React, {Component} from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce';
import cxs from 'cxs';

import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import ActionSearch from 'material-ui/svg-icons/action/search';



import {colors, font} from '../../../common/theme';

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
    backgroundColor: 'white',
    height: '150px',
    padding: '50px 25px 25px 25px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'baseline',
    borderBottom: 'solid 2px #bababa'
  }
};


// Component of the research and favorite albums pages
class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };
    this.searchTrips = this.searchTrips.bind(this);
    this.searchCities = debounce(this.searchCities.bind(this), 250);
    this.selectDepartureCity = this.selectDepartureCity.bind(this);
    this.selectArrivalCity = this.selectArrivalCity.bind(this);
  }

  searchCities(value) {
    this.props.fetchCities(value);
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
          onUpdateInput={this.searchCities}
          onNewRequest={this.selectDepartureCity}
        />
        <AutoComplete
          hintText="Arrival"
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={cities}
          onUpdateInput={this.searchCities}
          onNewRequest={this.selectArrivalCity}
        />
        <div>
        <RaisedButton
          label="search trips"
          labelPosition="before"
          primary={true}
          icon={<ActionSearch />}
          onClick={this.searchTrips}
        />
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = propTypes;
SearchBar.defaultProps = defaultProps;

export default SearchBar;
