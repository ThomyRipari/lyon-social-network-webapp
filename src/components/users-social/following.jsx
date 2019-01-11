import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/* Material UI */
import Dialog from '@material-ui/core/Dialog';

/* Import Actions */
import { hideModal } from '../../actions/dialogs/dialogActions'; 
import { getFollowingList } from '../../actions/users-social/followingActions'; 

/* Laoder */
import Loader from '../loader/loader';

/* Import Utils */
import styleClasses from '../../utils/styleClasses/styleClasses';

class following extends Component {
	componentDidMount() {
		this.props.dispatch(getFollowingList(this.props.username));
	}

	hideModal = () => {
		this.props.dispatch(hideModal());
		styleClasses.onHidenModal();
	}

	render() {
		let { loading, followingList } = this.props;
		return (
			<Dialog className="follow-dialog" open={styleClasses.onOpenModal()} onClose={this.hideModal}>
				{loading ? 
					<div className="mini-loader">
						<Loader />
					</div> :
					<div className="user-follows">
						<h2 className="user-follows-title">Seguidos</h2>
						{followingList.map((following) => {
							return (
								<Link to={"/profile/" + following.username} key={following.id} onClick={this.hideModal}>
									<div className="user-profile">
										<div className="user-profile-container">
											<div className="user-profile-image-container">
												<img src={"data:image/png;base64," + following.profile_image}  className="user-profile-image" alt="" />
											</div>
											<div className="user-profile-text-container">
												<h3 className="user-profile-name-text">{following.name}</h3>
												<h4 className="user-profile-username-text">{following.username}</h4>
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
	return state.following;
}

export default connect(mapStateToProps)(following);