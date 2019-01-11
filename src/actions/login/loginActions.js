import axios from 'axios';

/* Import Endpoint */
import endpoints from '../../utils/requests/endpoints';

export const SUCCESS_LOGIN = 'SUCCESS_LOGIN';
export const FAILED_LOGIN = 'FAILED_LOGIN';
export const LOG_OUT = 'LOG_OUT';
export const RESET_STATE = 'RESET_STATE';

export function authenticate(username, password) {
	return dispatch => {
		axios.post(endpoints.LOGIN, {username: username, password: password})

		.then((res) => {
			dispatch(successLogin(res.data.token));
			localStorage.username = res.data.username;
			localStorage.token = res.data.token;
			window.location.href = '/profile/' + localStorage.username;
		})

		.catch((err) => {
			console.clear();
			if (err.response.status === 400) {
				dispatch(failedLogin());
			}
		})
	}
}

export function successLogin(token) {
	return {type: SUCCESS_LOGIN, token};
}

export function failedLogin() {
	return {type: FAILED_LOGIN};
}

export function logOut() {
	delete localStorage.username;
	delete localStorage.token;
	return {type: LOG_OUT};
}

export function resetState() {
	return {type: RESET_STATE};
}