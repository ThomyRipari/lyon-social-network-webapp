import axios from 'axios';

/* Import Endpoint & Headers */
import endpoints from '../../utils/requests/endpoints';
import headers from '../../utils/requests/headers';

const GET_PUBLICATION = 'GET_PUBLICATION';
const LOADING_PUBLICATION = 'LOADING_PUBLICATION';

export function getPublication(id) {
	return dispatch => {
		dispatch(loadingPublication());

		axios.post(endpoints.GET_PUBLICATION, JSON.stringify({text: id}), headers.HEADERS_A)

		.then((res) => {
			dispatch(getPublicationSuccess(res.data));
		})

		.catch((err) => {
			console.clear();
			if (err.response.status === 404) {
				window.location.href = '/not-found-error';
			} else {
				window.location.href = '/server-error';
			}
		})
	}
}

export function loadingPublication() {
	return {type: LOADING_PUBLICATION, actionType: LOADING_PUBLICATION};
}

export function getPublicationSuccess(data) {
	return {type: GET_PUBLICATION, actionType: GET_PUBLICATION, data};
}

export function resetStatePublications() {
	return {type: 'RESET_STATE'};
}