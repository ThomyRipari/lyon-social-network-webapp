import axios from 'axios';

/* Import Endpoint & Headers */
import endpoints from '../../utils/requests/endpoints';
import headers from '../../utils/requests/headers';

/* Import Store */
import Store from '../../store/Store';

export function getFollowersList(username) {
	return dispatch => {
		if (Store.getState().followers.followersList.length) { 
			dispatch(getFollowersListSuccess(Store.getState().followers.followersList));
		} else {
			dispatch(loadingFollowersList());

			axios.post(endpoints.FOLLOWERS_LIST, JSON.stringify({user: username}), headers.HEADERS_A)

			.then((res) => {
				dispatch(getFollowersListSuccess(res.data));
			})

			.catch(() => {
				window.location.href = '/server-error';
			})
		}
	}
}

export function loadingFollowersList() {
	return {type: 'LOADING_FOLLOWERS_LIST'};
}

export function getFollowersListSuccess(followersList) {
	return {type: 'GET_FOLLOWERS_LIST', followersList};
}