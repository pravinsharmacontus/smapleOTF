export const teamInitState = {
    addMember: true,
    membersData: {},
    memberlistloader: false,
    memberSearchData: null,
    loaderRerender: false,
};

export const teamsReducer = (state = teamInitState, action = {}) => {
    switch (action.type) {
        //when page enter all reducer value clear
        case 'TEAM_INITIAL_STAGE': {
            return {
                ...state,
                ...teamInitState
            };
        }
        //all reasult data store here
        case 'GET_MEMBER_LIST_DATA': {
            return {
                ...state,
                membersData: action.MemberData
            };
        }
        case 'TEAM_MEMBER_RELOAD_LOADER': {
            return {
                ...state,
                loaderRerender: action.loading
            };
        }
        //initial load and search load
        case 'GET_MEMBER_LIST_DATA_LOAD': {
            return {
                ...state,
                memberlistloader: action.memberListLoad,
            };
        }
        // userSearch data will store otherwise null
        case 'SEARCH_MEMBER_DATA': {
            return {
                ...state,
                memberSearchData: action.memberSearch,
            };
        }
        default:
            return {
                ...state
            };
    }
};
