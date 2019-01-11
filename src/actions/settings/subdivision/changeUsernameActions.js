import axios from 'axios';

/* Import Endpoint & Headers */
import endpoints from '../../../utils/requests/endpoints';
import headers from '../../../utils/requests/headers';

/* Import Actions */
import { showSnackbar } from '../../dialogs/snackbarActions';
import { fetchUserData } from '../../users/userProfileActions';

export function updateUsername(username) {
	return dispatch => {
		axios.put(endpoints.CHANGE_USERNAME, JSON.stringify({username: username}), headers.HEADERS_A)

		.then(() => {
			localStorage.username = username;
			dispatch(showSnackbar('Su username ha sido cambiado correctamente.'));
			dispatch(fetchUserData(localStorage.username));
		})

		.catch(() => {
			window.location.href = '/server-error';
		})
	}
}

export function validateUsername(username) {
	return dispatch => {
		axios.post(endpoints.VALIDATE_REGISTER, JSON.stringify({username: username, email: ''}), headers.HEADERS_A)

		.then(() => {
			dispatch(resetState());
		})

		.catch((err) => {
			console.clear();
			if (err.response.status === 409) {
				dispatch(existsUsername());
			} else {
				window.location.href = '/server-error';
			}
		})
	}
}

export function resetState() {
	return {type: 'RESET_STATE'};
}

export function existsUsername() {
	return {type: 'ALREADY_EXISTS_USERNAME'};
}