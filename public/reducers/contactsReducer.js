export default function reducer(state = {contacts:[]}, action) {
	let contacts = { ...state.contacts };
	let type = action.type;
	let id = action.id;

	switch(type) {
		case 'getAll':
			console.log("in reducer get all")
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
			console.log("reducer", state.contacts)
			return state;
		default: 
			return state;
	}
}