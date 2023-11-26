import { serverNotRespond } from "../../helper/ApiToast";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { videoRecordListRequest, videoTableListRequest } from "../../services/videoTableServices";
import { DO_GET_VIDEO_RECORD_LIST, DO_GET_VIDEO_TABLE_LIST } from "../actionTypes/videoTableType";

function* doVideoTableList(obj = {},searchdata = {}) {
  console.log(obj , "doVideoTableList");
  try {
    const videoTableList = yield call(videoTableListRequest, obj,searchdata);
    const { data = {} } = videoTableList || {};
    if (data.status === 200) {
      yield all([
        put({ type: "GET_VIDEO_TABLE_LIST", videoTableListData: data }), //Result Store
      ]);
      yield all([
        put({ type: "DO_LOADING_PAGE", loading: false }),
    ]);//lodering on / off
    } else if (data.status >= 201 && data.status <= 400) {
      yield all([
        put({ type: "GET_VIDEO_TABLE_LIST", videoTableListData: {} }), //Result Store
      ]);
      yield all([
        put({ type: "DO_LOADING_PAGE", loading: false }),
    ]);//lodering on / off
    } else {
      serverNotRespond();
      yield all([
        put({ type: "GET_VIDEO_TABLE_LIST", videoTableListData: {} }), //Result Store
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
function* doVideoRecordList(obj = {},searchdata = {}) {
  try {
    const videoRecordList = yield call(videoRecordListRequest, obj,searchdata);
    const { data = {} } = videoRecordList || {};
    console.log(videoRecordList , "videoRecordListvideoRecordList");
    if (data.status === 200) {
      yield all([
        put({ type: "GET_VIDEO_RECORD_LIST", videoRecordListData: data }), //Result Store
      ]);
      yield all([
        put({ type: "DO_LOADING_PAGE", loading: false }),
    ]);//lodering on / off
    } else if (data.status >= 201 && data.status <= 400) {
      yield all([
        put({ type: "GET_VIDEO_RECORD_LIST", videoRecordListData: [] }), //Result Store
      ]);
      yield all([
        put({ type: "DO_LOADING_PAGE", loading: false }),
    ]);//lodering on / off
    } else {
      serverNotRespond();
      yield all([
        put({ type: "GET_VIDEO_RECORD_LIST", videoRecordListData: [] }), //Result Store
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
export default function* videoTableListSaga() {
  yield takeLatest(DO_GET_VIDEO_TABLE_LIST, doVideoTableList);
  yield takeLatest(DO_GET_VIDEO_RECORD_LIST, doVideoRecordList);
}
