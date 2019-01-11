import React, { Component } from 'react';
import { connect } from 'react-redux'; 

/* Import Actions */
import { updateDescription } from '../../../actions/settings/subdivision/changeDescriptionActions';

/* Import Components */
import ContentEditableInput from '../../input-text/contentEditableInput';

class changeDescription extends Component  {
	onSubmit = (event) => {
		let imgs = document.getElementsByClassName("emoji-inserted");
		let mentions = document.getElementsByClassName("user-mention");
		let inputHtml = this.props.text;

		if (mentions) {	
			for (let i = 0; i < mentions.length; i++) 
				inputHtml = inputHtml.replace(mentions[i].outerHTML, mentions[i].innerHTML);	
		}

		if (imgs) {
			for (let i = 0; i < imgs.length; i++)
				inputHtml = inputHtml.replace(imgs[i].outerHTML, imgs[i].getAttribute("data-plain-text"));		
		}
		event.preventDefault();
		this.props.dispatch(updateDescription(inputHtml));
	}
	
	render() {
		return (
			<div className="settings-functionalities-update-user-info-name">
				<h3 className="settings-functionalities-update-user-info-title--update-photo">Descripción</h3>
				<form onSubmit={this.onSubmit} className="settings-functionalities-update-user-info-form">
					<label className="form-settings-label emoji-label" onClick={e => e.preventDefault()}>
						
						<div className="settings-functionalities-update-user-info-text-container emoji-container">
							<ContentEditableInput content={this.props.description} />
						</div>
					</label>

					<div className="settings-functionalities-update-user-info-button-container">
						<button className="settings-functionalities-update-user-info-button" type="submit" onClick={this.onSubmit}>Guardar Cambios</button>
					</div>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return state.inputText;
}

export default connect(mapStateToProps)(changeDescription);