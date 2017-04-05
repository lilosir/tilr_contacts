import { combineReducers } from 'redux';
import routes from './routes';
import contactsReducer from './contactsReducer';
// ... other reducers

export default combineReducers({
  routes,
  contactsReducer
});