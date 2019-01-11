import axios from 'axios';

/* Import Endpoint & Headers */
import endpoints from '../../../utils/requests/endpoints';
import headers from '../../../utils/requests/headers';

/* Import Actions */
import { showSnackbar } from '../../dialogs/snackbarActions';
import { fetchUserData } from '../../users/userProfileActions';

export function updateDescription(description) {
	return dispatch => {
		axios.put(endpoints.CHANGE_DESCRIPTION, JSON.stringify({description: description}), headers.HEADERS_A)

		.then(() => {
			dispatch(showSnackbar('Su descripcion ha sido cambiada correctamente.'));
			dispatch(fetchUserData(localStorage.username));
		})

		.catch(() => {
			window.location.href = '/server-error';
		})
	}
}