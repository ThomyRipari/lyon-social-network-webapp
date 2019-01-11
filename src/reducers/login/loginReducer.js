const initialState = {
	token: null,
	error: false
}
export default ((state = initialState, action) => {
	switch(action.type) {
		case 'SUCCESS_LOGIN':
			return {token: action.token, error: false};

		case 'FAILED_LOGIN':
			return {token: null, error: true};

		case 'RESET_STATE':
			return initialState;

		case 'LOG_OUT':
			return initialState;

		default:
			return state;
	}
})
