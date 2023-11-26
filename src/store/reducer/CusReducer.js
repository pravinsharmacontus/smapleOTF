export const initState = {
    planType: [],
    apiLoad: false,
    searchHit: true,
    isLoading: false,
    customerList: {},
    customerDtls: {},
    searchData: null,
    resetOption: true,
    searchLoader: true,
    addcusLoader: true,
    loginUserDetails: {},//login user details
    PlanTypeApiHit: true,
    addCustomerData: null,
    AddCusPageOpen: false,
    EditCusPageOpen: false,
    planApiHitLoader: false,
    deleteRequestCount: 0,
    cancelSubscriptionCount: 0,
    deleteReqestList: [],
    deleteAccountList: [],
    cancelSubscriptionRequestList: [],
    cancelledSubscriptionList: [],
    deleteRequestStatus: false,
    subscriptionCancelStatusDetails: {},
    openCancelSubscriptionPopup : false
};

export const CusReducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'INITIAL_STAGE': {
            return {
                ...state,
                ...initState
            };
        }
        case 'DO_LOADING': {
            return {
                ...state,
                isLoading: action.loading,
            };
        }
        case 'CUS_PAGE_API_LOAD': {
            return {
                ...state,
                apiLoad: action.apiHit
            };
        }
        case 'CUS_PAGE_SEARCH': {
            return {
                ...state,
                searchHit: action.cusSearchHit
            };
        }
        case 'CUS_PAGE_SEARCH_LOAD': {
            return {
                ...state,
                searchLoader: action.searchLoader
            };
        }
        case 'CUS_PAGE_PLAN_TYPE_API': {
            return {
                ...state,
                PlanTypeApiHit: action.PlanTypeApiHit
            };
        }
        case 'SEARCH_DATA': {
            return {
                ...state,
                searchData: action.searchData
            };
        }
        case 'ADD_CUS_LOADER': {
            return {
                ...state,
                addcusLoader: action.addcusLoader
            };
        }
        case 'PLAN_TYPES': {
            return {
                ...state,
                planType: action.planType
            };
        }
        case 'CUSTOMER_LIST': {
            return {
                ...state,
                customerList: action.cusList
            };
        }
        case 'CUSTOMER_DETAILS': {
            return {
                ...state,
                customerDtls: action.customerDtls
            };
        }

        case 'LOGING_USER_DETAILS': {
            return {
                ...state,
                loginUserDetails: action.loginUserDetails
            };
        }

        case 'CUSTOMER_PAGE_OPEN_CLOSE': {
            return {
                ...state,
                AddCusPageOpen: action.cusPageOpen
            };
        }
        case 'CUSTOMER_PAGE_OPEN_CLOSE_EDIT': {
            return {
                ...state,
                EditCusPageOpen: action.cusPageEditOpen
            };
        }
        case 'ADD_CUSTOMER_DATA': {
            return {
                ...state,
                addCustomerData: action.addCustomData,
            };
        }
        case 'RESET_OPTION_ENABLE': {
            return {
                ...state,
                resetOption: action.resetOption,
            };
        }
        case 'CUS_PAGE_PLAN_TYPE_API_LOADER': {
            return {
                ...state,
                planApiHitLoader: action.planApiHitLoader,
            };
        }
        case 'CUSTOMER_DELETE_REQUEST_COUNT': {
            return {
                ...state,
                deleteRequestCount: action.deleteRequestCount,
            };
        }
        case 'CANCEL_SUBSCRIPTION_REQUEST_COUNT': {
            return {
                ...state,
                cancelSubscriptionCount: action.cancelSubscriptionCount,
            };
        }
        case 'CUSTOMER_DELETE_REQUEST_LIST': {
            return {
                ...state,
                deleteReqestList: action.deleteReqestList,
            };
        }
        case 'CUSTOMER_DELETED_LIST': {
            return {
                ...state,
                deleteAccountList: action.deleteAccountList,
            };
        }
        case 'CANCEL_SUBSCRIPTION_REQUEST_LIST': {
            return {
                ...state,
                cancelSubscriptionRequestList: action.cancelSubscriptionRequestList,
            };
        }
        case 'CANCELLED_SUBSCRIPTION_LIST': {
            return {
                ...state,
                cancelledSubscriptionList: action.cancelledSubscriptionList,
            };
        }
        case 'DELETE_REQUEST_STATUS': {
            return {
                ...state,
                deleteRequestStatus: action.deleteRequestStatus,
            };
        }
        case 'CANCEL_SUBSCRIPTION_STATUS': {
            return {
                ...state,
                subscriptionCancelStatusDetails: action.subscriptionCancelStatusDetails,
            };
        }
        case 'OPEN_CANCEL_SUBSCRIPTION_POPUP_IN_SETTINGS': {
            return {
                ...state,
                openCancelSubscriptionPopup: action.openCancelSubscriptionPopup,
            };
        }
        default:
            return {
                ...state
            };
    }
};
