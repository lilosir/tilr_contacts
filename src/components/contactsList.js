import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';

export default class ContactsList extends Component {

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
    return (
      <View style={styles.container}>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'black'
  }
});


        

        