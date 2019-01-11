const initialState = {
	userdata: {},
	loading: true
}
export default ((state = initialState, action) => {
	switch(action.type) {
		case 'LOADING_USER_DATA':
			return initialState;

		case 'GET_USER_DATA_SUCCESS':
			return {userdata: action.userdata, loading: false};

		default:
			return state;
	}
})