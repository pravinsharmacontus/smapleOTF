import * as awsTypes from "../actionTypes/awsTypes";

export const awsCreateStageAction = (data = {}) => {
  return {
    type: awsTypes.CREATE_STAGE,
    data,
  };
};

export const awsJoinStage = (data = {}) => {
  return {
    type: awsTypes.JOIN_STAGE,
    data,
  };
};

export const awsParticipantAction = (data = {}) => {
  return {
    type: awsTypes.ADD_STAGE_PARTICIPANTS,
    data,
  };
};
export const awsParticipantUpdateAction = (data = {}) => {
  return {
    type: awsTypes.UPDATE_STAGE_PARTICIPANTS,
    data,
  };
};

export const awsParticipantDataAction = (data = {}) => {
  return {
    type: awsTypes.ADD_STAGE_STREAM_DATA,
    data,
  };
};

export const localStreamUpdate = (data = {}) => {
  return {
    type: awsTypes.ADD_LOCAL_STREAMS,
    data,
  };
};

export const localDeviceLists = (data = {}) => {
  return {
    type: awsTypes.ADD_DEVICES_LISTS,
    data,
  };
};

export const updateLogo = (data = {}) => {
  console.log(data, "data--->updateLogo");
  return {
    type: awsTypes.UPDATE_LOGO,
    data,
  };
};

export const updateBranding = (data = {}) => {
  console.log(data, "data--->updateBranding");
  return {
    type: awsTypes.UPDATE_BRANDING,
    data,
  };
};

export const localLeftStageAction = (data = {}) => {
  return {
    type: awsTypes.LOCAL_LEFT,
    data,
  };
};

export const userLeftAction = (data = "") => {
  return {
    type: awsTypes.USER_LEFT_STAGE,
    data,
  };
};

export const participantMuteStatus = (data = "") => {
  return {
    type: awsTypes.PARTICIPANT_MUTE_UPDATE,
    data,
  };
};

export const awsGetMeetingData = (data = {}) => {
  return {
    type: awsTypes.GET_MEET_DATA,
    data,
  };
};
export const awsGetPast = (data = {}) => {
  return {
    type: awsTypes.GET_PAST_DATA,
    data,
  };
};
export const awsGetUpcoming = (data = {}) => {
  return {
    type: awsTypes.GET_UPCOMING_DATA,
    data,
  };
};

export const awsGetBroadcastData = (data = {}) => {
  return {
    type: awsTypes.GET_BROADCAST_DATA,
    data,
  };
};

export const updateCallStatusAction = (data = {}) => {
  return {
    type: awsTypes.UPDATE_CALL_STATUS,
    data,
  };
};

export const updateCameraStream = (data = {}) => {
  return {
    type: awsTypes.UPDATE_CAMERA_STREAM,
    data,
  };
};

export const updateMicStream = (data = {}) => {
  return {
    type: awsTypes.UPDATE_MIC_STREAM,
    data,
  };
};

export const updateScreenShareStream = (data = {}) => {
  return {
    type: awsTypes.UPDATE_SCREEN_STREAM,
    data,
  };
};

export const updateMuteStatus = (data = {}) => {
  return {
    type: awsTypes.UPDATE_MUTE_STATUS,
    data,
  };
};

export const updateSpeaker = (data = {}) => {
  return {
    type: awsTypes.UPDATE_SPEAKER,
    data,
  };
};

export const updateMeetData = (data = {}) => {
  return {
    type: awsTypes.UPDATE_MEET_DATA,
    data,
  };
};

export const addMeetData = (data = {}) => {
  return {
    type: awsTypes.ADD_MEET_DATA,
    StageData: data,
  };
};

export const broadcastPostionsUpdate = (data = {}) => {
  return {
    type: awsTypes.UPDATE_POSITIONING,
    broadcastData: data,
  };
};

export const appStatusAction = (data = "") => {
  return {
    type: awsTypes.APP_STATUS,
    status: data,
  };
};

export const updateLocalCameraStream = (data = {}) => {
  return {
    type: awsTypes.UPDATE_LOCAL_VIDEO_STREAM,
    stream: data,
  };
};
export const updateLocalMicStream = (data = {}) => {
  return {
    type: awsTypes.UPDATE_LOCAL_AUDIO_STREAM,
    stream: data,
  };
};

export const updateBlockAccess = (data = {}) => {
  return {
    type: awsTypes.UPDATE_BLOCK_ACCESS,
    access: data,
  };
};

export const appOnlineStatusAction = (data = {}) => {
  return {
    type: awsTypes.APP_ONLINE_STATUS,
    status: data,
  };
};

export const camPermmissionStatusAction = (data = {}) => {
  return {
    type: awsTypes.CAM_PERMISSION,
    status: data,
  };
};

export const micPermmissionStatusAction = (data = {}) => {
  return {
    type: awsTypes.MIC_PERMISSION,
    status: data,
  };
};

export const tempVideoStream = (data = {}) => {
  return {
    type: awsTypes.TEMP_VIDEO_STREAM,
    status: data,
  };
};

export const tempAudioStream = (data = {}) => {
  return {
    type: awsTypes.TEMP_AUDIO_STREAM,
    status: data,
  };
};

export const tempAudioOutputAction = (data = {}) => {
  return {
    type: awsTypes.TEMP_AUDIO_STREAM_OUTPUT,
    status: data,
  };
};

export const tempInitials = (data = {}) => {
  return {
    type: awsTypes.TEMP_INITIALS,
    status: data,
  };
};
