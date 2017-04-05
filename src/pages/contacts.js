import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import ListItem from '../components/listItem';
import {Actions} from 'react-native-router-flux';

import * as firebase from "firebase";

export default class Contacts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
    }
    this.editContacts = this.editContacts.bind(this)
  }

  async componentDidMount() {

    console.log("DFDTHTHRGFGS")
    let contactRefs = firebase.database().ref('contacts');

    let contactlist = await contactRefs.once('value');
    contactsList = contactlist.val();
    let lists = [];
    for(let contact in contactsList) {
      let obj = {};
      obj.name = contactsList[contact].name;
      obj.address = contactsList[contact].address;
      obj.number = contactsList[contact].number;
      obj.index = contact;
      lists.push(obj)
    }
    this.setState({contacts: lists})

    console.log("!!!: ", contactsList);
    console.log("123: ", this.state.contacts);

    // contactRefs.on('value', snapshot => {
    //   let contactsList = snapshot.val();
    //   let lists = [];
    //   for(let contact in contactsList) {
    //     let obj = {};
    //     obj.name = contact;
    //     obj.address = contactsList[contact].address;
    //     obj.number = contactsList[contact].number;
    //     lists.push(obj)
    //   }
    //   this.setState({contacts: lists})

    //   console.log("!!: ", contactsList);
    //   console.log("123: ", this.state.contacts);
    // });

    let storage = firebase.storage();
    let pathReference = storage.ref('avatar');
    pathReference.child('image.jpg').getDownloadURL().then(function(url) {

      // Or inserted into an <img> element:
      console.log("URL", url)
      this.setState({avatar: url})
    }.bind(this)).catch(function(error) {
      // Handle any errors
      console.log(error)
    });
  }

  editContacts(i) {
    Actions.editContacts({index: i});
  }

  render() {
    if(this.state.contacts.length !== 0) {
      return (
        <ScrollView style={styles.container}>
          {this.state.contacts.map((contact, i) => {
            let avatar = require('../images/logo.png');
            return (
              <ListItem
                key={i}
                name={contact.name}
                number={contact.number}
                avatarSource={{uri: this.state.avatar}}
                onPress={()=>this.editContacts(contact.index)}/>
            )
          })}
          
        </ScrollView>
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