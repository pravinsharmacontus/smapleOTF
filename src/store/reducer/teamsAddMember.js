export const teamAddInitState = {
    userDtls: {},//individual user details
    addMember: true,
    editLoader: false,//onEdit click loader on
    memberPopupOpen: false, //side popup
};

export const teamsAddMember = (state = teamAddInitState, action = {}) => {
    switch (action.type) {
        case 'TEAM_ADD_INITIAL_STAGE': {
            return {
                ...state,
                ...teamAddInitState
            };
        }
        case 'TYPE_ADD_MEMBER': {
            return {
                ...state,
                addMember: action.addMember
            };
        }
        case 'MEMBER_POPUP_OPEN': {
            return {
                ...state,
                memberPopupOpen: action.memberPopupOpen
            };
        }
        case 'MEMBER_CUSTOMER_DETAILS': {
            return {
                ...state,
                userDtls: action.userDtls
            };
        }
        case 'EDIT_MEMBER_LOADER': {
            return {
                ...state,
                editLoader: action.editLoader
            };
        }
        default:
            return {
                ...state
            };
    }
};
