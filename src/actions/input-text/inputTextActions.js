export function saveInputText(text) {
	return {type: 'SAVE_INPUT_TEXT', text};
}

export function clearInputText() {
	return {type: 'CLEAR_INPUT_TEXT'};
}