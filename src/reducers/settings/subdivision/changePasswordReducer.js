const initialState = {
	loading: false,
	errorOldPass: false
}
export default ((state = initialState, action) => {
	switch(action.type) {
		case 'CHANGE_PASS_LOADING':
			return {loading: true, errorOldPass: false};

		case 'OLD_PASSWORD_INCORRECT':
			return {loading: false, errorOldPass: true};

		case 'RESET_STATE':
			return initialState;

		default:
			return state;
	}
})