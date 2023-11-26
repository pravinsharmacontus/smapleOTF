import { serverNotRespond } from "../../helper/ApiToast";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { DO_GET_CUSTOMER_LIST, DO_GET_BROADCAST_COUNT_LIST } from "../actionTypes/customerType";
import { customerListRequest, broadcastCountListRequest } from "../../services/customerListServices";

function* doCustomerList(obj = {}) {
  console.log("doCustomerList", obj);
  try {
    const customerList = yield call(customerListRequest, obj);
    const { data = {} } = customerList || {};
    if (data.status === 200) {
      yield all([
        put({ type: "GET_CUSTOMER_LIST_REDUCER", customerListData: data }), //Result Store
      ]);
      yield all([
        put({ type: "DO_LOADING_PAGE", loading: false }),
    ]);//lodering on / off
    } else if (data.status >= 201 && data.status <= 400) {
      yield all([
        put({ type: "GET_CUSTOMER_LIST_REDUCER", customerListData: {} }), //Result Store
      ]);
      yield all([
        put({ type: "DO_LOADING_PAGE", loading: false }),
    ]);//lodering on / off
    } else {
      serverNotRespond();
      yield all([
        put({ type: "GET_CUSTOMER_LIST_REDUCER", customerListData: {} }), //Result Store
      ]);
      yield all([
        put({ type: "DO_LOADING_PAGE", loading: false }),
    ]);//lodering on / off
    }
  } catch (error) {
    serverNotRespond();
    yield all([
      put({ type: "DO_LOADING_PAGE", loading: false }),
  ]);//lodering on / off
  }
}
function* doBroadCastCountList(obj = {}) {
  console.log("doCustomerList1", obj);
  try {
    const analyticsResponses = yield call(broadcastCountListRequest, obj);
    const { data = {} } = analyticsResponses || {};
    if (data.status === 200) {
      yield all([
        put({ type: "GET_BROADCAST_COUNT_LIST_REDUCER", analyticsResponses: data }), //Result Store
      ]);
      yield all([
        put({ type: "DO_LOADING_PAGE", loading: false }),
    ]);//lodering on / off
    } else if (data.status >= 201 && data.status <= 400) {
      yield all([
        put({ type: "GET_BROADCAST_COUNT_LIST_REDUCER", analyticsResponses: {} }), //Result Store
      ]);
      yield all([
        put({ type: "DO_LOADING_PAGE", loading: false }),
    ]);//lodering on / off
    } else {
      serverNotRespond();
      yield all([
        put({ type: "GET_BROADCAST_COUNT_LIST_REDUCER", analyticsResponses: {} }), //Result Store
      ]);
      yield all([
        put({ type: "DO_LOADING_PAGE", loading: false }),
    ]);//lodering on / off
    }
  } catch (error) {
    serverNotRespond();
    yield all([
      put({ type: "DO_LOADING_PAGE", loading: false }),
  ]);//lodering on / off
  }
}

export default function* CustomerListSaga() {
  yield takeLatest(DO_GET_CUSTOMER_LIST, doCustomerList);
  yield takeLatest(DO_GET_BROADCAST_COUNT_LIST, doBroadCastCountList);
}
