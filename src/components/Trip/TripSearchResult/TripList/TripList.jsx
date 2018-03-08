import React from 'react';
import PropTypes from 'prop-types';
import cxs from 'cxs';
import moment from 'moment';
import getSymbolFromCurrency from 'currency-symbol-map';

import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Train from 'material-ui/svg-icons/maps/train';
import Bus from 'material-ui/svg-icons/maps/directions-bus';
import Car from 'material-ui/svg-icons/maps/directions-car';

import getTripSorterTheme from '../../../../common/theme';

const muiTheme = getTripSorterTheme();

const tripListPropTypes = {
  cost: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  steps: PropTypes.any.isRequired
};

const styles = {
  trip: {
    padding: '20px',
    margin: '10px',
    marginTop: '0'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: muiTheme.typography.fontStyleTitleSize,
    paddingBottom: '10px',
    ' div': {
      padding: '10px 20px'
    }
  },
  cost: {
    fontWeight: muiTheme.typography.fontWeightBold,
    backgroundColor: muiTheme.palette.primary1Color,
    borderRadius: '3px'
  },
  duration: {
    color: muiTheme.palette.accent3Color
  },
  connection: {
    fontSize: muiTheme.typography.fontStyleHeaderSize,
    fontWeight: muiTheme.typography.fontWeightBold,
    paddingBottom: '10px'
  },
  icon: {
    width: 35,
    height: 35
  },
  stepLayout: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepContent: {
    display: 'inline-block',
    paddingLeft: '40px'
  },
  stepLastItem: {
    marginLeft: 'auto'
  },
  stepCities: {
    fontSize: muiTheme.typography.fontStyleHeaderSize
  },
  stepReference: {
    color: muiTheme.palette.accent3Color
  }
};

function twoDigits(n) {
  return (n < 10) ? '0' + n : n;
}

function formatDuration(duration) {
  const mDuration = moment.duration(duration, 'minutes');
  return `${mDuration.get('days') * 24 + mDuration.get('hours')} h ${twoDigits(mDuration.get('minutes'))} min`;
}

function getTransportIcon(transport) {
  switch(transport) {
    case 'car': return <Car className={cxs(styles.icon)}/>;
    case 'bus': return <Bus className={cxs(styles.icon)}/>;
    case 'train': return <Train className={cxs(styles.icon)}/>;
    default: return null;
  }
}

const contextTypes = {
  muiTheme: PropTypes.object.isRequired
};

const stepPropTypes = {
  transport: PropTypes.string.isRequired,
  departure: PropTypes.string.isRequired,
  arrival: PropTypes.string.isRequired,
  reference: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  cost: PropTypes.number.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  discount: PropTypes.number.isRequired
};

// Component of a trip step.
function Step({transport, departure, arrival, reference, duration, cost, currencySymbol, discount}) {

  return (
    <div className={cxs(styles.stepLayout)}>
      <IconButton iconStyle={styles.icon}>{getTransportIcon(transport)}</IconButton>
      <div className={cxs(styles.stepContent)}>
        <div className={cxs(styles.stepCities)}>{departure} to {arrival}</div>
        <div className={cxs(styles.stepReference)}>{reference}</div>
      </div>
      <div className={cxs(styles.stepLastItem)}>
        <div className={cxs(styles.stepCities)}>{cost - cost * (discount / 100)} {currencySymbol}</div>
        <div className={cxs(styles.stepReference)}>{formatDuration(duration)}</div>
      </div>
    </div>
  )
}

Step.propTypes = stepPropTypes;
Step.contextTypes = contextTypes;

// Component which contains the search trips results
function TripList({cost, currency, duration, steps}) {
  const currencySymbol = getSymbolFromCurrency(currency);

  return (
    <Paper className={cxs(styles.trip)} zDepth={3}>
      <div className={cxs(styles.header)}>
        <div className={cxs(styles.cost)}>{cost} {currencySymbol}</div>
        <div className={cxs(styles.duration)}>
          {formatDuration(duration)} </div>
      </div>
      {steps.length > 1 ? <div className={cxs(styles.connection)}>{steps.length - 1} connection{steps.length > 2 && 's'}</div> : null}
      {steps.map((step, index) =>
        <div key={index}>
          <Step
            transport={step.transport}
            departure={step.departure}
            arrival={step.arrival}
            reference={step.reference}
            duration={step.duration}
            cost={step.cost}
            currencySymbol={currencySymbol}
            discount={step.discount}>
          </Step>
          <Divider />
        </div>
      )}
    </Paper>
  );
}

TripList.propTypes = tripListPropTypes;
TripList.contextTypes = contextTypes;

export default TripList;
