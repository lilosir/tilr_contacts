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
  View,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-material-design';
import { Actions, Scene, Router} from 'react-native-router-flux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './public/reducers';

//pages
import Contacts from './src/pages/contacts';
import Login from './src/pages/login';
import EditContacts from './src/pages/editContacts';
import NewContact from './src/pages/newContact';


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
	        	<Scene 
			        initial={true} 
	        		key="login"
			        component={Login} 
			        title="Login"/>
	        	<Scene 
	        		key="editContacts"
		        	component={EditContacts} title="EditContacts"/>
		        <Scene
	        		key="newContact"
		        	component={NewContact} title="NewContact"/>
		        <Scene
		        	component={Contacts}
		        	key="contacts" 
		        	title="Contacts"
							renderRightButton={() => 
		        		(<TouchableOpacity onPress={Actions.newContact}>
        					<Icon name={"add"} color="#bbb" size={20}/>
          			</TouchableOpacity>)}/>
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
