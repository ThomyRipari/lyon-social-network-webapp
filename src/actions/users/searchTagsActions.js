import axios from 'axios';

/* Import Endpoint & Headers */
import endpoints from '../../utils/requests/endpoints';
import headers from '../../utils/requests/headers';

export function findMentions(text) {
	return dispatch => {
		axios.post(endpoints.SEARCH_USERS, JSON.stringify({search_text: text}), headers.HEADERS_A)

		.then((res) => {
			dispatch(foundMentions(res.data));
		})

		.catch((err) => {
			console.clear();
			if (!err.response.status === 404) {
				window.location.href = '/server-error';
			} else {
				dispatch(clearMentions());
			}
		})
	}
}

export function foundMentions(users) {
	return {type: 'FOUND_TAGS', users};
}

export function clearMentions() {
	return {type: 'CLEAR_TAGS'};
}