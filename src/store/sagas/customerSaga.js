import store from "../../store";
import * as customerTypes from "../actionTypes/customerTypes";
import { put, call, takeLatest, all } from "redux-saga/effects";
import { failToast, succToast, serverNotRespond } from "../../helper/ApiToast";
import {
  plansType,
  addCustomerList,
  getCustomerList,
  deleteCustomerList,
  updateCustomerList,
  getCustomerDetails,
  getDeleteRequestCount,
  getCancelSubscripionRequestCount,
  getDeleteRequestList,
  getDeletedList,
  getDeleteFromRequest,
  getCancelSubscripionRequestList,
  getCancelledSubscripionList,
  approveCanceleSubscriptionRequest,
  getDeleteRequestStatus,
} from "../../services/customerServices";
import { getCusList as getCusLists } from "../action/customeAction";

function* getPlanType() {
  try {
    const planType = yield call(plansType);
    const { data: { status = 0, message = "", data = {} } = {} } =
      planType || {};
    if (status === 200) {
      const trailValueAdd = data.plansList.map((ele) => {
        if (ele.planName === "Trial") {
          return {
            ...ele,
            planAmount: 999,
          };
        }
        return ele;
      });
      yield all([
        put({ type: "PLAN_TYPES", planType: trailValueAdd }), //Get planType Api call and store
        put({ type: "CUS_PAGE_PLAN_TYPE_API", PlanTypeApiHit: false }), //Loader false
        put({ type: "CUS_PAGE_PLAN_TYPE_API_LOADER", planApiHitLoader: false }), //Loader false
      ]);
    } else {
      serverNotRespond(message); //serverIs Not Respont Call this Toast
      yield all([
        put({ type: "CUS_PAGE_PLAN_TYPE_API", PlanTypeApiHit: false }), //Loader false
        put({ type: "CUS_PAGE_PLAN_TYPE_API_LOADER", planApiHitLoader: false }),
      ]);
    }
  } catch (error) {
    serverNotRespond(); //serverIs Not Respont Call this Toast
    yield all([
      put({ type: "CUS_PAGE_PLAN_TYPE_API", PlanTypeApiHit: false }), //Loader false
      put({ type: "CUS_PAGE_PLAN_TYPE_API_LOADER", planApiHitLoader: false }),
    ]);
  }
}

const addcusFailToast = () => {
  store.dispatch({ type: "ADD_CUS_LOADER", addcusLoader: true }); //Loader Will Close/open
  store.dispatch({ type: "DO_LOADING", loading: false }); //add customer loader fail or pass loder will show
};

function* addCustomer(obj) {
  // Add New Customer Call
  try {
    const cusData = yield call(addCustomerList, obj);
    const { data: { status = 0, message = "" } = {} } = cusData || {};
    if (status === 200) {
      succToast(message);
      getCusLists();
      yield all([
        put({ type: "CUS_PAGE_API_LOAD", apiHit: true }), //referesh customer list
        put({ type: "CUSTOMER_PAGE_OPEN_CLOSE", cusPageOpen: false }), //customer added succeesfully opoup close
        put({ type: "DO_LOADING", loading: false }), //add customer loader fail or pass loder will show
      ]);
    } else if (status >= 201 && status <= 400) {
      failToast(message);
      addcusFailToast();
    } else {
      serverNotRespond(message); //serverIs Not Respont Call this Toast
      addcusFailToast();
    }
  } catch (error) {
    serverNotRespond(); //serverIs Not Respont Call this Toast
    addcusFailToast();
  }
}

const getCusErrorToast = () => {
  serverNotRespond(); //serverIs Not Respont Call this Toast
  store.dispatch({ type: "DO_LOADING_CUSTOMER_PAGE", cusPageloading: false }); //when reRender loder On
  store.dispatch({ type: "CUS_PAGE_API_LOAD", apiHit: false }); //GetCustomer List Loader
  store.dispatch({ type: "CUS_PAGE_SEARCH_LOAD", searchLoader: true });
  store.dispatch({ type: "DO_LOADING", loading: false }); //loader off
};

function* getCusList(obj = {}) {
  //Get full List History
  try {
    const getCusData = yield call(getCustomerList, obj);
    const { data } = getCusData || {};
    const { status = 0 } = data || {};
    if (status >= 200 && status <= 300) {
      getBadgeCounts();
      yield all([
        put({ type: "DO_LOADING_CUSTOMER_PAGE", cusPageloading: false }), //when reRender loder On
        put({ type: "CUSTOMER_LIST", cusList: data }), //GetCustomer List and store
        put({ type: "CUS_PAGE_API_LOAD", apiHit: false }), //GetCustomer List Loader
        put({ type: "CUS_PAGE_SEARCH_LOAD", searchLoader: true }),
        put({ type: "DO_LOADING", loading: false }), //loader off
      ]);
    } else {
      getCusErrorToast();
    }
  } catch (error) {
    getCusErrorToast();
  }
}

const deleteResponseAction = () => {
  store.dispatch({ type: "DO_LOADING", loading: false });
  store.dispatch({ type: "DO_DELETE_ACTION_LOAD", cusDeleteLoad: false });
};

function* deleteCustomer(array = {}) {
  //Delete Customer Call
  try {
    const delCusData = yield call(deleteCustomerList, array.customerIds);
    const { data: { status = 0, message = "" } = {} } = delCusData || {};
    if (status === 200) {
      succToast(message);
      yield all([
        put({ type: "INITAIL_RENDER_DATA", dataRenderCusPage: true }),
        put({ type: "DO_LOADING", loading: false }),
        put({ type: "CUS_PAGE_API_LOAD", apiHit: true }), //when reRender loder On
        put({ type: "DO_DELETE_ACTION_LOAD", cusDeleteLoad: false }),
      ]);
    } else {
      serverNotRespond(message); //serverIs Not Respont Call this Toast
      deleteResponseAction();
    }
  } catch (error) {
    serverNotRespond(); //serverIs Not Respont Call this Toast
    deleteResponseAction();
  }
}
function* updateCusList(obj) {
  //Edit or Update Call
  try {
    const updateCusData = yield call(updateCustomerList, obj);
    const { data: { status = 0, message = "" } = {} } = updateCusData || {};
    if (status === 200) {
      succToast(message);
      yield all([
        put({ type: "CUS_PAGE_API_LOAD", apiHit: true }), //Customer Page llist refresh
        put({ type: "ADD_CUS_LOADER", addcusLoader: true }), //Loader Will Close/open
        put({ type: "CUSTOMER_PAGE_OPEN_CLOSE_EDIT", cusPageEditOpen: false }), //Popp Will show/close
        put({ type: "DO_LOADING", loading: false }),
      ]);
      setTimeout(() => {
        window.location.reload();
      }, 750);
    } else if (status >= 201 && status <= 400) {
      failToast(message);
      yield all([
        put({ type: "ADD_CUS_LOADER", addcusLoader: true }), //Loader Will Close/open
      ]);
    } else {
      serverNotRespond(message); //serverIs Not Respont Call this Toast
      yield all([
        put({ type: "ADD_CUS_LOADER", addcusLoader: true }), //Loader Will Close/open
      ]);
    }
  } catch (error) {
    yield all([
      put({ type: "ADD_CUS_LOADER", addcusLoader: true }), //Loader Will Close/open
    ]);
  }
}
function* getCustomerDetailsSaga(obj) {
  //Singele Profile view
  try {
    const custDetails = yield call(getCustomerDetails, obj);
    const { data: { status = 0, data: { userDetails = {} } = {} } = {} } =
      custDetails || {};
    const { data:userData = {} } = obj || {};
    if (status === 200) {
      yield all([
        put({
          type: "CUSTOMER_DETAILS",
          customerDtls: { ...userDetails, userId: userData.customerId },
        }), //Result Store
        put({ type: "DO_LOADING_EDIT", loading: false }), //Loader open/close
      ]);
    } else {
      yield all([
        put({ type: "CUSTOMER_DETAILS", customerDtls: {} }), //Result Store
        put({ type: "DO_LOADING_EDIT", loading: false }), //Loader open/close
      ]);
    }
  } catch (error) {
    yield all([
      put({ type: "CUSTOMER_DETAILS", customerDtls: {} }), //Result Store
      put({ type: "DO_LOADING_EDIT", loading: false }), //Loader open/close
    ]);
  }
}

function* getDeleteRequestCountSaga() {
  try {
    const response = yield call(getDeleteRequestCount, {});
    const { data = {} } = response || {};
    const { status = 201, totalRecords = 0 } = data;

    if (status === 200) {
      yield all([
        put({
          type: "CUSTOMER_DELETE_REQUEST_COUNT",
          deleteRequestCount: totalRecords,
        }), //Result Store
        put({ type: "DO_LOADING_EDIT", loading: false }), //Loader open/close
      ]);
    } else {
      yield all([
        put({ type: "CUSTOMER_DELETE_REQUEST_COUNT", deleteRequestCount: 0 }), //Result Store
        put({ type: "DO_LOADING_EDIT", loading: false }), //Loader open/close
      ]);
    }
  } catch (error) {
    yield all([
      put({ type: "CUSTOMER_DELETE_REQUEST_COUNT", deleteRequestCount: 0 }), //Result Store
      put({ type: "DO_LOADING_EDIT", loading: false }), //Loader open/close
    ]);
  }
}

function* getdeleteRequestStatusSaga() {
  //Singele Profile view
  try {
    const response = yield call(getDeleteRequestStatus);
    const { data: { data = "", status = 0 } = {} } = response || {};
    if (status === 200) {
      yield all([
        put({
          type: "DELETE_REQUEST_STATUS",
          deleteRequestStatus: data === "1" ? true : false,
        }), //Result Store
      ]);
    } else {
      yield all([
        put({ type: "DELETE_REQUEST_STATUS", deleteRequestStatus: false }), //Result Store
      ]);
    }
  } catch (error) {
    yield all([
      put({ type: "DELETE_REQUEST_STATUS", deleteRequestCount: 0 }), //Result Store
      put({ type: "DO_LOADING_EDIT", loading: false }), //Loader open/close
    ]);
  }
}

function* getCancelSubscriptionRequestCountSaga() {
  try {
    const response = yield call(getCancelSubscripionRequestCount, {});
    const { data = {} } = response || {};
    const { status = 201, totalRecords = 0 } = data;

    if (status === 200) {
      yield all([
        put({
          type: "CANCEL_SUBSCRIPTION_REQUEST_COUNT",
          cancelSubscriptionCount: totalRecords,
        }), //Result Store
        put({ type: "DO_LOADING_EDIT", loading: false }), //Loader open/close
      ]);
    } else {
      yield all([
        put({
          type: "CANCEL_SUBSCRIPTION_REQUEST_COUNT",
          cancelSubscriptionCount: 0,
        }), //Result Store
        put({ type: "DO_LOADING_EDIT", loading: false }), //Loader open/close
      ]);
    }
  } catch (error) {
    yield all([
      put({
        type: "CANCEL_SUBSCRIPTION_REQUEST_COUNT",
        cancelSubscriptionCount: 0,
      }), //Result Store
      put({ type: "DO_LOADING_EDIT", loading: false }), //Loader open/close
    ]);
  }
}

function* getDeleteRequestListSaga(obj) {
  try {
    const response = yield call(getDeleteRequestList, obj);
    const {
      data: {
        data: { deleteAccountRequest = [] },
        status = 0,
        message = "",
        totalPages = 0,
        totalRecords = 0,
      },
    } = response || {};
    if (status === 200) {
      yield all([
        put({
          type: "CUSTOMER_DELETE_REQUEST_LIST",
          deleteReqestList: {
            requestList: deleteAccountRequest,
            totalPages,
            totalRecords,
          },
        }),
        put({ type: "DO_LOADING", loading: false }), //Loader open/close
      ]);
    } else {
      failToast(message);
      yield all([
        put({ type: "CUSTOMER_DELETE_REQUEST_LIST", deleteReqestList: {} }), //Result Store
        put({ type: "DO_LOADING", loading: false }), //Loader open/close
      ]);
    }
  } catch (error) {
    serverNotRespond();
    yield all([
      put({ type: "CUSTOMER_DELETE_REQUEST_LIST", deleteReqestList: {} }), //Result Store
      put({ type: "DO_LOADING", loading: false }), //Loader open/close
    ]);
  }
}

function* getDeletedListSaga(obj) {
  try {
    const response = yield call(getDeletedList, obj);
    const {
      data: {
        data: { deleteAccountList = [] },
        status = 0,
        message = "",
        totalPages = 0,
        totalRecords = 0,
      },
    } = response || {};
    if (status === 200) {
      yield all([
        put({
          type: "CUSTOMER_DELETED_LIST",
          deleteAccountList: {
            deletedList: deleteAccountList,
            totalPages,
            totalRecords,
          },
        }),
        put({ type: "DO_LOADING", loading: false }),
      ]);
    } else {
      failToast(message);
      yield all([
        put({ type: "CUSTOMER_DELETED_LIST", deleteAccountList: {} }),
        put({ type: "DO_LOADING", loading: false }),
      ]);
    }
  } catch (error) {
    serverNotRespond();
    yield all([
      put({ type: "CUSTOMER_DELETED_LIST", deleteAccountList: {} }),
      put({ type: "DO_LOADING", loading: false }),
    ]);
  }
}

function* getDeleteFromRequestSaga(obj) {
  try {
    const response = yield call(getDeleteFromRequest, obj);
    const { data = {} } = response || {};
    const { status = 0, message = "" } = data;

    if (status === 200) {
      deleteRequestList();
      succToast(message);
      yield all([
        put({ type: "DO_LOADING", loading: false }), //Loader open/close
      ]);
    } else {
      failToast(message);
      yield all([
        put({ type: "DO_LOADING", loading: true }), //Loader open/close
      ]);
    }
  } catch (error) {
    yield all([
      put({ type: "DO_LOADING", loading: false }), //Loader open/close
    ]);
  }
}

function* getCancelSubscriptionRequestListSaga(obj) {
  try {
    const response = yield call(getCancelSubscripionRequestList, obj);
    const {
      data: {
        data: { subscriptionCancelRequest = [] },
        status = 0,
        message = "",
        totalPages = 0,
        totalRecords = 0,
      },
    } = response || {};
    if (status === 200) {
      yield all([
        put({
          type: "CANCEL_SUBSCRIPTION_REQUEST_LIST",
          cancelSubscriptionRequestList: {
            requestList: subscriptionCancelRequest,
            totalPages,
            totalRecords,
          },
        }),
        put({ type: "DO_LOADING", loading: false }),
      ]);
    } else {
      failToast(message);
      yield all([
        put({
          type: "CANCEL_SUBSCRIPTION_REQUEST_LIST",
          cancelSubscriptionRequestList: {},
        }), //Result Store
        put({ type: "DO_LOADING", loading: false }), //Loader open/close
      ]);
    }
  } catch (error) {
    yield all([
      put({
        type: "CANCEL_SUBSCRIPTION_REQUEST_LIST",
        cancelSubscriptionRequestList: {},
      }), //Result Store
      put({ type: "DO_LOADING", loading: false }), //Loader open/close
    ]);
  }
}

function* getCancelledSubscriptionListSaga(obj) {
  try {
    const response = yield call(getCancelledSubscripionList, obj);
    const {
      data: {
        data: { subscriptionCancel = {} },
        status = 0,
        message = "",
        totalPages = 0,
        totalRecords = 0,
      },
    } = response || {};

    if (status === 200) {
      yield all([
        put({
          type: "CANCELLED_SUBSCRIPTION_LIST",
          cancelledSubscriptionList: {
            cancelledList: subscriptionCancel,
            totalPages,
            totalRecords,
          },
        }),
        put({ type: "DO_LOADING", loading: false }), //Loader open/close
      ]);
    } else {
      failToast(message);
      yield all([
        put({
          type: "CANCELLED_SUBSCRIPTION_LIST",
          cancelledSubscriptionList: {},
        }), //Result Store
        put({ type: "DO_LOADING", loading: false }), //Loader open/close
      ]);
    }
  } catch (error) {
    yield all([
      put({
        type: "CANCELLED_SUBSCRIPTION_LIST",
        cancelledSubscriptionList: {},
      }), //Result Store
      put({ type: "DO_LOADING", loading: false }), //Loader open/close
    ]);
  }
}

function* approveCanceleSubscriptionRequestSaga(obj) {
  try {
    const response = yield call(approveCanceleSubscriptionRequest, obj);
    const {
      data: { status = 0, message = "" },
    } = response || {};

    if (status === 200) {
      getCancelRequestList();
      succToast(message);
      yield all([
        put({ type: "DO_LOADING", loading: false }), //Loader open/close
      ]);
    } else {
      failToast(message);
      yield all([
        put({ type: "DO_LOADING", loading: false }), //Loader open/close
      ]);
    }
  } catch (error) {
    yield all([
      put({ type: "DO_LOADING", loading: false }), //Loader open/close
    ]);
  }
}
function* cancelSubscriptionPopupOpen(data = {}) {
  const { status = false } = data;
  yield put({
    type: "OPEN_CANCEL_SUBSCRIPTION_POPUP_IN_SETTINGS",
    openCancelSubscriptionPopup: status,
  });
}

export default function* customerSaga() {
  yield takeLatest(customerTypes.DATA_FETCH, getPlanType);
  yield takeLatest(customerTypes.CUSTOMER_ADD, addCustomer);
  yield takeLatest(customerTypes.CUSTOMER_GET_LIST, getCusList);
  yield takeLatest(customerTypes.CUSTOMER_UPDATE, updateCusList);
  yield takeLatest(customerTypes.CUSTOMER_DELETE, deleteCustomer);
  yield takeLatest(customerTypes.GET_CUST_DETAILS, getCustomerDetailsSaga);
  yield takeLatest(
    customerTypes.GET_CUSTOMER_DELETE_REQUEST_COUNT,
    getDeleteRequestCountSaga
  );
  yield takeLatest(
    customerTypes.GET_CANCEL_SUBSCRIPTION_REQUEST_COUNT,
    getCancelSubscriptionRequestCountSaga
  );
  yield takeLatest(
    customerTypes.GET_CUSTOMER_DELETE_REQUEST_LIST,
    getDeleteRequestListSaga
  );
  yield takeLatest(customerTypes.GET_CUSTOMER_DELETED_LIST, getDeletedListSaga);
  yield takeLatest(
    customerTypes.GET_CUSTOMER_DELETE_FROM_REQUEST,
    getDeleteFromRequestSaga
  );
  yield takeLatest(
    customerTypes.GET_CANCEL_SUBSCRIPTION_REQUEST_LIST,
    getCancelSubscriptionRequestListSaga
  );
  yield takeLatest(
    customerTypes.GET_CANCELLED_SUBSCRIPTION_LIST,
    getCancelledSubscriptionListSaga
  );
  yield takeLatest(
    customerTypes.APPROVE_CANCELE_SUBSCRIPTION_REQUEST,
    approveCanceleSubscriptionRequestSaga
  );
  yield takeLatest(
    customerTypes.GET_DELETE_REQUEST_STATUS,
    getdeleteRequestStatusSaga
  );
  yield takeLatest(
    customerTypes.OPEN_CANCEL_SUBSCRIPTION_POPUP,
    cancelSubscriptionPopupOpen
  );
}
