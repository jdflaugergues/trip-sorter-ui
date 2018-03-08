import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cxs from 'cxs';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


import getTripSorterTheme from '../../../../common/theme';

const muiTheme = getTripSorterTheme();


const propTypes = {
  trips: PropTypes.any,
  fetchTrips: PropTypes.func.isRequired,
  searchCriteria: PropTypes.any
};

const tripHeaderStyle = cxs({
  marginBottom: '20px'
});

// Component of the button to sort the trips by cheapest or fastest
class SorterButton extends Component {

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
      iconButtonElement={<IconButton><MoreVertIcon color={muiTheme.palette.alternateTextColor} /></IconButton>}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <MenuItem primaryText="Sort by cheapest" onClick={this.sortByCost}/>
      <MenuItem primaryText="Sort by fastest" onClick={this.sortByDuration}/>
    </IconMenu>
  }
}


SorterButton.muiName = 'IconMenu';

// Component containing the sorter button and the number of result.
function TripHeader ({trips: {totalTrips, searchCriteria}, fetchTrips}) {

  const title = totalTrips ? `${totalTrips} trips match your search`: totalTrips === 0 ? 'No trip match your search': 'Please enter cities to search trips';

  return (
    <div className={tripHeaderStyle}>
      <AppBar
        title={title}
        showMenuIconButton={false}
        iconElementRight={totalTrips ? <SorterButton fetchTrips={fetchTrips} searchCriteria={searchCriteria} /> : null}
      />
    </div>
  );
}

TripHeader.propTypes = propTypes;
TripHeader.contextTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default TripHeader;
