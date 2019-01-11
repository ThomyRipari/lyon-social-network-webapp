import React, { Component } from 'react';

class notFoundError extends Component {
	render() {
		document.title = 'Not Found Error [404]';
		return (
			<div>
				<h1>Not Found, 404 ERROR</h1>
			</div>
		)
	}
}
export default notFoundError;