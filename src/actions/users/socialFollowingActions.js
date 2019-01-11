import axios from 'axios';

/* Import Endpoint & Headers */
import endpoints from '../../utils/requests/endpoints';
import headers from '../../utils/requests/headers';

export function socialFollowing(username) {
	return dispatch => {
		axios.post(endpoints.SOCIAL_FOLLOWING, JSON.stringify({user: username}), headers.HEADERS_A)

		.catch(() => {
			window.location.href = '/server-error';
		})
	}
}