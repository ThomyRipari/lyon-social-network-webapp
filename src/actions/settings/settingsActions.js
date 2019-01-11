export const CHANGE_SETTING = 'CHANGE_SETTING';

export function settingsChange(settingsType, settingsData) {
	return {type: CHANGE_SETTING, settingsType, settingsData};
}