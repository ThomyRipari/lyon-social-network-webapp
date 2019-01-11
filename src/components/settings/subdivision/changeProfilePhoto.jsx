import React, { Component } from 'react';
import { connect } from 'react-redux'; 

/* Import Actions */
import { updateProfilePhoto } from '../../../actions/settings/subdivision/changeProfilePhotoActions';

class changeProfilePhoto extends Component {
	state = {
		image: '',
		imageSize: ''
	};

	componentDidMount() {
		this.setState({image: 'data:image/png;base64,' + this.props.profilePhoto});
	}

	onSubmitFile = (event) => {
		let data = new FormData();
		data.append('profile_image', this.state.image);

		event.preventDefault();
		this.props.dispatch(updateProfilePhoto(data));
	}

	deletePhoto = () => {
		this.setState({image: '', imageSize: ''});
		this.refs.imageInput.value = "";
		this.refs.profileImage.style.display = 'none';
	}

	uploadImage = (event) => {
		let uploadedPhoto = event.target.files[0];
		if (uploadedPhoto) {
			this.setState({image: event.target.files[0]});
			
			this.refs.profileImage.style.display = 'block';

			let reader = new FileReader();
			reader.onload = (() => {
				this.refs.profileImage.src = reader.result;
			});
			reader.readAsDataURL(event.target.files[0]);

			let fileSize = Math.round(uploadedPhoto.size / 1024) + " KB";
			this.setState({imageSize: fileSize});
		}
	}

	render() {
		return (
			<div className="settings-functionalities-update-user-info-photo">
				<h3 className="settings-functionalities-update-user-info-title--update-photo">Actualizar Foto de Perfil</h3>
				<form onSubmit={this.onSubmitFile} className="settings-functionalities-update-user-info-form--photo">
					<label className="form-settings-label form-settings-label--update-photo">	
						<div className="form-settings-label--photo"> {this.state.image 
							? <img src={this.state.image} ref="profileImage" alt="" />
							: <img src="#" id="profileImage" ref="profileImage" alt="" /> }
							<div className="form-settings-label--photo-edit"><i className="material-icons">edit</i></div>
						</div>						
								

						<div className="form-settings-buttons">
							<label className="form-settings-buttons--input">
								<input type="file" accept="image/x-png,image/gif,image/jpeg" ref="imageInput" onChange={this.uploadImage} style={{display: 'none'}} />
								Seleccionar Nueva Foto de Perfil
							</label>
							<button className="form-settings-buttons--button" type="button" onClick={this.deletePhoto}>Eliminar Actual Foto de Perfil</button>
						</div>
					</label>

					<div className="settings-functionalities-update-user-info-button-container">
						<button className="settings-functionalities-update-user-info-button" type="submit" disabled={!this.state.image || !this.state.imageSize}>Guardar Cambios</button>
					</div>
				</form>
			</div>
		)
	}
}

export default connect()(changeProfilePhoto);
