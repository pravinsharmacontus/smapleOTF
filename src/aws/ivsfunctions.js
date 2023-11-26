/* eslint-disable no-var */
import { isOffline, updateToken } from "../common/helper";
import { constantValue } from "../const/errorTypes";
import { updateScreenShare } from "../firebase/firebaseRealtimeFunctions";
import { serverNotRespond } from "../helper/ApiToast";
import {
  diableAudio,
  diableScreen,
  diableVideo,
  getCamera,
  getMic,
  muteStageJoin,
} from "../helper/AwsDeviceAccess";
import { getCurrentOrgId } from "../helper/utility";
import store from "../store";
import {
  appStatusAction,
  awsParticipantAction,
  awsParticipantDataAction,
  updateCameraStream,
  updateMicStream,
  updateScreenShareStream,
} from "../store/action/awsActions";
import { constructStream } from "./awsDataConstructor";
import {
  getStageData,
  handleMuteStatus,
  participantLeftResponse,
} from "./awsHelper";
import {
  endBroadcast,
  handleStreamAddedinBroadcast,
  updateParticipantStream,
} from "./broadcastFunction";

const { Stage, LocalStageStream, SubscribeType, StageEvents, ConnectionState } =
  IVSBroadcastClient;
let participants = 0;
let stage;
let strategy;
let screenshareStage;
export const createConstrains = () => {
  const constrains = {
    index: 0,
    x: (participants % 3) * 300,
    y: Math.floor(participants / 3) * 250,
    width: 300,
    height: 300,
  };
  participants += 1;
  return constrains;
};
const muteStatusDefault = {
  isVideoMute: false,
  isAudioMute: false,
};
/* eslint-disable max-len */
export const joinStage = async (stageData, muteStatus = muteStatusDefault) => {
  const { isVideoMute = false, isAudioMute = false } = muteStatus;
  const checkStageData =
    stageData?.method === "create" ? getStageData(stageData) : stageData;
  const token = checkStageData?.participantToken;
  console.log(token, "responseresponseresponse");

  if (!token) {
    console.error(constantValue.PLEASE_CREATE_STAGE);
    return;
  }
  const localStreamData = store.getState()?.localStreams;
  // Retrieve the User Media currently set on the page
  const localCamera = isVideoMute
    ? await muteStageJoin("VIDEO", localStreamData?.DeviceIds?.video)
    : localStreamData?.localCamera;
  const localMic = isAudioMute
    ? await muteStageJoin("AUDIO", localStreamData?.DeviceIds?.audio)
    : localStreamData?.localMic;
  // Create StageStreams for Audio and Video
  const cameraStageStream = new LocalStageStream(
    localCamera.getVideoTracks()[0]
  );
  const micStageStream = new LocalStageStream(localMic.getAudioTracks()[0]);

  strategy = {
    audioTrack: micStageStream,
    videoTrack: cameraStageStream,

    // optional
    updateTracks(newAudioTrack, newVideoTrack) {
      this.audioTrack = newAudioTrack;
      this.videoTrack = newVideoTrack;
    },

    // required
    stageStreamsToPublish() {
      return [this.audioTrack, this.videoTrack];
    },

    // required
    shouldPublishParticipant() {
      return true;
    },

    // required
    shouldSubscribeToParticipant() {
      return SubscribeType.AUDIO_VIDEO;
    },
  };

  stage = await new Stage(token, strategy);
  console.log(stage, "responseresponseresponse");
  // Other available events:
  // https://aws.github.io/amazon-ivs-web-broadcast/docs/sdk-guides/stages#events

  stage.on(StageEvents.STAGE_CONNECTION_STATE_CHANGED, (state) => {
    if (state === "errored") {
      store.dispatch(appStatusAction("errored"));
    }
  });

  stage.on(StageEvents.STAGE_PARTICIPANT_JOINED, (participant) => {
    store.dispatch(awsParticipantAction(participant));
  });

  stage.on(
    StageEvents.STAGE_PARTICIPANT_STREAMS_ADDED,
    (participant, streams) => {
      console.log(participant, streams, "STAGE_PARTICIPANT_STREAMS_ADDED")
      const streamData = constructStream(participant, streams);
      const stageParticipantsData = store.getState()?.stageParticipantsData;
      if (stageParticipantsData[participant?.id]?.stream?.length > 0) {
        store.dispatch(
          awsParticipantDataAction({ ...streamData, updateLocalStream: true })
        );
        updateParticipantStream(streamData);
      } else {
        store.dispatch(awsParticipantDataAction(streamData));
        handleStreamAddedinBroadcast(streamData);
      }
    }
  );

  stage.on(StageEvents.STAGE_PARTICIPANT_LEFT, (participant) => {
    participantLeftResponse(participant);
  });
  stage.on(StageEvents.STAGE_STREAM_MUTE_CHANGED, (participant, stream) => {
    handleMuteStatus(participant, stream);
  });
  try {
    await stage.join();
  } catch (err) {
    console.log(err, "err.messageerr.message");
    if (err.message === constantValue.TOKEN_EXPIRED || err.code === 1001) {
      if (isOffline()) {
        serverNotRespond(constantValue.INTERNET_ERROR);
      }
      updateToken(stageData);
    }
  }
};

export const leaveStage = async () => {
  stage.leave();
  await endBroadcast();
};

export const strategyUpdate = async (myNewAudioStream, myNewVideoStream) => {
  const myNewAudio = await getMic(myNewAudioStream);
  const myNewVideo = await getCamera(myNewVideoStream);
  const myNewVideoTrack = new LocalStageStream(myNewVideo.getVideoTracks()[0]);
  const myNewAudioTrack = new LocalStageStream(myNewAudio.getAudioTracks()[0]);
  strategy.updateTracks(myNewAudioTrack, myNewVideoTrack);
  stage.refreshStrategy();
  diableVideo();
  diableAudio();
  const cameraPayload = {
    localCamera: myNewVideo,
    deviceId: myNewVideoStream,
  };
  const MicPayload = {
    localMic: myNewAudio,
    deviceId: myNewAudioStream,
  };
  store.dispatch(updateCameraStream(cameraPayload));
  store.dispatch(updateMicStream(MicPayload));
};

export const initialScreenShare = async (stageData) => {
  const token = stageData?.token
  try {
    const media = await navigator.mediaDevices.getDisplayMedia({ audio: true, video: true });
    console.log(media.getAudioTracks()[0], "initialScreenShare---initialScreenShare")
    media.getVideoTracks()[0].addEventListener('ended', () => {
      const screenUnload = {
        screenShare: {},
      };
      store.dispatch(updateScreenShareStream(screenUnload));
      screenshareStage.leave();
      updateScreenShare(getCurrentOrgId(), false);
      screenshareStage = null
    });
    if (!store.getState()?.appStatus) {
      const screenShareTracks = media?.getTracks();
      screenShareTracks.forEach((track) => {
        track?.stop();
      });
      updateScreenShare(getCurrentOrgId(), false);
      return;
    }
    const screenPayload = {
      screenShare: media,
    };
    store.dispatch(updateScreenShareStream(screenPayload));
    const screenshare = { videoStream: new LocalStageStream(media.getVideoTracks()[0]) };
    const screenshareAudio = { AudioStream: media.getAudioTracks()[0] ? new LocalStageStream(media.getAudioTracks()[0]) : null };

    const screenshareStrategy = {
      stageStreamsToPublish: () => {
        if (screenshareAudio?.AudioStream) {
          return [screenshare.videoStream, screenshareAudio?.AudioStream];
        } else {
          return [screenshare.videoStream]
        }
      },
      shouldPublishParticipant: (participant) => {
        return true;
      },
      shouldSubscribeToParticipant: (participant) => {
        return SubscribeType.AUDIO_VIDEO;
      }
    }
    screenshareStage = new Stage(token, screenshareStrategy);
    screenshareStage.on(
      StageEvents.STAGE_PARTICIPANT_STREAMS_ADDED,
      (participant, streams) => {
        console.log(participant, streams, "STAGE_PARTICIPANT_STREAMS_ADDED")
      }
    );
    try {
      await screenshareStage.join();
    } catch (err) {
      updateScreenShare(getCurrentOrgId(), false)
    }
  } catch (err) {
    updateScreenShare(getCurrentOrgId(), false)
  }
}

export const leaveScreenShare = async () => {
  if (screenshareStage) {
    updateScreenShare(getCurrentOrgId(), false);
    await screenshareStage.leave();
    diableScreen();
    screenshareStage = null
  }
}
