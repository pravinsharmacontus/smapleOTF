import * as teamsTypes from '../actionTypes/teamsTypes';

/**
 * @param  {object} data;
 * Add member details has been passed
 */
export const addMember = (data = {}) => {
    return {
        type: teamsTypes.TYPE_ADD_MEMBER,
        data,
    };
};

/**
 * @param  {object} data;
 * Edit member details has been passed
 */
export const updateMember = (data = {}) => {
    return {
        type: teamsTypes.UPDATE_MEMBER_DETAILS,
        data,
    };
};

/**
 * @param  {object} data;
 * initail params and search params
 * Both are manage same action
 */
export const getMemberData = (data = {}) => {
    return {
        type: teamsTypes.GET_MEMBER_LIST,
        data,
    };
};

/**
 * @param  {array} customerIds
 * selected userId
 */
export const deleteMember = (data) => {
    return {
        type: teamsTypes.MEMBER_DELETE,
        data,
    };
};

/**
 * @param  {object} data
 * Get User overAll details
 */
export const getUsertDetails = (data = {}) => {
    return {
        type: teamsTypes.GET_MEMBER_DETAILS,
        data,
    };
};
