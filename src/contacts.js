import React, { Component } from 'react';
import update from 'react/lib/update';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import ListItem from './components/listItem';
import {Scene, Router} from 'react-native-router-flux';

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


export default class Contacts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
    }
  }

  componentDidMount() {

    var starCountRef = firebase.database().ref('contacts');
    starCountRef.on('value', snapshot => {
      var contactsList = snapshot.val();
      var lists = [];
      for(var contact in contactsList) {
        var obj = {};
        obj.name = contact;
        obj.address = contactsList[contact].address;
        obj.number = contactsList[contact].number;
        lists.push(obj)
      }
      this.setState({contacts: lists})


      console.log("!!: ", contactsList);
      console.log("123: ", this.state.contacts);
    });
    
  }

  render() {
    if(this.state.contacts.length !== 0) {
      return (
        <View style={styles.container}>
          {this.state.contacts.map((contact, i) => {
            var avatar = require('./images/logo.png');
            return (
              <ListItem
                key={i}
                name={contact.name}
                number={contact.number}
                avatarSource={avatar}/>
            )
          })}
          
        </View>
      );
    }

    return (
      <Text> Loading ... </Text>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 55,
    backgroundColor: '#F5FCFF',
  },
});