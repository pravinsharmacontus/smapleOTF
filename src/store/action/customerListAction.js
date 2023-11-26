import { DO_GET_CUSTOMER_LIST, DO_GET_BROADCAST_COUNT_LIST } from "../actionTypes/customerType";

export const getCustomerListAction = (data = {}) => {
  return {
    type: DO_GET_CUSTOMER_LIST,
    data,
  };
};
export const getBroadcastCountAction = (data = {}) => {
  return {
    type: DO_GET_BROADCAST_COUNT_LIST,
    data,
  };
};
export const getBroadcastCountActionList = (data1 = {}) => {
  return {
    type: DO_GET_BROADCAST_COUNT_LIST,
    data1,
  };
};
