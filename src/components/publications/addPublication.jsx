import React, { Component } from 'react';
import { connect } from 'react-redux';
import Beforeunload from 'react-beforeunload';

/* Material UI */
import Dialog from '@material-ui/core/Dialog';

/* Import Components */
import ContentEditableInput from '../input-text/contentEditableInput';

/* Import Actions */
import { postPublication } from '../../actions/publications/postPublicationActions';
import { hideModal } from '../../actions/dialogs/dialogActions';

/* Import Utils */
import styleClasses from '../../utils/styleClasses/styleClasses';

class addPublication extends Component {
	state = {
		image: '',
		imageSize: ''
	}

	hideModal = () => {
		this.props.dispatch(hideModal());
		styleClasses.onHidenModal();
	}

	onSubmit = (event) => {
		let imgs = document.getElementsByClassName("emoji-inserted");
		let mentions = document.getElementsByClassName("user-mention");
		let inputHtml = this.props.text;

		if (mentions) {	
			for (let i = 0; i < mentions.length; i++) 
				inputHtml = inputHtml.replace(mentions[i].outerHTML, mentions[i].innerHTML);	
		}

		if (imgs) {
			for (let i = 0; i < imgs.length; i++)
				inputHtml = inputHtml.replace(imgs[i].outerHTML, imgs[i].getAttribute("data-plain-text"));		
		}

		let data = new FormData();
		data.append('content', inputHtml || '');
		data.append('image', this.state.image || '');

		event.preventDefault();
		this.props.dispatch(postPublication(data));
		this.hideModal();
	}

	deleteImage = (e) => {
		e.preventDefault();
		this.setState({image: '', imageSize: ''});

		this.refs.addPublicationPhotocontainer.style.minHeight = '200px';
		this.refs.image.style.display = 'none';
		this.refs.imageInput.value = '';
	}

	handleImage = (event) => {
		let uploadedImage = event.target.files[0];

		if (uploadedImage) {
			this.setState({image: uploadedImage});

			this.refs.image.style.display = 'block';
			this.refs.addPublicationPhotocontainer.style.minHeight = 'auto';

			let reader = new FileReader();
			reader.onload = (() => {
				this.refs.image.src = reader.result;
			});
			reader.readAsDataURL(event.target.files[0]);

			let fileSize = Math.round(uploadedImage.size / 1024) + " KB";
			this.setState({imageSize: fileSize});
		}			
	}

	render() {
		return (
			<Dialog className="material-ui-dialog" maxWidth="xs" fullWidth={true} open={styleClasses.onOpenModal()} onClose={this.hideModal}>

				{this.props.text.trim() || this.state.image ?
					<Beforeunload onBeforeunload={() => "No se guardaran los cambios."} /> :
				null}

				<div className="add-publication">
					<h2 className="add-publication-title">Nueva Publicación</h2>
					
					<form className="add-publication-form" onSubmit={this.onSubmit}>
						<div>
							<label>
								<div className="add-publication-photo-container" ref="addPublicationPhotocontainer">
									<img src="#" className="add-publication-photo" ref="image" alt="" />
									{document.getElementById('img-to-publicate') && document.getElementById('img-to-publicate').style.display === 'block' ?
										<div className="add-publication-photo-edit"><i className="material-icons">edit</i></div> 
										: <div className="add-publication-photo-add"><i className="material-icons">add</i></div>
									}
								</div>
									
								<input type="file" ref="imageInput" className="add-publication-photo-input" accept="image/x-png,image/gif,image/jpeg" onChange={this.handleImage} />
								
								<div className="add-publication-photo-buttons">
									<p className="add-publication-photo-button">Seleccionar Archivo</p> 	
									{this.state.image 
										? <p className="add-publication-photo-button" type="button" onClick={this.deleteImage}>Eliminar Foto</p> : null}
								</div>
							</label>

						</div>
						<label className="emoji-label" onClick={e => e.preventDefault()}>
							<div className="emoji-container">
								<ContentEditableInput />
							</div>
						</label>
					</form>

					<div className="add-publication-buttons-container">
						<button className="add-publication-buttons" type="button" onClick={this.hideModal}>Cancelar</button>
						<button className="add-publication-buttons" onClick={this.onSubmit} type="submit" disabled={
							!this.props.text.trim() 
							&& 
							!this.state.image}
						>Añadir Publicacion</button>
					</div>			
					
				</div>
			</Dialog>
		)
	}
}

const mapStateToProps = (state) => {
	return state.inputText;
}

export default connect(mapStateToProps)(addPublication);