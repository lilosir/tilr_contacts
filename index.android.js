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
import {Scene, Router} from 'react-native-router-flux';
import Contacts from './src/contacts';
import Login from './src/components/login';

export default class Tilr_Contacts extends Component {
	render() {
		return(
			<Router 
				navigationBarStyle={styles.naviBar}
				titleStyle={styles.title}>
	      <Scene key="root">
	        <Scene key="login" component={Login} title="Login"/>
	        <Scene 
	        	key="contacts" 
	        	component={Contacts} 
	        	title="Contacts"
	        	renderLeftButton={() => <Text>Back</Text>}
						onLeft={() => console.log('Left button!')}/>
	      </Scene>
      </Router>
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
