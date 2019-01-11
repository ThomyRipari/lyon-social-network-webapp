import axios from 'axios';

/* Import Endpoint & Headers */
import endpoints from '../../../utils/requests/endpoints';
import headers from '../../../utils/requests/headers';

export default function getLikesProfiles(id) {
	return dispatch => {
		axios.post(endpoints.GET_LIKES_PROFILES, JSON.stringify({publication_id: id}), headers.HEADERS_A)

		.then((res) => {
			dispatch(getProfiles(res.data));
		})

		.catch(() => {
			window.location.href = '/server-error';
		})
	}
}

export function getProfiles(profiles) {
	return {type: 'GET_LIKES_PROFILES', profiles};
}