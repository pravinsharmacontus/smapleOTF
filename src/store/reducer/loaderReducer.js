export const initStateLoder = {
    isLoading: false,
    openThePopUp: null,
    cusDeleteLoad: false,
    isLoadingEdit: false,
    profileUpdateData: {},
    cusPageloading: false,
    dataRenderCusPage: false,
    profileUpdateLoader: false,
    profileUpdateStatus: false,
    paymentProcessLoader: false,
    serverNavigateConfig: false,
    getServerConfigDetailData: {},//server config data
    reloadCertificateDetails: null,
    profileUpdateStatusReload: false,//api reload purpose
    getServerConfigDetailLoader: false,//loader
    updateServerConfigDetailLoader: false,//loader
    updateServerConfigDetailReload: false,//reload
};

export const loderReducer = (state = initStateLoder, action = {}) => {

    switch (action.type) {
        case 'DO_LOADING_PAGE': {
            return {
                ...state,
                isLoading: action.loading,
            };
        }
        case 'ENABLE_BROADCAST': {
            return {
                ...state,
                isLoadingEdit: action.loading,
            };
        }
        case 'DO_LOADING_CUSTOMER_PAGE': {
            return {
                ...state,
                cusPageloading: action.cusPageloading,
            };
        }
        case 'DO_DELETE_ACTION_LOAD': {
            return {
                ...state,
                cusDeleteLoad: action.cusDeleteLoad,
            };
        }
        case 'INITAIL_RENDER_DATA': {
            return {
                ...state,
                dataRenderCusPage: action.dataRenderCusPage,
            };
        }
        case 'PROFILE_UPDATE_LOADER': {
            return {
                ...state,
                profileUpdateLoader: action.profileUpdateLoader,
            };
        }

        case 'PROFILE_UPDATE_RELOAD': {
            return {
                ...state,
                profileUpdateStatusReload: action.profileUpdateStatusReload,
            };
        }

        case 'PROFILE_UPDATE_DATA': {
            return {
                ...state,
                profileUpdateData: action.profileUpdateData,
            };
        }

        case 'PROFILE_UPDATE_DONE': {
            return {
                ...state,
                profileUpdateStatus: action.profileUpdateStatus,
            };
        }

        case 'SERVER_CONFIG_DATA_GET_LOADER': {
            return {
                ...state,
                getServerConfigDetailLoader: action.getServerConfigDetailLoader,
            };
        }

        case 'SERVER_CONFIG_DATA_GET_DATA': {
            return {
                ...state,
                getServerConfigDetailData: action.getServerConfigDetailData,
            };
        }

        case 'SERVER_CONFIG_PAGE_NAVIGATE': {
            return {
                ...state,
                serverNavigateConfig: action.serverNavigateConfig,
            };
        }

        case 'SERVER_CONFIG_DATA_UPDATE_LOADER': {
            return {
                ...state,
                updateServerConfigDetailLoader: action.updateServerConfigDetailLoader,
            };
        }

        case 'SERVER_CONFIG_DATA_UPDATE_RELOAD': {
            return {
                ...state,
                updateServerConfigDetailReload: action.updateServerConfigDetailReload,
            };
        }

        case 'IOS_CERTIFICATE_DELETE_RELOAD_GET': {//after delete get call trigger
            return {
                ...state,
                reloadCertificateDetails: action.reloadCertificateDetails,
            };
        }

        case 'PUT_THE_SUCCESS_CODE_POP_UP': {
            return {
                ...state,
                openThePopUp: action.openThePopUp,
            };
        }

        case 'IOS_CERTIFICATE_DELETE_LOADER': {//delete loader
            return {
                ...state,
                iosCertificateDeteleLoader: action.iosCertificateDeteleLoader,
            };
        }

        case 'PAYMENT_PROCESS_LOADER': {
            return {
                ...state,
                paymentProcessLoader: action.paymentProcessLoader,
            };
        }

        default:
            return {
                ...state
            };
    }
};
