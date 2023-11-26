import { all, call, put, takeLatest } from "redux-saga/effects";
import { getSessionRequest } from "../../aws/awsHelper";
import {
  broadCastResponse,
  createSession,
  getMeetDataService,
  getPastDataService,
  getUpcomingDataService,
  stageResponse,
  updateSession,
} from "../../services/aswServices";
import * as awsTypes from "../actionTypes/awsTypes";
import { succToast, failToast } from "../../helper/ApiToast";
import {
  validateGetDataUnderscore,
  validateTitle,
  validateUnderscore,
} from "../../common/helper";
import { initializeFirebaseRealDb } from "../../firebase/firebaseHelper";
import { replaceSpacesWithNonbreakSpace } from "../../helper/Validation";
import { participantListRequest } from "../../services/participantServices";
import { addParticipantChat, createGroup, selectStream } from "../../helper/utility";

export function* createStage(payload) {
  const { data } = payload;
  const { title = "", displayName = "" } = data;
  console.log(data, "datadata");
  createGroup(title?.value);
  try {
    const stageState = yield call(stageResponse, data);
    console.log(stageState, "stageStatestageStatestageStatestageState");
    const groupJID = JSON.parse(localStorage.getItem("Group_Jid"))
      ? JSON.parse(localStorage.getItem("Group_Jid"))
      : "";
    const stageArnData = stageState?.data?.data?.stage?.arn;
    selectStream(stageArnData, data?.select, data?.selectedId, data?.broadcastId);
    if (stageState.data.status === 200) {
      const sessionRequest = yield call(getSessionRequest, {
        ...stageState?.data?.data,
        sessionName: validateTitle(title.value),
        displayName: displayName?.value,
        hostUserId: data?.host.userId,
        sessionJid: groupJID,
      });
      console.log(sessionRequest, "sessionRequestsessionRequestsessionRequest");
      const sessionResponse = yield call(createSession, sessionRequest);
      console.log(sessionResponse, "sessionResponsesessionResponse");
      succToast("Broadcast created successfully");
      if (sessionResponse?.data?.status === 200) {
        console.log(sessionResponse, "200000000000");
        const stageArn = { data: sessionRequest?.stageArn };
        const participantList = yield call(participantListRequest, stageArn);
        if (participantList?.status === 200) {
          addParticipantChat(
            participantList?.data?.data?.participantsList,
            title.value,
            groupJID
          );
        }
        yield all([
          put({ type: "CREATE_STAGE_LODING_REDUCER", loading: false }), //lodering on / off
          put({
            type: "CREATE_STAGE_REDUCER",
            StageData: {
              ...stageState?.data?.data,
              method: "create",
              sessionName: validateTitle(
                validateUnderscore(replaceSpacesWithNonbreakSpace(title.value))
              ),
              displayName: displayName?.value,
              hostUserId: data?.host.userId,
              sessionJid: groupJID,
            },
            stageStatus: true,
          }), //lodering on / off
        ]);
        if (data?.scheduledTime) {
          const meetDataInput = {
            userId: data?.host?.userId,
            orgId: data?.currentOrg?.organisationId,
            position: "Upcoming",
          };
          const meetTableData = yield call(getMeetDataService, meetDataInput);
          if (meetTableData.data.status === 200) {
            yield all([
              put({
                type: "GET_MEET_DATA_REDUCER",
                sessionData: validateGetDataUnderscore(
                  meetTableData?.data?.data?.sessionInfo
                ),
                sessionStatus: true,
              }), //lodering on / off
            ]);
            yield all([
              put({
                type: "GET_MEET_TOTALRECORD_DATA_REDUCER",
                sessionTotalRecordData: meetTableData?.data,
              }),
            ]);
          }
        }
        initializeFirebaseRealDb(sessionRequest, data);
      }
    } else {
      failToast(stageState.data.message);
    }
  } catch (error) {
    yield all([put({ type: "CREATE_STAGE_LODING_REDUCER", loading: false })]); //lodering on / off
  }
  // })
}

export function* getMeetData(payload) {
  const { data } = payload;
  try {
    const meetTableData = yield call(getMeetDataService, data);
    console.log(data, "meetTableDatameetTableData");
    if (meetTableData.data.status === 200) {
      yield all([
        put({
          type: "GET_MEET_DATA_REDUCER",
          sessionData: validateGetDataUnderscore(
            meetTableData?.data?.data?.sessionInfo
          ),
          sessionStatus: true,
        }), //lodering on / off
      ]);
      yield all([
        put({
          type: "GET_MEET_TOTALRECORD_DATA_REDUCER",
          sessionTotalRecordData: meetTableData?.data,
        }),
      ]);
      yield all([put({ type: "ENABLE_BROADCAST", loading: false })]); //lodering on / off
    } else {
      yield all([put({ type: "ENABLE_BROADCAST", loading: false })]); //lodering on / off
    }
  } catch (error) {
    yield all([put({ type: "ENABLE_BROADCAST", loading: false })]); //lodering on / off
  }
}
export function* getPastData(payload) {
  const { data } = payload;
  try {
    const meetTableData = yield call(getPastDataService, data);
    console.log(meetTableData, "meetTableDatameetTableData");
    if (meetTableData.data.status === 200) {
      yield all([
        put({
          type: "GET_MEETPAST_TOTALRECORD_DATA_REDUCER",
          sessionPastData: meetTableData?.data,
        }),
      ]);
      yield all([put({ type: "ENABLE_BROADCAST", loading: false })]);
    }
  } catch (error) {
    yield all([put({ type: "ENABLE_BROADCAST", loading: false })]);
  }
}
export function* getUpcomingData(payload) {
  const { data } = payload;
  try {
    const meetTableData = yield call(getUpcomingDataService, data);
    console.log(meetTableData, "meetTableDatameetTableData");
    if (meetTableData.data.status === 200) {
      yield all([
        put({
          type: "GET_MEETUPCOMING_TOTALRECORD_DATA_REDUCER",
          sessionUpcomingData: meetTableData?.data,
        }),
      ]);
      yield all([put({ type: "ENABLE_BROADCAST", loading: false })]);
    }
  } catch (error) {
    yield all([put({ type: "ENABLE_BROADCAST", loading: false })]);
  }
}

export function* getBroadcastData(payload) {
  const { data } = payload;
  try {
    const broadcastCredentials = yield call(broadCastResponse, data);
    console.log(
      data,
      broadcastCredentials,
      "broadcastCredentialsbroadcastCredentials"
    );
    if (broadcastCredentials.data.status === 200) {
      yield all([
        put({
          type: "GET_BROADCAST_DATA_REDUCER",
          broadcastCredentials: broadcastCredentials?.data?.data,
          broadcastCredentialsStatus: true,
        }), //lodering on / off
      ]);
      succToast("You are Live");
    } else {
      failToast(broadcastCredentials.data.message);
    }
  } catch (error) {}
}

export function* updateCallStatus(payload) {
  console.log("data@", payload);
  const { data } = payload;
  try {
    const broadcastCredentials = yield call(updateSession, data);
    if (broadcastCredentials.status === 200 && data.callStatus !== "on-live") {
      yield all([
        put({
          type: "UPDATE_CALL_STATUS_REDUCER",
          callStatus: data,
        }), //lodering on / off
      ]);
    }
  } catch (error) {}
}

export default function* rootAwsSaga() {
  yield takeLatest(awsTypes.CREATE_STAGE, createStage);
  yield takeLatest(awsTypes.GET_MEET_DATA, getMeetData);
  yield takeLatest(awsTypes.GET_PAST_DATA, getPastData);
  yield takeLatest(awsTypes.GET_UPCOMING_DATA, getUpcomingData);
  yield takeLatest(awsTypes.GET_BROADCAST_DATA, getBroadcastData);
  yield takeLatest(awsTypes.UPDATE_CALL_STATUS, updateCallStatus);
}
