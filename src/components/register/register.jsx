import React, { Component } from 'react';

/* Import Components */
import RegisterForm from './registerForm';

/* Import Particles */
import Particles from 'react-particles-js';

/* Import Utils */
import { particlesConfig } from '../../utils/particles/particlesConfig';

class register extends Component {
	componentDidMount() {
		if (localStorage.token) {
			this.props.history.push('/profile/' + localStorage.username);
		} else {
			document.title = 'Register | Lyon';
		}
	}

	render() {
		return (
			<div className="container">				
				<RegisterForm />
				<div id="particles-js">
					<Particles params={particlesConfig} />
				</div>
			</div>
		)
	}
}

export default register;