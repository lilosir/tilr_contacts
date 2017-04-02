import React, { Component } from 'react';
import update from 'react/lib/update';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Topbar from './components/topbar.js';
import * as firebase from "firebase";

const APIKEY = "AIzaSyB-gqqdDosrWdWwPNPUpEkX1eL3ddM_PEM";
const AUTHDOMAIN = "tilrcontacts.firebaseapp.com";
const DATABASEURL = "https://tilrcontacts.firebaseio.com/";
const STORAGEBUCKET = "tilrcontacts.appspot.com";

const FIREBASECONFIG = {
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  databaseURL: DATABASEURL,
  storageBucket: STORAGEBUCKET
}

firebase.initializeApp(FIREBASECONFIG);

export default class Tilr_Contacts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contacts: {},
    }
  }

  componentDidMount() {

    var starCountRef = firebase.database().ref('contacts');
    starCountRef.on('value', snapshot => {
      var contactsList = snapshot.val();
      this.setState({contacts: contactsList})


      console.log("!!: ", contactsList);
      console.log("123: ", this.state.contacts);
    });
    
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, nextState)
  }

  render() {
    return (
      <View style={styles.container}>
        <Topbar/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});