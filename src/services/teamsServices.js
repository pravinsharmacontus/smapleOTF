import { encodeGetParams } from "../helper/Encypt";
import { apiUrl, customerApi, inviteMember } from "../helper/ApiUrl";
import { Get, Post, Delete, Put } from "../common/httpRestServices";
/**
 * @param  {object} obj
 * add newTeam Mamber
 */
export const addTeamMember = (obj = {}) => {
    const { data: { payload, formData } = {} } = obj || {};
    const queryString = obj ? encodeGetParams(payload) : null;
    return Post(`${apiUrl}${customerApi.createCus}${queryString}`, formData, true);
};

/**
 * @param  {object} obj;
 * initial initial params and search params pass
 * encodeGetParams convert params to query params
 */
export const getMemberListData = (obj = {}) => {
    const { data = {} } = obj || {};
    const queryString = data ? encodeGetParams(data) : null;
    return Get(`${apiUrl}${customerApi.getCusList}${queryString}`, true);
};

/**
 * @param  {array} params;
 * array is index of array
 * it is user id
 */
export const deleteMemberList = (params) => {
    return Delete(`${apiUrl}${customerApi.deleteCus}`, { userIds: params }, true);
};

/**
 * @param  {object} obj;
 * view single user Details,
 * userId is endPoint
 */
export const getSingleUserDetails = (obj = "") => {
    const { data } = obj || {};
    return Get(`${apiUrl}${customerApi.getCustomerDetailUrl}userId=${data.customerId}`, true);
};

/**
 * @param  {object} obj;
 * initial initial params and search params pass
 * encodeGetParams convert params to query params
 */
export const getTeamsList = (data = {}) => {
    const newObj = {
        orgId : data?.organisationId || '',
        page  : data?.page || 1,
        searchName: data?.searchTerm || '',
        size  : data?.size || 10,
        sort  : 'desc'
    };
    const queryString = data ? encodeGetParams(newObj) : null;
    return Get(`${apiUrl}${inviteMember.inviteMemberListApi}${queryString}`, true);
};

/**
 * @param  {object} obj;
 * update userDetails,
 * encodeGetParams is Helps to convert query params,
 * inputData->image from input type
 * userInput->input filed
 */
export const updateUserDetail = (obj = {}) => {
    const { data: { formData = {}, payload = {} } = {} } = obj || {};
    const queryString = payload ? encodeGetParams(payload) : null;
    return Put(`${apiUrl}${customerApi.updateCus}${queryString}`, formData, true);
};
