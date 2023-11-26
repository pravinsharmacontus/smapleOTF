import { serverNotRespond } from "../../helper/ApiToast";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { DO_GET_PARTICIPANT_LIST } from "../actionTypes/participantType";
import { participantListRequest } from "../../services/participantServices";
import { updateSessionMember } from "../../firebase/firebaseRealtimeFunctions";
import { getCurrentOrgId, addParticipantChat } from "../../helper/utility";

function* doParticipantList(stagedata = "") {
  console.log("doParticipantList", stagedata);
  try {
    const ParticipantList = yield call(participantListRequest, stagedata);
    if(ParticipantList?.status === 200) {
      addParticipantChat(ParticipantList?.data?.data?.participantsList, "", "");
    }
    const { data = {} } = ParticipantList || {};
    if (data.status === 200) {
      yield all([
        put({ type: "GET_PARTICIPANT_LIST", participantListData: data }), //Result Store
        put({ type: "DO_LOADING_LOGIN_PAGE", loading: false }), //Loader open/close
      ]);
      updateSessionMember(
        getCurrentOrgId(),
        data?.data?.participantsList?.length
      );
    } else if (data.status >= 201 && data.status <= 400) {
      yield all([
        put({ type: "GET_PARTICIPANT_LIST", participantListData: {} }), //Result Store
        put({ type: "DO_LOADING_LOGIN_PAGE", loading: false }), //Loader open/close
      ]);
    } else {
      serverNotRespond(data.message);
      yield all([
        put({ type: "GET_PARTICIPANT_LIST", participantListData: {} }), //Result Store
        put({ type: "DO_LOADING_LOGIN_PAGE", loading: false }), //lodering on / off
      ]);
    }
  } catch (error) {
    serverNotRespond();
    yield all([put({ type: "DO_LOADING_LOGIN_PAGE", loading: false })]);
  }
}
export default function* participantListSaga() {
  yield takeLatest(DO_GET_PARTICIPANT_LIST, doParticipantList);
}
