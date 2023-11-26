import { handleCrashOrdering } from "../firebase/firebaseHelper";
import { isEmptyArray } from "../helper/utility";
import store from "../store";
import {
  localLeftStageAction,
  participantMuteStatus,
  userLeftAction,
} from "../store/action/awsActions";
import {
  handleParticipantMute,
  handleParticipantRemoved,
} from "./broadcastFunction";

const temp = false;
export const getStream = (participantData, type = "video") => {
  const videostream = participantData?.stream?.filter(
    (ele) => ele?.streamType === "video"
  )[0]?.mediaStreamTrack;
  const audiostream = participantData?.stream?.filter(
    (ele) => ele?.streamType === "audio"
  )[0]?.mediaStreamTrack;
  if (type === "video") {
    return videostream;
  } else {
    return audiostream;
  }
};

export const participantLeftResponse = (participant) => {
  console.log("participantLeftResponse", participant);
  if (!participant.isLocal) {
    store.dispatch(userLeftAction(participant.id));
    handleParticipantRemoved(participant);
    temp && setTimeout(() => handleCrashOrdering(participant), [3000]);
  }
};

export const handleMuteStatus = (participant, stream) => {
  const payload = { mutedId: participant.id, mutedStream: stream };
  store.dispatch(participantMuteStatus(payload));
  if (stream.streamType === "video") {
    handleParticipantMute(participant, stream);
  }
};

export const handleBroadcastMuteStatus = (participant, stream) => {
  if (stream.streamType === "video") {
    handleParticipantMute(participant, stream);
  }
};

export const localLeftStage = () => {
  store.dispatch(localLeftStageAction());
};

export const getAwsStreamData = (participantData, type = "video") => {
  const videostream = participantData.stream?.filter(
    (ele) => ele.streamType === "video"
  )[0];
  const audiostream = participantData.stream?.filter(
    (ele) => ele.streamType === "audio"
  )[0];
  if (type === "video") {
    return videostream;
  } else {
    return audiostream;
  }
};

export const getStageData = (stageData) => {
  const currentUserId = store.getState()?.CusPage?.customerDtls?.userId;
  const addNeededData = {
    ...stageData?.participantTokens?.filter(
      (ele) => ele.userId === JSON.stringify(currentUserId)
    )[0],
  };
  return {
    ...stageData,
    sessionName: stageData?.stage?.name,
    participantTokens: stageData?.participantTokens?.filter(
      (ele) => ele.userId === JSON.stringify(currentUserId)
    )[0],
    orgId: stageData?.stage?.tags?.orgId,
    stageArn: stageData.stage.arn,
    ...addNeededData,
    participantToken: addNeededData.token,
  };
};

export const getSessionRequest = (stageData = {}) => {
  return {
    bannerEnable: false,
    bannerText: "",
    brandColor: "",
    callStatus: "",
    displayName: stageData?.displayName,
    duration: "",
    embeddedTag: "",
    hlsLink: "",
    hostId: 0,
    logoUrl: "",
    orgId: parseInt(stageData?.stage?.tags?.orgId),
    participantIds: stageData?.participantTokens?.map((ele) => {
      const { expirationTime, attributesDto, token, ...updatedObject } = ele;
      console.log(expirationTime, attributesDto, token, "sonar");
      return { ...updatedObject, participantToken: ele.token };
    }),
    recordedLink: "",
    sessionName: stageData?.sessionName,
    shareVideo: "",
    stageArn: stageData?.stage?.arn,
    userId: JSON.stringify(stageData?.hostUserId),
    sessionJid: stageData?.sessionJid
  };
};

export const getBroadcastURL = (apiUrl) => {
  if (apiUrl === "https://onthefly-qaapi.contus.us/") {
    return "https://onthefly-qabroadcast.contus.us/?";
  } else {
    return "https://onthefly-devbroadcast.contus.us/?";
  }
};

export const getBroadcastEmbedURL = (apiUrl) => {
  if (apiUrl === "https://onthefly-qaapi.contus.us/") {
    return "https://onthefly-qabroadcast.contus.us/embeded?";
  } else {
    return "https://onthefly-devbroadcast.contus.us/embeded?";
  }
};

export const isMuted = (data, type = "video") => {
  const streamData = data?.stream?.find((ele) => ele.streamType === type);
  return streamData?.isMuted;
};

export const isParticipantDataMatched = (prevData, CurentData, type = "") => {
  const prevStreamData = prevData?.stream?.find(
    (ele) => ele.streamType === type
  );
  const currStreamData = CurentData?.stream?.find(
    (ele) => ele.streamType === type
  );
  return prevStreamData?.id === currStreamData?.id;
};

export const hostData = (isHost, participants, participantsData) => {
  const hostparts = participants.find((ele) => ele?.isLocal === isHost);
  if (!hostparts) {
    if (!isEmptyArray(Object.keys(participantsData))) {
      return participantsData[participants[0]?.id]
        ? participantsData[participants[0]?.id]
        : {};
    } else {
      return {};
    }
  } else {
    if (!isEmptyArray(Object.keys(participantsData))) {
      return participantsData[hostparts?.id]
        ? participantsData[hostparts?.id]
        : {};
    } else {
      return {};
    }
  }
};

export const screenShareData = (participants, participantsData) => {
  const screanshare = participants.find(ele => ele?.attributes?.type === "screenShare")
  console.log(screanshare, participantsData[screanshare?.id], "participants, participantsData")
  return participantsData[screanshare?.id]
}
