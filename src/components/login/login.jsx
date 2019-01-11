import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Import Components */
import LoginForm from './loginForm';
import SnackbarMessage from '../snackbar/snackbarMessage';

/* Import Particles */
import Particles from 'react-particles-js';

/* Import Utils */
import { particlesConfig } from '../../utils/particles/particlesConfig';

class login extends Component {
	componentDidMount() {
		if (localStorage.token) {
			this.props.history.push('/profile/' + localStorage.username);
		} else {
			document.title = 'Login | Lyon';
		}
	}

	render() {
		return (
			<div className="container">				
				<LoginForm />
				<div id="particles-js">
					<Particles params={particlesConfig} />
				</div>
				{this.props.show ? <SnackbarMessage message={this.props.message} /> : null}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return state.snackbar;
}

export default connect(mapStateToProps)(login);