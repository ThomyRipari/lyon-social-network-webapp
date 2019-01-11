const initialState = {profiles: []};

export default ((state = initialState, action) => {
	switch(action.type) {
		case 'GET_LIKES_PROFILES':
			return {profiles: action.profiles};

		default:
			return state;
	}
})