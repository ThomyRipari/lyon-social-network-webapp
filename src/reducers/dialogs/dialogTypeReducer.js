const initialState = {
	modalType: null,
	modalData: {},
	closed: false
}
export default ((state = initialState, action) => {
	switch(action.type) {
		case 'SHOW_MODAL':
			return {modalType: action.modalType, modalData: action.modalData, closed: false};

		case 'HIDE_MODAL':
			return {modalType: null, modalData: {}, closed: true};

		default:
			return state;
	}
})
