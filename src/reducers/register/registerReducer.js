const initialState = {
	loading: false,
	registerSuccess: false,
	existsUsername: false,
	existsEmail: false,
	username: ''
}
export default ((state = initialState, action) => {
	switch(action.type) {
		case 'LOADING_REGISTER':
			return {loading: true, registerSuccess: false, existsUsername: false, existsEmail: false, username: ''};

		case 'SUCCESS_REGISTER':
			return {loading: false, registerSuccess: true, existsUsername: false, existsEmail: false, username: action.username};

		case 'SUCCESS_VALIDATED_USERNAME':
			return {loading: false, registerSuccess: false, existsUsername: false, existsEmail: state.existsEmail, username: ''};

		case 'EXISTS_USERNAME':
			return {loading: false, registerSuccess: false, existsUsername: true, existsEmail: state.existsEmail, username: ''};

		case 'SUCCESS_VALIDATED_EMAIL':
			return {loading: false, registerSuccess: false, existsEmail: false, existsUsername: state.existsUsername, username: ''};

		case 'EXISTS_EMAIL':
			return {loading: false, registerSuccess: false, existsEmail: true, existsUsername: state.existsUsername, username: ''};

		case 'RESET_STATE':
			return initialState;

		default:
			return state;
	}
})