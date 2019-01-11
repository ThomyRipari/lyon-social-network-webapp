import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Import Actions */
import updateOtherConfigurations from '../../../actions/settings/subdivision/changeOtherConfigurationsActions';

class changeOtherConfigurations extends Component {
	state = {bornDate: '', sex: '', joinedDate: '', isVerified: false};

	componentDidMount() {
		this.setState({bornDate: this.props.data[0], sex: this.props.data[1],
			joinedDate: this.props.data[3], isVerified: this.props.data[4]});
	}

	handleBornDate = (event) => {
		if (event.target.value === "")
			this.setState({bornDate: null});
		else
			this.setState({bornDate: event.target.value});
	}

	handleSex = (event) => {
		if (event.target.value === "")
			this.setState({sex: null})
		else
			this.setState({sex: event.target.value});
	}

	/*handleThemeColor = (event) => {
		if (event.target.value === "")
			this.setState({themeColor: null});
		else
			this.setState({themeColor: event.target.value});
	}*/

	onSubmit = (event) => {
		event.preventDefault();
		this.props.dispatch(updateOtherConfigurations(this.state.bornDate, this.state.sex));
	}

	render() {
		return (
			<div className="settings-functionalities-update-user-info-more-configurations">

				<form onSubmit={this.onSubmit} className="settings-functionalities-update-user-info-form">

					<div>
					</div>
					<label className="form-settings-label">
						<h3 className="settings-functionalities-update-user-info-title">Fecha de Nacimiento</h3>
						<div className="settings-functionalities-update-user-info-input-container">
							<input className="input settings-functionalities-update-user-info-input" type="date" value={this.state.bornDate || ""} onChange={this.handleBornDate} />
						</div>
					</label>

					<label className="form-settings-label">
						<h3 className="settings-functionalities-update-user-info-title">Sexo</h3>
						<div className="settings-functionalities-update-user-info-input-container">
							<select className="input settings-functionalities-update-user-info-input" value={this.state.sex ? this.state.sex : ""} onChange={this.handleSex}>
								<option value="">No definido</option>
								<option value="Hombre">Hombre</option>
								<option value="Mujer">Mujer</option>
							</select>
						</div>
					</label>

					<label className="form-settings-label">
						<h3 className="settings-functionalities-update-user-info-title">En Lyon Desde</h3>
						<div className="settings-functionalities-update-user-info-input-container">
							<p className="input settings-functionalities-update-user-info-input border-0">{this.state.joinedDate}</p>
						</div>
					</label>

					{/*<div>
						<h4>Theme Color</h4>
					</div>
					<div>
						<select value={this.state.themeColor ? this.state.themeColor : ""} onChange={this.handleThemeColor}>
							<option value="">Default</option>
							<option value="Green">Green</option>
							<option value="Red">Red</option>
							<option value="Yellow">Yellow</option>
							<option value="Blue">Blue</option>
						</select>
					</div>*/}

					<label className="form-settings-label">
						{this.state.isVerified 
							? <p className="settings-functionalities-update-user-info-title w-100 text-verify">Esta cuenta esta verificada
								 <i className="material-icons ml-icon">verified_user</i> 
							  </p>
							: <p className="settings-functionalities-update-user-info-title w-100 text-verify">Esta cuenta no esta verificada</p>}
					</label>

					<div>
						<button className="settings-functionalities-update-user-info-button" type="submit">Guardar Cambios</button>
					</div>
				</form>
		
		
			</div>
		)
	}
}

export default connect()(changeOtherConfigurations);