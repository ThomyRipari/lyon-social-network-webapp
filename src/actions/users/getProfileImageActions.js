import axios from 'axios';

/* Import Endpoint & Headers */
import endpoints from '../../utils/requests/endpoints';
import headers from '../../utils/requests/headers';

export function getProfileImage() {
	return axios.get(endpoints.GET_USER_LOGGED_PROFILE_IMAGE, headers.HEADERS_C).then((res) => {
		return res.data.profile_image;
	})
}