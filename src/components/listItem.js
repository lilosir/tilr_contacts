import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';
import {Icon} from 'react-native-material-design';

export default class ListItem extends Component {

  render() {   
  	
    return (
      <View style={styles.container}>
      	<Image
    			style={styles.avatar}
        	source={this.props.avatarSource}/>
      	<View style={styles.contents}>
      		<Text style={styles.name}>{this.props.name}</Text>
      		<Text>{this.props.number}</Text>
      	</View>
      	<View style={styles.edit}>
      		<Icon name={"edit"} color="#bbb" size={20}/>
      	</View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  	flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee'
  },
  avatar: {
  	flex: 1,
  	width: 50,
  	height: 50,
  	marginLeft: 10
  },
  contents: {
  	flex: 4,
  	flexDirection: 'column',
  	margin: 10,
  },
  name: {
  	fontSize: 18,
  	color: 'black',
  	fontWeight: 'bold',
  },
  edit: {
  	flex: 1,
  	flexDirection: 'row',
  	justifyContent: 'flex-end',
  	marginRight: 10
  }
});



        

        