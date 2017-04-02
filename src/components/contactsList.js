import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Topbar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Contacts </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d6d6c2',
    height: 40,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'black'
  }
});