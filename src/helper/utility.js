import i18next from "i18next";
import store from "../store";
import {
  updateParticipantCount,
  updateParticipantPostion,
} from "../firebase/firebaseRealtimeFunctions";
import { Post } from "../common/httpRestServices";
import { REACT_APP_ALLOWANCE_MINUTES, apiUrl } from "./ApiUrl";
import moment from "moment";
import { SDK } from "mf-chat-uikit/dist";
import { mfGroupDetailsAction } from "../store/action/mfChatAction";
import { editStreamSaveAction } from "../store/action/editStreamAction";

export const HexColorRegex = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i;

export const isEmptyArray = (arr) => {
  return arr.length === 0 ? true : false;
};
export const translate = (key) => {
  return i18next.t(key);
};

export const millisecondsToTime = (duration) => {
  let seconds = parseInt((duration / 1000) % 60),
    minutes = parseInt((duration / (1000 * 60)) % 60),
    hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return (hours > 0 ? hours + ":" : "") + minutes + ":" + seconds;
};

export const currentStageArrn = (data) => {
  if (data.method === "join") {
    return data.stageArn;
  } else {
    return data.stage.arn;
  }
};
export const convertSectoMillesec = (data) => {
  return data * 1000;
};
export const getCurrentOrgId = () => {
  const currentOrgData = JSON.parse(window.localStorage.getItem("currntOrgid"));
  return currentOrgData?.organisationId || store.getState()?.currentOrganisation?.organisationId;
};

export const getCurrentUserId = () => {
  return store.getState()?.CusPage?.customerDtls?.userId;
};

export const capitalize = (str = "") => {
  const arr = str.split(" ");
  //loop through each element of the array and capitalize the first letter.
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const capitalizedString = arr.join(" ");
  return capitalizedString;
};

export const isHost = (stageData) => {
  if (stageData?.method === "create") {
    return true;
  } else if (stageData === "host") {
    return true;
  } else {
    return stageData.hostId === 0 ? true : false;
  }
};

export const positioningHost = (arrayList, isHosted, hostId) => {
  if (isHosted) {
    const hostInd = arrayList.findIndex((el) => el && el?.userId == hostId);
    const hostData = arrayList.find((el) => el && el?.userId == hostId);
    arrayList.splice(hostInd, 1);
    arrayList.unshift(hostData);
    return arrayList;
  } else {
    return arrayList;
  }
};

export const isHostJoined = (arrayList, hostId) => {
  return (
    arrayList?.findIndex((el) => el && el?.userId.toString() === hostId) >= 0
  );
};

export const removeMultipleSpaces = (str = "") => {
  return str.replace(/\s+/g, " ").trim();
};

export const removeMultipleAndStartSpaces = (str = "") => {
  return str.replace(/\s+/g, ' ').trimStart();
};

export const isCamMicGranted = (cameraPermissions, micPermissions) => {
  return !(
    micPermissions === "denied" ||
    micPermissions === "prompt" ||
    cameraPermissions === "denied" ||
    cameraPermissions === "prompt"
  );
};
export const convertMilliSecToHrandSec = (duration) => {
  const convertToNum = Number(duration);
  const minutes = Math.floor((convertToNum / (1000 * 60)) % 60),
    hours = Math.floor((convertToNum / (1000 * 60 * 60)) % 24);

  const hr = hours;
  const min = minutes;

  return `${hr}h ${min}m`;
};

export const positioningMembers = (
  arrayList,
  isHosted,
  fbPosition1,
  fbPosition2,
  fbPosition3
) => {
  const hostData = arrayList[0];
  const fbPosition1Data = arrayList.find(
    (ele) => ele?.userId == fbPosition1.toString()
  );
  const fbPosition2Data =
    fbPosition2 !== fbPosition1
      ? arrayList.find((ele) => ele?.userId == fbPosition2.toString())
      : undefined;
  const fbPosition3Data =
    fbPosition3 !== fbPosition1 && fbPosition3 !== fbPosition2
      ? arrayList.find((ele) => ele?.userId == fbPosition3.toString())
      : undefined;
  let dataAltered = [];
  if (isHosted) {
    dataAltered = [hostData, fbPosition1Data, fbPosition2Data, fbPosition3Data];
  } else {
    dataAltered = [fbPosition1Data, fbPosition2Data, fbPosition3Data];
  }
  return dataAltered.filter((ele) => ele !== undefined);
};

export const reorderParticipantList = async (awsStageReducer) => {
  const broadcastBranding = store.getState()?.broadcastBranding;
  const participantCount = broadcastBranding?.participantCount;
  const fbPosition1 = broadcastBranding?.postion1 || "";
  const fbPosition2 = broadcastBranding?.postion2 || "";
  const fbPosition3 = broadcastBranding?.postion3 || "";
  const participantList = [fbPosition1, fbPosition2, fbPosition3];
  const currentPosition =
    participantList.findIndex((ele) => ele === getCurrentUserId()) + 1;
  updateParticipantCount(
    getCurrentOrgId(),
    currentStageArrn(awsStageReducer),
    participantCount - 1
  );
  switch (currentPosition) {
    case 1:
      updateParticipantPostion(
        getCurrentOrgId(),
        currentStageArrn(awsStageReducer),
        1,
        "ordering",
        participantList[1] ? participantList[1] : -1
      );
      updateParticipantPostion(
        getCurrentOrgId(),
        currentStageArrn(awsStageReducer),
        2,
        "ordering",
        participantList[2] ? participantList[2] : -1
      );
      updateParticipantPostion(
        getCurrentOrgId(),
        currentStageArrn(awsStageReducer),
        3,
        "ordering",
        -1
      );

      break;
    case 2:
      updateParticipantPostion(
        getCurrentOrgId(),
        currentStageArrn(awsStageReducer),
        2,
        "ordering",
        participantList[2] ? participantList[2] : -1
      );
      updateParticipantPostion(
        getCurrentOrgId(),
        currentStageArrn(awsStageReducer),
        3,
        "ordering",
        -1
      );
      break;
    case 3:
      updateParticipantPostion(
        getCurrentOrgId(),
        currentStageArrn(awsStageReducer),
        3,
        "ordering",
        -1
      );
      break;
    default:
    // code block
  }
};
export const setColorCode = (
  BannerStyle = 0,
  fbBannerBG = "",
  FbBannerTextColor = false
) => {
  if (BannerStyle > 0) {
    if (fbBannerBG && FbBannerTextColor) {
      return "#fff";
    } else {
      return "#000";
    }
  } else {
    return "#fff";
  }
};
export const streamDetails = {
  id: `OTF-${new Date().toISOString()}`,
  snippet: {
    title: `OTF-${new Date().toISOString()}`,
  },
  cdn: {
    format: "",
    ingestionType: "rtmp",
    resolution: "720p",
    frameRate: "30fps",
  },
};
export const ConvertMillsecToMin = (milliseconds) => {
  const number = Number(milliseconds);
  return Math.floor(number / 60000);
};

export const createMediaConfig = async (tokenResponse, userInfo, mediaType) => {
  console.log("createMediaConfig", tokenResponse, userInfo);
  const mediaConfigDetails = {
    connectionStatus: "connected",
    customAttr: "string",
    mediaId: userInfo.sub,
    mediaName: userInfo.name,
    rtmpUrl: "dvsdfsd",
    status: 1,
    streamKey: "dfvstgdfvdf",
    mediaType: mediaType,
    authToken: tokenResponse.access_token,
    refreshToken: tokenResponse.refresh_token,
    expiresIn: tokenResponse.expires_in,
    mediaMail: userInfo.email,
    mediaProfile: userInfo.picture,
  };
  const responseMediaConfig = await Post(
    `${apiUrl}api/customer/createMediaConfig`,
    mediaConfigDetails,
    true
  );
  return responseMediaConfig;
};

export const isAllowJoin = (scheduledTimeStamp) => {
  console.log(scheduledTimeStamp, "scheduledTimeStamp--1");
  if (scheduledTimeStamp) {
    const now = moment.utc();
    const unixnew = moment(
      moment.utc(moment.unix(scheduledTimeStamp / 1000).utc())
    );
    const duration = moment.duration(unixnew.diff(now)).asMinutes();
    console.log(unixnew.toDate(), duration, "duration---duration");
    return REACT_APP_ALLOWANCE_MINUTES > duration;
  } else {
    return true;
  }
};

export const isAllowCreate = (scheduledTimeStamp) => {
  if (scheduledTimeStamp) {
    const now = moment.utc();
    const scheduledUTCTime = moment(
      moment.utc(moment.unix(scheduledTimeStamp / 1000).utc())
    );
    const duration = moment.duration(scheduledUTCTime.diff(now)).asMinutes();
    console.log(scheduledUTCTime.toDate(), duration, "isAllowCreate");
    return REACT_APP_ALLOWANCE_MINUTES < duration;
  }
};

export const dateStampToDate = (scheduledTimeStamp) => {
  return moment.unix(scheduledTimeStamp / 1000).utc();
};
export const INITIALS_COLOR_CODES = [
  "#9068BE",
  "#E62739",
  "#845007",
  "#3A4660",
  "#1D1E22",
  "#BE7D6A",
  "#005995",
  "#600473",
  "#CD5554",
  "#00303F",
  "#BE4F0C",
  "#4ABDAC",
  "#FC4A1A",
  "#368CBF",
  "#7EBC59",
  "#201D3A",
  "#269CCC",
  "#737272",
  "#237107",
  "#52028E",
  "#AF0D74",
  "#6CB883",
  "#0DAFA4",
  "#A71515",
  "#157FA7",
  "#7E52B1",
  "#27956A",
  "#9A4B70",
  "#FBBE30",
  "#ED3533",
  "#571C8D",
  "#54181C",
  "#9B6700",
  "#6E8E14",
  "#0752A1",
  "#BF6421",
  "#00A59C",
  "#9F0190",
  "#AE3A3A",
  "#858102",
  "#027E02",
  "#F66E54",
];

export const getHashCode = (s) => {
  let _h = 0;
  for (let i = 0; i < s.length; i++)
    _h = (Math.imul(31, _h) + s.charCodeAt(i)) | 0;
  return _h;
};

export const getColorCodeInitials = (name) => {
  if (name) {
    const hashCode = getHashCode(name);
    const code = hashCode % INITIALS_COLOR_CODES.length;
    return INITIALS_COLOR_CODES[Math.abs(code)];
  }
  return "#0376da";
};

export const addParticipantChat = (participant, name, groupJids) => {
  const getHost = participant.find(
    (item) =>
      item.userId ===
      JSON.parse(localStorage.getItem("userDetails")).data.userId
  ).isHost;
  if (getHost === 0) {
    const sessionName = name
      ? name
      : store.getState()?.awsStageReducer?.sessionName; //store
    const groupJid = groupJids
      ? groupJids
      : JSON.parse(localStorage.getItem("Group_Jid")) || "";
    if (participant.length >= 1) {
      participant.map(async (key) => {
        const firstName = key?.userEmail;
        const userId = firstName.replace(/[^A-Z0-9]/gi, "").toLowerCase();
        const userJidDetails = await SDK.getJid(userId);
        const uJID = [];
        uJID.push(userJidDetails.userJid);
        const addpart = await SDK.addParticipants(groupJid, sessionName, uJID);
        console.log("qwqw ut result add_participant", addpart);
        let details = await SDK.getGroupParticipants(groupJid);
        console.log("qwqw ut get_participant", details);
      });
    }
  }
};

export const createGroup = async (groupName) => {
  const groupCreate = await SDK.createGroup(
    groupName,
    [
      "919789725474@xmpp-uikit-qa.contus.us",
      "919043492683@@xmpp-uikit-qa.contus.us",
    ],
    ""
  );
  // // localStorage.setItem("Group_Jid", JSON.stringify("0630f2e1-050c-43f0-a5f2-b89585b10c66@mix.xmpp-uikit-qa.contus.us"));
  console.log("qwqw cg groupCreate response", groupName, groupCreate);
  console.log("qwqw cg groupCreate", groupCreate?.data?.groupJid);
  const getgroupJid = groupCreate?.data?.groupJid;
  const groupJid = getgroupJid ? getgroupJid : "";
  console.log("qwqw cg groupJid", groupJid);
  localStorage.setItem("Group_Jid", JSON.stringify(groupJid));
  if (groupCreate.statusCode === 200) {
    store.dispatch(mfGroupDetailsAction(groupJid));
  }
};

// // export const userProfile = async () => {
// //   const loginDetail = window.localStorage.getItem("userDetails")
// //   ? JSON.parse(window.localStorage.getItem("userDetails"))
// //   : {};
// //   const { data: { firstName = "" } = {} } = loginDetail;
// //   const setUserProfile = await SDK.setUserProfile(firstName, "", "", "", "");
// //   console.log("qwqw cg userProfile", setUserProfile);
// // }

export const deleteChatGroup = async () => {
  const host = store.getState().awsStageReducer;
  console.log("qwqw ut hosthost", host);
  const groupJid = window.localStorage.getItem("Group_Jid")
    ? JSON.parse(window.localStorage.getItem("Group_Jid"))
    : "";
  console.log("qwqw delete groupJid", groupJid);
  if (isHost(host)) {
    const deleteChat = await SDK.userDeleteGroup(groupJid);
    console.log("qwqw deleteChat", deleteChat);
  }
};

export const filterSSDate = (parcipants) => {
  return parcipants.filter(ele => ele?.attributes?.type !== "screenShare");
}
export const filteredSSDate = (parcipants) => {
  return parcipants.filter(ele => ele?.attributes?.type === "screenShare");
}
export const currentUserFullName = () => {
  return store?.getState()?.CusPage?.customerDtls?.fullName
}
export const mediaBroadcast = async (select, arn) => {
  // // const getsessionBroadcast = destructStageId(destructStage(arn));
  const selectMedia = {
    "media_type": select[0]?.media_type,
    "media_id": select[0]?.media_id,
    "config_id": select[0]?.config_id === null ? undefined : select[0]?.config_id,
    "config_type": select[0]?.config_type === null ? undefined : select[0]?.config_type,
    "broadcast_id": arn,
    "name": select[0]?.name ? select[0]?.name : select[0]?.media_name
  };
  setTimeout(() => {
    store.dispatch({ type: "DO_LOADING_PAGE", loading: true });
  }, 1500);
  const resSelectMedia = await Post(
    `${apiUrl}simulcast/api/media-broadcast`, selectMedia);
    if(resSelectMedia.status === 200) {
    console.log("qaqa resFbPage", resSelectMedia);
    setTimeout(() => {
      store.dispatch({ type: "DO_LOADING_PAGE", loading: false });
    }, 1500);
    store.dispatch(editStreamSaveAction(true));
    localStorage.setItem("Select_Media", JSON.stringify(select[0]?.media_type));
    localStorage.setItem("editStreamSave", true);
  } else {
    setTimeout(() => {
      store.dispatch({ type: "DO_LOADING_PAGE", loading: false });
    }, 1500);
    localStorage.setItem("Select_Media", JSON.stringify(select));
  }
}

export const selectStream = async (stageArn, select, selectedId, broadcastId) => {
  localStorage.removeItem("Facebook_Live_Url");
  localStorage.removeItem("Select_Media");
    if(select){
    if (selectedId && broadcastId) {
      console.log("1w1wqq stageState 3",stageArn);
      const deleteSelectAcc = {
        "id": selectedId,
      };
      const selectedMediaDelete = await Post(
        // `${apiUrl}simulcast/api/media-broadcast/remove?id=${id}`, true
        `${apiUrl}simulcast/api/media-broadcast/remove`, deleteSelectAcc,
        true
      );
      localStorage.setItem("Select_Media", JSON.stringify(select));
      if (selectedMediaDelete?.status === 200) {
          mediaBroadcast(select, stageArn);
      }
    }
    else {
      localStorage.setItem("Select_Media", JSON.stringify(select));
        mediaBroadcast(select, stageArn);
    }
  }
};
