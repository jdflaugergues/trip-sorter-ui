import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cxs from 'cxs';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const propTypes = {
  trips: PropTypes.any,
  fetchTrips: PropTypes.func.isRequired,
  searchCriteria: PropTypes.any
};

const tripSorterStyle = cxs({
  marginBottom: '20px'
});

class Sorter extends Component {

  constructor(props) {
    super(props);
    this.sortByDuration = this.sortByDuration.bind(this);
    this.sortByCost = this.sortByCost.bind(this);
  }

  sortByDuration() {
    const {searchCriteria, fetchTrips} = this.props;
    fetchTrips({...searchCriteria, sort: 'duration'});
  }

  sortByCost() {
    const {searchCriteria, fetchTrips} = this.props;
    fetchTrips({...searchCriteria, sort: 'cost'});
  }


  render() {
    return <IconMenu
      iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <MenuItem primaryText="Sort by cheapest" onClick={this.sortByCost}/>
      <MenuItem primaryText="Sort by fastest" onClick={this.sortByDuration}/>
    </IconMenu>
  }
};


Sorter.muiName = 'IconMenu';

// Component which contains the search trips results
function TripSorter ({trips: {totalTrips, searchCriteria}, fetchTrips}) {

  const title = totalTrips ? `${totalTrips} trips match your search`: 'Please enter cities to search trips';

  return (
    <div className={tripSorterStyle}>
      <AppBar
        title={title}
        showMenuIconButton={false}
        iconElementRight={totalTrips && <Sorter fetchTrips={fetchTrips} searchCriteria={searchCriteria} />}
      />
    </div>
  );
}

TripSorter.propTypes = propTypes;

export default TripSorter;
