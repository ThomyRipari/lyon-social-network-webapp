import React, { Component } from 'react';
import { connect } from 'react-redux';
import linkifyhtml from 'linkifyjs/html';

/* Import Components */
import DeletePublication from '../publications/deletePublication';
import ChangePublication from '../publications/changePublication';
import Following from '../users-social/following';
import Followers from '../users-social/followers';
import UserPublications from './userPublications';

/* Import Actions */
import { showModal } from '../../actions/dialogs/dialogActions';
import { socialFollowing } from '../../actions/users/socialFollowingActions';
import { showSnackbar } from '../../actions/dialogs/snackbarActions';

/* Import Utils */
import { recognizeEmojis } from '../../utils/emojis/recognizeEmojis';
import recognizeMentions from '../../utils/mentions/recognizeMentions';

class userProfile extends Component {
	state = {panelInfo: false};

	componentDidMount() {
		this.refs.description.innerHTML = linkifyhtml(recognizeEmojis(recognizeMentions(this.props.userdata.description)));

		if (!this.userIsLogged()) {
			if (!this.props.userdata.followed)
				document.getElementById("follow-button").innerHTML = "Seguir";
			else
				document.getElementById("follow-button").innerHTML = "Dejar de Seguir";			
		}

		document.getElementById("followers-number").innerHTML = this.props.userdata.followers_count;

		if (this.props.userdata.users_in_common.length > 0)
			this.usersInCommon();
	}

	usersInCommon = () => {
		let usersInCommon = this.props.userdata.users_in_common;

		let string = 'Seguido por ';

		if (usersInCommon.length === 1) 
			string = string + '@' + usersInCommon[0] + '.';

		else {
			for (let i = 0; i < usersInCommon.length; i++) {
				if (i !== usersInCommon.length - 1)
					string = string + '@' + usersInCommon[i] + ', ';
				else 
					string = string + '@' + usersInCommon[i] + '.';
			}			
		}

		this.refs.usersInCommon.innerHTML = recognizeMentions(string);
	}

	userIsLogged = () => {
		if (localStorage.username === this.props.userdata.username) 
			return true;
		else 
			return false;
	}

	followUnfollow = (event) => {
		event.preventDefault();

		if (!this.props.userdata.followed) {
			this.props.dispatch(showSnackbar('Ahora sigues a ' + this.props.userdata.name));
			document.getElementById("follow-button").innerHTML = "Dejar de Seguir";
			document.getElementById("followers-number").innerHTML = this.humanizeNumbers(parseInt(document.getElementById("followers-number").innerHTML, 10) + 1);

		} else {
			this.props.dispatch(showSnackbar('Dejaste de seguir a ' + this.props.userdata.name));
			document.getElementById("follow-button").innerHTML = "Seguir";
			document.getElementById("followers-number").innerHTML = this.humanizeNumbers(parseInt(document.getElementById("followers-number").innerHTML, 10) - 1);
		}

		this.props.userdata.followed = !this.props.userdata.followed;

		this.props.dispatch(socialFollowing(this.props.userdata.username));
	}

	followingModal = (following_count) => {
		if (following_count > 0) 
			this.props.dispatch(showModal('FOLLOWING', null));
	}

	followersModal = () => {
		if (document.getElementById("followers-number").innerHTML > 0) 
			this.props.dispatch(showModal('FOLLOWERS', null));
	}

	onClickProfilePhoto = () => {
		let { profilePhotoModal } = this.refs;
		profilePhotoModal.classList.add('profile-photo-modal-show');
		document.body.classList.add('scrollbar-hidden');
	}

	onClickProfilePhotoDialog = () => {
		let { profilePhotoModal } = this.refs;
		profilePhotoModal.classList.add('profile-photo-modal-animation');
		profilePhotoModal.classList.remove('profile-photo-modal-show');

		setTimeout(() => profilePhotoModal.classList.remove('profile-photo-modal-animation'), 100);
		setTimeout(() => document.body.classList.remove('scrollbar-hidden'), 100);
	}

	humanizeNumbers = (numbers) => {
		if (numbers <= 9999) 
			return numbers;

		else if (numbers > 9999 && numbers < 999500) {
			let number = (numbers / 1000);
			return Math.round(number) + 'k';

		} else if (numbers >= 999500) {
			let number = (numbers / 100000);
			return Math.round(number) / 10 + 'M';
		}
	}

	switchPanelInfo = () => {
		this.setState({panelInfo: !this.state.panelInfo});
	}

	render() {
		let { username, name, verified, sex, birthday, joined, profile_image, followers_count, following_count, publications } = this.props.userdata;
		return (
			<div>
				<div className="profile-container">

					<header className="profile-user-data">
						<div className="profile-user-data-container">

							<div className="profile-user-photo-container" title="Ver foto de perfil">
								<img className="profile-user-photo" src={"data:image/png;base64," + profile_image} onClick={this.onClickProfilePhoto} alt="" />
							</div>

							<div className="profile-photo-modal" ref="profilePhotoModal">
								<img className="profile-photo-modal-img" src={"data:image/png;base64," + profile_image} alt="" />
								<div ref="dialog" className="profile-photo-modal-dialog" onClick={this.onClickProfilePhotoDialog}></div>
							</div>

							<div className="profile-user-name-details-container">
								<div className="profile-user-name-texts">
									<div className="profile-user-name-content">
										<h1 className="profile-user-name">
											{name} {verified ? <i className="material-icons verfied-user" title="Esta cuenta esta Verificada">verified_user</i> : null}
										</h1>

										{!this.userIsLogged() ?
											<button className="profile-user-name-follow" id="follow-button" type="button" onClick={(event) => this.followUnfollow(event)}></button> 
										: null}
									</div>
								</div>
								<div className="profile-user-details">
									<div className="profile-user-detail-item">
										<span className="profile-user-detail-item-number">{publications ? publications.length : 0}</span>
										<p className="profile-user-detail-item-title">{(publications) ? (publications.length === 1) ? 'Publicación' : 'Publicaciones' : 'Publicaciones'}</p>
									</div>

									<div className="profile-user-detail-item" onClick={() => this.followingModal(following_count)}>
										<span className="profile-user-detail-item-number">{this.humanizeNumbers(following_count)}</span>
										<p className="profile-user-detail-item-title">{(following_count === 1) ? 'Seguido' : 'Seguidos'}</p>
									</div>

									<div className="profile-user-detail-item" onClick={() => this.followersModal()}>
										<span className="profile-user-detail-item-number" id="followers-number"></span>
										<p className="profile-user-detail-item-title">{(followers_count === 1) ? 'Seguidor' : 'Seguidores'}</p>
									</div>
								</div>
							</div>
						</div>

						<div className="profile-user-data-information">	
							<div className="profile-user-data-information-description" ref="description" />
		
							<button className="profile-user-data-information-more-button" type="button" onClick={this.switchPanelInfo}>Mas informacion sobre {name}</button>
							{this.state.panelInfo ? 
								<div className="profile-user-data-information-container">
									<p className="profile-user-data-information-container-text">Fecha de Nacimiento: {birthday || "No especificada"}</p>			
									<p className="profile-user-data-information-container-text">Sexo: {sex || "No especificado"}</p>			
									<p className="profile-user-data-information-container-text">En Lyon desde: {joined}</p>			
									{verified ? <p className="profile-user-data-information-container-text">Esta cuenta esta verificada <i className="material-icons verfied-user">verified_user</i></p> 
									: <p className="profile-user-data-information-container-text">Esta cuenta no esta verificada</p>}								
								</div>
							: null}
						</div>

						<div ref="usersInCommon" />
					</header>
				
					<main className="profile-main">
						<h2 className="profile-main-title">Publicaciones</h2>
						<UserPublications username={this.props.userdata.username} publications={publications} />
					</main>
				</div>

				{
					this.props.modalType === 'DELETE_PUBLICATION' ? <DeletePublication /> :
					this.props.modalType === 'UPDATE_PUBLICATION' ? <ChangePublication /> : 
					this.props.modalType === 'FOLLOWING' ? <Following username={username} /> : 
					this.props.modalType === 'FOLLOWERS' ? <Followers username={username} /> : null
				}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return state.dialog;
}

export default connect(mapStateToProps)(userProfile);