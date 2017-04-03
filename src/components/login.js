import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  View,
  Button,
} from 'react-native';

export default class Login extends Component {

  login() {
    console.log("DSFSDF")
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.textInput, {marginTop: 150}]}>
          <TextInput 
            style={{fontSize: 18}}
            placeholder="Email Address"
            underlineColorAndroid='rgba(0,0,0,0)' 
            onChangeText={(email) => this.setState({email})}/>
        </View>
        <View style={[styles.textInput, {marginTop: 10}]}>
          <TextInput 
            style={{fontSize: 18}}
            placeholder="Password"
            underlineColorAndroid='rgba(0,0,0,0)' 
            onChangeText={(pasword) => this.setState({pasword})}/>
        </View>
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
  }
});