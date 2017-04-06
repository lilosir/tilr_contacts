import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
} from 'react-native';
import ListItem from '../components/listItem';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import * as firebase from "firebase";

mapStateToProps = (state) => state; 

mapDispatchToProps = (dispatch) => ({
  getAll: (contacts) => {
    dispatch({type:'getAll', payload: contacts})
  },
  reorder: () => {
    dispatch({type: 'change'})
  }
})

class Contacts extends Component {

  constructor(props) {
    super(props);
    this.editContacts = this.editContacts.bind(this);
    this.reorder = this.reorder.bind(this);
  }

  async componentDidMount() {

    console.log("props: ", this.props)
    let contactRefs = firebase.database().ref('contacts');

    let contactlist = await contactRefs.once('value');
    contactsList = contactlist.val();
    let lists = [];
    for(let contact in contactsList) {
      let obj = {};
      obj.name = contactsList[contact].name;
      obj.address = contactsList[contact].address;
      obj.number = contactsList[contact].number;
      obj.id = contactsList[contact].id;
      lists.push(obj)
    }

    lists = this.mySortFirst(lists)
    this.props.getAll(lists);

    let {contacts} = this.props.reducers.contactsReducer;

    console.log("!!!: ", contacts);

    let storage = firebase.storage();
    let pathReference = storage.ref('avatar');
    pathReference.child('logo.png').getDownloadURL().then(function(url) {
      // Or inserted into an <img> element:
      console.log("URL", url)
      this.setState({avatar: url})
    }.bind(this)).catch(function(error) {
      // Handle any errors
      console.log(error)
    });
  }

  editContacts(i) {
    Actions.editContacts({id: i});
  }

  reorder() {
    this.props.reorder();
    let {contacts} = this.props.reducers.contactsReducer;
    let firstOrder = this.props.reducers.orderReducer.firstOrder;
    let result = firstOrder ? this.mySortFirst(contacts) : this.mySortLast(contacts);
    this.props.getAll(result);
  }

  componentWillReceiveProps(nextProps) {
    console.log("new props come! ", nextProps)
  }

  mySortFirst(arr){
    return arr.sort((a, b) => {
      let valA = a.name.split(' ')[0];
      let valB = b.name.split(' ')[0];
      if(valA > valB) return 1;
      if(valA < valB) return -1;
      return 0;
    })
  }

  mySortLast(arr){
    return arr.sort((a, b) => {
      let valA = a.name.split(' ')[1] || "";
      let valB = b.name.split(' ')[1] || "";
      if(valA > valB) return 1;
      if(valA < valB) return -1;
      return 0;
    })
  }

  render() {
    let {contacts} = this.props.reducers.contactsReducer;
    console.log("here::::: ", contacts)
    if(contacts.length !== 0) {
      return (
        <View  style={styles.container}>
          <View style={styles.btn_add}>
            <Button
              onPress={() => this.reorder()}
              title="Reorder"
              color="#33cc33"/>
          </View>
          <ScrollView>
            {contacts.map((contact, i) => {
              let avatar = require('../images/logo.png');
              return (
                <ListItem
                  key={i}
                  name={contact.name}
                  number={contact.number}
                  avatarSource={avatar}
                  onPress={()=>this.editContacts(contact.id)}/>
              )
            })}
            
          </ScrollView>
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
  btn_add: {
    margin: 10,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);