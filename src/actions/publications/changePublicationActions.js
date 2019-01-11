import axios from 'axios';

/* Import Endpoint & Headers */
import endpoints from '../../utils/requests/endpoints';
import headers from '../../utils/requests/headers';

/* Import Actions */
import { showSnackbar } from '../dialogs/snackbarActions';

const UPDATE_PUBLICATION = 'UPDATE_PUBLICATION';

export function updatePublication(data) {
	return dispatch => {
		axios.put(endpoints.CHANGE_PUBLICATION, data, headers.HEADERS_C)

		.then(() => {
			dispatch(changePublicationSuccess());
			dispatch(showSnackbar('La publicacion ha sido editada correctamente.'));
		})

		.catch(() => {
			console.clear();
			window.location.href = '/server-error';
		})
	}
}

export function changePublicationSuccess() {
	return {type: UPDATE_PUBLICATION, actionType: UPDATE_PUBLICATION};
}