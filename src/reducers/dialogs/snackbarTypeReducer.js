const initialState = {
	show: false,
	message: ''
}
export default ((state = initialState, action) => {
	switch(action.type) {
		case 'SHOW_SNACKBAR':
			return {show: true, message: action.message};

		case 'HIDE_SNACKBAR':
			return initialState;
			
		default:
			return state;
	}
})