export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export function showModal(modalType, modalData) {
	return {type: SHOW_MODAL, modalType: modalType, modalData: modalData};
}

export function hideModal() {
    return {type: HIDE_MODAL};
}