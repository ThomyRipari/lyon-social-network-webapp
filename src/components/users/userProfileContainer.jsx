import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Import Actions */
import { fetchUserData } from '../../actions/users/userProfileActions';
import { resetStatePublications } from '../../actions/publications/getPublicationActions';

/* Import Components */
import UserProfile from './userProfile';
import Loader from '../loader/loader';

class userProfileContainer extends Component {
	componentDidMount() {
		if (!localStorage.token) {
			this.props.history.push('/login');
		} else {
			this.props.dispatch(fetchUserData(this.props.match.params.user));
			document.addEventListener('click', this.profileLink);
		}
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.profileLink);
	}

	profileLink = (e) => {
		e.preventDefault();
		if (e.target.nodeName.toLowerCase() === "a" && e.target.className === "user-mention")
			this.props.history.push('/profile/' + e.target.innerHTML.split('@')[1]);
	}

	componentDidUpdate(prevProps) {
		let { publication, dialog } = this.props;

		if (this.props.match.params.user !== prevProps.match.params.user) 
			this.props.dispatch(fetchUserData(this.props.match.params.user));

		else if (publication.actionType === "DELETE_PUBLICATION" || publication.actionType === "ADD_PUBLICATION" || publication.actionType === "UPDATE_PUBLICATION") {
			this.props.dispatch(resetStatePublications());
			this.props.dispatch(fetchUserData(this.props.match.params.user));
		}

		if (dialog.modalType === "ADD_PUBLICATION" || dialog.modalType === "UPDATE_PUBLICATION") 
			document.removeEventListener('click', this.profileLink);
		else if (dialog.closed)
			document.addEventListener('click', this.profileLink);
	}

	render() {
		if (this.props.profile.loading) {
			return <Loader />;
		} else {
			document.title = this.props.profile.userdata.name + ' - (@' + this.props.profile.userdata.username + ')';
			return (
				<div>
					<UserProfile userdata={this.props.profile.userdata} />
				</div>
			)			
		}
	}
}

const mapStateToProps = (state) => {
	let { profile, publication, dialog } = state;
	return { profile, publication, dialog };
}

export default connect(mapStateToProps)(userProfileContainer);