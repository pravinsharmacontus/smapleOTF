import * as forgetPassTypes from '../actionTypes/forgetPassTypes';

export const doForgetAction = (data = {}) => {
    return {
        type: forgetPassTypes.DO_FORGET_ACTION,
        data,
    };
};

export const doForgetSuccess = (data = {}) => {
    return {
        type: forgetPassTypes.DO_FORGET_SUCCESS,
        data,
    };
};

export const doForgetFail = (data = {}) => {
    return {
        type: forgetPassTypes.DO_FORGET_FAIL,
        data,
    };
};
