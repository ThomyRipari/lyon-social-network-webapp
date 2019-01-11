import axios from 'axios';

/* Import Endpoint & Headers */
import endpoints from '../../../utils/requests/endpoints';
import headers from '../../../utils/requests/headers';

/* Import Actions */
import { showSnackbar } from '../../dialogs/snackbarActions';
import { fetchUserData } from '../../users/userProfileActions';

export function updateName(name) {
	return dispatch => {
		axios.put(endpoints.CHANGE_NAME, JSON.stringify({name: name}), headers.HEADERS_A)

		.then(() => {
			dispatch(showSnackbar('Su nombre ha sido cambiado correctamente.'));
			dispatch(fetchUserData(localStorage.username));
		})

		.catch(() => {
			window.location.href = '/server-error';
		})
	}
}