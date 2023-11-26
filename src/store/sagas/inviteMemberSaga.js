import { put, takeLatest, call, all } from "redux-saga/effects";
import { succToast, failToast, serverNotRespond } from "../../helper/ApiToast";
import {
  DO_INVITE_MEMBER,
  DO_INVITE_MEMBER_LIST_WITHOUT_SEARCH,
  DO_INVITE_MEMBER_List,
} from "../actionTypes/inviteMemberTypes";
import {
  InviteMemberWithoutSearchResquest,
  inviteMemberListResquest,
  inviteMemberReques,
} from "../../services/inviteMemberServices";
import { internetStatusDecrypt } from "../../helper/Encypt";

function* doinviteMember(obj = [], userDetails = {}) {
  try {
    const inviteMember = yield call(inviteMemberReques, obj, userDetails);
    const { data = {} } = inviteMember || {};
    if (data.status === 200) {
      if (!obj.teams) {
        yield all([
          put({
            type: "INVITE_MEMBER_LIST_DATA",
            inviteMemberData: {
              responseData: data?.data,
              inviteRequestData: obj?.data[0],
            },
          }), //Result Store
          put({ type: "DO_LOADING_LOGIN_PAGE", loading: false }), //Loader open/close
        ]);
      }
      succToast("Invite sent to the email id");
    } else if (data.status >= 201 && data.status <= 400) {
      failToast(data.message);
      yield all([
        put({ type: "INVITE_MEMBER_LIST_DATA", inviteMemberData: {} }), //Result Store
        put({ type: "DO_LOADING_LOGIN_PAGE", loading: false }), //Loader open/close
      ]);
    } else {
      serverNotRespond(data.message);
      yield all([
        put({ type: "INVITE_MEMBER_LIST_DATA", inviteMemberData: {} }), //Result Store
        put({ type: "DO_LOADING_LOGIN_PAGE", loading: false }), //lodering on / off
      ]);
    }
  } catch (error) {
    serverNotRespond();
    yield all([put({ type: "DO_LOADING_LOGIN_PAGE", loading: false })]);
  }
}
function* doInviteMemberList(obj = []) {
  try {
    yield put({ type: "DO_LOADING_PAGE", loading: true });

    const inviteMemberList = yield call(inviteMemberListResquest, obj);
    const { data = {} } = inviteMemberList || {};
    if (data.status === 200) {
      yield all([
        put({ type: "DO_INVITE_MEMBER_LIST", inviteMember: data }), //Result Store
        // put({ type: "DO_LOADING_LOGIN_PAGE", loading: false }), //Loader open/close
      ]);
      yield all([
        put({ type: "DO_LOADING_PAGE", loading: false }),
    ]);//lodering on / off
    } else if (data.status >= 201 && data.status <= 400) {
      yield all([
        put({ type: "DO_INVITE_MEMBER_LIST", inviteMember: {} }), //Result Store
        // put({ type: "DO_LOADING_LOGIN_PAGE", loading: false }), //Loader open/close
      ]);
      yield all([
        put({ type: "DO_LOADING_PAGE", loading: false }),
    ]);//lodering on / off
    } else {
      if(internetStatusDecrypt()){
        serverNotRespond();
      }
      yield all([
        put({ type: "DO_INVITE_MEMBER_LIST", inviteMember: {} }), //Result Store
        // put({ type: "DO_LOADING_LOGIN_PAGE", loading: false }), //lodering on / off
      ]);
      yield all([
        put({ type: "DO_LOADING_PAGE", loading: false }),
    ]);//lodering on / off
    }
  } catch (error) {
    if(internetStatusDecrypt()){
      serverNotRespond();
    }    yield all([
      put({ type: "DO_LOADING_PAGE", loading: false }),
  ]);//lodering on / off
  }
}
function* doInviteMemberWithoutSearch(obj = []) {
  try {
    const inviteMemberListwithoutSearch = yield call(InviteMemberWithoutSearchResquest, obj);
    const { data = {} } = inviteMemberListwithoutSearch || {};
    if (data.status === 200) {
      yield all([
        put({ type: "DO_GET_ALL_INVITE_MEMBER_LIST", allInvitedList: data }), //Result Store
        put({ type: "DO_LOADING_LOGIN_PAGE", loading: false }), //Loader open/close
      ]);
    } else if (data.status >= 201 && data.status <= 400) {
      yield all([
        put({ type: "DO_GET_ALL_INVITE_MEMBER_LIST", allInvitedList: {} }), //Result Store
        put({ type: "DO_LOADING_LOGIN_PAGE", loading: false }), //Loader open/close
      ]);
    } else {
      if(internetStatusDecrypt()){
        serverNotRespond();
      }
      yield all([
        put({ type: "DO_GET_ALL_INVITE_MEMBER_LIST", allInvitedList: {} }), //Result Store
        put({ type: "DO_LOADING_LOGIN_PAGE", loading: false }), //lodering on / off
      ]);
    }
  } catch (error) {
    if(internetStatusDecrypt()){
      serverNotRespond();
    }    yield all([put({ type: "DO_LOADING_LOGIN_PAGE", loading: false })]);
  }
}

export default function* inviteMemberSaga() {
  yield takeLatest(DO_INVITE_MEMBER, doinviteMember);
  yield takeLatest(DO_INVITE_MEMBER_List, doInviteMemberList);
  yield takeLatest(DO_INVITE_MEMBER_LIST_WITHOUT_SEARCH,doInviteMemberWithoutSearch);
}
