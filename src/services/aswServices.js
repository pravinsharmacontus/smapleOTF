import {
  constructInvites,
  removeUnderscoreFromPrefix,
  validateBothUnderscoreAndSpace,
  validateTitle,
} from "../common/helper";
import { Post, Get, Put, Delete } from "../common/httpRestServices";
import {
  apiUrl,
  loginApi,
  // registerApiUrl,
  awsStageAPI,
  customerApi,
} from "../helper/ApiUrl";
import { checkWhiteSpaces } from "../helper/Validation";
import store from "../store";
import { getParticipantListAction } from "../store/action/participantAction";

export const fetchLogin = (obj = {}) => {
  const { data: { email = "", password = "", ssoType = "" } = {} } = obj;
  const logValue = {
    email: email,
    ssoType: ssoType,
    password: password,
  };
  return Post(`${apiUrl}${loginApi.logIn}`, logValue, true);
};

export const stageResponse = (stageData = {}) => {
  const {
    // displayName = "",
    membersdata = [],
    currentOrg = {},
    title = {},
    scheduledTime = null,
    hostScheduledTime = "",
    scheduledTimeZone = "",
  } = stageData;
  const validTitle = validateTitle(title.value);
  const validate = () => {
    const regData = membersdata.filter((ele) => ele.userId);
    if (membersdata.length > 0 && regData.length > 0) {
      return regData.map((ele) => JSON.stringify(ele.userId));
    } else {
      return "";
    }
  };
  const validateInvitedMails = () => {
    const unRegData = membersdata.filter(
      (ele) => !ele.userId || ele.emailVerified === 0
    );
    if (membersdata.length > 0 && unRegData.length > 0) {
      return unRegData.map((ele) => ele?.emailId);
    } else {
      return "";
    }
  };
  console.log(stageData, "validateInvitedMails");
  if (scheduledTime && hostScheduledTime) {
    return Post(
      `${apiUrl}${awsStageAPI.createStage
      }?invitedMailIds=${validateInvitedMails()}&orgId=${currentOrg.organisationId
      }&participantUserIds=${validate()}&stageName=${validTitle}&userRoleId=${currentOrg.invitedUserRoleId || currentOrg.userRoleId
      }&scheduledTime=${scheduledTime}&hostScheduledTime=${hostScheduledTime}&timeZone=${scheduledTimeZone}`,
      {},
      true
    );
  } else {
    return Post(
      `${apiUrl}${awsStageAPI.createStage
      }?invitedMailIds=${validateInvitedMails()}&orgId=${currentOrg.organisationId
      }&participantUserIds=${validate()}&stageName=${validTitle}&userRoleId=${currentOrg.invitedUserRoleId || currentOrg.userRoleId
      }`,
      {},
      true
    );
  }
};

export const createSession = (sessionRequest = {}) => {
  return Post(`${apiUrl}${awsStageAPI.createSession}`, sessionRequest, true);
};

export const getMeetDataService = (meetData = {}) => {
  const { userId = "", orgId = "", searchData = {}, position = "" } = meetData;
  console.log("getMeetDataService", searchData, meetData, position);
  if (checkWhiteSpaces(searchData.searchTerm) || searchData.searchTerm) {
    return Get(
      `${apiUrl}${awsStageAPI.getSession}?orgId=${orgId}&page=${searchData.page || 1
      }&searchName=${encodeURIComponent(
        removeUnderscoreFromPrefix(
          validateBothUnderscoreAndSpace(searchData.searchTerm)
        )
      )}&size=${10}&userId=${userId}&sort=${"desc"}&position=${position === "Upcoming" ? 0 : 1
      }`,
      true
    );
  } else {
    return Get(
      `${apiUrl}${awsStageAPI.getSession}?orgId=${orgId}&page=${searchData.page || 1
      }&size=${searchData.size || 10}&userId=${userId}
      &sort=${"desc"}&position=${position === "Upcoming" ? 0 : 1}`,
      true
    );
  }
};
export const getPastDataService = (meetData = {}) => {
  const { userId = "", orgId = "" } = meetData;
  return Get(
    `${apiUrl}${awsStageAPI.getSession
    }?orgId=${orgId}&size=${1000}&userId=${userId}&sort=${"desc"}&position=${1}`,
    true
  );
};
export const getUpcomingDataService = (upcomingData = {}) => {
  const { userId = "", orgId = "" } = upcomingData;
  return Get(
    `${apiUrl}${awsStageAPI.getSession
    }?orgId=${orgId}&size=${1000}&userId=${userId}&sort=${"desc"}&position=${0}`,
    true
  );
};

export const broadCastResponse = (data) => {
  const { stageArn = "", sessionName = "", organisationId = "" } = data;
  return Post(
    `${apiUrl}${awsStageAPI.createChannel
    }?orgId=${organisationId}&stageArn=${stageArn}&stageName=${validateTitle(
      sessionName
    )}`,
    {},
    true
  );
};
export const updateSession = (data) => {
  const { stageArn = "", callStatus = "", duration = "" } = data;
  console.log("data----", data);
  return Put(
    `${apiUrl}${awsStageAPI.updateSession}?stageArn=${stageArn}&status=${callStatus}&duration=${duration}`,
    {},
    true
  );
};

export const updateParticipantToken = async (data) => {
  console.log(data, "<<updateParticipantToken>>");
  const {
    updatedArray = [],
    jwt = "",
    addFromBroadcast = false,
    stageArn = "",
    type = "",
    scheduledData = "",
  } = data;
  const { regArray = [], unregArray = [] } = constructInvites(
    updatedArray,
    stageArn
  );
  console.log("response>>", type, scheduledData);
  if (data === "screenShare") {
    const tokenResponseSS = await Post(
      `${apiUrl}${awsStageAPI.updateParticipantToken}?addFromBroadcast=false&invitedMailIds=ScreenShare&stageArn=arn:aws:ivs:ap-south-1:680703584604:stage/CBJi05Ip6RFq`,
      [],
      true,
      jwt
    );
    console.log(tokenResponseSS, "tokenResponseSS")
  }
  if (type === "UPDATE" && scheduledData) {
    const tokenResponseUpdate = await Post(
      `${apiUrl}${awsStageAPI.updateParticipantToken}?addFromBroadcast=${addFromBroadcast}
      &invitedMailIds=${unregArray}&stageArn=${stageArn}
      &scheduledTime=${scheduledData?.scheduledTime}&hostScheduledTime=${scheduledData?.hostScheduledTime}`,
      regArray,
      true,
      jwt
    );
    if (tokenResponseUpdate?.data?.status === 200) {
      store.dispatch(getParticipantListAction(stageArn));
      return tokenResponseUpdate?.data?.data;
    }
  } else {
    const tokenResponse = await Post(
      `${apiUrl}${awsStageAPI.updateParticipantToken}?addFromBroadcast=${addFromBroadcast}&invitedMailIds=${unregArray}&stageArn=${stageArn}`,
      regArray,
      true,
      jwt
    );
    if (tokenResponse?.data?.status === 200) {
      store.dispatch(getParticipantListAction(stageArn));
      return tokenResponse?.data?.data;
    }
  }
};

export const signUpdateTokenService = async (data) => {
  const {
    updatedArray = [],
    jwt = "",
    addFromBroadcast = false,
    invitedMailIds = [],
    stageArn = "",
  } = data;
  console.log("response@@", data, updatedArray, invitedMailIds, stageArn);
  const tokenResponse = await Post(
    `${apiUrl}${awsStageAPI.updateParticipantToken}?addFromBroadcast=${addFromBroadcast}&invitedMailIds=${invitedMailIds}&stageArn=${stageArn}`,
    updatedArray,
    true,
    jwt
  );
  if (tokenResponse?.data?.status === 200) {
    return tokenResponse?.data?.data;
  }
};

export const endApiBroadcast = async (channelArn) => {
  const endResponse = await Post(
    `${apiUrl}${customerApi.stopStream}?channelArn=${channelArn}`,
    {},
    true
  );
  return endResponse?.data;
};

export const updateEncryptUrl = async (channelArn, encryptUrl) => {
  const reqBodyEncUrl = {
    channelArn: channelArn,
    encryptedUrl: encryptUrl,
  };
  const updateResponse = await Post(
    `${apiUrl}${customerApi.postEncryptUrl}`,
    reqBodyEncUrl,
    true
  );
  return updateResponse?.data;
};

export const deleteParticipantRequest = (removeList) => {
  return Delete(`${apiUrl}api/customer/removeParticipants?`, removeList, true);
};
