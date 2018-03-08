import React from 'react';
import PropTypes from 'prop-types';
import cxs from 'cxs';
import moment from 'moment';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import IconButton from 'material-ui/IconButton';
import Train from 'material-ui/svg-icons/maps/train';
import Bus from 'material-ui/svg-icons/maps/directions-bus';
import Car from 'material-ui/svg-icons/maps/directions-car';

import {colors, font} from '../../../../common/theme';

const tripListPropTypes = {
  cost: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  steps: PropTypes.any.isRequired
};

const styles = {
  trip: {
    padding: '20px',
    margin: '10px',
    marginTop: '0',
    color: colors.primaryColor
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: font.titleSize,
    paddingBottom: '10px',
    ' div': {
      padding: '10px 20px'
    }
  },
  cost: {
    fontWeight: 'bold',
    backgroundColor: 'rgb(0, 188, 212)',
    borderRadius: '3px'
  },
  duration: {
    color: colors.secondaryColor
  },
  connection: {
    fontSize: font.headerSize,
    fontWeight: 'bold',
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
    fontSize: font.headerSize
  },
  stepReference: {
    color: colors.secondaryColor
  }
};

function twoDigits(n) {
  return (n < 10) && '0' + n || n;
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

const stepPropTypes = {
  transport: PropTypes.string.isRequired,
  departure: PropTypes.string.isRequired,
  arrival: PropTypes.string.isRequired,
  reference: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  cost: PropTypes.number.isRequired,
  discount: PropTypes.number.isRequired
};

function Step({transport, departure, arrival, reference, duration, cost, discount}) {
  return (
    <div className={cxs(styles.stepLayout)}>
      <IconButton iconStyle={styles.icon}>{getTransportIcon(transport)}</IconButton>
      <div className={cxs(styles.stepContent)}>
        <div className={cxs(styles.stepCities)}>{departure} to {arrival}</div>
        <div className={cxs(styles.stepReference)}>{reference}</div>
      </div>
      <div className={cxs(styles.stepLastItem)}>
        <div className={cxs(styles.stepCities)}>{cost - cost * (discount / 100)} €</div>
        <div className={cxs(styles.stepReference)}>{formatDuration(duration)}</div>
      </div>
    </div>
  )
}

Step.propTypes = stepPropTypes;

// Component which contains the search trips results
function TripList({cost, duration, steps}) {

  return (
    <Paper className={cxs(styles.trip)} zDepth={3}>
      <div className={cxs(styles.header)}>
        <div className={cxs(styles.cost)}>{cost} €</div>
        <div className={cxs(styles.duration)}>
          {formatDuration(duration)} </div>
      </div>
      {steps.length > 1 && <div className={cxs(styles.connection)}>{steps.length - 1} connections</div>}
      {steps.map((step, index) =>
        <div key={index}>
          <Step
            transport={step.transport}
            departure={step.departure}
            arrival={step.arrival}
            reference={step.reference}
            duration={step.duration}
            cost={step.cost}
            discount={step.discount}>
          </Step>
          <Divider />
        </div>
      )}
    </Paper>
  );
}

TripList.propTypes = tripListPropTypes;

export default TripList;
