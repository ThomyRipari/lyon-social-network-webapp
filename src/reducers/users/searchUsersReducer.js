const initialState = {
	loading: false,
	foundUsers: [],
	numberOfResults: null
}
export default ((state = initialState, action) => {
	switch(action.type) {
		case 'LOADING_SEARCH':
			return {loading: true, foundUsers: null, numberOfResults: null};

		case 'CLEAR_SEARCH':
			return initialState;
			
		case 'NOT_FOUND_USERS':
			return {loading: false, foundUsers: null, numberOfResults: null};

		case 'FOUND_USERS':
			return {loading: false, foundUsers: action.users, numberOfResults: action.users.length};

		default:
			return state;
	}
})