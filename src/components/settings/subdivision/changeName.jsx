import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Import Actions */
import { updateName } from '../../../actions/settings/subdivision/changeNameActions';

class changeName extends Component {
	state = {
		name: '',
		handleName: false,
		errorName: false
	};

	componentDidMount() {
		this.setState({name: this.props.name});
	}

	handleName = (event) => {
		this.setState({name: event.target.value, handleName: true});
		let exp = new RegExp(/^[A-Z][A-Za-z0-9!@#$%^&._~()ªº=·/*]{5,40}$/);

		if(exp.test(event.target.value) || !event.target.value) {
			this.setState({errorName: false});
		} else {
			this.setState({errorName: true});
		}
	}

	clearInput = () => {
		this.setState({name: '', errorName: false});
	}

	onSubmit = (event) => {
		event.preventDefault();
		this.props.dispatch(updateName(this.state.name));
	}

	render() {
		return (
			<div className="settings-functionalities-update-user-info-description">
			
				<form onSubmit={this.onSubmit} className="settings-functionalities-update-user-info-form">
				
					<label className="form-settings-label">
						<h3 className="settings-functionalities-update-user-info-title">Nombre</h3>
						<div className="settings-functionalities-update-user-info-input-container">
							<div className="input-clear-icon-container">
								<input className="input settings-functionalities-update-user-info-input" placeholder="Nombre" type="text" value={this.state.name} onChange={this.handleName} />
								<div className="clear-icon-container" onClick={this.clearInput}>
									<i className="material-icons clear-icon">clear</i>
								</div>
							</div>
							{this.state.errorName ? <span className="invalid-input-value-message">El nombre no es valido</span> : null}
						</div>
					</label>	

					<div className="settings-functionalities-update-user-info-button-container">
						<button className="settings-functionalities-update-user-info-button" type="submit" disabled={!this.state.name || !this.state.handleName || this.state.errorName}>Guardar Cambios</button>
					</div>

				</form>

			</div>
		)
	}
}

export default connect()(changeName);