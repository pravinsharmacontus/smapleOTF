import { encodeGetParams } from "../helper/Encypt";
import { apiUrl, customerApi, UpdateProfile } from "../helper/ApiUrl";
import { Get, Post, Delete, Put } from "../common/httpRestServices";

/**
 * Get Paln Type
 * second Params,Header Need or Not
 */
export const plansType = () => {
    return Get(`${apiUrl}${customerApi.PalnUrl}`, true);
};

/**
 * @param  {object} obj-Get Data from Add Customer Page
 * obj.data Filed Add New CUstomer Details
 * Third Params Mean Header Need or Not
 */
export const addCustomerList = (obj = {}) => {
    const { data: { inputData, userInput } } = obj || {};
    const queryString = userInput ? encodeGetParams(userInput) : null;
    return Post(`${apiUrl}${customerApi.createCus}${queryString}`, inputData, true);
};

/**
 * @param  {object} obj;
 * get cus list
 * data is params
 * encodeGetParams ->convert query params
 */
export const getCustomerList = (obj = {}) => {
    const { data = {} } = obj || {};
    const queryString = data ? encodeGetParams(data) : null;
    return Get(`${apiUrl}${customerApi.getCusList}${queryString}`, true);
};

/**
 * @param  {object} obj;
 * searched input Data
 * encodeGetParams->convert query params
 */
export const getCustomerearchList = (obj = {}) => {
    const { data } = obj || {};
    const queryString = data ? encodeGetParams(data) : null;
    return Get(`${apiUrl}${customerApi.getCusList}${queryString}`, true);
};

/**
 * @param  {array} params;
 * userId inside Params;
 * delete single or multiple same call
 */
export const deleteCustomerList = (params = []) => {
    return Delete(`${apiUrl}${customerApi.deleteCus}`, { userIds: params }, true);
};

/**
 * @param  {object} obj;
 * update userDetails,
 * encodeGetParams is Helps to convert query params,
 * inputData->image from input type
 * userInput->input filed
 */
export const updateCustomerList = (obj = {}) => {
    const { data: { inputData, userInput } } = obj || {};
    const queryString = userInput ? encodeGetParams(userInput) : null;
    return Put(`${apiUrl}${customerApi.updateCus}${queryString}`, inputData, true);
};

/**
 * @param  {object} obj;
 * view single user Details,
 * userId is endPoint
 */
export const getCustomerDetails = (obj = {}) => {
    const { data = {} } = obj || {};
    return Get(`${apiUrl}${customerApi.getCustomerDetailUrl}userId=${data.customerId}`, true);
};

/**
 *@para, {object} obj;
 *delete request count
 */
export const getDeleteRequestCount = () => {
    return Get(`${apiUrl}${customerApi.deleteRequestCount}`, true);
};

/**
 *Cancel subscription request count for padge
 */
export const getCancelSubscripionRequestCount = () => {
    return Get(`${apiUrl}${customerApi.cancelSubscriptionRequestCount}`, true);
};

/**
 *@para, {object} obj;
 *delete request list
 */

export const getDeleteRequestList = (obj = {}) => {
    const { data } = obj || {};
    const queryString = data ? encodeGetParams(data) : null;
    return Get(`${apiUrl}${customerApi.deleteReqestList}${queryString}`, true);
};

 /*Cancel subscription request list for table listing
 */

export const getCancelSubscripionRequestList = (obj = {} ) => {
    const { data } = obj || {};
    const queryString = data ? encodeGetParams(data) : null;
    return Get(`${apiUrl}${customerApi.cancelSubscriptionRequestList}${queryString}`, true);
};

/**
 *@para, {object} obj;
 *deleted list
 */

export const getDeletedList = (obj = {}) => {
    const { data } = obj || {};
    const queryString = data ? encodeGetParams(data) : null;
    return Get(`${apiUrl}${customerApi.deletedList}${queryString}`, true);
};

/*Cancel subscription request list for table listing
 */

export const getCancelledSubscripionList = (obj = {} ) => {
    const { data } = obj || {};
    const queryString = data ? encodeGetParams(data) : null;
    return Get(`${apiUrl}${customerApi.cancelledSubscriptiontList}${queryString}`, true);
};

/**
 *@para, {object} obj;
 *delete from request
 */
export const getDeleteFromRequest = (obj = {}) => {
    const { formData: { comment = '', userName = '', userId = 0 } } = obj || {};
    const data = { commentsForDeletion: comment, deletedBy: userName, userId };
    const queryString = data ? encodeGetParams(data) : null;
    return Delete(`${apiUrl}${customerApi.deleteFromRequest}${queryString}`, true);
};
    /*Approve Cancel subscription request*/

 export const approveCanceleSubscriptionRequest = (obj = {} ) => {
    const { formData : { comment = '', userName = '', userId = 0 } } = obj || {};
    const params = { cancellationComments : comment, cancelledBy : userName, userId };
    const queryString = params ? encodeGetParams(params) : null;
    return Put(`${apiUrl}${customerApi.approveCanceleSubscriptionRequest}${queryString}`, true);
};

/* @param  {object} obj;
 * delete request button status
 */
export const getDeleteRequestStatus = (obj = {}) => {
    return Get(`${apiUrl}${UpdateProfile.deleteRequestStatus}`, true);
};
