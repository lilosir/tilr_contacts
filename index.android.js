/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import { 
	AppRegistry, 
  StyleSheet,
  Text,
} from 'react-native';
import { Scene, Router} from 'react-native-router-flux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './public/reducers';

//pages
import Contacts from './src/pages/contacts';
import Login from './src/pages/login';
import EditContacts from './src/pages/editContacts';


import * as firebase from "firebase";
import firbaseConfig from './public/credential';

firebase.initializeApp(firbaseConfig);

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers({reducers});
const store = createStoreWithMiddleware(reducer);
const RouterWithRedux = connect()(Router);

export default class Tilr_Contacts extends Component {
	render() {
		return(
			<Provider store={store}>
				<RouterWithRedux 
					navigationBarStyle={styles.naviBar}
					titleStyle={styles.title}>
		      <Scene key="root">
	        	<Scene key="login" component={Login} title="Login"/>
	        	<Scene 
	        		key="editContacts"
		        	component={EditContacts} title="EditContacts"/>
		        <Scene 
		        	initial={true} 
		        	key="contacts" 
		        	component={Contacts} 
		        	title="Contacts"
		        	renderBackButton={() => null}/>
		      </Scene>
	      </RouterWithRedux>
      </Provider>
		)
	}
}

const styles = StyleSheet.create({
  naviBar: {
    flex: 1,
    backgroundColor: '#1a1aff',
  },
  title: {
  	fontSize: 18,
  	color: '#fff'
  }
});

AppRegistry.registerComponent('Tilr_Contacts', () => Tilr_Contacts);
