import React, { useEffect, useState } from "react";
import "./VideoActionButton.scss";
import {
  IconGoLive,
  IconMicActive,
  IconMicInActive,
  IconAdduser,
  IconSetting,
  IconStartRecord,
  IconVideoActive,
  IconVideoInActive,
  IconX,
  IconDisabled,
} from "../../../../assets/img";
import StreamSettings from "../EnteringStream/StreamSettings";
import { IconCopy } from "../../../../assets/images";
import { copyToast, failToast } from "../../../../helper/ApiToast";
import PortalHeader from "../../../../common/Modal/PortalHeader";
import {
  setCameraOptions,
  setMicOptions,
  setSpeaker,
} from "../../../../helper/assetsAwsHelper";
import { useSelector } from "react-redux";
import { getBroadcastURL } from "../../../../aws/awsHelper";
import { apiUrl } from "../../../../helper/ApiUrl";
import { encryptHls } from "../../../../helper/EncryptDecrpt";
import AddCohostPopup from "../AddCohostPopup";
import store from "../../../../store";
import { currentStageArrn } from "../../../../helper/utility";
import { updateCreateParticipantToken } from "../../../../common/helper";
import ScreenSharing from "./ScreenSharing";
import { strategyUpdate } from "../../../../aws/ivsfunctions";
import { saveCamMic } from "../../../../helper/Encypt";

const VideoActionButton = (_props = {}) => {
  const {
    _getGoLive = false,
    handleHangup = () => { },
    enableHangup = true,
    enableAdditionAction = false,
    _handleAudioMute = () => { },
    _handleVideoMute = () => { },
    enableAddParticipants = false,
    muteStatus,
    type,
    _liveHls = "",
    _isHost,
    _enteringStatus,
    handleCameraPermissions,
    handleMicPermissions,
    _handleTimeUpdate = () => { },
    formattedTime,
    isVideoMute,
    isAudioMute,
    isScreenShare
  } = _props;
  const tempDisable = false;
  const [getAudioMute, setAudioMute] = useState(muteStatus?.isAudioMute);
  const [getVideoMute, setVideoMute] = useState(muteStatus?.isVideoMute);
  const [getSetting, setSetting] = useState(false);
  const [getAddParticipants, setAddParticipants] = useState(false);
  const [getRecord, setRecord] = useState(false);
  const awsStageReducer = store.getState()?.awsStageReducer;
  const participantList = store.getState()?.participantListReducer;
  const appOnlineStatus = useSelector((state) => state?.appOnlineStatus); //store
  const currentOrgList = window.localStorage.getItem("currntOrgid")
    ? JSON.parse(window.localStorage.getItem("currntOrgid"))
    : {};
  const broadCastHls = useSelector(
    (state) => state?.broadcastKey?.channel?.playbackUrl
  );
  const record = useSelector((state) => state?.recordReducer?.recordTime)
  const [online, setOnline] = useState(true);
  const [timer, setTimer] = useState(0); // Initial timer value in seconds
  const [addcohost, setcohost] = useState(false);
  const localDeviceListsStore = useSelector((state) => state?.localDeviceLists); //store
  const localStreams = useSelector((state) => state?.localStreams); //store

  useEffect(() => {
    isVideoMute && setVideoMute(isVideoMute);
  }, [isVideoMute]);
  useEffect(() => {
    isAudioMute && setAudioMute(isAudioMute);
  }, [isAudioMute]);

  useEffect(() => {
    if (
      _getGoLive && _liveHls && online && Object.values(record).length > 0
        ? true
        : false
    ) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [_getGoLive, _liveHls, online, Object.values(record).length > 0]);
  useEffect(() => {
    _handleTimeUpdate(timer);
  }, [timer])
  const setOnlineFn = () => {
    setOnline(appOnlineStatus);
  };
  const setOfflinefn = () => {
    setOnline(!appOnlineStatus);
  };
  useEffect(() => {
    window.addEventListener("offline", setOfflinefn);
    window.addEventListener("online", setOnlineFn);

    return () => {
      // Clean up the event listeners when the component unmounts
      window.removeEventListener("offline", setOfflinefn);
      window.removeEventListener("online", setOnlineFn);
    };
  }, []);
  console.log(muteStatus, "muteStatus-----muteStatus")
  const handleAudioMute = (e) => {
    const { audioDevices = [] } = localDeviceListsStore;
    if (e !== "deviceRemoved") {
      e.target.blur();
      if (!audioDevices?.length) {
        failToast("Microphone Device Not Found");
        return;
      }
      _handleAudioMute(!getAudioMute);
      setAudioMute(!getAudioMute);
    } else {
      _handleAudioMute(true);
      setAudioMute(true);
    }
  };
  const handleVideoMute = (e) => {
    const { videoDevices = [] } = localDeviceListsStore;
    console.log(videoDevices, "isVideoPresent")
    if (e !== "deviceRemoved") {
      e.target.blur();
      if (!videoDevices?.length) {
        failToast("Camera Device Not Found");
        return;
      }
      _handleVideoMute(!getVideoMute);
      setVideoMute(!getVideoMute);
    } else {
      console.log("isVideoPresent---4")
      _handleVideoMute(true);
      setVideoMute(true);
    }
  };

  useEffect(() => {
    const videoId = localStreams?.DeviceIds?.video;
    const audioId = localStreams?.DeviceIds?.audio;
    const { videoDevices, audioDevices } = store.getState()?.localDeviceLists;
    const isVideoPresent = videoDevices?.findIndex(ele => ele?.deviceId === videoId);
    const isAudioPresent = audioDevices?.findIndex(ele => ele?.deviceId === audioId);
    if (isVideoPresent < 0 || !localStreams?.localCamera?.active) {
      videoId && handleVideoMute("deviceRemoved");
    }
    if (isAudioPresent < 0 || !localStreams?.localMic?.active) {
      audioId && handleAudioMute("deviceRemoved");
    }
  }, [localDeviceListsStore]);

  const handleSettings = (state = false) => {
    setSetting(state);
  };
  const handleAddParticipant = (state = false) => {
    setAddParticipants(state);
  };
  const isDevicePresent = (deviceId, streamType = "video") => {
    const { audioDevices = [], audioOutputDevices = [], videoDevices = [] } = localDeviceListsStore;
    if (streamType === "video") {
      return videoDevices?.findIndex(ele => ele?.deviceId === deviceId) > -1;
    } else if (streamType === "audio") {
      return audioDevices?.findIndex(ele => ele?.deviceId === deviceId) > -1;
    } else {
      return audioOutputDevices?.findIndex(ele => ele?.deviceId === deviceId) > -1;
    }
  };

  const handleDone = (settings) => {
    const { audio = "", video = "", speaker } = store.getState()?.localStreams?.DeviceIds;
    const deviceIds = {
      CamId: isDevicePresent(settings.videoStream[0]?.deviceId, "video") ? settings.videoStream[0]?.deviceId : video,
      MicId: isDevicePresent(settings.audioStream[0]?.deviceId, "audio") ? settings.audioStream[0]?.deviceId : audio,
      SpeakerId: isDevicePresent(settings.speakerOutput[0]?.deviceId, "audio") ? settings.speakerOutput[0]?.deviceId : speaker,
    };
    saveCamMic(deviceIds);

    if (type === "broadcastView") {
      if ((settings.audioStream[0]?.deviceId || settings.videoStream[0]?.deviceId)
        && (audio !== settings.audioStream[0]?.deviceId || video !== settings.videoStream[0]?.deviceId)) {
        const audioStream = isDevicePresent(settings.audioStream[0]?.deviceId, "audio") ? settings.audioStream[0]?.deviceId : audio;
        const videoStream = isDevicePresent(settings.videoStream[0]?.deviceId, "video") ? settings.videoStream[0]?.deviceId : video;
        strategyUpdate(audioStream, videoStream);
      }
    } else {
      if (settings.videoStream.length > 0 && video !== settings.videoStream[0]?.deviceId) {
        if (!isDevicePresent(settings.videoStream[0]?.deviceId, "video")) {
          failToast("Unable to find the selected Camera");
          return;
        }
        setCameraOptions(settings.videoStream[0], isVideoMute);
      }
      if (settings.audioStream.length > 0 && audio !== settings.audioStream[0]?.deviceId) {
        if (!isDevicePresent(settings.audioStream[0]?.deviceId, "audio")) {
          failToast("Unable to find the selected Mic");
          return;
        }
        setMicOptions(settings.audioStream[0], isAudioMute);
      }
    }
    if (settings.speakerOutput.length > 0 && speaker !== settings.speakerOutput[0]?.deviceId) {
      if (!isDevicePresent(settings.speakerOutput[0]?.deviceId, "speaker")) {
        failToast("Unable to find the selected Speaker");
        return;
      }
      setSpeaker(settings.speakerOutput[0]);
    }
  };

  const _handleCopy = (value = "") => {
    navigator.clipboard.writeText(value);
    copyToast("Copied", "copy"); //toast
  };

  const _handleRecord = () => {
    setRecord(false);
  };
  const stagearn = currentStageArrn(awsStageReducer);
  const handleGetUnRegisteredEmails = async (emailArray = []) => {
    console.log(emailArray, "updateCreateParticipantToken----0");
    updateCreateParticipantToken(emailArray, stagearn, currentOrgList);
  };
  const handleGetRegisteredEmails = (emailArray = []) => {
    console.log("reg", emailArray);
  };

  useEffect(() => {
    if (handleCameraPermissions === "denied" || handleCameraPermissions === "prompt") {
      setVideoMute(true);
    }
  }, [handleCameraPermissions]);

  useEffect(() => {
    if (handleMicPermissions === "denied" || handleMicPermissions === "prompt") {
      setAudioMute(true);
    }
  }, [handleMicPermissions]);

  useEffect(() => {
    console.log("participant----1", participantList?.participantList);
    if (participantList?.participantList.length >= 4) {
      setcohost(false);
    } else {
      setcohost(true);
    }
  }, [participantList?.participantList.length]);
  return (
    <>
      <div className="broadcast_video_btn_group">
        {enableAdditionAction && _getGoLive && (
          <div className="action_feild copy_action">
            <button
              className={`default copy tooltip_black_wraper`}
              onClick={(e) => {
                e.target.blur();
                _handleCopy(
                  `${getBroadcastURL(apiUrl)}${encryptHls(broadCastHls)}`
                );
              }}
              type="button"
            >
              <IconCopy />
              <div className="tooltip_black full">{"Copy Meeting Link"}</div>
            </button>
          </div>
        )}
        <div className="action_feild">
          <button
            className={`default mic ${getAudioMute ? "inactive" : ""} ${_enteringStatus ? "_disabled_btn" : ""
              } tooltip_black_wraper`}
            onClick={
              _enteringStatus
                ? () => { }
                : (e) => {
                  e.target.blur();
                  handleAudioMute(e);
                }
            }
            type="button"
          >
            {!getAudioMute ? <IconMicActive /> : <IconMicInActive />}
            {(handleMicPermissions === "denied" || handleMicPermissions === "prompt") && <div className="icon_disabled"><IconDisabled /></div>}
            <div className="tooltip_black full">{"Audio Mute/Unmute"}</div>
          </button>
        </div>
        <div className="action_feild">
          <button
            onClick={
              _enteringStatus
                ? () => { }
                : (e) => {
                  e.target.blur();
                  handleVideoMute(e);
                }
            }
            className={`default video ${getVideoMute ? "inactive" : ""} ${_enteringStatus ? "_disabled_btn" : ""
              } tooltip_black_wraper`}
            type="button"
          >
            {!getVideoMute ? <IconVideoActive /> : <IconVideoInActive />}
            <div className="tooltip_black full">{"Video on/off"}</div>
            {(handleCameraPermissions === "denied" || handleCameraPermissions === "prompt") && <div className="icon_disabled"><IconDisabled /></div>}
          </button>
        </div>
        {type === "broadcastView" &&
          <ScreenSharing isScreenShare={isScreenShare} />
        }
        <div className="action_feild">
          <button
            onClick={
              (_enteringStatus || tempDisable)
                ? () => { }
                : (e) => {
                  e.target.blur();
                  handleSettings(true);
                }
            }
            className={`default setting tooltip_black_wraper ${_enteringStatus ? "_disabled_btn" : ""
              } ${tempDisable ? " _disabled" : " "
              }`}
            type="button"
            style={{ cursor: tempDisable ? "default" : "" }}
          >
            <IconSetting />
            {!tempDisable && (
              <div className="tooltip_black">{"Settings"}</div>
            )}
          </button>
        </div>
        {/* )} */}
        {enableAddParticipants && _isHost && (
          <div className="action_feild">
            <button
              onClick={(e) => {
                e.target.blur();
                handleAddParticipant(true);
              }}
              className={`default setting tooltip_black_wraper ${!addcohost ? " _disabled_btn" : " "
                }`}
              type="button"
              style={{ cursor: !addcohost ? "default" : "" }}
            >
              <IconAdduser />
              <div className="tooltip_black" style={{ whiteSpace: "nowrap" }}>{"Add Participants"}</div>
            </button>
          </div>
        )}
        {enableAdditionAction && !_getGoLive ? (
          <>
            <div
              style={{ display: "none" }}
              className="action_feild record_action "
            >
              <button
                onClick={(e) => {
                  e.target.blur();
                  _handleRecord();
                }}
                className={` default ${getRecord ? " active " : " "
                  } tooltip_black_wraper`}
                type="button tooltip_black_wraper"
              >
                {!getRecord ? <IconGoLive /> : <IconStartRecord />}
                <div className="tooltip_black">{"Record"}</div>
              </button>
            </div>
          </>
        ) : null}
        {_getGoLive && _liveHls && Object.values(record).length > 0 && (
          <PortalHeader>
            <div
              className={`broadcast_video_record_time ${getRecord ? " animate " : " "
                }`}
            >
              <div className="dot_live"></div>
              <div className="time_live">
                {_getGoLive && _liveHls ? formattedTime : ""}
              </div>
            </div>
          </PortalHeader>
        )}
        {enableHangup ? (
          <div className="action_feild">
            <button
              onClick={(e) => {
                e.target.blur();
                handleHangup();
              }}
              className="danger hangup tooltip_black_wraper"
              type="button"
            >
              <IconX />
              <div className="tooltip_black">{"Hangup"}</div>
            </button>
          </div>
        ) : null}
      </div>
      {getSetting ? (
        <StreamSettings
          _handleOnOutsideClick={() => handleSettings(false)}
          handleDone={(e) => handleDone(e)}
          type={type}
          isVideoMute={isVideoMute}
          isAudioMute={isAudioMute}
        />
      ) : null}
      {getAddParticipants && enableAddParticipants && addcohost && (
        <AddCohostPopup
          heading={"Add Participants"}
          tooltipDesc="Inviting participants so they can make changes to the live stream settings if needed."
          _handleGetRegisteredEmails={handleGetRegisteredEmails}
          _handleGetUnRegisteredEmails={handleGetUnRegisteredEmails}
          _handleOnOutsideClick={() => handleAddParticipant(false)}
          participantList={participantList?.participantList}
        />
      )}
    </>
  );
};

export default VideoActionButton;
