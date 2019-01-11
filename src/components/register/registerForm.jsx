import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/* Import Utils */
import styleClasses from '../../utils/styleClasses/styleClasses';

/* Import Components */
import Loader from '../loader/loader';

/* Import Actions */
import { register, validateUsername, validateEmail, resetState } from '../../actions/register/registerActions';

class registerForm extends Component {
	state = {
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		isChecked: false,
		errorUsername: false,
		errorEmail: false,
		errorPassword: false,
		noEqualPasswords: false,
		errorCookies: false
	};

	componentDidMount() {
		let { auth } = this.refs;
		styleClasses.centerElement(auth, '1.5rem', document.body);
	}

	componentWillUnmount() {
		this.props.dispatch(resetState());
	}

	onSubmit = (event) => {
		event.preventDefault();
		this.props.dispatch(register(this.state.username, this.state.email, this.state.password));
		this.setState({username: '', email: '', password: '', confirmPassword: '', isChecked: false});
	}

	handleUsername = (event) => {
		this.setState({username: event.target.value});
		let { textName, inputName } = this.refs;
		let nameValid = inputName.value.match(/^[A-Z][A-Za-z0-9!@#$%^&._~()ªº=·/*]{5,40}$/);

		this.props.dispatch(validateUsername(event.target.value));

		(nameValid || !inputName.value) ? this.setState({errorUsername: false}, styleClasses.inputNameValid(inputName, textName)) : this.setState({errorUsername: true}, styleClasses.inputNameError(inputName, textName));	
	}
	
	handleEmail = (event) => {
		this.setState({email: event.target.value});
		let { textEmail, inputEmail } = this.refs;
		let emailValue = inputEmail.value;
		let emailValid = emailValue.match(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i);

		this.props.dispatch(validateEmail(event.target.value));

		((emailValid && emailValue.length > 4 && emailValue.length < 81) || !emailValue) ? this.setState({errorEmail: false}, styleClasses.inputEmailValid(inputEmail, textEmail)) : this.setState({errorEmail: true}, styleClasses.inputEmailError(inputEmail, textEmail));
	}

	handlePassword = (event) => {
		this.setState({password: event.target.value});
		let { inputPassword, inputConfirmPassword, textPassword, textConfirmPassword } = this.refs;
		let passwordValue = inputPassword.value;
		let passwordValid = event.target.value.match(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{5,40}$/);

		if (passwordValid || !passwordValue) {
			this.setState({errorPassword: false});
			styleClasses.inputPasswordValid(inputPassword, textPassword);
			if (this.state.confirmPassword !== passwordValue) {
				this.setState({noEqualPasswords: true});
				styleClasses.inputConfirmPasswordError(inputConfirmPassword, textConfirmPassword);
			} else {
				this.setState({noEqualPasswords: false});
				styleClasses.inputConfirmPasswordValid(inputConfirmPassword, textConfirmPassword);				
			}
		} else {
			this.setState({errorPassword: true});
			styleClasses.inputPasswordError(inputPassword, textPassword);			
		}	
	}
	
	handleConfirmPassword = (event) => {
		this.setState({confirmPassword: event.target.value});
		let { inputConfirmPassword, textConfirmPassword } = this.refs;	
		let confirmPasswordValue = inputConfirmPassword.value;	
		(this.state.password !== confirmPasswordValue) ? this.setState({noEqualPasswords: true}, styleClasses.inputConfirmPasswordError(inputConfirmPassword, textConfirmPassword)) : this.setState({noEqualPasswords: false}, styleClasses.inputConfirmPasswordValid(inputConfirmPassword, textConfirmPassword));
	}
	
	handleCookies = () => {
		this.setState({isChecked: !this.state.isChecked});
		let { textCookies } = this.refs;
   		(this.state.isChecked) ? this.setState({errorCookies: true}, styleClasses.inputCookiesError(textCookies)) : this.setState({errorCookies: false}, styleClasses.inputCookiesValid(textCookies));
	}

	visiblePassword = (input, icon) => {
		const inputPassword = this.refs[input];
		const passwordIcon = this.refs[icon];				
		(inputPassword.getAttribute("type") === "password") ? inputPassword.setAttribute("type", "text") : inputPassword.setAttribute("type", "password");
		(inputPassword.getAttribute("type") === "password") ? passwordIcon.textContent = 'visibility_off' : passwordIcon.textContent = 'visibility';		
	}
	
	registerButton = () => {
		let { buttonRegister } = this.refs;
		const disabledButton = buttonRegister.getAttribute("disabled");
		(disabledButton !== null) ? buttonRegister.setAttribute("title", "Complete correctamente todos los campos") : buttonRegister.setAttribute("title", "Haz click aquí para registrarte");
	} 

	centerForm = () => {
		let interval = setInterval(()=>{
			let { auth } = this.refs;
			if(auth) {
				styleClasses.centerElement(auth, '1.5rem', document.body);
				clearInterval(interval);
				console.clear();
			}
		}, 50);
	}

	render() {
		if (this.props.loading) {
			return <Loader />;
		}
		return (
			<div className="auth-container">
				<div className="auth" ref="auth">
					<header className ="auth-header">
						<h2 className="auth-title">Registrarse</h2>
					</header>
			
					<form className="auth-form" onSubmit={this.onSubmit}>
						<label className="auth-form-label">
							<input type="text" ref="inputName" className="auth-form-input" placeholder="&nbsp;" onChange={this.handleUsername}  value={this.state.username} />
							<p className="auth-form-text" ref="textName">Nombre de usuario</p> 
							<div className="input-tooltip" style={{top: '-5rem'}}>
								El nombre debe comenzar con una letra mayuscula y debe tener entre 5 y 40 caracteres.
							</div>

							{/* error text */ this.state.errorUsername ? <div className="register-message"><p className="errorText">El usuario no es valido</p></div> : null }
							{/* error text */ this.props.existsUsername ? <div className="register-message"><p className="errorText">Usuario existente</p></div> : null }
						</label>
			
						<label className="auth-form-label">
							<input type="email" ref="inputEmail" className="auth-form-input" placeholder="&nbsp;" onChange={this.handleEmail} value={this.state.email} />
							<p className="auth-form-text" ref="textEmail">E-mail</p>
							<div className="input-tooltip" style={{top: '-3rem'}}>
								El email debe tener entre 5 y 80 caracteres.
							</div>

							{/* error text */ this.state.errorEmail ? <div className="register-message"><p className="errorText">El email no es valido</p></div> : null }
							{/* error text */ this.props.existsEmail ? <div className="register-message"><p className="errorText">Email existente</p></div> : null }
						</label>
			
						<label className="auth-form-label">
							<span className="icon-visible-password" ref="visiblePassword" onClick={() => this.visiblePassword("inputPassword", "passwordIcon")}>
								<i className="image material-icons"  ref="passwordIcon">visibility_off</i>
							</span>	

							<input type="password" ref="inputPassword" className="auth-form-input auth-form-input-password" placeholder="&nbsp;" onChange={this.handlePassword} value={this.state.password} />
							<p className="auth-form-text" ref="textPassword">Contraseña</p>
						
							<div className="input-tooltip" style={{top: '-6rem'}}>
								La contraseña debe tener entre 5 y 40 caracteres, al menos un número, una minúscula y una mayúscula.
							</div>

							{/* error text */ this.state.errorPassword ? <div className="register-message"><p className="errorText">La contraseña no es valida</p></div> : null}
						</label>

						<label className="auth-form-label">
							<span className="icon-visible-password" ref="visibleConfirmPassword" onClick={() => this.visiblePassword("inputConfirmPassword", "confirmPasswordIcon")}>
								<i className="image material-icons"  ref="confirmPasswordIcon">visibility_off</i>
							</span>

							<input type="password" ref="inputConfirmPassword" className="auth-form-input auth-form-input-password" placeholder="&nbsp;" onChange={this.handleConfirmPassword} value={this.state.confirmPassword} />
							<p className="auth-form-text" ref="textConfirmPassword">Confirmar contraseña</p>
	
							{/* error text */ this.state.noEqualPasswords ? <div className="register-message"><p className="errorText">No coinciden las contraseñas</p></div> : null }
						</label>
			
						<footer className="auth-form-footer">
							<div className="auth-form-cookies">

								<div className="auth-form-cookies-terms">
									<input checked={this.state.isChecked} type="checkbox" className="auth-form-cookies-input" onChange={this.handleCookies} />
									<Link to="#"><span ref="textCookies" className="auth-form-cookies-text">Acepto los términos y condiciones</span></Link>
								</div>	

								{/* error text */ this.state.errorCookies ? <div className="register-message"><p className="errorText cookies-text-error">Por favor acepte los términos y condiciones</p></div> : null }

							</div>

							<div className="auth-form-link">
								<div className="auth-link-container">
									<Link to="/login"><span  className="auth-link">Iniciar sesión</span></Link>			
									<Link to="/"><span className="auth-link">Inicio</span></Link>
								</div>			
								<button type="submit" className="auth-button" ref="buttonRegister" disabled={this.state.errorUsername || this.state.errorEmail || this.state.errorPassword || this.state.noEqualPasswords || !this.state.isChecked || !this.state.username || !this.state.email || !this.state.password || !this.state.confirmPassword || this.props.existsUsername || this.props.existsEmail} title={"Complete correctamente todos los campos"} onMouseOver={this.registerButton}>
									Registrarse
								</button>
							</div>
						</footer>
					
					</form>
					
				</div>
		
				<div className="register-message-login">
					{this.props.registerSuccess ? <div className="modal-fade"><p className="valid-register">Registrado correctamente {this.props.username}. Has click en login para ingresar <Link to="/login">Login</Link></p></div> : null}		
				</div>
				{this.centerForm()}
			</div>	
		);
	}
}

const mapStateToProps = state => {
	return state.register;
}

export default connect(mapStateToProps)(registerForm);