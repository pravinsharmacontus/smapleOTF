export const initStateCommon = {
    ssoResponseDetails: {},
    selectedValue : new Date().toLocaleString('default', { month: 'long' })
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
        default:
            return {
                ...state
            };
    }
};
