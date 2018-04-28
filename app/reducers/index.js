import { combineReducers } from 'redux';

import currencies from './currencies';
import theme from './theme';
import error from './error';

export default combineReducers({
  currencies,
  theme,
  error
})
