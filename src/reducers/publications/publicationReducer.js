const initialState = {actionType: null, loading: false, data: {}};
export default ((state = initialState, action) => {
	switch(action.type) {
		case 'LOADING_PUBLICATION':
			return {actionType: action.actionType, loading: true, data: {}};

		case 'GET_PUBLICATION':
			return {actionType: action.actionType, loading: false, data: action.data};
			
		case 'ADD_PUBLICATION':
			return {actionType: action.actionType, loading: false, data: state.data};

		case 'UPDATE_PUBLICATION':
			return {actionType: action.actionType, loading: false, data: {}};

		case 'DELETE_PUBLICATION':
			return {actionType: action.actionType, loading: false, data: {}};

		case 'RESET_STATE':
			return initialState;

		default:
			return state;
	}
})