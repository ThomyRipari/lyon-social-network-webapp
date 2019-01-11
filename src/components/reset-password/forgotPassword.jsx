import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Import Components */
import ForgotPasswordForm from './forgotPasswordForm';

/* Import Particles */
import Particles from 'react-particles-js';

/* Import Utils */
import { particlesConfig } from '../../utils/particles/particlesConfig';

class forgotPassword extends Component {
	componentDidMount() {
		if (localStorage.token) {
			this.props.history.push('/profile/' + localStorage.username);
		} else {
			document.title = 'Forgot Password | Lyon';
		}
	}

	componentDidUpdate() {
		if (this.props.success) {
			this.props.history.push('/login');
		}
	}

	render() {
		return (
			<div className="container">				
				<ForgotPasswordForm />
				<div id="particles-js">
					<Particles params={particlesConfig} />
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return state.forgotPass;
}

export default connect(mapStateToProps)(forgotPassword);