import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Import Actions */
import { updateUsername, validateUsername, resetState } from '../../../actions/settings/subdivision/changeUsernameActions';

class changeUsername extends Component {
	state = {
		username: '',
		handleUsername: false,
		usernameError: false,
		isYourUser: false
	}
	
	componentDidMount() {
		this.setState({username: this.props.username});
	}

	componentWillUnmount() {
		this.props.dispatch(resetState());
	}

	onSubmit = (event) => {
		event.preventDefault();
		this.props.dispatch(updateUsername(this.state.username));
	}

	handleUsername = (event) => {
		this.setState({username: event.target.value, handleUsername: true});
		let usernameValid = event.target.value.match(/^[A-Z][A-Za-z0-9!@#$%^&._~()ªº=·/*]{5,40}$/);

		if (this.props.username !== event.target.value) {
			this.setState({isYourUser: false});

			if (usernameValid || !event.target.value) {
				this.setState({usernameError: false});
				this.props.dispatch(validateUsername(event.target.value));
			} else {
				this.setState({usernameError: true});
			}			
		} else {
			this.setState({isYourUser: true, usernameError: false});
		}
	}

	clearInput = () => {
		this.props.dispatch(resetState());
		this.setState({username: '', usernameError: false, isYourUser: false});
	}

	render() {
		return (
			<div className="settings-functionalities-update-user-info-username">
				<form onSubmit={this.onSubmit} className="settings-functionalities-update-user-info-form">

					<label className="form-settings-label">
						<h3 className="settings-functionalities-update-user-info-title">Nombre de Usuario</h3>	
						<div className="settings-functionalities-update-user-info-input-container">
							<div className="input-clear-icon-container">
								<input className="input settings-functionalities-update-user-info-input" placeholder="Nombre de Usuario" type="text" value={this.state.username} onChange={this.handleUsername} />
								<div className="clear-icon-container" onClick={this.clearInput}>
									<i className="material-icons clear-icon">clear</i>
								</div>
							</div>
							{this.state.usernameError 
								? <span className="invalid-input-value-message">Username no valido</span> 
								: this.props.existsUsername && !this.state.isYourUser 
								? <span className="invalid-input-value-message">Username existente</span>
								: this.state.isYourUser 
								? <span className="invalid-input-value-message">Eres tu</span>
								: null }
						</div>
					</label>

					<div className="settings-functionalities-update-user-info-button-container">
						<button className="settings-functionalities-update-user-info-button" type="submit" disabled={!this.state.username || !this.state.handleUsername || this.state.usernameError  || this.props.existsUsername || this.state.isYourUser}>Guardar Cambios</button>
					</div>

				</form>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return state.changeUsername;
}

export default connect(mapStateToProps)(changeUsername);

