import React, { Component } from 'react';
import { connect } from 'react-redux';
import linkifyhtml from 'linkifyjs/html';

/* Material UI */
import Dialog from '@material-ui/core/Dialog';

/* Import Actions */
import { hideModal } from '../../actions/dialogs/dialogActions'; 
import { removePublication } from '../../actions/publications/deletePublicationActions';

/* Import Utils */
import formatDate from '../../utils/formatDate/formatDate';
import styleClasses from '../../utils/styleClasses/styleClasses';
import { recognizeEmojis } from '../../utils/emojis/recognizeEmojis';
import recognizeMentions from '../../utils/mentions/recognizeMentions';

class deletePublication extends Component {
	componentDidMount() {
		document.addEventListener('click', this.profileLink);
	}

	profileLink = (e) => {
		e.preventDefault();
		if (e.target.nodeName.toLowerCase() === "a" && e.target.className === "user-mention") {
			this.hideModal();
		}
	}

	hideModal = () => {
		this.props.dispatch(hideModal());
		styleClasses.onHidenModal();
		document.removeEventListener('click', this.profileLink);
	}

	removePublication = (pk) => {
		this.props.dispatch(removePublication(pk));
		this.hideModal();
	}

	render() {
		let { unique_id, username, name, profile_image, content, image, edited, datetime } = this.props.modalData;
		return (
			<Dialog className="material-ui-dialog" maxWidth="xs" fullWidth={true} open={styleClasses.onOpenModal()} onClose={this.hideModal}>
				<div className="delete-publication">
					<h2 className="delete-publication-title delete-publication-title--danger">Eliminar Publicación</h2>

					<div className="user-profile-container delete-publication-profile-container">
						<div className="user-profile-image-container">
							<img src={"data:image/png;base64," + profile_image} className="user-profile-image" alt="" />
						</div>
						<div className="user-profile-text-container">
							<h3 className="user-profile-name-text">{name}</h3>
							<h4 className="user-profile-username-text">{username}</h4>
						</div>
					</div>

					<div className="delete-publication-details">
						<span>{formatDate(datetime)}</span>
						{edited === true ?
						<span> - Editado</span> : null}
					</div>

					<div className="edit-publication-form edit-publication-form--padding">
						<div className="edit-publication-photo-container" style={{minHeight: 'auto'}}>
							{image ? <img className="edit-publication-photo edit-publication-photo-block" src={"data:image/png;base64," + image} alt="" /> : null}
						</div>
						<div dangerouslySetInnerHTML={{__html: `<p>${linkifyhtml(recognizeEmojis(recognizeMentions(content)))}</p>`}} />
					</div>

					<div className="delete-publication-buttons-container">
						<button type="button" className="delete-publication-buttons" onClick={this.hideModal}>Cancelar</button>
						<button type="button" className="delete-publication-buttons delete-publication-buttons--danger" onClick={() => this.removePublication(unique_id)}>Eliminar</button>
					</div>
				</div>
			</Dialog> 
		)
	}
}

const mapStateToProps = state => {
	return state.dialog;
}

export default connect(mapStateToProps)(deletePublication);