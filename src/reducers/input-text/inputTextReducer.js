const initialState = {
	text: ''
}
export default ((state = initialState, action) => {
	switch(action.type) {
		case 'SAVE_INPUT_TEXT':
			return {text: action.text};

		case 'CLEAR_INPUT_TEXT':
			return initialState;

		default:
			return state;
	}
})
