import axios from 'axios';

/* Import Endpoint & Headers */
import endpoints from '../../../utils/requests/endpoints';
import headers from '../../../utils/requests/headers';

/* Import Actions */
import { getProfileImage } from '../../users/getProfileImageActions';
import { showSnackbar } from '../../dialogs/snackbarActions';
import { fetchUserData } from '../../users/userProfileActions';

export function updateProfilePhoto(data) {
	return dispatch => {
		axios.put(endpoints.CHANGE_PROFILE_PHOTO, data, headers.HEADERS_C)

		.then(() => {
			getProfileImage();
			dispatch(showSnackbar('Su foto de perfil ha sido cambiada correctamente.'));
			dispatch(fetchUserData(localStorage.username));
		})

		.catch(() => {
			window.location.href = '/server-error';
		})
	}
}