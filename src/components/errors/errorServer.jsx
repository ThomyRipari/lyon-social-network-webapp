import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class errorServer extends Component {
	render() {
		document.title = '¡OOPS! - Error 500';
		return (
			<div className="error-container">
				<div className="error-content">
					<div className="error-header">
						<span className="error-header-face">:(</span>
						<div className="error-header-text">
							<h2 className="error-header-text-title">¡OOPS!</h2>
							<p className="error-header-text-subtitle">Parece que ha ocurrido un problema...</p>
						</div>
					</div>

					<div className="error-text">
						<div className="error-text-container">
							<p className="error-text-title">Ha surgido un Error Interno del Servidor <strong>(Error 500)</strong></p>
							<Link className="error-text-link" to="/">Haga click aquí para volver al Inicio</Link>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default errorServer;