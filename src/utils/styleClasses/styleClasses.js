module.exports = {
	//Register Form
	inputNameError: (inputName, textName) => {
		inputName.classList.add('input-error');
		textName.classList.add('text-error');     
		inputName.classList.remove('input-valid');
		textName.classList.remove('text-valid');  
	},
	inputNameValid: (inputName, textName) => {
		inputName.classList.remove('input-error');
		textName.classList.remove('text-error');    
		inputName.classList.add('input-valid');
		textName.classList.add('text-valid');  
	},
	inputEmailError: (inputEmail, textEmail) => {
		inputEmail.classList.add('input-error');
		textEmail.classList.add('text-error');   
		inputEmail.classList.remove('input-valid');
		textEmail.classList.remove('text-valid'); 
	},
	inputEmailValid: (inputEmail, textEmail) => {
		inputEmail.classList.remove('input-error');
		textEmail.classList.remove('text-error');     
		inputEmail.classList.add('input-valid');
		textEmail.classList.add('text-valid'); 
	},
	inputPasswordError: (inputPassword, textPassword) => {
		inputPassword.classList.add('input-error');
		textPassword.classList.add('text-error');   
		inputPassword.classList.remove('input-valid');
		textPassword.classList.remove('text-valid'); 
	},
	inputPasswordValid: (inputPassword, textPassword) => {
		inputPassword.classList.remove('input-error');
		textPassword.classList.remove('text-error');     
		inputPassword.classList.add('input-valid');
		textPassword.classList.add('text-valid'); 
	},
	inputConfirmPasswordError: (inputConfirmPassword, textConfirmPassword) => {
		inputConfirmPassword.classList.add('input-error');
		textConfirmPassword.classList.add('text-error');     
		inputConfirmPassword.classList.remove('input-valid');
		textConfirmPassword.classList.remove('text-valid'); 
	},
	inputConfirmPasswordValid: (inputConfirmPassword, textConfirmPassword) => {
		inputConfirmPassword.classList.remove('input-error');
		textConfirmPassword.classList.remove('text-error');     
		inputConfirmPassword.classList.add('input-valid');
		textConfirmPassword.classList.add('text-valid'); 
	},
	inputCookiesError: (textCookies) => {
		textCookies.classList.add('text-error');   
		textCookies.classList.remove('text-valid'); 
	},
	inputCookiesValid: (textCookies) => {
		textCookies.classList.remove('text-error');     
		textCookies.classList.add('text-valid'); 
	},
	// Navbar
	navInputTranslate: (navSearch, navIcons) => {
		navSearch.classList.add('translate-0');
		navIcons.classList.add('icons-padding-scrollbar');
		document.body.classList.add('scrollbar-hidden-nav');
	},
    navInputBackTranslate: (navSearch, navIcons) => {
        navSearch.classList.remove('translate-0');
        navIcons.classList.remove('icons-padding-scrollbar');
        document.body.classList.remove('scrollbar-hidden-nav');
	},
	// Dropdown
    onClickDialog: (dropdown, dialog, display) =>  {	
		dropdown.classList.remove(`dropdown-show-${display}`);   
        dialog.classList.remove(`dropdown-dialog-show`);
    },
    onClickDropdownButton: (dropdown, dialog, display) => {
		dropdown.classList.toggle(`dropdown-show-${display}`);
		dialog.classList.toggle(`dropdown-dialog-show`);
	},
	// Modal
	hasScroll: () => {
		let hasScroll = document.body.scrollHeight > document.body.clientHeight;
		let rootStyles = document.querySelector("html").style;
		(hasScroll) ? rootStyles.setProperty('--scrollbar-width-hidden', `6px`) 
					: rootStyles.setProperty('--scrollbar-width-hidden', `0px`);
	},
	onOpenModal: () => {
		let hasScroll = document.body.scrollHeight > document.body.clientHeight;
		let rootStyles = document.querySelector("html").style;
		(hasScroll) ? rootStyles.setProperty('--scrollbar-width-hidden', `6px`) 
					: rootStyles.setProperty('--scrollbar-width-hidden', `0px`);
		document.body.classList.add('scrollbar-hidden');
		return true;
	},
	onHidenModal: () => {
		let rootStyles = document.querySelector("html").style;
		rootStyles.setProperty('--scrollbar-width-hidden', `0px`);
		document.body.classList.remove('scrollbar-hidden');
		document.body.classList.remove('scrollbar-none') 
	},
	centerElement: (elementToCenter, margins, comparator, less = 0) => {
		const centerElementFunction = () => {
			let height = comparator.scrollHeight - less;
			let heightLess = height - 15;
			let condition = elementToCenter.offsetHeight > heightLess;

			if (condition) {
				elementToCenter.style.marginTop = margins;
				elementToCenter.style.marginBottom = margins;
				elementToCenter.style.alignSelf = 'start';
			} else {
				elementToCenter.style.alignSelf = 'center';
				elementToCenter.style.marginTop = 0;
				elementToCenter.style.marginBottom = 0;
			}
		}
		centerElementFunction();
		window.addEventListener('resize', () => centerElementFunction());
	}
}

