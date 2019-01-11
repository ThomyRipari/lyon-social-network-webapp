import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Material UI */
import Dialog from '@material-ui/core/Dialog';

/* Import Actions */
import { updatePublication } from '../../actions/publications/changePublicationActions';
import { hideModal } from '../../actions/dialogs/dialogActions';

/* Import Utils */
import formatDate from '../../utils/formatDate/formatDate';

/* Import Utils */
import styleClasses from '../../utils/styleClasses/styleClasses';

/* Import Components */
import ContentEditableInput from '../input-text/contentEditableInput';

class changePublication extends Component {
	state = {
		image: '',
		fileSize: '',
		deleteImage: false
	};

	componentDidMount() {
		if (this.props.dialog.modalData.image) 
			this.setState({image: 'data:image/png;base64,' + this.props.dialog.modalData.image});
	}

	hideModal = () => {
		this.props.dispatch(hideModal());
		styleClasses.onHidenModal();
	}

	onSubmit = (event) => {
		let imgs = document.getElementsByClassName("emoji-inserted");
		let mentions = document.getElementsByClassName("user-mention");
		let inputHtml = this.props.inputText.text;

		if (mentions) {	
			for (let i = 0; i < mentions.length; i++) 
				inputHtml = inputHtml.replace(mentions[i].outerHTML, mentions[i].innerHTML);	
		}

		if (imgs) {
			for (let i = 0; i < imgs.length; i++)
				inputHtml = inputHtml.replace(imgs[i].outerHTML, imgs[i].getAttribute("data-plain-text"));		
		}

		let data = new FormData();
		data.append('unique_id', this.props.dialog.modalData.unique_id);
		data.append('content', inputHtml || '');

		if (this.state.deleteImage) 
			data.append('image', 'delete-image');
		else 
			data.append('image', this.state.image || '');

		event.preventDefault();
		this.props.dispatch(updatePublication(data));
		this.hideModal();
	}

	deleteImage = e => {
		e.preventDefault();
		this.setState({image: '', fileSize: '', deleteImage: true});

		this.refs.editPublicationPhotocontainer.style.minHeight = '200px';
		this.refs.publicationImage.style.display = 'none';
		this.refs.imageInput.value = "";
	}

	handleImage = (event) => {
		let uploadedPhoto = event.target.files[0];

		if (uploadedPhoto) {
			this.setState({image: uploadedPhoto, deleteImage: false});

			this.refs.publicationImage.style.display = 'block';

			let reader = new FileReader();
			reader.onload = (() => {
				this.refs.publicationImage.src = reader.result;
			});
			reader.readAsDataURL(event.target.files[0]);

			let fileSize = Math.round(uploadedPhoto.size / 1024) + " KB";
			this.setState({fileSize: fileSize});
		}			
	}

	render() {
		let { username, name, profile_image, edited, datetime } = this.props.dialog.modalData;
		return (
			<Dialog className="material-ui-dialog" maxWidth="xs" fullWidth={true} open={styleClasses.onOpenModal()} onClose={this.hideModal}>
				<div className="edit-publication">
					<h2 className="edit-publication-title">Editar Publicación</h2>

					<div className="user-profile-container edit-publication-profile-container">
						<div className="user-profile-image-container">
							<img src={"data:image/png;base64," + profile_image} className="user-profile-image" alt="" />
						</div>
						<div className="user-profile-text-container">
							<h3 className="user-profile-name-text">{name}</h3>
							<h4 className="user-profile-username-text">{username}</h4>
						</div>
					</div>

					<div className="edit-publication-details">
						<span>{formatDate(datetime)}</span>
						{edited === true ?
						<span> - Editado</span> : null}
					</div>

					<form className="edit-publication-form edit-publication-form--padding" onSubmit={this.onSubmit}>
						<div>
							<label>
								{this.state.image ? 
									<div className="edit-publication-photo-container" style={{minHeight: 'auto'}} ref="editPublicationPhotocontainer">
										<img className="edit-publication-photo edit-publication-photo-block" ref="publicationImage" src={this.state.image} alt="" /> 
										<div className="edit-publication-photo-edit"><i className="material-icons">edit</i></div> 
									</div> :
									<div className="edit-publication-photo-container" style={{minHeight: '200px'}} ref="editPublicationPhotocontainer">
										<img width="200" height="200" ref="publicationImage" src="#" alt="" />
										<div className="edit-publication-photo-add"><i className="material-icons">add</i></div> 
									</div>
								}	
					
								<input type="file" ref="imageInput" className="edit-publication-photo-input" accept="image/x-png,image/gif,image/jpeg" onChange={this.handleImage} />
								<div className="add-publication-photo-buttons">
									<p className="edit-publication-photo-button">Seleccionar Archivo</p> 	
									{this.state.image 
										? <p className="add-publication-photo-button" type="button" onClick={this.deleteImage}>Eliminar Foto</p> : null}
								</div>
							</label>
						</div>

						<label className="emoji-label" onClick={e => e.preventDefault()}>
							<div className="emoji-container">		
								<ContentEditableInput content={this.props.dialog.modalData.content} />
							</div>
						</label>
													
					</form>
					<div className="edit-publication-buttons-container">
						<button type="button" className="edit-publication-buttons" onClick={this.hideModal}>Cancelar</button>
						<button type="submit" className="edit-publication-buttons" onClick={this.onSubmit} disabled={!this.props.inputText.text.trim() && !this.state.image}>Aceptar</button>
					</div>
				</div>
			</Dialog>
		)
	}
}

const mapStateToProps = state => {
	let { inputText, dialog } = state;
	return { inputText, dialog };
}

export default connect(mapStateToProps)(changePublication);