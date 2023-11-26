import * as ResetPassPassTypes from '../actionTypes/ResetPassPassTypes';

export const doResetPassAction = (data = {}) => {
    return {
        type: ResetPassPassTypes.DO_RESETPASS_ACTION,
        data,
    };
};

export const doCreatePassword = (data = {}) => {
    return {
        type: ResetPassPassTypes.DO_CREATE_PASSWORD,
        data,
    };
};

export const doResetPassSuccess = (data = {}) => {
    return {
        type: ResetPassPassTypes.DO_RESETPASS_SUCCESS,
        data,
    };
};

export const doResetPassFail = (data = {}) => {
    return {
        type: ResetPassPassTypes.DO_RESETPASS_FAIL,
        data,
    };
};
