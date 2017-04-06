import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  View,
  Button,
  Text,
} from 'react-native';

import * as firebase from "firebase";
import firbaseConfig from '../../public/credential';
import {Actions} from 'react-native-router-flux';

export default class Login extends Component {

  constructor(props){
    super(props);
    this.state={
      email: "",
      password: "",
      error: ""
    }
    this.login = this.login.bind(this);
  }

  async login() {
    let email = this.state.email;
    let password = this.state.password;
    
    try{
      const auth = await firebase.auth().signInWithEmailAndPassword(email, password);

      let user = firebase.auth().currentUser;
      if (user) {
        // User is signed in.
        this.setState({error: ""})
        Actions.contacts();
      } else {
        console.log("logged out")
      }

    } catch(error) {
      console.log("error: ", error);
      let errorCode = error.code;
      let errorMessage = error.message;
      this.setState({error: errorMessage})
      console.log("state: ", this.state.error)
    }
  }

  render() {
    let ErrorMessage;
    if(this.state.error !== ""){
      ErrorMessage = (
        <Text style={styles.errors}>{this.state.error}</Text>
      )
    }
    return (
      <View style={styles.container}>
        <View style={[styles.textInput, {marginTop: 150}]}>
          <TextInput 
            style={{fontSize: 18}}
            placeholder="Email Address"
            underlineColorAndroid='rgba(0,0,0,0)' 
            onChangeText={(text) => this.setState({email: text})}/>
        </View>
        <View style={[styles.textInput, {marginTop: 10}]}>
          <TextInput 
            style={{fontSize: 18}}
            placeholder="Password"
            underlineColorAndroid='rgba(0,0,0,0)' 
            onChangeText={(text) => this.setState({password: text})}/>
        </View>
        {ErrorMessage}
        <View style={styles.btn_login}>
          <Button
            style={{flex:1}}
            onPress={this.login}
            title="Log In"
            color="#1a1aff"/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop: 55,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d6d6c2',
  },
  textInput: {
    borderStyle: 'solid',
    backgroundColor: "white",
    width: 300,
    height: 50,
  },
  btn_login: {
    marginTop: 10,
    width: 300,
  },
  errors: {
    fontSize: 14,
    color: 'red',
  }
});