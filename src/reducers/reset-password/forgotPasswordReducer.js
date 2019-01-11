const initialState = {
	loading: false,
	success: false,
	error: false
}
export default ((state = initialState, action) => {
	switch(action.type) {
		case 'LOADING_VALIDATION':
			return {loading: true, success: false, error: false};

		case 'EMAIL_VALIDATED_ERROR':
			return {loading: false, success: false, error: true};

		case 'EMAIL_VALIDATED_SUCCESS':
			return {loading: false, success: true, error: false};

		case 'RESET_STATE':
			return initialState;

		default:
			return state;
	}
})