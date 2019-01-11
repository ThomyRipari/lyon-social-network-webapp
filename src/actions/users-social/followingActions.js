import axios from 'axios';

/* Import Endpoint & Headers */
import endpoints from '../../utils/requests/endpoints';
import headers from '../../utils/requests/headers';

/* Import Store */
import Store from '../../store/Store';

export function getFollowingList(username) {
	return dispatch => {
		if (Store.getState().following.followingList.length) {
			dispatch(getFollowingListSuccess(Store.getState().following.followingList));
		} else {
			dispatch(loadingFollowingList());

			axios.post(endpoints.FOLLOWING_LIST, JSON.stringify({user: username}), headers.HEADERS_A)

			.then((res) => {
				dispatch(getFollowingListSuccess(res.data));
			})

			.catch(() => {
				window.location.href = '/server-error';
			})
		}
	}
}

export function loadingFollowingList() {
	return {type: 'LOADING_FOLLOWING_LIST'};
}

export function getFollowingListSuccess(followingList) {
	return {type: 'GET_FOLLOWING_LIST', followingList};
}