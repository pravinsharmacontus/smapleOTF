export const initStateCommon = {
    facebookPageDetails: {},
};

export const facebookDataReducer = (state = initStateCommon, action = {}) => {
    switch (action.type) {
        case 'FACEBOOK_PAGE_LIST': {
            return {
                ...state,
                facebookPageList: action.data
            };
        }
        case 'FACEBOOK_PAGE_CONNECTED': {
            return {
                ...state,
                facebookPageConnected: action.data
            };
        }
        case 'FACEBOOK_GROUP_LIST': {
            return {
                ...state,
                facebookGroupList: action.data
            };
        }
        case 'FACEBOOK_GROUP_CONNECTED': {
            return {
                ...state,
                facebookGroupConnected: action.data
            };
        }
        case 'FACEBOOK_PROFILE_LIST': {
            return {
                ...state,
                facebookProfileList: action.data
            };
        }
        case 'FACEBOOK_PROFILE_CONNECTED': {
            return {
                ...state,
                facebookProfileConnected: action.data
            };
        }
        default:
            return {
                ...state
        };
    }
};
