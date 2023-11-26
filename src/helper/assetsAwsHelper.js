import {
  localDeviceLists,
  localStreamUpdate,
  updateCameraStream,
  updateMicStream,
  updateSpeaker,
} from "../store/action/awsActions";
import {
  diableAudio,
  diableVideo,
  getCamera,
  getDevices,
  getMic,
  getStreams,
} from "./AwsDeviceAccess";
import store from "../store";
import { getCamMIc } from "./Encypt";

export const assertsPermissionStatus = async () => {
  let permissionsAsserts = {
    camera: "",
    mic: "",
  };
  await navigator.permissions
    .query({ name: "microphone" })
    .then((permissionObj) => {
      permissionsAsserts = {
        ...permissionsAsserts,
        mic: permissionObj.state,
      };
    })
    .catch((error) => {
      console.log("Got error :", error);
    });

  await navigator.permissions
    .query({ name: "camera" })
    .then((permissionObj) => {
      permissionsAsserts = {
        ...permissionsAsserts,
        camera: permissionObj.state,
      };
    })
    .catch((error) => {
      console.log("Got error :", error);
    });
  return permissionsAsserts;
};

export const getDevicesInfos = async (
  videoDevicesList,
  audioDevicesList,
  speakerDeviceList
) => {
  const { camera = "", mic = "" } = await assertsPermissionStatus();
  if (camera !== "granted" || mic !== "granted") {
    const localStream = await getStreams(videoDevicesList, audioDevicesList);
    localStream.getAudioTracks()[0].stop();
    localStream.getVideoTracks()[0].stop();
  }
  const localCamera = await getCamera(videoDevicesList);
  const localMic = await getMic(audioDevicesList);
  return {
    localCamera: localCamera,
    localMic: localMic,
    DeviceIds: {
      video: videoDevicesList,
      audio: audioDevicesList,
      speaker: speakerDeviceList,
    },
  };
};

export const initialLocalStreamSetup = async () => {
  const devices = await getDevices();
  store.dispatch(localDeviceLists(devices));
  const {
    videoDevices = [],
    audioDevices = [],
    audioOutputDevices = [],
  } = devices;
  if (videoDevices.length < 1 || audioDevices.length < 1) {
    return "NO_DEVICE_CONNECTED";
  }
  const speakerId = audioOutputDevices.length
    ? audioOutputDevices[0].deviceId
    : null;
  const streams = await getDevicesInfos(
    videoDevices[0].deviceId,
    audioDevices[0].deviceId,
    speakerId
  );
  store.dispatch(localStreamUpdate({ ...streams }));
};

export const setCameraOptions = async (device, isMute) => {
  diableVideo();
  const localCamera = await getCamera(device.deviceId);
  const cameraPayload = {
    localCamera: localCamera,
    deviceId: device.deviceId,
  };
  if (isMute) {
    cameraPayload?.localCamera?.getTracks().forEach((track) => {
      track.stop();
    });
  }

  store.dispatch(updateCameraStream(cameraPayload));
};

export const setMicOptions = async (device, isMute) => {
  diableAudio();
  const localMic = await getMic(device.deviceId);
  const cameraPayload = {
    localMic: localMic,
    deviceId: device.deviceId,
  };
  if (isMute) {
    cameraPayload?.localMic?.getTracks().forEach((track) => {
      track.stop();
    });
  }

  store.dispatch(updateMicStream(cameraPayload));
};

export const setSpeaker = (device) => {
  store.dispatch(updateSpeaker(device));
};

export const deviceDispatch = async () => {
  const devices = await getDevices();
  store.dispatch(localDeviceLists(devices));
  const deviceIds = getCamMIc();
  const streams = await getDevicesInfos(
    deviceIds?.CamId,
    deviceIds?.MicId,
    deviceIds?.SpeakerId
  );
  console.log(streams, "localStreamUpdate>>>2");
  store.dispatch(localStreamUpdate({ ...streams }));
};

export const addDeviceChange = async () => {
  navigator.mediaDevices.addEventListener("devicechange", async function (e) {
    const updatesDevices = await getDevices();
    store.dispatch(localDeviceLists(updatesDevices));
  });
};
