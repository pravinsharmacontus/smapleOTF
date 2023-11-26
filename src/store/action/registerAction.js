import * as registerTypes from '../actionTypes/registerTypes';

export const doRegister = (data = {}) => {
    return {
        type: registerTypes.DO_REGISTER,
        data,
    };
};

export const doRegisterSuccess = (data = {}) => {
    return {
        type: registerTypes.DO_REGISTER_SUCCESS,
        data,
    };
};

export const doRegisterFail = (data = {}) => {
    return {
        type: registerTypes.DO_REGISTER_FAIL,
        data,
    };
};
