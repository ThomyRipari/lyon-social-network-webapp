const initialState = {
	loading: false,
	followersList: []
}
export default ((state = initialState, action) => {
	switch(action.type) {
		case 'LOADING_FOLLOWERS_LIST':
			return {loading: true, followersList: []};

		case 'GET_FOLLOWERS_LIST':
			return {loading: false, followersList: action.followersList};

		case 'RESET_STATE_SOCIAL_FOLLOW':
			return initialState;

		default:
			return state;
	}
})