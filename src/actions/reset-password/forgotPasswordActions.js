import axios from 'axios';

/* Import Endpoint & Headers */
import endpoints from '../../utils/requests/endpoints';
import headers from '../../utils/requests/headers';

/* Import Actions */
import { showSnackbar } from '../dialogs/snackbarActions';

export function forgotPassword(email) {
	return dispatch => {
		dispatch(loading());

		axios.post(endpoints.FORGOT_PASSWORD, JSON.stringify({email: email}), headers.HEADERS_B)

		.then(() => {
			dispatch(emailValidatedSuccess());
			dispatch(showSnackbar('Se ha enviado el email con el enlace.'));
		})

		.catch((err) => {
			console.clear();
			if (err.response.status === 406) {
				dispatch(emailValidatedError());
			} else {
				window.location.href = '/server-error';
			}
		})
	}
}

export function loading() {
	return {'type': 'LOADING_VALIDATION'};
}

export function emailValidatedSuccess() {
	return {'type':  'EMAIL_VALIDATED_SUCCESS'};
}

export function emailValidatedError() {
	return {'type': 'EMAIL_VALIDATED_ERROR'};
}

export function resetState() {
	return {'type': 'RESET_STATE'};
}