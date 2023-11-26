import * as ChangePasswordTypes from '../actionTypes/changePasswordTypes';

/**
 * @param {object} data={}
 *
 */
export const chngPwdAction = (data = {}) => {
    return {
        type: ChangePasswordTypes.CHANGE_PASSWORD_INITIAL,
        data,
    };
};
