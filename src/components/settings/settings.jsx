import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/* Import Components */
import ChangeUsername from './subdivision/changeUsername';
import ChangeName from './subdivision/changeName';
import ChangeDescription from './subdivision/changeDescription';
import ChangeOtherConfigurations from './subdivision/changeOtherConfigurations';
import ChangeProfilePhoto from './subdivision/changeProfilePhoto';
import ChangePassword from './subdivision/changePass';

/* Import Actions */
import { settingsChange } from '../../actions/settings/settingsActions';

/* Import Utils */
import styleClasses from '../../utils/styleClasses/styleClasses';

class settings extends Component {
	componentDidMount() {
		let { settingsUsername, settingsName, settingsDescription, settingsOtherConfigurations, settingsPhoto, settingsPassword } = this.refs;
		let settingsLocation = window.location.pathname;
		
		if (settingsLocation === '/settings/username/edit') 
			this.removeShowClass(settingsUsername) 
		else if (settingsLocation === '/settings/name/edit')
			this.removeShowClass(settingsName)
		else if (settingsLocation === '/settings/other-configurations/change')
			this.removeShowClass(settingsOtherConfigurations)
		else if (settingsLocation === '/settings/description/edit')
			this.removeShowClass(settingsDescription)
		else if (settingsLocation === '/settings/profile-photo/change')
			this.removeShowClass(settingsPhoto)
		else if (settingsLocation === '/settings/password/change')
			this.removeShowClass(settingsPassword)
		else if (settingsLocation === '/settings')
			this.removeShowClass(null)
		else return null;

		let { settingsContainer, settings } = this.refs;
		styleClasses.centerElement(settings, '1.5rem', settingsContainer, 75);
	}

	componentDidUpdate() {
		let { settingsContainer, settings } = this.refs;
		styleClasses.centerElement(settings, '1.5rem', settingsContainer, 75);
	}

	removeShowClass = (elementShowed) => {
		let { settingsUsername, settingsName, settingsDescription, settingsOtherConfigurations, settingsPhoto, settingsPassword } = this.refs;
		if (elementShowed === null) {
			(() => {
				settingsUsername.classList.remove('show');
				settingsName.classList.remove('show');
				settingsDescription.classList.remove('show'); 
				settingsOtherConfigurations.classList.remove('show');
				settingsPhoto.classList.remove('show'); 
				settingsPassword.classList.remove('show');
			})()
		}

		(elementShowed === settingsUsername) 
			? settingsUsername.classList.add('show') 
			: settingsUsername.classList.remove('show'); 

		(elementShowed === settingsName) 
			? settingsName.classList.add('show') 
			: settingsName.classList.remove('show');

		(elementShowed === settingsDescription)
			? settingsDescription.classList.add('show')
			: settingsDescription.classList.remove('show'); 

		(elementShowed === settingsOtherConfigurations)
			? settingsOtherConfigurations.classList.add('show')
			: settingsOtherConfigurations.classList.remove('show');

		(elementShowed === settingsPhoto) 
			? settingsPhoto.classList.add('show') 
			: settingsPhoto.classList.remove('show'); 

		(elementShowed === settingsPassword) 
			? settingsPassword.classList.add('show') 
			: settingsPassword.classList.remove('show');

	}

	changeUsername = username => {
		this.props.dispatch(settingsChange('CHANGE_USERNAME', username));

		let { settingsUsername} = this.refs;
		this.removeShowClass(settingsUsername)
	}

	changeName = name => {
		this.props.dispatch(settingsChange('CHANGE_NAME', name));

		let { settingsName } = this.refs;
		this.removeShowClass(settingsName);
	}

	changeDescription = description => {
		this.props.dispatch(settingsChange('CHANGE_DESCRIPTION', description));
		
		let { settingsDescription } = this.refs;
		this.removeShowClass(settingsDescription);
	}

	changeOtherConfigurations = (birthday, sex, theme_color, joined, verified) => {
		this.props.dispatch(settingsChange('CHANGE_OTHER_CONFIGURATIONS', [birthday, sex, theme_color, joined, verified]))
		
		let { settingsOtherConfigurations } = this.refs;
		this.removeShowClass(settingsOtherConfigurations);
	}

	changeProfilePhoto = photo => {
		this.props.dispatch(settingsChange('CHANGE_PHOTO', photo));	
		
		let { settingsPhoto } = this.refs;
		this.removeShowClass(settingsPhoto);	
	}

	changePassword = () => {
		this.props.dispatch(settingsChange('CHANGE_PASSWORD', null));		

		let { settingsPassword } = this.refs;
		this.removeShowClass(settingsPassword);
	}

	onKeyDown = e => {
		if(e.keyCode === 13) {
			e.preventDefault();
		}
	}

	render() {
		let { username, name, description, birthday, sex, theme_color, joined, verified, profile_image } = this.props.userdata;
		return (
			<div>
				<div className="settings-container" ref="settingsContainer">
					<div className="settings" ref="settings">
						<div className="settings-options">
							<ul className="settings-options-list">
								<Link to="/settings/username/edit" onKeyDown={e => this.onKeyDown(e)}><li className="settings-options-item" ref="settingsUsername" onClick={() => this.changeUsername(username)}>Nombre de Usuario</li></Link>
								<Link to="/settings/name/edit" onKeyDown={e => this.onKeyDown(e)}><li className="settings-options-item" ref="settingsName" onClick={() => this.changeName(name)}>Nombre</li></Link>
								<Link to="/settings/description/edit" onKeyDown={e => this.onKeyDown(e)}><li className="settings-options-item" ref="settingsDescription" onClick={() => this.changeDescription(description)}>Descripción</li></Link>
								<Link to="/settings/profile-photo/change" onKeyDown={e => this.onKeyDown(e)}><li className="settings-options-item" ref="settingsPhoto" onClick={() => this.changeProfilePhoto(profile_image)}>Foto de Perfil</li></Link>
								<Link to="/settings/password/change" onKeyDown={e => this.onKeyDown(e)}><li className="settings-options-item" ref="settingsPassword" onClick={() => this.changePassword()}>Contraseña</li></Link>
								<Link to="/settings/other-configurations/change" onKeyDown={e => this.onKeyDown(e)}><li className="settings-options-item" ref="settingsOtherConfigurations" onClick={() => this.changeOtherConfigurations(birthday, sex, theme_color, joined, verified)}>Más</li></Link>
							</ul>
						</div>

						<div className="settings-functionalities">
						
							<div className="settings-functionalities-user-info">
								<img className="settings-functionalities-user-image" src={"data:image/png;base64," + profile_image} alt="" />
								<div className="settings-functionalities-user-name">
									<h2 className="settings-functionalities-user-name-text-one">{name}</h2>
									<h3 className="settings-functionalities-user-name-text-two">@{username}</h3>
								</div>
							</div>

							<div className="settings-functionalities-update-user-info">
								{
									this.props.settingsType === 'CHANGE_USERNAME' 
									? <ChangeUsername username={this.props.settingsData} />
									: this.props.settingsType === 'CHANGE_NAME' 
									? <ChangeName name={this.props.settingsData} />
									: this.props.settingsType === 'CHANGE_DESCRIPTION' 
									? <ChangeDescription description={this.props.settingsData} /> 
									: this.props.settingsType === 'CHANGE_OTHER_CONFIGURATIONS' 
									? <ChangeOtherConfigurations data={this.props.settingsData} />
									: this.props.settingsType === 'CHANGE_PHOTO' 
									? <ChangeProfilePhoto profilePhoto={this.props.settingsData} /> 
									: this.props.settingsType === 'CHANGE_PASSWORD' 
									? <ChangePassword /> : null 
								}
							</div>
						</div> 	
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return state.settings;
}

export default connect(mapStateToProps)(settings);