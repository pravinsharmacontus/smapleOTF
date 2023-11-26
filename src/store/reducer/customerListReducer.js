export const initalState = {
  customerList: [],
  totalPages: 0,
  totalRecords: 0,
};
export const customerListReducer = (state = initalState, action = {}) => {
  if (action.type === "GET_CUSTOMER_LIST_REDUCER") {
    return {
      customerList: action?.customerListData?.data?.analyticsResponses,
      totalPages: action?.customerListData?.totalPages,
      totalRecords: action?.customerListData?.totalRecords,
    };
  } else {
    return { ...state };
  }
};
export const broadcastCountListReducer = (state = initalState, action = {}) => {
  if (action.type === "GET_BROADCAST_COUNT_LIST_REDUCER") {
    return {
      analyticsResponses: action?.analyticsResponses?.data?.analyticsResponses,
      totalPages: action?.analyticsResponses?.totalPages,
      totalRecords: action?.analyticsResponses?.totalRecords,
    };
  } else {
    return { ...state };
  }
};
