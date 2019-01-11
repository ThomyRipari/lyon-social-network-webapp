const initialState = {
    settingsType: null,
    settingsData: null
}
export default ((state = initialState, action) => {
    switch(action.type) {
        case 'CHANGE_SETTING':
            return {settingsType: action.settingsType, settingsData: action.settingsData};

        default:
            return state;
    }
})