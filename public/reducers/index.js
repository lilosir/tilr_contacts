import { combineReducers } from 'redux';
import routes from './routes';
import contactsReducer from './contactsReducer';
import orderReducer from './orderReducer';
// ... other reducers

export default combineReducers({
  routes,
  contactsReducer,
  orderReducer
});