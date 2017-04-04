import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export default class EditContacts extends Component{

	constructor(props) {
		super(props);
		this.state = {
			avatarSource: ""
		}
	}

	componentDidMount() {
	}

	render() {
		return(
			<View style={styles.container}>
				<Text>QWE</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 55,
	},
	uploadAvatar: {
		height: 60,
		width: 60
	}
});