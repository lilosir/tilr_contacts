import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';

export default class NameAndInput extends Component {

  render() {   
    return (
      <View style={styles.container}>
      	<View style={styles.view_name}>
      		<Text style={styles.txt_name}>{this.props.name}</Text>
      	</View>
      	<View style={styles.view_value}>
        	<TextInput
	        	style={styles.txt_value}
            underlineColorAndroid='rgba(0,0,0,0)'
            onChangeText={(text) => this.props.onChangeText(text)}
            value={this.props.value}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  	flexDirection: 'row',
    height: 60,
  },
  view_name: {
  	flex: 1,
  	alignItems: 'center',
  	justifyContent: 'center',
  	margin: 10,
  },
  txt_name: {
  	fontSize: 18,
  	color: 'black'
  },
  view_value: {
  	flexDirection: 'row',
  	flex: 3,
  	justifyContent: 'center',
  	alignItems: 'center',
    borderWidth: 2,
    borderColor: '#eeeeee',
    margin: 10,
  },
  txt_value: {
  	flex: 1,
  	fontSize: 18,
  	padding: 5
  }
});



        

