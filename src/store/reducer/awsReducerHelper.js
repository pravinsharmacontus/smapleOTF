import { validateUnderscore } from "../../common/helper";

export const userLeftStage = (stateData, payload) => {
  return stateData.filter((ele) => ele.id !== payload);
};

export const userLeftStageData = (stateData, payload) => {
  const newStage = stateData;
  const payloadId = payload;
  delete newStage[payloadId];
  return stateData;
};

export const updateMuteReducer = (state, payloadData) => {
  const { mutedId, mutedStream } = payloadData;
  const updatedParticipantData = {
    ...state[mutedId],
    stream: state[mutedId].stream.map((ele) => {
      if (ele.streamType === mutedStream.streamType) {
        return mutedStream;
      }
      return ele;
    }),
  };
  return {
    ...state,
    [mutedId]: updatedParticipantData,
  };
};

export const updateCallSession = (stateData, sessiondata) =>
  stateData.map((ele) => {
    if (ele.stageArn === sessiondata.stageArn) {
      return {
        ...ele,
        callStatus: sessiondata.callStatus,
      };
    } else {
      return { ...ele };
    }
  });

export const updateTokenReducer = (stateData, sessiondata) => {
  return stateData.map((ele) => {
    if (ele.stageArn === sessiondata.stageArn) {
      return {
        ...sessiondata,
      };
    } else {
      return {
        ...ele,
      };
    }
  });
};

export const addMeetData = (stateData, sessiondata) => {
  const currentUserId = sessiondata?.userId;
  const currentParticipanDetails = sessiondata.participantIds.filter(
    (ele) => ele.userId === currentUserId
  )[0];
  const constructedData = {
    ...sessiondata,
    sessionName: validateUnderscore(sessiondata?.sessionName),
    participantId: currentParticipanDetails?.participantId,
    participantToken: currentParticipanDetails?.participantToken,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  return [constructedData, ...stateData];
};

export const deleteMeetData = (stateData, deletedArn) => {
  const filteredArray = stateData.filter((item) => {
    return !deletedArn.data.includes(item.stageArn);
  });
  console.log("delteMeetDATA", stateData, deletedArn.data, filteredArray);
  return filteredArray;
};
