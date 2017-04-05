import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput
} from 'react-native';
import {connect} from 'react-redux';

import * as firebase from "firebase";

mapStateToProps = (state) => state;
mapDispatchToProps = (dispatch) => ({
	updateInfo: (updatedInfo, index) => {
		dispatch({type:'update', payload: updatedInfo, index: index})
	}
})

class EditContacts extends Component{

	constructor(props) {
		super(props);
		this.state = {
			nameTextHeight: 0,
			name: '123',
			number: '',
			address: ''
		}
		this.changeNumberOrAddress = this.changeNumberOrAddress.bind(this);
	}

	async componentDidMount() {

		let {contacts} = this.props.reducers.contactsReducer;
		let currentContact = contacts[this.props.index];
		console.log(currentContact)
		

		// let contactRefs = firebase.database().ref('contacts/'+this.props.index);
		// let details = await contactRefs.once('value');
  //   details = details.val();

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

		let contactRef = firebase.database().ref('contacts/' + this.props.index + '/' + item);
		contactRef.set(value)
		.then(() => {
			console.log('Synchronization succeeded');
			this.props.updateInfo(obj, this.props.index);
		})
	  .catch((error) => console.log('Synchronization failed'));
	}

	render() {
		let {contacts} = this.props.reducers.contactsReducer;
		let currentContact = contacts[this.props.index];

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