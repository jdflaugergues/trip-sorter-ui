import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import cxs from 'cxs';

import {TripContainer} from './components/Trip';


const appStyle = cxs({
  display: 'flex',
  minHeight: '100vh'
});

const propTypes = {
  store: PropTypes.object.isRequired
};

function App({store}){

  return (
    <Provider store={store}>
      <Router>
        <main className={appStyle}>
          <Switch>
            <Route exact path='/' render={() => (<Redirect to='/trip'/>)} />
            <Route path='/trip' render={() => <TripContainer />}/>
          </Switch>
        </main>
      </Router>
    </Provider>
  );
}

App.propTypes = propTypes;

export default App;
