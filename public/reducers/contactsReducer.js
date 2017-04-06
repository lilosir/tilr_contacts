export default function reducer(originalState = {contacts:[]}, action) {
	let type = action.type;
	let id = action.id;
	let contacts = { ...originalState.contacts };
	let state = Object.assign({}, originalState);

	switch(type) {
		case 'getAll':
			let contacts = action.payload;
			state.contacts = contacts;
			return state;
		case 'update':
			let updated = action.payload;
			
			let one_contact = state.contacts.filter((element) => {
				if(element.id === id){
					return element
				}
			})[0];

			for (var prop in updated) {
				one_contact[prop] = updated[prop];
			}
			return state;
		case 'remove':

			let index = state.contacts.filter((element, i) => {
				if(element.id === id){
					return i
				}
			})[0];

			state.contacts.splice(index, 1);
			return state;
		default: 
			return state;
	}
}