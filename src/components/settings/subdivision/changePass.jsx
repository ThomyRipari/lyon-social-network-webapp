import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Import Components */
import Loader from '../../loader/loader';

/* Import Actions */
import { changePassword, resetState } from '../../../actions/settings/subdivision/changePasswordActions';

class changePass extends Component {
	state = {
		oldPassword: '',
		newPassword: '',
		confirmNewPass: '',
		errorOldPass: false,
		errorNewPass: false,
		equalOldNewPass: false,
		noEqualPasswords: false
	};

	componentWillUnmount() {
		this.props.dispatch(resetState());
	}

	componentWillReceiveProps(nextProps) {
		this.setState({errorOldPass: nextProps.errorOldPass});
	}

	onSubmit = (event) => {
		event.preventDefault();
		this.props.dispatch(changePassword(this.state.oldPassword, this.state.newPassword));
		this.setState({oldPassword: '', newPassword: '', confirmNewPass: ''});
	}

	handleOldPassword = (event) => {
		this.setState({oldPassword: event.target.value, errorOldPass: false});
		if (event.target.value === this.state.newPassword) {
			this.setState({equalOldNewPass: true});
		} else {
			this.setState({equalOldNewPass: false});
		}
	}

	handleNewPassword = (event) => {
		this.setState({newPassword: event.target.value, errorOldPass: false});
		let passwordValid = event.target.value.match(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{5,40}$/);
		if (event.target.value === this.state.oldPassword) {
			this.setState({equalOldNewPass: true});
		} else {
			this.setState({equalOldNewPass: false});
			if (passwordValid || !event.target.value) {
				this.setState({errorNewPass: false});
				if (event.target.value !== this.state.confirmNewPass) {
					this.setState({noEqualPasswords: true});
				} else {
					this.setState({noEqualPasswords: false});
				}
			} else {
				this.setState({errorNewPass: true});
			}			
		}
	}

	handleConfNewPass = (event) => {
		this.setState({confirmNewPass: event.target.value, errorOldPass: false});
		if(event.target.value !== this.state.newPassword) {
			this.setState({noEqualPasswords: true});
		} else {
			this.setState({noEqualPasswords: false});
		}
	}

	clearOldInputPassword = () => this.setState({oldPassword: '', errorOldPass: false, equalOldNewPass: false});
	clearNewPassword = () => this.setState({newPassword: '', errorNewPass: false, equalOldNewPass: false});
	clearConfirmNewPassword = () => this.setState({confirmNewPass: ''});

	render() {
		if (this.props.loading) {
			return <Loader />;
		}
		return (
			<div className="settings-functionalities-update-user-info-password">
				<form onSubmit={this.onSubmit} className="settings-functionalities-update-user-info-form--password">

					<label className="form-settings-label">
						<h3 className="settings-functionalities-update-user-info-title">Antigua Contraseña</h3>
						<div className="settings-functionalities-update-user-info-input-container">
							<div className="input-clear-icon-container">
								<input className="input settings-functionalities-update-user-info-input" placeholder="Antigua Contraseña" type="password" onChange={this.handleOldPassword} value={this.state.oldPassword} />
								<div className="clear-icon-container" onClick={this.clearOldInputPassword}>
									<i className="material-icons clear-icon">clear</i>
								</div>
							</div>
						</div>
					</label>

					<label className="form-settings-label">
						<h3 className="settings-functionalities-update-user-info-title">Nueva Contraseña</h3>
						<div className="settings-functionalities-update-user-info-input-container">
							<div className="input-clear-icon-container">
								<input className="input settings-functionalities-update-user-info-input" placeholder="Nueva Contraseña" type="password" onChange={this.handleNewPassword} value={this.state.newPassword} />
								<div className="clear-icon-container" onClick={this.clearNewPassword}>
									<i className="material-icons clear-icon">clear</i>
								</div>
							</div>
							{this.state.errorOldPass 
								? <span className="invalid-input-value-message">Contrasena actual incorrecta</span> 
								: (this.state.equalOldNewPass 
								? <span className="invalid-input-value-message" style={{bottom: '-2.2rem'}}>La contraseña antigua y la nueva son iguales</span> 
								: (this.state.errorNewPass
								? <span className="invalid-input-value-message">La contraseña nueva no es valida</span> : null ))}
						</div>
					</label>

					<label className="form-settings-label">
						<h3 className="settings-functionalities-update-user-info-title">Confirmar Contraseña</h3>
						<div className="settings-functionalities-update-user-info-input-container">
							<div className="input-clear-icon-container">
								<input className="input settings-functionalities-update-user-info-input" placeholder="Confirmar Nueva Contraseña" type="password" onChange={this.handleConfNewPass} value={this.state.confirmNewPass} />
								<div className="clear-icon-container" onClick={this.clearConfirmNewPassword}>
									<i className="material-icons clear-icon">clear</i>
								</div>
							</div>
							{this.state.noEqualPasswords ? <span className="invalid-input-value-message">No coindicen las contraseñas</span> : null }
						</div>
					</label>


				

					<button className="settings-functionalities-update-user-info-button" type="submit" disabled={this.state.noEqualPasswords || !this.state.oldPassword || !this.state.newPassword || this.state.errorNewPass || this.state.equalOldNewPass}>Guardar Cambios</button>
				</form>
				<div className="message-update-password">
						
				</div>	
			</div>
		)
	}
}

const mapStateToProps = state => {
	return state.changePass;
}

export default connect(mapStateToProps)(changePass);