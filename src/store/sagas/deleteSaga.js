import { serverNotRespond, succToast } from "../../helper/ApiToast";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { DELETE_STAGE_ACTION, GET_DELETE_STAGE_ACTION, REMOVE_PARTICIPANT_ACTION } from "../actionTypes/deleteType";
import { deleteParticipantRequest, deleteStageRequest, getDeleteStageService } from "../../services/deleteServices";
import { getParticipantApi } from "../../common/helper";
import store from "..";
import { awsGetMeetingData } from "../action/awsActions";

function* doRemoveParticipant(obj = {}) {
  try {
    const deletedUser = yield call(deleteParticipantRequest, obj);
    const { data = {} } = deletedUser || {};
    if (data.status === 200) {
      yield all([
        put({ type: "DO_LOADING_PAGE", loading: false }),
    ]);//lodering on / off
    yield getParticipantApi(obj);
      succToast("Participant was removed"); //
    } else if (data.status >= 201 && data.status <= 400) {
      yield all([
        put({ type: "DELETE_STAGE_REDUCER", deleteStage: {} }), //Result Store
      ]);
      yield all([
        put({ type: "DO_LOADING_PAGE", loading: false }),
    ]);//lodering on / off
    } else {
      serverNotRespond();
      yield all([
        put({ type: "DELETE_STAGE_REDUCER", deleteStage: {} }), //Result Store
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
function* doDeleteStage(obj = []) {
  console.log("doCustomerList", obj.tabType);
  try {
    const customerList = yield call(deleteStageRequest, obj);
    const { data = {} } = customerList || {};
    if (data.status === 200) {
      if(obj.tabType.position === "Upcoming"){
        yield all([
          put({ type: "REMOVE_UPCOMING_PAGE_COUNT", deleteStage: obj.data }), //Result Store
        ]);
      }else{
        yield all([
          put({ type: "REMOVE_PAST_PAGE_COUNT", deleteStage: obj.data }), //Result Store
        ]);
      }
      yield all([
        put({ type: "DO_LOADING_PAGE", loading: false }),
    ]);//lodering on / off
    yield all([
      put({ type: "DELETE_MEET_DATA", deleteMeetData: obj }),
  ]);//lod
  store.dispatch(awsGetMeetingData(obj?.tabType));

      succToast("Broadcast deleted successfully"); //
    } else if (data.status >= 201 && data.status <= 400) {
      yield all([
        put({ type: "DELETE_STAGE_REDUCER", deleteStage: data }), //Result Store
      ]);
      yield all([
        put({ type: "DO_LOADING_PAGE", loading: false }),
    ]);//lodering on / off
    } else {
      serverNotRespond();
      yield all([
        put({ type: "DELETE_STAGE_REDUCER", deleteStage: {} }), //Result Store
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
function* doGetDeleteStage(obj = []) {
  console.log("doCustomerList", obj);
  try {
    const getDeletestatus = yield call(getDeleteStageService, obj);
    const { data = {} } = getDeletestatus || {};
    if (data.status === 200) {
      yield all([
        put({ type: "GET_DELETE_STAGE_REDUCER", getDeleteStatus: data.message }), //Result Store
      ]);
      yield all([
        put({ type: "REGISTER_USER_LOADER", loading: false }),
    ]);//lod
    } else if (data.status >= 201 && data.status <= 400) {
      yield all([
        put({ type: "GET_DELETE_STAGE_REDUCER", getDeleteStatus: {} }), //Result Store
      ]);
      yield all([
        put({ type: "REGISTER_USER_LOADER", loading: false }),
    ]);//lod
    } else {
      serverNotRespond();
      yield all([
        put({ type: "GET_DELETE_STAGE_REDUCER", getDeleteStatus: {} }), //Result Store
      ]);
      yield all([
        put({ type: "REGISTER_USER_LOADER", loading: false }),
    ]);//lod
    }
  } catch (error) {
    serverNotRespond();
    yield all([put({ type: "GET_DELETE_STAGE_REDUCER", loading: false })]);
  }
}
export default function* DeleteListSaga() {
  yield takeLatest(DELETE_STAGE_ACTION, doDeleteStage);
  yield takeLatest(REMOVE_PARTICIPANT_ACTION, doRemoveParticipant);
  yield takeLatest(GET_DELETE_STAGE_ACTION,doGetDeleteStage);
}
