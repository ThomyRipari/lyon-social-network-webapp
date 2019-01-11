let API_ROOT;

if (process.env.NODE_ENV === 'development')
	API_ROOT = 'http://127.0.0.1:8000/api';
else
	API_ROOT = 'https://lyon-social-network-apirest.herokuapp.com/api';

export default {
	GET_USER_DATA: `${API_ROOT}/get-user-profile/`,

	GET_USER_LOGGED_PROFILE_IMAGE: `${API_ROOT}/user-logged-profile-image/`,

	SEARCH_USERS: `${API_ROOT}/user-search/`,

	SOCIAL_FOLLOWING: `${API_ROOT}/social-following/`,

	LIKE_PUBLICATIONS: `${API_ROOT}/like-publications/`,

	FOLLOWING_LIST: `${API_ROOT}/following-list/`,

	FOLLOWERS_LIST: `${API_ROOT}/followers-list/`,

	CHANGE_NAME: `${API_ROOT}/change-name/`,

	CHANGE_USERNAME: `${API_ROOT}/change-username/`,

	CHANGE_DESCRIPTION: `${API_ROOT}/change-description/`,

	CHANGE_PROFILE_PHOTO: `${API_ROOT}/change-profile-photo/`,

	CHANGE_PASSWORD: `${API_ROOT}/change-password/`,

	OTHER_CONFIGURATIONS: `${API_ROOT}/other-configurations/`,

	FORGOT_PASSWORD: `${API_ROOT}/email-to-reset-password/`,

	RESET_PASSWORD: `${API_ROOT}/reset-password/`,

	REGISTER: `${API_ROOT}/user-register/`,

	LOGIN: `${API_ROOT}/obtain-auth-token/`,

	CHANGE_PUBLICATION: `${API_ROOT}/change-publication/`,

	DELETE_PUBLICATION: `${API_ROOT}/delete-publication/`,

	GET_PUBLICATION: `${API_ROOT}/get-publication/`,

	POST_PUBLICATION: `${API_ROOT}/add-publication/`,
	
	VALIDATE_REGISTER: `${API_ROOT}/validate-register/`,

	GET_LIKES_PROFILES: `${API_ROOT}/publication-likes-list/`
};