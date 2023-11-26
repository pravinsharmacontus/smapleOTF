export const chngPwdInitial = {
    isLoading: false,
    isSucess:false
};

export const changPasswrdReducer = (state = chngPwdInitial, action = {}) => {

    if (action.type === 'CHANGE_PASSWORD_INITIAL') {
        return {
            ...chngPwdInitial,
            ...state,
        };
    }
    else if (action.type === 'CHANGE_PASSWORD_LOADER') {
        return {
            ...state,
            isLoading: true,
        };
    }
    else if (action.type === 'CHANGE_PASSWORD_SUCESS') {
        return {
            ...state,
            isSucess: action.isSucess,
            isLoading: false,
        };
    }
    return {
        ...state,
    };
};
