import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/* Import Actions */
import { authenticate, resetState } from '../../actions/login/loginActions';

/* Import Utils */
import styleClasses from '../../utils/styleClasses/styleClasses';

class loginForm extends Component {
	state = {
		username: '',
		password: ''
	};

	componentWillUnmount() {
		this.props.dispatch(resetState());
	}

	componentDidMount() {
		let { auth } = this.refs
		styleClasses.centerElement(auth, '1.5rem', document.body);
	}

	onSubmit = (event) => {
		event.preventDefault();
		this.props.dispatch(authenticate(this.state.username, this.state.password));
	}

	handleUsername = (event) => {
		this.setState({username: event.target.value});
	}

	handlePassword = (event) => {
		this.setState({password: event.target.value});
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
						<h2 className="auth-title">Iniciar Sesión</h2>
					</div>

					<form className="auth-form" onSubmit={this.onSubmit}>
						<label className="auth-form-label">
							<input type="text" ref="inputName" className="auth-form-input" placeholder="&nbsp;" onChange={this.handleUsername} value={this.state.username} /> 
							<p className="auth-form-text" ref="textName">Nombre de usuario o e-mail</p>
						</label>

						<label className="auth-form-label">
							<span className="icon-visible-password" ref="visiblePassword" onClick={() => this.visiblePassword("inputPassword", "passwordIcon")}>
								<i className="image material-icons" ref="passwordIcon">visibility_off</i>
							</span>	

							<input type="password" ref="inputPassword" className="auth-form-input" placeholder="&nbsp;" onChange={this.handlePassword} value={this.state.password} />
							<p className="auth-form-text" ref="textPassword">Contraseña</p>

							{this.props.error ? <div className="register-message"><p className="errorText">Usuario o contraseña incorrectos</p></div> : null}
						</label>
						
						<footer className="auth-form-footer">
							<Link to="/forgot-password" className="auth-forgot-password">¿Olvidaste tu contraseña?</Link>
							<div className="auth-form-link">
								<div className="auth-link-container">
									<Link to="/register"><span className="auth-link">Registrarse</span></Link>
									<Link to="/"><span className="auth-link">Inicio</span></Link>
								</div>
								<button type="submit" className="auth-button">Iniciar sesión</button>
							</div>
						</footer>
					</form>
				</div>				
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return state.login;
}

export default connect(mapStateToProps)(loginForm);