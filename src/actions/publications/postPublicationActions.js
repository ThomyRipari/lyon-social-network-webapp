import axios from 'axios';

/* Import Endpoint & Headers */
import endpoints from '../../utils/requests/endpoints';
import headers from '../../utils/requests/headers';

/* Import Actions */
import { showSnackbar } from '../dialogs/snackbarActions';

export const ADD_PUBLICATION = 'ADD_PUBLICATION';

export function postPublication(data) {
	return dispatch => {
		axios.post(endpoints.POST_PUBLICATION, data, headers.HEADERS_C)

		.then(() => {
			dispatch(postPublicationSuccess());
			dispatch(showSnackbar('La publicacion ha sido publicada correctamente.'));
		})
		.catch(() => {
			window.location.href = '/server-error';
		})
	}
}

export function postPublicationSuccess() {
	return {type: ADD_PUBLICATION, actionType: ADD_PUBLICATION};
}