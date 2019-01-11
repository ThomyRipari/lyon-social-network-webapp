export default ((content) => {
	let mentions = content.match(/@\w*/g);
	if (mentions) {
		let contentWithMentions = content.replace(mentions[0], buildLink(mentions[0]));

		if (mentions.length > 1) {
			for (let i = 1; i < mentions.length; i++) {
				let lastLink = buildLink(mentions[i - 1]);
				let indexReplaced = contentWithMentions.lastIndexOf(lastLink) + lastLink.length;
				let noReplaced = contentWithMentions.substring(indexReplaced);

				contentWithMentions = contentWithMentions.slice(0, indexReplaced);
				contentWithMentions = contentWithMentions + noReplaced.replace(mentions[i], buildLink(mentions[i]));
			}
		}
		return contentWithMentions;
	} else 
		return content;
})

const buildLink = (mention) => {
	return `<a href="#" class="user-mention">${mention}</a>`;
}