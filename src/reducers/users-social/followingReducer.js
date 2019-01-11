const initialState = {
	loading: false,
	followingList : []
}
export default ((state = initialState, action) => {
	switch(action.type) {
		case 'LOADING_FOLLOWING_LIST':
			return {loading: true, followingList: []};

		case 'GET_FOLLOWING_LIST':
			return {loading: false, followingList: action.followingList};

		case 'RESET_STATE_SOCIAL_FOLLOW':
			return initialState;

		default:
			return state;
	}
})