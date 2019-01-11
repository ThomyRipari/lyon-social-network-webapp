import axios from 'axios';

/* Import Endpoint & Headers */
import endpoints from '../../utils/requests/endpoints';
import headers from '../../utils/requests/headers';

/* Register */

export function register(username, email, password) {
	return dispatch => {
		dispatch(loading());

		axios.post(endpoints.REGISTER, JSON.stringify({username: username, email: email, password: password}), headers.HEADERS_B)

		.then(() => {
			dispatch(successRegister(username));
		})

		.catch(() => {
			window.location.href = '/server-error';
			console.clear();
		})
	}
}

export function successRegister(username) {
	return {type: 'SUCCESS_REGISTER', username};
}

export function loading() {
	return {type: 'LOADING_REGISTER'};
}

/* Validate Username */

export function validateUsername(username) {
	return dispatch => {
		axios.post(endpoints.VALIDATE_REGISTER, JSON.stringify({username: username, email: ''}), headers.HEADERS_B)

		.then(() => {
			dispatch(successValidatedUsername());
		})

		.catch((err) => {
			console.clear();
			if (err.response.status === 409) {
				dispatch(existsUsername());
			} else {
				window.location.href = '/server-error';
			}
		})
	}
}

export function successValidatedUsername() {
	return {type: 'SUCCESS_VALIDATED_USERNAME'};
}

export function existsUsername() {
	return {type: 'EXISTS_USERNAME'};
}

/* Validate Email */

export function validateEmail(email) {
	return dispatch => {
		axios.post(endpoints.VALIDATE_REGISTER, JSON.stringify({username: '', email: email}), headers.HEADERS_B)

		.then(() => {
			dispatch(successValidatedEmail());
		})

		.catch((err) => {
			console.clear();
			if (err.response.status === 409) {
				dispatch(existsEmail());
			} else {
				window.location.href = '/server-error';
			}
		})
	}
}

export function successValidatedEmail() {
	return {type: 'SUCCESS_VALIDATED_EMAIL'};
}

export function existsEmail() {
	return {type: 'EXISTS_EMAIL'};
}

/* Reset State */
export function resetState() {
	return {type: 'RESET_STATE'};
}