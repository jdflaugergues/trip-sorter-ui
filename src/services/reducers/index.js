import {combineReducers} from 'redux'

import * as cityReducer from './city';
import * as tripReducer from './trip';

export default combineReducers({
  ...cityReducer,
  ...tripReducer,
});
