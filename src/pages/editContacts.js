import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput
} from 'react-native';

import * as firebase from "firebase";

export default class EditContacts extends Component{

	constructor(props) {
		super(props);
		this.state = {
			nameTextHeight: 0,
			name: '',
			number: '',
			address: ''
		}
		this.changeNumberOrAddress = this.changeNumberOrAddress.bind(this);
	}

	async componentDidMount() {

		let contactRefs = firebase.database().ref('contacts/'+this.props.index);
		let details = await contactRefs.once('value');
    details = details.val();

		this.setState({
			name: details.name,
			number: details.number,
			address: details.address,
		})
		// let contactRef = firebase.database().ref('contacts/'+this.props.name);

		// contactRef.set({
		// 	0: {
		// 		name: 'Oliver Sheng',
		// 		address: '127 Queen St',
		// 		number: '6471234322'
		// 	},
		// 	1: {
		// 		name: 'Jackie Chen',
		// 		address: '312 King St',
		// 		number: '6470010001'
		// 	},
		// 	2: {
		// 		name: 'Russell Westbrook',
		// 		address: '001 John Ave',
		// 		number: '5470020002'
		// 	}
		// })
	}

	changeNumberOrAddress(event, item) {

		let obj = {};
		obj[item] = event.nativeEvent.text;
		console.log("obj", obj)
		if(item === 'name'){
			this.setState({
				nameTextHeight: event.nativeEvent.contentSize.height
			})
		}
		this.setState(obj);

		let contactRef = firebase.database().ref('contacts/' + this.props.index + '/' + item);
		contactRef.set(event.nativeEvent.text);
	}

	requestServerChange(event, item) {
		let contactRef = firebase.database().ref('contacts/' + this.props.index + '/' + item);
		let obj = {}
		obj[item] = event.nativeEvent.text;
		contactRef.set(obj);
	}

	render() {
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