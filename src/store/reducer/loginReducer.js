export const initStatelogin = {
    users: {},
    logStatus: false,
    isLoading: false,
    registerLoad: false,
    registerPopUp: null,
};

export const loginReducer = (state = initStatelogin, action = {}) => {
    switch (action.type) {
        case 'DO_LOGIN': {
            return {
                ...state,
            };
        }
        case 'DO_LOADING_PAGE': {
            return {
                ...state,
                isLoading: action.loading,
            };
        }

        case 'REGISTER_USER_LOADER': {
            return {
                ...state,
                registerLoad: action.loading,
            };
        }

        case 'ENABLE_REGISTER_SUCCESS_POP_UP': {
            return {
                ...state,
                registerPopUp: action.registerPopUp,
            };
        }

        case 'DO_LOGOUT': {
            return {
                ...state,
                logStatus: action.loginStatusout
            };
        }
        case 'DO_LOGIN_FAIL': {
            return {
                ...state,
                logStatus: action.loginStatus
            };
        }
        case 'DO_LOGIN_SUCCES': {
            return {
                ...state,
                users: action.logingData,
                logStatus: action.loginStatus
            };
        }
        case 'DO_LOGIN_STATUS': {
            return {
                ...state,
                logStatus: action.loginStatusUpdate
            };
        }
        default:
            return {
                ...state
            };
    }
};
