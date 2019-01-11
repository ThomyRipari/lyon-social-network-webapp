import axios from 'axios';

/* Import Endpoint & Headers */
import endpoints from '../../utils/requests/endpoints';
import headers from '../../utils/requests/headers';

export const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS';
export const LOADING_USER_DATA = 'LOADING_USER_DATA';

export function fetchUserData(username) { 
	return dispatch => {
		dispatch({type: 'RESET_STATE_SOCIAL_FOLLOW'});
		dispatch(loadingUserData());
		
		axios.post(endpoints.GET_USER_DATA, JSON.stringify({text: username}), headers.HEADERS_A)
		
		.then((res) => {
			dispatch(getUserDataSuccess(res.data[0]));
		})
		.catch((err) => {
			if (err.response.status)
				window.location.href = '/not-found-error';
			else
				window.location.href = '/server-error';
		})
	}
}

export function getUserDataSuccess(userdata) { 
	return {type: GET_USER_DATA_SUCCESS, userdata};
}

export function loadingUserData() {
	return {type: LOADING_USER_DATA};
}
