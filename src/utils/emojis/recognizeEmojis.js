import { Emoji } from 'emoji-mart';

/* Import Image */
import emptyImg from './../../images/emptyImg.png';

/* Import Utils */
import recognizeMentions from '../mentions/recognizeMentions';

export const recognizeEmojis = (text) => {
	let emojis = text.replace(/(https?:\/\/[^\s]+)/g, "").match(/:(.*?):/g);
	if (emojis) {
		var contentHTML = text.replace(emojis[0], createSpan(emojis[0]).outerHTML);

		if (emojis.length > 1) {
			for (let i = 1; i < emojis.length; i++) {
				var lastEmoji = createSpan(emojis[i - 1]).outerHTML;
				var indexReplaced = contentHTML.lastIndexOf(lastEmoji) + lastEmoji.length;
				var noReplaced = contentHTML.substring(indexReplaced);

				contentHTML = contentHTML.slice(0, indexReplaced);
				contentHTML = contentHTML + noReplaced.replace(emojis[i], createSpan(emojis[i]).outerHTML);
			}
		}
		return contentHTML;
			
	} else {
		return text;
	}
}

export const createSpan = (emoji) => {
	let emojiSelected = Emoji({html: true, set: 'emojione', emoji: emoji, size: 24});
	emojiSelected = emojiSelected.replace('span', 'img');

	let parser = new DOMParser();
	let newDoc = parser.parseFromString(emojiSelected, 'text/html');
	let element = newDoc.getElementsByTagName("img")[0];

	element.setAttribute("class", "emoji-inserted");
	element.setAttribute("src", emptyImg);
	element.setAttribute("data-plain-text", emoji);

	return element;
}

export const setRangeWithEmojisMentions = (text, ref) => {
	if (text) {
		ref.innerHTML = recognizeEmojis(recognizeMentions(text));

		let range = document.createRange();
		let sel = window.getSelection();
		let childs = ref.childNodes;

		range.setStartAfter(childs[childs.length - 1]);
		range.collapse(true);
		sel.removeAllRanges();
		sel.addRange(range);

		return window.getSelection().getRangeAt(0);
	} else {
		ref.focus();
		return window.getSelection().getRangeAt(0);
	}	
}