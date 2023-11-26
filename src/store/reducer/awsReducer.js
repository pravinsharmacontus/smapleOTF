import { validateUnderscore } from "../../common/helper";
import {
  updateMuteReducer,
  userLeftStage,
  updateCallSession,
  updateTokenReducer,
  addMeetData,
  deleteMeetData,
  userLeftStageData,
} from "./awsReducerHelper";

const initialStage = {
  stage: "",
  userId: "",
  participantToken: "",
};
const initialParticipantStage = [];
const initialParticipantData = {};
const initiallocalStreamData = [];
const initialLocalDeviceList = {};
const initialLogoImage = "";
const initialSessionInfo = [];
const initialBroadcastKey = {};

export const awsStageReducer = (state = initialStage, action = {}) => {
  switch (action.type) {
    case "CREATE_STAGE_REDUCER": {
      return {
        ...action.StageData,
        stage: {
          ...action.StageData?.stage,
          name: validateUnderscore(action.StageData?.stage?.name),
        },
      };
    }
    case "CREATE_STAGE_LODING_REDUCER": {
      return {
        ...state,
        isLoading: action.loading,
      };
    }
    case "JOIN_STAGE": {
      return {
        ...action.data,
        method: "join",
      };
    }
    // case "LOCAL_LEFT": {
    //   return {
    //     ...initialStage,
    //   };
    // }
    default:
      return state;
  }
};

export const stageParticipantsReducer = (
  state = initialParticipantStage,
  action = {}
) => {
  switch (action.type) {
    case "ADD_STAGE_PARTICIPANTS": {
      return [...state, action.data];
    }
    case "UPDATE_STAGE_PARTICIPANTS": {
      return [
        ...state.filter((ele) => ele?.userId !== action.data?.userId),
        action.data,
      ];
    }

    case "LOCAL_LEFT": {
      return [...initialParticipantStage];
    }
    case "USER_LEFT_STAGE": {
      return userLeftStage(state, action.data);
    }
    default:
      return state;
  }
};

export const awsParticipantDataReducer = (
  state = initialParticipantData,
  action = {}
) => {
  switch (action.type) {
    case "ADD_STAGE_STREAM_DATA":
      if (action.data?.updateLocalStream === "alter") {
        const stageChange = state[action.data.id];
        delete stageChange?.updateLocalStream;
        return {
          ...state,
          [action.data.id]: stageChange,
        };
      } else {
        return {
          ...state,
          [action.data.id]: action.data,
        };
      }
    case "LOCAL_LEFT": {
      return {
        ...initialParticipantData,
      };
    }
    case "USER_LEFT_STAGE": {
      return userLeftStageData(state, action.data);
    }

    case "PARTICIPANT_MUTE_UPDATE": {
      const mutedData = updateMuteReducer(state, action.data);
      return {
        ...mutedData,
      };
    }

    default:
      return state;
  }
};

export const localStreamsReducers = (
  state = initiallocalStreamData,
  action = {}
) => {
  switch (action.type) {
    case "ADD_LOCAL_STREAMS": {
      return {
        ...action.data,
      };
    }
    case "UPDATE_CAMERA_STREAM": {
      return {
        ...state,
        localCamera: action.data.localCamera,
        DeviceIds: {
          ...state.DeviceIds,
          video: action.data.deviceId,
        },
      };
    }
    case "UPDATE_MIC_STREAM": {
      return {
        ...state,
        localMic: action.data.localMic,
        DeviceIds: {
          ...state.DeviceIds,
          audio: action.data.deviceId,
        },
      };
    }
    case "UPDATE_SPEAKER": {
      return {
        ...state,
        DeviceIds: {
          ...state.DeviceIds,
          speaker: action.data.deviceId,
        },
      };
    }
    case "UPDATE_SCREEN_STREAM": {
      return {
        ...state,
        screenShare: action.data.screenShare
      };
    }
    case "UPDATE_LOCAL_STREAM": {
      return {
        ...state,
        localMic: action.data.localMic,
      };
    }
    case "UPDATE_LOCAL_VIDEO_STREAM": {
      return {
        ...state,
        localCamera: action.stream,
      };
    }
    case "UPDATE_LOCAL_AUDIO_STREAM": {
      return {
        ...state,
        localMic: action.stream,
      };
    }
    case "LOCAL_LEFT": {
      return {
        ...initiallocalStreamData,
      };
    }
    default:
      return state;
  }
};

export const localDeviceListsReducers = (
  state = initialLocalDeviceList,
  action = {}
) => {
  switch (action.type) {
    case "ADD_DEVICES_LISTS": {
      return {
        ...action.data,
      };
    }
    case "LOCAL_LEFT": {
      return {
        ...initialLocalDeviceList,
      };
    }
    default:
      return state;
  }
};

export const updateLogoReducer = (state = "", action = {}) => {
  switch (action.type) {
    case "UPDATE_LOGO": {
      return action.data;
    }
    case "LOCAL_LEFT": {
      return initialLogoImage;
    }
    default:
      return state;
  }
};

export const updateBrandingReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case "UPDATE_BRANDING": {
      return action.data;
    }
    case "LOCAL_LEFT": {
      return {};
    }
    default:
      return state;
  }
};

export const updateSessionInfoReducer = (
  state = initialSessionInfo,
  action = {}
) => {
  switch (action.type) {
    case "GET_MEET_DATA_REDUCER": {
      return [...action.sessionData];
    }
    case "UPDATE_CALL_STATUS_REDUCER": {
      return updateCallSession(state, action.callStatus);
    }
    case "UPDATE_MEET_DATA": {
      return updateTokenReducer(state, action.data);
    }
    case "ADD_MEET_DATA": {
      return addMeetData(state, action.StageData);
    }
    case "EMPTY_BROADCAST_MEMBERS": {
      return [];
    }
    case "DELETE_MEET_DATA": {
      return deleteMeetData(state, action.deleteMeetData);
    }
    case "CLEAR_SESSION": {
      return [];
    }
    default:
      return state;
  }
};
const updateDeleteCount = (totalrecord = 0, stageLength = 0) => {
  return totalrecord - stageLength;
};
export const sessionTotalRecordReducer = (state = [], action = {}) => {
  switch (action.type) {
    case "GET_MEET_TOTALRECORD_DATA_REDUCER": {
      return { ...action.sessionTotalRecordData };
    }
    case "ADD_MEET_DATA": {
      return {
        ...state,
        totalRecords: state.totalRecords + 1,
      };
    }
    case "REMOVE_PAST_PAGE_COUNT": {
      return {
        ...state,
        totalRecords: state.totalRecords - action.deleteStage.length,
      };
    }
    case "REMOVE_UPCOMING_PAGE_COUNT": {
      return {
        ...state,
        totalRecords: updateDeleteCount(
          state.totalRecords,
          action.deleteStage.length
        ),
      };
    }
    case "case3": {
      return "";
    }
    default:
      return state;
  }
};
export const sessionPastRecordReducer = (state = [], action = {}) => {
  if (action.type === "GET_MEETPAST_TOTALRECORD_DATA_REDUCER") {
    return { ...action.sessionPastData };
  } else if (action.type === "REMOVE_PAST_PAGE_COUNT") {
    return {
      ...state,
      totalRecords: state.totalRecords - action.deleteStage.length,
    };
  } else {
    return state;
  }
};
export const sessionUpcomingRecordReducer = (state = [], action = {}) => {
  if (action.type === "GET_MEETUPCOMING_TOTALRECORD_DATA_REDUCER") {
    return { ...action.sessionUpcomingData };
  } else if (action.type === "REMOVE_UPCOMING_PAGE_COUNT") {
    return {
      ...state,
      totalRecords: state.totalRecords - action.deleteStage.length,
    };
  } else {
    return state;
  }
};
export const broadcastKeyReducer = (
  state = initialBroadcastKey,
  action = {}
) => {
  switch (action.type) {
    case "GET_BROADCAST_DATA_REDUCER": {
      return { ...action.broadcastCredentials };
    }
    case "case2": {
      return "";
    }
    case "case3": {
      return "";
    }
    default:
      return state;
  }
};

export const broadcastPostionReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case "UPDATE_POSITIONING": {
      return { ...action.broadcastData };
    }
    case "case2": {
      return "";
    }
    default:
      return state;
  }
};

export const appStatusReducer = (state = "", action = "") => {
  switch (action.type) {
    case "APP_STATUS": {
      return action.status;
    }
    case "case2": {
      return "";
    }
    default:
      return state;
  }
};

export const updateBlockAccessReducer = (state = "", action = "") => {
  switch (action.type) {
    case "UPDATE_BLOCK_ACCESS": {
      return action.access;
    }
    case "case2": {
      return "";
    }
    default:
      return state;
  }
};

export const appOnlineStatusReducer = (state = true, action = "") => {
  switch (action.type) {
    case "APP_ONLINE_STATUS": {
      return action.status;
    }
    case "case2": {
      return "";
    }
    default:
      return state;
  }
};

export const cameraPermissionReducer = (state = {}, action = "") => {
  switch (action.type) {
    case "CAM_PERMISSION": {
      return action.status;
    }
    case "case1": {
      return {};
    }
    default:
      return state;
  }
};

export const micPermissionReducer = (state = {}, action = "") => {
  switch (action.type) {
    case "case1": {
      return {};
    }
    case "MIC_PERMISSION": {
      console.log(action.status, "MIC_PERMISSION");
      return action.status;
    }
    default:
      return state;
  }
};

export const getTempStreams = (state = {}, action = "") => {
  switch (action.type) {
    case "TEMP_VIDEO_STREAM": {
      return {
        ...state,
        video: action.status,
      };
    }
    case "TEMP_AUDIO_STREAM": {
      return {
        ...state,
        audio: action.status,
      };
    }
    case "TEMP_AUDIO_STREAM_OUTPUT": {
      return {
        ...state,
        speaker: action.status,
      };
    }
    case "TEMP_INITIALS": {
      return {};
    }
    default:
      return state;
  }
};
