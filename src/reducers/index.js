import { combineReducers } from 'redux';

/* Import Reducers */
import registerReducer from './register/registerReducer';
import loginReducer from './login/loginReducer';
import forgotPasswordReducer from './reset-password/forgotPasswordReducer';
import userProfileReducer from './users/userProfileReducer';
import followingReducer from './users-social/followingReducer';
import followersReducer from './users-social/followersReducer';
import searchUsersReducer from './users/searchUsersReducer';
import searchTagsReducer from './users/searchTagsReducer';
import publicationReducer from './publications/publicationReducer';
import settingsTypeReducer from './settings/settingsTypeReducer';
import changeUsernameReducer from './settings/subdivision/changeUsernameReducer';
import changePasswordReducer from './settings/subdivision/changePasswordReducer';
import dialogTypeReducer from './dialogs/dialogTypeReducer';
import snackbarTypeReducer from './dialogs/snackbarTypeReducer';
import inputTextReducer from './input-text/inputTextReducer';
import likesProfilesReducer from './publications/likes/likesProfilesReducer';

const rootReducer = combineReducers({
	register: registerReducer,
	login: loginReducer,
	forgotPass: forgotPasswordReducer,
	profile: userProfileReducer,
	following: followingReducer,
	followers: followersReducer,
	searchUsers: searchUsersReducer,
	searchTags: searchTagsReducer,
	publication: publicationReducer,
	settings: settingsTypeReducer,
	changeUsername: changeUsernameReducer,
	changePass: changePasswordReducer,
	dialog: dialogTypeReducer,
	snackbar: snackbarTypeReducer,
	inputText: inputTextReducer,
	likesProfiles: likesProfilesReducer
})

export default rootReducer;