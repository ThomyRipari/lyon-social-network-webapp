import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Emojis */
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

/* Import Actions */
import { saveInputText, clearInputText } from '../../actions/input-text/inputTextActions';
import { findMentions, clearMentions } from '../../actions/users/searchTagsActions';

/* Import Utils */
import { createSpan, setRangeWithEmojisMentions } from '../../utils/emojis/recognizeEmojis';

class contentEditableInput extends Component {
	state = {
		range: null,
		nodeToReplace: null,
		mention: false,
		emojiPanel: false
	}

	componentDidMount() {
		if (this.props.content) {
			setRangeWithEmojisMentions(this.props.content, this.refs.publicationText);
			this.props.dispatch(saveInputText(this.refs.publicationText.innerHTML));

			this.setState({range: window.getSelection().getRangeAt(0)});
		} else
			this.refs.publicationText.focus();
	}

	componentWillUnmount() {
		this.props.dispatch(clearMentions());
		this.props.dispatch(clearInputText());
	}

	getSelection = () => {
		setTimeout(() => {
			this.setState({range: window.getSelection().getRangeAt(0)});
		}, 50);
	}

	onInput = () => {
		let container = this.refs.publicationText;

		if (container.childNodes.length && container.childNodes[0].nodeName.toLowerCase() === 'br')
			container.removeChild(container.childNodes[0]);

		if (window.getSelection().anchorNode.parentElement.tagName.toLowerCase() === 'a') {
			if (window.getSelection().anchorNode.textContent.includes('@') && window.getSelection().anchorNode.textContent.match(/@/g).length === 1 && !/\s/.test(window.getSelection().anchorNode.textContent)) {	
				let split_arroba = window.getSelection().anchorNode.textContent.split('@')[1];
				this.props.dispatch(findMentions(split_arroba));

				this.setState({nodeToReplace: window.getSelection().anchorNode.parentElement});

			} else 
				window.getSelection().anchorNode.parentElement.outerHTML = window.getSelection().anchorNode.parentElement.innerHTML;

		} else {
			this.props.dispatch(clearMentions());	

			let childs = window.getSelection().anchorNode.parentNode.childNodes;

			for (let i = 0; i < childs.length; i++) {
				if (childs[i].nodeName.toLowerCase() === 'a') { 
					if (!childs[i].innerText.includes('@')) {
						childs[i].outerHTML = childs[i].innerHTML;
						break;

					} if (childs[i].nextSibling && !/\s/.test(childs[i].nextSibling.textContent.slice(0))) { 
						if (window.getSelection().anchorNode.previousSibling && window.getSelection().anchorNode.previousSibling.nodeName.toLowerCase() === 'a') {
							childs[i].innerText = childs[i].innerText + childs[i].nextSibling.textContent;
							childs[i].nextSibling.textContent = null;

							if (childs[i].innerText.match(/@/g).length > 1) {
								childs[i].outerHTML = childs[i].innerHTML;
								break;
							} else {
								let split_arroba = childs[i].innerText.split('@')[1];
								this.props.dispatch(findMentions(split_arroba));

								this.setState({nodeToReplace: childs[i]});
							}
						}
					}
				}
			}
			let range = window.getSelection().getRangeAt(0).startOffset;
			let rangeCount = 0;

			for (let i = 0; i < childs.length; i++) {
	            if (childs[i] === window.getSelection().anchorNode)
	            	break;
	            if (childs[i].outerHTML)
	                rangeCount += childs[i].outerHTML.length;
	            else if (childs[i].nodeType === 3) 
	                rangeCount += childs[i].textContent.length;
			}

			let text = this.refs.publicationText.innerHTML;
			let rangeText = text.substring(0, range + rangeCount);

			if (rangeText.slice(-1) === "@") 
				this.setState({mention: true});
	
			else if (this.state.mention) {
				let mentions = rangeText.match(/@\w*/g);

				if (mentions) {
					let lastmention = mentions[mentions.length - 1];
					let lastmentionWithSpaces = rangeText.substring(rangeText.lastIndexOf(lastmention));

					if(/\s/.test(lastmentionWithSpaces)) 
						this.setState({mention: false});
					else {
						this.setState({nodeToReplace: null});
						this.props.dispatch(findMentions(lastmention.split('@')[1]));
					}
				} else {
					this.setState({mention: false});
					this.props.dispatch(clearMentions());				
				}
			} 
		}

		this.props.dispatch(saveInputText(this.refs.publicationText.innerHTML));
	}

	createTag = (user) => { 
		let range;
		this.props.dispatch(clearMentions());

		if (!this.state.nodeToReplace) {
			let stringmention = `<a href="#" class="user-mention">@${user.name}</a>`;
			let newDoc = new DOMParser().parseFromString(stringmention, 'text/html');
			let mention = newDoc.getElementsByTagName("a")[0];

			range = this.state.range;
			range.insertNode(mention);

			let oldTextBefore = mention.previousSibling.textContent;
			let mentions = oldTextBefore.match(/@\w*/g);
			let newTextBefore = document.createTextNode(oldTextBefore.substring(0, oldTextBefore.lastIndexOf(mentions[mentions.length - 1])));
			
			this.refs.publicationText.replaceChild(newTextBefore, mention.previousSibling);

			range.setStartAfter(mention);
		} else {
			let stringmention = `<a href="#" class="user-mention">@${user.name}</a>`;
			let newDoc = new DOMParser().parseFromString(stringmention, 'text/html');
			let mention = newDoc.getElementsByTagName("a")[0];

			this.refs.publicationText.replaceChild(mention, this.state.nodeToReplace);

			range = this.state.range;
			range.setStartAfter(mention);
		}

		let space = document.createTextNode(" ");
		range.insertNode(space);
		range.setStartAfter(space);

		let sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(range);

		this.setState({mention: false, nodeToReplace: null});

		this.props.dispatch(saveInputText(this.refs.publicationText.innerHTML));
	}

	addEmoji = (emoji) => {
		this.refs.publicationText.focus();

		let range = this.state.range;
		let element = createSpan(emoji.colons);
		range.insertNode(element);
		
		range.setStartAfter(element);
		range.collapse(true);
		
		let sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(range);

		if (window.getSelection().anchorNode.nodeName.toLowerCase() === "a")
			window.getSelection().anchorNode.outerHTML = window.getSelection().anchorNode.innerHTML;

		this.props.dispatch(saveInputText(this.refs.publicationText.innerHTML));
	}

	switchEmojiPanel = () => {
		this.setState({emojiPanel: !this.state.emojiPanel});
	}

	render() {
		return (
			<div>
				<div className="emoji-text-box" ref="publicationText" contentEditable={true} onKeyDown={this.getSelection} onClick={this.getSelection} onInput={this.onInput} />

				<div className="emoji-panel-container emoji-panel-container-top">		
					{this.state.emojiPanel ? 
						<div className="emojis-container">
							<i className="material-icons emoji" onClick={this.switchEmojiPanel}>sentiment_satisfied_alt</i>			
							<Picker onSelect={(emoji) => this.addEmoji(emoji)} emojiSize={20} set='emojione' title="Select Emoji" color="#000" /> 
						</div>
						:
						<div className="emojis-container">
							<i className="material-icons" onClick={this.switchEmojiPanel}>sentiment_satisfied_alt</i>
						</div>
					}
				</div>

				{this.props.foundUsers.map((user, index) => {
					return (
						<div key={index} onClick={() => this.createTag(user)}>
							<h3>{user.name}</h3>
							<h5>{user.username}</h5>
						</div>
					)
				})}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return state.searchTags;
}

export default connect(mapStateToProps)(contentEditableInput);