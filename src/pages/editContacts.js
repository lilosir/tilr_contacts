import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

import * as firebase from "firebase";

mapStateToProps = (state) => state;
mapDispatchToProps = (dispatch) => ({
	removeOne: (id) => {
		dispatch({type: 'remove', id: id})
	},
	updateInfo: (updatedInfo, id) => {
		dispatch({type:'update', payload: updatedInfo, id: id})
	}
})

class EditContacts extends Component{

	constructor(props) {
		super(props);
		this.state = {
			nameTextHeight: 0,
			name: '',
			number: '',
			address: ''
		}
		this.changeNumberOrAddress = this.changeNumberOrAddress.bind(this);
		this.deleteContact = this.deleteContact.bind(this)
	}

	async componentDidMount() {

		let {contacts} = this.props.reducers.contactsReducer;
		let currentContact = contacts.filter((element) => {
			if(element.id === this.props.id){
				return element;
			}
		})[0];

		// let contactRefs = firebase.database().ref('contacts/'+this.props.id);
		// let details = await contactRefs.once('value');
		// details = details.val();

		this.setState({
			name: currentContact.name,
			number: currentContact.number,
			address: currentContact.address,
		})
	}

	async changeNumberOrAddress(event, item) {

		let value = event.nativeEvent.text;
		let height = event.nativeEvent.contentSize.height;

		let obj = {};
		obj[item] = value;
		if(item === 'name'){
			this.setState({
				nameTextHeight: height
			})
		}
		this.setState(obj);

		let contactRef = firebase.database().ref('contacts/' + this.props.id + '/' + item);
		contactRef.set(value)
		.then(() => {
			console.log('Synchronization succeeded');
			this.props.updateInfo(obj, this.props.id);
		})
	  .catch((error) => console.log('Synchronization failed'));
	}

	deleteContact(id) {
		let contactRef = firebase.database().ref('contacts/' + this.props.id);
		contactRef.remove()
		.then(() => {
			console.log('Synchronization succeeded');
			this.props.removeOne(id);
			Actions.contacts();
		})
	  .catch((error) => console.log('Synchronization failed'));
	}

	render() {
		let {contacts} = this.props.reducers.contactsReducer;
		let currentContact = contacts.filter((element) => {
			if(element.id === this.props.id){
				return element;
			}
		})[0];

		if(currentContact){
			return(
				<View style={styles.container}>
					<View style={styles.view_avatar}>
					<Image 
						style={styles.avatar}
						source={require('../images/logo.png')}/>
					</View>

					<View style={styles.view_name}>
	          <TextInput 
	          	multiline={true}
	            style={[styles.input_name,{height: Math.max(40, this.state.nameTextHeight)}]}
	            underlineColorAndroid='rgba(0,0,0,0)'
	            onChange={(event) => this.changeNumberOrAddress(event, 'name')}
	            value={this.state.name}/>
	        </View>

	        <View style={styles.view_contents}>
	        	<View style={styles.content_name}>
		        	<Text style={styles.txt}>Number: </Text>
	        	</View>
	        	<View style={styles.content_value}>
		        	<TextInput
			        	style={styles.txt}
		            underlineColorAndroid='rgba(0,0,0,0)'
		            onChange={(event) => this.changeNumberOrAddress(event, 'number')}
		            value={this.state.number}/>
		        </View>
	        </View>

	        <View style={styles.view_contents}>
	        	<View style={styles.content_name}>
		        	<Text style={styles.txt}>Address: </Text>
	        	</View>
	        	<View style={styles.content_value}>
		        	<TextInput
			        	style={styles.txt}
		            underlineColorAndroid='rgba(0,0,0,0)'
		            onChange={(event) => this.changeNumberOrAddress(event, 'address')}
		            value={this.state.address}/>
		        </View>
	        </View>
	        <Button
					  onPress={() => this.deleteContact(this.props.id)}
					  title="Delete"
					  color="#ff0000"/>
				</View>
			)			
		}

		return (
      <Text> Loading ... </Text>
    )
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		marginTop: 55,
	},
	view_avatar: {
		alignItems: 'center',
	},
	avatar: {
		width: 80,
		height: 80,
	},
	view_name: {
		alignItems: 'center',
		flexDirection:'row',
		marginTop: 20,
		marginLeft: 10,
		marginRight: 10,
	},
	input_name: {
		flex: 1, 
		textAlign: 'center', 
		fontSize: 18
	},
	view_contents: {
		alignItems: 'center',
		flexDirection: 'row',
		marginTop: 10,
		marginLeft: 10,
		marginRight: 10,
	},
	content_name: {
		flex: 1,
		alignItems: 'flex-end'
	},
	content_value: {
		flex:1,
	},
	txt: {
		fontSize: 16,
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(EditContacts);