import axios from 'axios';

/* Import Endpoint & Headers */
import endpoints from '../../../utils/requests/endpoints';
import headers from '../../../utils/requests/headers';

/* Import Actions */
import { showSnackbar } from '../../dialogs/snackbarActions';

export function changePassword(oldPassword, newPassword) {
	return dispatch => {
		dispatch(loading());

		axios.put(endpoints.CHANGE_PASSWORD,
		 JSON.stringify({old_password: oldPassword, new_password: newPassword}),
		  headers.HEADERS_A)

		.then(() => {
			dispatch(resetState());
			dispatch(showSnackbar('Su contraseña ha sido cambiada correctamente.'));
		})

		.catch((err) => {
			console.clear();
			if (err.response.status === 400) {
				dispatch(oldPasswordIncorrect());
			} else {
				window.location.href = '/server-error';
			}
			
		})
	}
}

export function resetState() {
	return {type: 'RESET_STATE'};
}

export function loading() {
	return {type: 'CHANGE_PASS_LOADING'};
}

export function oldPasswordIncorrect() {
	return {type: 'OLD_PASSWORD_INCORRECT'};
}