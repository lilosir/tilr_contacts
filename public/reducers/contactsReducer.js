export default function reducer(state = {contacts:[]}, action) {
	let contacts = { ...state.contacts };
	let type = action.type;

	switch(type) {
		case 'getAll':
			let contacts = action.payload;
			state.contacts = contacts;
			return state;
		case 'update':
			let updated = action.payload;
			let index = parseInt(action.index);
			for (var prop in updated) {
				state.contacts[index][prop] = updated[prop];
			}
			return state;
		default: 
			return state;
	}
}