import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Material UI */
import Snackbar from '@material-ui/core/Snackbar';

/* Import Actions */
import { hideSnackbar } from '../../actions/dialogs/snackbarActions';

class snackbarMessage extends Component {
	onClose = () => {
		this.props.dispatch(hideSnackbar());
	}

	render() {
		let message = this.props.message;
		return (
			<div>
				<Snackbar 
					open={true}
					message={<p>{message}</p>}
					onClose={this.onClose}
					anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} 
					autoHideDuration={4000} 
					transitionDuration={500}
				/>
			</div>
		)
	}
}

export default connect()(snackbarMessage);