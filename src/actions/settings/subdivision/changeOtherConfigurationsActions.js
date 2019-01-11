import axios from 'axios';

/* Import Endpoint & Headers */
import endpoints from '../../../utils/requests/endpoints';
import headers from '../../../utils/requests/headers';

/* Import Actions */
import { showSnackbar } from '../../dialogs/snackbarActions';
import { fetchUserData } from '../../users/userProfileActions';

export default function updateOtherConfigurations(bornDate, sex) {
	return dispatch => {
		axios.put(endpoints.OTHER_CONFIGURATIONS, JSON.stringify({birthday: bornDate, sex: sex, theme_color: null}), headers.HEADERS_A)

		.then(() => {
			dispatch(showSnackbar('Sus datos han sido modificados correctamente.'));
			dispatch(fetchUserData(localStorage.username));
		})

		.catch(() => {
			window.location.href = '/server-error';
		})
	}
}