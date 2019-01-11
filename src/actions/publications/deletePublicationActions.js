import axios from 'axios';

/* Import Endpoint & Headers */
import endpoints from '../../utils/requests/endpoints';
import headers from '../../utils/requests/headers';

/* Import Actions */
import { showSnackbar } from '../dialogs/snackbarActions';

const DELETE_PUBLICATION = 'DELETE_PUBLICATION';

export function removePublication(id) {
	return dispatch => {
		axios.delete(endpoints.DELETE_PUBLICATION + id, headers.HEADERS_C)

		.then(() => {
			dispatch(deletePublicationSuccess());
			dispatch(showSnackbar('La publicacion ha sido eliminada correctamente.'));
		})

		.catch(() => {
			console.clear();
			window.location.href = '/server-error';
		})
	}
}

export function deletePublicationSuccess() {
	return {type: DELETE_PUBLICATION, actionType: DELETE_PUBLICATION};
}