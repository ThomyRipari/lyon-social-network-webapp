import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/* Import Utils */
import styleClasses from '../../utils/styleClasses/styleClasses';

/* Import Components */
import Loader from '../loader/loader';

/* Import Actions */
import { forgotPassword, resetState } from '../../actions/reset-password/forgotPasswordActions';

class forgotPasswordForm extends Component {
	state = {email: ''};

	componentDidMount() {
		let { auth } = this.refs
		styleClasses.centerElement(auth, '1.5rem', document.body);
	}

	componentWillUnmount() {
		this.props.dispatch(resetState());
	}

	componentDidUpdate() {
		let { inputEmail, textEmail } = this.refs;
		if (this.props.error) {
			styleClasses.inputEmailError(inputEmail, textEmail);
		};
	}

	onSubmit = (event) => {
		event.preventDefault();
		this.props.dispatch(forgotPassword(this.state.email));
	}

	handleUserEmail = (event) => {
		this.setState({email: event.target.value});
	}

	render() {
		if (this.props.loading) {
			return <Loader />;
		} else {
			return (
				<div className="auth-container"> 
					<div className="auth" ref="auth">
						<div className="auth-header">
							<h2 className="auth-title">¿Olvidaste tu contraseña?</h2>
						</div>

						<form className="auth-form" onSubmit={this.onSubmit}>
							<label className="auth-form-label">
								<input type="text" ref="inputEmail" className="auth-form-input" placeholder="&nbsp;" value={this.state.email} onChange={this.handleUserEmail} />
								<p className="auth-form-text" ref="textEmail">E-mail</p> 

								{/* error text */ this.props.error ? <div className="register-message"><p className="errorText">Email inexistente</p></div> : null }
							</label>
						
							<footer className="auth-form-footer">
								<div className="auth-form-link">
									<div className="auth-link-container">
										<Link to="/login"><span className="auth-link">Iniciar sesión</span></Link>  
										<Link to="/register"><span className="auth-link">Registrarse</span></Link>
									</div>
									<button type="submit" className="auth-button">Enviar e-mail</button>
								</div>
							</footer>
						</form>
					</div>	
				</div>
			)
		}
	}
}

const mapStateToProps = state => {
	return state.forgotPass;
}

export default connect(mapStateToProps)(forgotPasswordForm);