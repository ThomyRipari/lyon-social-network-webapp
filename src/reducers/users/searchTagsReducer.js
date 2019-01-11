const initialState = {
	foundUsers: [],
}
export default ((state = initialState, action) => {
	switch(action.type) {
		case 'FOUND_TAGS':
			return {foundUsers: action.users};

		case 'CLEAR_TAGS':
			return initialState;

		default:
			return state;
	}
})