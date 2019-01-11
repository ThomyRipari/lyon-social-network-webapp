import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/* Material UI */
import Dialog from '@material-ui/core/Dialog';

/* Import Actions */
import { hideModal } from '../../actions/dialogs/dialogActions'; 
import { getFollowersList } from '../../actions/users-social/followersActions'; 

/* Laoder */
import Loader from '../loader/loader';

/* Import Utils */
import styleClasses from '../../utils/styleClasses/styleClasses';

class followers extends Component {
	componentDidMount() {
		this.props.dispatch(getFollowersList(this.props.username));
	}

	hideModal = () => {
		this.props.dispatch(hideModal());
		styleClasses.onHidenModal();
	}

	render() {
		let { loading, followersList } = this.props;
		return (
			<Dialog className="follow-dialog" open={styleClasses.onOpenModal()} onClose={this.hideModal}>
				{loading ?
					<div className="mini-loader">
						<Loader />
					</div> :
					<div className="user-follows">
						<h2 className="user-follows-title">Seguidores</h2>
						{followersList.map((follower) => {
							return (
								<Link to={"/profile/" + follower.username} key={follower.id} onClick={this.hideModal}>
									<div className="user-profile">
										<div className="user-profile-container">
											<div className="user-profile-image-container">
												<img src={"data:image/png;base64," + follower.profile_image} className="user-profile-image" alt="" />
											</div>
											<div className="user-profile-text-container">
												<h3 className="user-profile-name-text">{follower.name}</h3>
												<h4 className="user-profile-username-text">{follower.username}</h4>
											</div>
										</div>
									</div>
								</Link>
							)
						})}
					</div>
				}
			</Dialog>
		)
	}
}

const mapStateToProps = state => {
	return state.followers;
}

export default connect(mapStateToProps)(followers);