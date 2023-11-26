import store from '..';
import { userDetailsLocal } from '../../helper/RoleConfig';
import * as customerTypes from '../actionTypes/customerTypes';
import { organisationMemberListAction } from './organisationAction';

export const dataFetch = (data = {}) => {
    return {
        type: customerTypes.DATA_FETCH,
        data,
    };
};

export const getCusList = (data = {}) => {
    return {
        type: customerTypes.CUSTOMER_GET_LIST,
        data,
    };
};

export const cusAdd = (data = {}) => {
    return {
        type: customerTypes.CUSTOMER_ADD,
        data,
    };
};

/**
 * @param  {Array} customerIds=[]
 * passed which user have been deteled that user ID
 */

export const deleteCus = (customerIds = []) => {
    return {
        type: customerTypes.CUSTOMER_DELETE,
        customerIds,
    };
};

export const updateCus = (data = {}) => {
    return {
        type: customerTypes.CUSTOMER_UPDATE,
        data,
    };
};

export const dataFetchFail = (data = {}) => {
    return {
        type: customerTypes.DATA_FETCH_FAIL,
        data,
    };
};

export const getCustDtls = (data = {}) => {
    return {
        type: customerTypes.GET_CUST_DETAILS,
        data,
    };
};

export const getCustDtlsNew = (data = {}) => {
    store.dispatch({ type: customerTypes.GET_CUST_DETAILS, data });
    store.dispatch(organisationMemberListAction());
};
export const getCancelSubscripionRequestList = (data = {}) => {
    return {
        type: customerTypes.GET_CANCEL_SUBSCRIPTION_REQUEST_LIST,
        data,
    };
};

export const getCustomerDetails = () => {
    const userDetails  = userDetailsLocal() || {};
    const { data: { userId = 0 } = {} } = userDetails || {};
    store.dispatch({ type: customerTypes.GET_CUST_DETAILS, data : { customerId : userId } });
};
