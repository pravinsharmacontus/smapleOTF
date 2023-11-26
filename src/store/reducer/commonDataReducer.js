export const initStateCommon = {
    ssoResponseDetails: {},
    selectedValue : new Date().toLocaleString('default', { month: 'long' }),
    editStreambutton:false
};

export const commonDataReducer = (state = initStateCommon, action = {}) => {
    switch (action.type) {
        case 'INITIAL_STAGE_COMMON_REDUCER': {
            return {
                ...state,
                ...initStateCommon
            };
        }

        case 'SSO_LOGIN_RESPONSE_DETAILS': {
            return {
                ...state,
                ssoResponseDetails: action.ssoResponseDetails,
            };
        }
        case 'ANALYTICS_FILTER_DROPDOWN_LABLE': {
            return {
                ...state,
                selectedValue: action.selectedValue,
            };
        }
        case 'EDIT_STREAM': {
            console.log("EDIT_STREAM action",action)
            return {
                ...state,
                editStreambutton:action.data
            };
        }
        case 'EDIT_POPUPSTREAM': {
            console.log("EDIT_POPUPSTREAM action",action)
            return {
                ...state,
                editStreamPopup:action.data
            };
        }
        case 'SHOW_YOUTUBE': {
            return {
                ...state,
                saveYoutubeHeader:action.data
            };
        }
        case 'ACCESS_TOKEN': {
            return {
                ...state,
                getAccessToken:action.data
            };
        }
        case 'START_YT_LOADER': {
            return {
                ...state,
                startYTLoader:action.data
            };
        }
        case 'END_YT_LOADER': {
            return {
                ...state,
                endYTLoader:action.data
            };
        }
        case 'EDIT_STREAM_SAVE': {
            return {
                ...state,
                editStreamSave:action.data
            };
        }
        case 'MF_GROUP_DETAILS': {
            return {
                ...state,
                mfGroupDetails:action.data
            };
        }
        case 'DELETE_SOCIAL_ACCOUNT': {
            return {
                ...state,
                deleteSocialAccount:action.data
            };
        }
        case 'RECONNECT_SOCIAL_ACCOUNT': {
            return {
                ...state,
                reconnectAccount:action.data
            };
        }
        case 'TIMER_POPUP': {
            return {
                ...state,
                timerPopup:action.data
            };
        }
        default:
            return {
                ...state
            };
    }
};
