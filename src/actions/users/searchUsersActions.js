import axios from 'axios';

/* Import Endpoint & Headers */
import endpoints from '../../utils/requests/endpoints';
import headers from '../../utils/requests/headers';

export function findUsers(searchText) {
	return dispatch => {
		dispatch(loading());

		axios.post(endpoints.SEARCH_USERS, JSON.stringify({search_text: searchText}), headers.HEADERS_A)

		.then((res) => {
			dispatch(foundUsers(res.data));
		})

		.catch((err) => {
			console.clear();
			if (err.response.status === 404) {
				dispatch(notFoundUsers());
			} else {
				window.location.href = '/server-error';
			}
		})
	}
}

export function foundUsers(users) {
	return {type: 'FOUND_USERS', users};
}

export function loading() {
	return {type: 'LOADING_SEARCH'};
}

export function notFoundUsers() {
	return {type: 'NOT_FOUND_USERS'};
}

export function clearSearch() {
	return {type: 'CLEAR_SEARCH'};
}