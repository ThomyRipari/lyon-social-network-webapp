const initialState = {
	existsUsername: false
}
export default ((state = initialState, action) => {
	switch(action.type) {
		case 'ALREADY_EXISTS_USERNAME':
			return {existsUsername: true};

		case 'RESET_STATE':
			return initialState;

		default:
			return state;
	}
})
