import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/* Import Utils */
import styleClasses from '../../utils/styleClasses/styleClasses';

/* Import Actions */
import { resetPassword } from '../../actions/reset-password/resetPasswordActions';

class resetPasswordForm extends Component {
	state = {
		newPassword: '',
		confirmNewPassword: '',
		errorPassword: false,
		noEqualPasswords: false
	};

	componentDidMount() {
		let { auth } = this.refs
		styleClasses.centerElement(auth, '1.5rem', document.body);
	}

	onSubmit = (event) => {
		event.preventDefault();
		this.props.dispatch(resetPassword(this.props.token, this.state.newPassword));
	}
	
	handlePassword = (event) => {
		this.setState({newPassword: event.target.value});
		let { inputPassword, inputConfirmPassword, textPassword, textConfirmPassword } = this.refs;
		let passwordValue = inputPassword.value;
		let passwordValid = event.target.value.match(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{5,40}$/);
		let confirmPasswordValue = inputConfirmPassword.value;	

		if (passwordValid || !passwordValue) {
			this.setState({errorPassword: false});
			styleClasses.inputPasswordValid(inputPassword, textPassword);
			if (confirmPasswordValue !== passwordValue) {
				this.setState({noEqualPasswords: true});
				styleClasses.inputConfirmPasswordError(inputConfirmPassword, textConfirmPassword);
			} else {
				this.setState({noEqualPasswords: false});
				styleClasses.inputConfirmPasswordValid(inputConfirmPassword, textConfirmPassword);				
			}
		} else {
			this.setState({errorPassword: true, noEqualPasswords: false});
			styleClasses.inputPasswordError(inputPassword, textPassword);	
			styleClasses.inputConfirmPasswordValid(inputConfirmPassword, textConfirmPassword);	
		}	
	}
	
	handleConfirmPassword = (event) => {
		this.setState({confirmNewPassword: event.target.value});
		let { inputConfirmPassword, textConfirmPassword } = this.refs;	
		let confirmPasswordValue = inputConfirmPassword.value;	
		(this.state.newPassword !== confirmPasswordValue) ? this.setState({noEqualPasswords: true}, styleClasses.inputConfirmPasswordError(inputConfirmPassword, textConfirmPassword)) : this.setState({noEqualPasswords: false}, styleClasses.inputConfirmPasswordValid(inputConfirmPassword, textConfirmPassword));
	}

	visiblePassword = (input, icon) => {
		const inputPassword = this.refs[input];
		const passwordIcon = this.refs[icon];				
		(inputPassword.getAttribute("type") === "password") ? inputPassword.setAttribute("type", "text") : inputPassword.setAttribute("type", "password");
		(inputPassword.getAttribute("type") === "password") ? passwordIcon.textContent = 'visibility_off' : passwordIcon.textContent = 'visibility';		
	}

	render() {
		return (
			<div className="auth-container"> 
				<div className="auth" ref="auth">
					<div className="auth-header">
						<h2 className="auth-title">Cambiar Contraseña</h2>
					</div>

					<form className="auth-form" onSubmit={this.onSubmit}>
						<label className="auth-form-label">
							<span className="icon-visible-password" ref="visiblePassword" onClick={() => this.visiblePassword("inputPassword", "passwordIcon")}>
								<i className="image material-icons"  ref="passwordIcon">visibility_off</i>
							</span>	

							<input type="password" ref="inputPassword" className="auth-form-input auth-form-input-password" placeholder="&nbsp;" value={this.state.newPassword} onChange={this.handlePassword} />
							<p className="auth-form-text" ref="textPassword">Nueva Contraseña</p>
							
							<div className="input-tooltip" style={{top: '-6rem'}}>
								La contraseña debe tener entre 5 y 40 caracteres, al menos un número, una minúscula y una mayúscula.
							</div>

							{/* error text */ this.state.errorPassword ? <div className="register-message"><p className="errorText">La contraseña no es valida</p></div> : null }
						</label>

						<label className="auth-form-label">
							<span className="icon-visible-password" ref="visibleConfirmPassword" onClick={() => this.visiblePassword("inputConfirmPassword", "confirmPasswordIcon")}>
								<i className="image material-icons"  ref="confirmPasswordIcon">visibility_off</i>
							</span>

							<input type="password" ref="inputConfirmPassword" className="auth-form-input auth-form-input-password" placeholder="&nbsp;" onChange={this.handleConfirmPassword} value={this.state.confirmNewPassword} />
							<p className="auth-form-text" ref="textConfirmPassword">Confirmar Nueva Contraseña</p>

							{/* error text */ this.state.noEqualPasswords ? <div className="register-message"><p className="errorText">No coinciden las contraseñas</p></div> : null }
						</label>
								
						<footer className="auth-form-footer">
							<div className="auth-form-link">
								<div className="auth-link-container">
									<Link to="/login"><span className="auth-link">Iniciar sesión</span></Link>
									<Link to="/register"><span className="auth-link">Registrarse</span></Link>
								</div>
								<button type="submit" className="auth-button"  disabled={this.state.errorPassword || !this.state.newPassword || this.state.noEqualPasswords || !this.state.confirmNewPassword}>Actualizar Contraseña</button>
							</div>
						</footer>
					</form>
				</div>
			</div>
		)
	}
}

export default connect()(resetPasswordForm);