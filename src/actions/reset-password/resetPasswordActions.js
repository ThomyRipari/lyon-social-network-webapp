import axios from 'axios';

/* Import Endpoint */
import endpoints from '../../utils/requests/endpoints';

export function resetPassword(token, newPassword) {
	const headers = {headers: {'Accept': 'application/json', 'Content-Type': 'application/json',
	  'Authorization': 'Token ' + token}};

	return dispatch => {
		axios.put(endpoints.RESET_PASSWORD, JSON.stringify({new_password: newPassword}), headers)

		.then(() => {
			window.location.href = '/login';
		})

		.catch(() => {
			window.location.href = '/server-error';
		})
	}
}