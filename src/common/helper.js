import { joinStage } from "../aws/ivsfunctions";
import { decodeRegistertoken } from "../helper/Encypt";
import {
  signUpdateTokenService,
  updateParticipantToken,
} from "../services/aswServices";
import { getSessionRequest } from "../aws/awsHelper";
import store from "../store";
import _get from "lodash/get";
import { addMeetData } from "../store/action/awsActions";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { getCustomerOrganisationList } from "../services/organisationServices";
import { currentOrganisation } from "../store/action/organisationAction";
import { getTeamMembers } from "../services/inviteMemberServices";
import { getCurrentOrgId } from "../helper/utility";
import { passiveTeamMemberUpdate } from "../store/action/inviteMemberAction";
import { getDeleteStageService } from "../services/deleteServices";
import { getParticipantListAction } from "../store/action/participantAction";
import { mfGroupDetailsAction } from "../store/action/mfChatAction";
import mixpanel from "mixpanel-browser";
import { envPath } from "../helper/ApiUrl";

export const isOffline = () => {
  return navigator.onLine ? false : true;
};

/**
 * string is html or not find out
 * @param {string} str
 */
export const isHTML = (str = "") => {
  return str.includes("</");
};
export const handleDropFilters = (ele = "") => {
  const handleDrop = ele && ele?.target?.querySelector(".custom-dropdown");
  return handleDrop?.click();
};
export const handleDropFiltersIcon = (ele = "") => {
  const handleDropIcon = ele && ele?.target?.closest(".dropFilter");
  return handleDropIcon?.click();
};

export const isEllipsisActive = (element) => {
  return element.offsetWidth < element.scrollWidth;
};
export const handleEllipsis = (SelectorAll) => {
  Array.from(document.querySelectorAll(SelectorAll)).forEach((element) => {
    if (isEllipsisActive(element)) {
      element.title = element.innerText;
    }
  });
};
export const validateTitle = (title) => {
  return title.replaceAll(" ", "_");
};

export const removeUnderscoreFromPrefix = (title) => {
  return title.replace(/^_+/, "");
};

export const validateBothUnderscoreAndSpace = (title) => {
  const titleSplit = title.split(" ");
  let toSpace = [];
  titleSplit.forEach((ele) => {
    toSpace = [...toSpace, ele.replaceAll("_", " ")];
    return toSpace;
  });
  return toSpace.join("_");
};
export const validateUnderscore = (title) => {
  return title.replaceAll("_", " ");
};
export const validateGetDataUnderscore = (getData) => {
  console.log(getData, "validateGetDataUnderscore");
  return getData.map((ele) => {
    return {
      ...ele,
      channelDetails: ele?.channelDetails
        ? {
          ...ele.channelDetails,
          stageName: validateUnderscore(ele?.channelDetails?.stageName),
        }
        : null,
      sessionName: validateUnderscore(ele?.sessionName),
    };
  });
};
export const isEmptyObject = (obj = {}) => {
  const isEmptyObj = Object.keys(obj).length > 0;
  return !isEmptyObj;
};

export const localParticipantId = (participantData = []) => {
  return participantData.filter((ele) => ele.isLocal === true)[0]?.id;
};

export const localParticipant = (participantData = []) => {
  return participantData.filter((ele) => ele.isLocal === true)[0];
};

export const updateToken = async (stageData, muteStatus) => {
  const { stageArn = "", userId = "", orgId = "" } = stageData;
  console.log("stagedata---updateToken", stageData);
  const updatedArray = [
    {
      orgId: orgId,
      participantUserId: userId,
      stageArn: stageArn,
    },
  ];
  const response = await signUpdateTokenService({
    updatedArray: updatedArray,
    addFromBroadcast: false,
  });
  const newParticipantId =
    response?.participantsTokensResponse[0]?.participantId;
  const newParticipantToken = response?.participantsTokensResponse[0]?.token;

  console.log(
    newParticipantId,
    newParticipantToken,
    response,
    "stagedata----response"
  );
  if (newParticipantId && newParticipantToken) {
    const constructedData = {
      ...stageData,
      participantId: newParticipantId,
      participantToken: newParticipantToken,
    };
    console.log(constructedData, "stagedata----constructedData");
    await joinStage(constructedData, muteStatus);
  }
};

export const signUpUpdateToken = async (
  stageData = [],
  userId = 0,
  jwt = ""
) => {
  const newObj = {
    ...stageData[0],
    participantUserId: userId,
  };
  const updatedArray = [newObj];

  console.log("response---", updatedArray);
  const response = await signUpdateTokenService({
    updatedArray: updatedArray,
    jwt: jwt,
    addFromBroadcast: false,
  });
  console.log("response", response);
};

export const constructInvites = (inviteArray, stageArn) => {
  const regArray = inviteArray
    .filter((ele) => ele?.userId)
    .map((el) => {
      return {
        participantUserId: el?.userId,
        orgId: getCurrentOrgId(),
        stageArn: stageArn,
      };
    });
  const unregArray = inviteArray
    .filter((ele) => !ele?.userId)
    .map((el) => {
      return el?.emailId;
    });
  return { regArray, unregArray };
};
export const updateCreateParticipantToken = async (
  userData = [],
  stageArn = ""
) => {
  console.log(userData, "updateCreateParticipantToken");
  await updateParticipantToken({
    updatedArray: userData,
    addFromBroadcast: true,
    invitedMailIds: [userData[0].emailId],
    stageArn: stageArn,
  });
};

export const setCurrentOrg = async (org = 0) => {
  const response = await getCustomerOrganisationList(); //NOSONAR not used in secure contexts
  const currentOrg = response?.data?.data?.organisations?.filter(
    (ele) => ele.organisationId === org
  )[0];
  console.log(
    "response###",
    response?.data?.data?.organisations?.filter(
      (ele) => ele.organisationId === org
    )[0],
    response
  );
  if (currentOrg) {
    window.localStorage.setItem("currntOrgid", JSON.stringify(currentOrg));
    store.dispatch(currentOrganisation(currentOrg));
  }
};

export const isEmailValidateToken = (search) => {
  const str = search.substring(1);
  try {
    window.atob(str);
    const decodedStringAtoB = atob(str); //decode the base64 token
    const obj = decodeRegistertoken(decodedStringAtoB);
    return obj?.emailValidateToken?.length > 0;
  } catch (e) {
    console.log(e, "isEmailValidateToken");
    return false;
  }
};

export const isvalidToken = (str) => {
  try {
    window.atob(str);
    return true;
  } catch (e) {
    return false;
  }
};

export const addCreateMeet = () => {
  const awsStageData = store.getState()?.awsStageReducer;
  if (awsStageData?.method === "create") {
    const constructedRequestData = getSessionRequest(awsStageData);
    store.dispatch(addMeetData(constructedRequestData));
  }
};

export const constructInviteData = (obj, apiData) => {
  const { data = [], hostDetails = {} } = obj;
  const { data: userId } = apiData;
  console.log(apiData, "apiDataapiData");
  return {
    fullName: null,
    userId: userId && parseInt(userId.slice(1, -1)),
    organisationId: hostDetails?.currentOrgDetails?.organisationId,
    isActive: userId ? 1 : 0,
    countryCode: null,
    countryCodeShort: null,
    userRoleId: data[0]?.inviteUserRoleId,
    createdAt: Date.now(),
    emailVerified: null,
    emailId: data[0]?.inviteUserEmail,
    phoneNumber: null,
    profileImage: null,
  };
};
export const navigateBroadcast = () => {
  return <Redirect to={"/broadcast"} />;
};

export const clearLocalStorage = () => {
  window.localStorage.clear();
};

export const destructStage = (stageArn) => {
  console.log("destructStage", stageArn);
  return stageArn?.split(":")[5];
};

export const destructStageId = (stageArn) => {
  return stageArn?.split("/")[1];
};

export const getUserListNameOld = (userId) => {
  if (userId) {
    const stageParticipants = store.getState()?.stageParticipants;
    const invitedList = store.getState()?.inviteMemberListReducer?.inviteMember;
    const orgUserId = stageParticipants.find(
      (ele) => ele.id === userId
    )?.userId;
    const userData = invitedList.find(
      (ele) => ele.userId === parseInt(orgUserId)
    );
    console.log(orgUserId, userData, "orgUserIdorgUserId");
    if (userData?.fullName) {
      return userData?.fullName;
    }
  }
};

export const getUserListName = async (userId) => {
  if (userId) {
    const invitedList = store.getState()?.inviteMemberListReducer?.inviteMember;
    const userData = invitedList.find((ele) => ele.userId === parseInt(userId));
    if (userData?.fullName) {
      return userData?.fullName;
    } else {
      const { data: memberResponse } = await getTeamMembers(getCurrentOrgId());
      if (memberResponse?.status === 200) {
        const newInvitedList = memberResponse?.data?.teamMembersDetails;
        store.dispatch(passiveTeamMemberUpdate(newInvitedList));
        const newUserData = newInvitedList?.find(
          (ele) => ele.userId === parseInt(userId)
        );
        return newUserData?.fullName || "User 2";
      }
    }
  }
};
/**
 * @param  {array} array=[]
 * for delete purpose seletect item id find and remove undefined
 */
export const cusTableSelectedDeleteItem = (array = []) => {
  return (array || [])
    .map((ele) => {
      if (ele.isCheck) {
        return _get(ele, "stageArn", "");
      }
      return undefined;
    })
    .filter((notUndefined) => notUndefined !== undefined);
};
export const cusTableSelectedDeleteItemTeams = (array = []) => {
  return (array || [])
    .map((ele) => {
      if (ele.isCheck) {
        return _get(ele, "userId", "");
      }
      return undefined;
    })
    .filter((notUndefined) => notUndefined !== undefined);
};

export const getDeleteStageResponse = async (stage = {}) => {
  console.log("stagestage", stage)
  const apiResponse = await getDeleteStageService(stage); //NOSONAR not used in secure contexts
  console.log("stage---.", stage, apiResponse, apiResponse?.data);
  console.log("stage---.", stage, apiResponse);
  console.log("stage--- session", apiResponse?.data?.data?.stageDetails?.sessionJid);
  store.dispatch(mfGroupDetailsAction(apiResponse?.data?.data?.stageDetails?.sessionJid));
  return apiResponse?.data;
};

export const getParticipantApi = (obj = {}) => {
  const { data: { stageArn = "" } = {} } = obj;
  console.log("getParticipantApi", obj, stageArn);
  store.dispatch(getParticipantListAction(stageArn));
};

export const closeScreenShareAlert = () => {
  const alertPopup = document.querySelector('.screen-share-dialog');
  console.log(alertPopup, "closeScreenShareAlert")
  alertPopup?.close();
}

export const handleMixpanelTrack = (trackingName , trackingData) => {
  if (envPath === 'prod') {
    return mixpanel.track(trackingName, trackingData);
  }
  return false;
}
