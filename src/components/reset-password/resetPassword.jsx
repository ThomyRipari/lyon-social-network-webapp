import React, { Component } from 'react';

/* Import Components */ 
import ResetPasswordForm from './resetPasswordForm';

/* Import Utils */
import { particlesConfig } from '../../utils/particles/particlesConfig';

/* Import Particles */
import Particles from 'react-particles-js';

class resetPassword extends Component {
	componentDidMount() {
        if (localStorage.token) {
            this.props.history.push('/profile/' + localStorage.username);
        } else {
            document.title = 'Reset Password | Lyon';
        }
    }
    
    render() {
        if (this.props.match.params.key.length === 168) {
            let token = this.props.match.params.key.slice(64, -64);
            return (
                <div className="container">
                    <ResetPasswordForm token={token} />
                    <div id="particles-js">
                        <Particles params={particlesConfig} />
                    </div>
                </div>
            )
        } else {
            return (
               <div>
                    <h1>Enlace no valido.</h1>
               </div>
            )
        }
    }
}

export default resetPassword;