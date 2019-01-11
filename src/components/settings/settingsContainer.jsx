import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Import Actions */
import { fetchUserData } from '../../actions/users/userProfileActions';
import { settingsChange } from '../../actions/settings/settingsActions';

/* Import Components */
import Settings from './settings';
import Loader from '../loader/loader';

class settingsContainer extends Component {
	componentDidMount() {
		if (!localStorage.token) {
			this.props.history.push('/login');
		} else {
			this.props.dispatch(fetchUserData(localStorage.username));
		}
	}

	componentWillReceiveProps(nextProps) {
		let { username, name, description, profile_image, birthday, sex, theme_color, joined, verified } = nextProps.userdata;
		if (nextProps.location.pathname !== '/settings') {
			if (nextProps.location.pathname === '/settings/username/edit') 
				if (username) 
					nextProps.dispatch(settingsChange('CHANGE_USERNAME', username))
				else
					return null;

			else if (nextProps.location.pathname === '/settings/name/edit') 
				nextProps.dispatch(settingsChange('CHANGE_NAME', name));

			else if (nextProps.location.pathname === '/settings/description/edit') 
				nextProps.dispatch(settingsChange('CHANGE_DESCRIPTION', description));

			else if (nextProps.location.pathname === '/settings/other-configurations/change')
				nextProps.dispatch(settingsChange('CHANGE_OTHER_CONFIGURATIONS', [birthday, sex, theme_color, joined, verified]));
				
			else if (nextProps.location.pathname === '/settings/profile-photo/change')
				nextProps.dispatch(settingsChange('CHANGE_PHOTO', profile_image));
				
			else if (nextProps.location.pathname === '/settings/password/change') 
				nextProps.dispatch(settingsChange('CHANGE_PASSWORD', null));
			else 
				nextProps.history.push('/not-found-error');
		} else 
			nextProps.dispatch(settingsChange(null, null));
	}

	render() {
		if (this.props.loading) {
			return <Loader />;
		} else {
			document.title = this.props.userdata.name + ' | Settings';
			return (
				<div>
					<Settings userdata={this.props.userdata} />
				</div>
			)
		}
	}
}

const mapStateToProps = (state) => {
	return state.profile;
}

export default connect(mapStateToProps)(settingsContainer);