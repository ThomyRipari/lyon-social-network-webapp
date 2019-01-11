import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import linkifyhtml from 'linkifyjs/html';

/* Material UI */
import Dialog from '@material-ui/core/Dialog';

/* Import Actions */
import { getPublication, resetStatePublications } from '../../actions/publications/getPublicationActions';
import { hideModal } from '../../actions/dialogs/dialogActions';
import likePublications from '../../actions/publications/likes/likePublicationActions';
import getLikesProfiles from '../../actions/publications/likes/getLikesProfilesActions';

/* Import Utils */
import formatDate from '../../utils/formatDate/formatDate';
import styleClasses from '../../utils/styleClasses/styleClasses';
import recognizeMentions from '../../utils/mentions/recognizeMentions';
import { recognizeEmojis } from '../../utils/emojis/recognizeEmojis';

class userPublication extends Component {
	state = {profiles: false};

	componentDidMount() {
		if (!this.props.dialog.modalType)
			this.props.dispatch(getPublication(this.props.match.params.id));			
		else 
			this.props.dispatch(getPublication(this.props.dialog.modalData));

		this.props.dispatch(getLikesProfiles(this.props.match.params.id));
	}

	componentDidUpdate() {
		if (this.props.publication.data.i_like) {
			this.refs.likeIcon.style.color = "blue";
			this.refs.likesCount.style.color = "blue";
		} else {
			this.refs.likeIcon.style.color = "gray";
			this.refs.likesCount.style.color = "gray";
		}
	}

	hideModal = () => {
		this.props.dispatch(resetStatePublications());
		this.props.dispatch(hideModal());
		styleClasses.onHidenModal();
	}

	backdropClick = () => {
		this.props.history.push('/profile/' + this.props.publication.data.username);
	}

	likeUnlike = (event) => {
		event.preventDefault();

		this.props.dispatch(likePublications(this.props.publication.data.unique_id));

		if (this.props.publication.data.i_like) {
			this.refs.likeIcon.style.color = "gray";
			this.refs.likesCount.style.color = "gray";
			this.refs.likesCount.innerHTML = parseInt(this.refs.likesCount.innerHTML, 10) - 1;
		} else {
			this.refs.likeIcon.style.color = "blue";
			this.refs.likesCount.style.color = "blue";
			this.refs.likesCount.innerHTML = parseInt(this.refs.likesCount.innerHTML, 10) + 1;
		}

		this.props.publication.data.i_like = !this.props.publication.data.i_like;
	}

	likesList = () => {
		this.setState({profiles: true});
	}

	hideLikesList = (event) => {
		event.preventDefault();
		this.setState({profiles: false});
	}

	render() {
		let { name, content, datetime, likes_count } = this.props.publication.data;
		let { profiles } = this.props.likesProfiles;
		return (
			<div>
				<Dialog className="material-ui-dialog" onBackdropClick={this.backdropClick} maxWidth="xs" fullWidth={true} open={styleClasses.onOpenModal()} onClose={this.hideModal}>
					<div>
						<h3>{name}</h3>
					</div>

					{content ?
						<div 
                        dangerouslySetInnerHTML={{__html: `<p>${linkifyhtml(recognizeEmojis(recognizeMentions(content)))}</p>`}
                        } />  
					: null}

					<div>
                        <i className="material-icons" ref="likeIcon" onClick={(event) => this.likeUnlike(event)}>thumb_up_alt</i>
                        <p ref="likesCount" onClick={() => this.likesList()}>{likes_count}</p>
					</div>

					<div>
						<p>{formatDate(datetime)}</p>
					</div>

					{this.state.profiles ? 
						profiles.map((profile, index) => {
							return (
								<Link style={{color: 'inherit'}} to={"/profile/" + profile.username} key={profile.id}>
									<div>
										<i className="material-icons" onClick={(event) => this.hideLikesList(event)}>close</i>
									</div>
									<div>
										<h2>{profile.name}</h2>
										<h3>{profile.username}</h3>
									</div>

									<div>
										<img src={"data:image/png;base64," + profile.profile_image} alt="" />
									</div>
								</Link>
							)
						})
					: null}

				</Dialog>
			</div>
		)
	}
}

const mapStateToProps = state => {
	let { publication, dialog, likesProfiles } = state;
	return { publication, dialog, likesProfiles };
}

export default connect(mapStateToProps)(userPublication);