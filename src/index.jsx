import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

/* Import Components */
import Nav from './components/navbar/nav';
import register from './components/register/register';
import login from './components/login/login';
import errorServer from './components/errors/errorServer';
import notFoundError from './components/errors/notFoundError';
import settingsContainer from './components/settings/settingsContainer';
import userPublication from './components/publications/userPublication';
import forgotPassword from './components/reset-password/forgotPassword';
import resetPassword from './components/reset-password/resetPassword';
import userProfileContainer from './components/users/userProfileContainer';

/* Import Particles */
import Particles from 'react-particles-js';

/* Import Store */
import Store from './store/Store';

/* Import Utils */ 
import { particlesConfig } from './utils/particles/particlesConfig';

/* Import Styles */
import './sass/styles.scss';

class Root extends Component {
	componentDidMount() {
		if (localStorage.token) {
			window.location.href = '/profile/' + localStorage.username;
		} else {
			document.title = 'Welcome to Lyon';
		}
	}
	render() {
		return (
			<div className="container">
				<div className="home">
					<div className="home-logo">
						<h1 className="home-logo-title">Lyon</h1>
					</div>
					<div className="home-buttons">			
						<Link to="/login"><button className="home-button">INICIAR SESIÓN</button></Link>
						<Link to="/register"><button className="home-button">REGISTRARSE</button></Link>
					</div>
				</div>
				<div id="particles-js">
					<Particles params={particlesConfig} />
				</div>
			</div>
		)
	}
}

class Router extends Component {
	render() {
		return (
			<Provider store={Store}>
				<BrowserRouter>
	                <div className="rootchild"> 
	                	<Route path="/(settings|profile|publication)/" component={Nav} />
	                    <Route exact path="/" render={ () => (<Root />) } />
	                    <Route path="/register" component={register} /> 
	                    <Route path="/login" component={login} />
	                    <Route path="/forgot-password" component={forgotPassword} />
	                    <Route path="/reset-password/:key" component={resetPassword} />
				        <Route path="/profile/:user" component={userProfileContainer} />
				        <Route path="/settings" component={settingsContainer} />
				        <Route path="/profile/:user/publication/:id" component={userPublication} />                                   
				        <Route path="/server-error" component={errorServer} />
				        <Route path="/not-found-error" component={notFoundError} />
	                </div>
	            </BrowserRouter>
            </Provider>
		);
	}
}

ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();