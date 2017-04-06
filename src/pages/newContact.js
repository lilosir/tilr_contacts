import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import NameAndInput from '../components/nameAndInput';
import guid from '../../public/guid';

import * as firebase from "firebase";

mapStateToProps = null;
mapDispatchToProps = null;

class NewContact extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			name: '',
			number: '',
			address: '',
		}
		this.onChangeText = this.onChangeText.bind(this);
		this.addContact = this.addContact.bind(this);
	}

	componentDidMount() {
		const ID = guid();
		this.setState({
			id:ID
		});
	}

	onChangeText(key, text) {
		let obj = {};
		obj[key] = text;
		this.setState(obj);
	}

	addContact() {
		let contactRef = firebase.database().ref('contacts/' + this.state.id);
		contactRef.set(this.state)
		.then(() => {
			console.log('Synchronization succeeded');
			Actions.contacts();
		})
	  .catch((error) => console.log('Synchronization failed'));
	}

	render() {
		return(
			<View style={styles.container}>
				<NameAndInput
					name="name"
					onChangeText={(text) => this.onChangeText("name", text)}
					value={this.state.name}/>
				<NameAndInput
					name="number"
					onChangeText={(text) => this.onChangeText("number", text)}
					value={this.state.number}/>
				<NameAndInput
					name="address"
					onChangeText={(text) => this.onChangeText("address", text)}
					value={this.state.address}/>
				<View style={styles.btn_add}>
					<Button
					  onPress={this.addContact}
					  title="Add"
					  color="#33cc33"/>
				</View>
			</View>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewContact);