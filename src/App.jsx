import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import cxs from 'cxs';

import getTripSorterTheme from './common/theme';
import {TripContainer} from './components/Trip';

const muiTheme = getTripSorterTheme();

const appStyle = cxs({
  display: 'flex',
  minHeight: '100vh'
});

const propTypes = {
  store: PropTypes.object.isRequired
};

function App({store}){

  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <Provider store={store}>
        <Router>
          <main className={appStyle}>
            <Switch>
              <Route exact path='/' render={() => (<Redirect to='/trip' />)} />
              <Route path='/trip' render={() => <TripContainer />}/>
            </Switch>
          </main>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

App.propTypes = propTypes;

export default App;
