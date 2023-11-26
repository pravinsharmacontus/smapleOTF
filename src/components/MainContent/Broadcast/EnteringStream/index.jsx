import React, { useEffect, useState } from "react";
import "./EnteringStream.scss";
import {
  IconChevronLeft,
  IconMic,
  ImgEnteringGraphics,
  Imgplaceholder,
  LottieLoaderBlue,
} from "../../../../assets/img";
import Lottie from "lottie-react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import VideoActionButton from "../VideoActionButton";
import { saveCamMic } from "../../../../helper/Encypt";
import { joinStage } from "../../../../aws/ivsfunctions";
import { unmuteStream } from "../../../../helper/AwsDeviceAccess";
import { getDeleteStageResponse, handleMixpanelTrack, isOffline } from "../../../../common/helper";
import { constantValue } from "../../../../const/errorTypes";
import { toastInternet } from "../../../../helper/ApiToast";
import { startMeter } from "../../../../volumeMeter/main";
import { appStatusAction } from "../../../../store/action/awsActions";
import store from "../../../../store";
import { BROADCAST_CALL, PREVIEW } from "../../../../constant";
import { IconLoader } from "../../../../assets/images";
import AddCohostPopup from "../AddCohostPopup";
import { refreshPage } from "../../../../helper";
import { currentStageArrn, getCurrentOrgId, isHost } from "../../../../helper/utility";
import { fbLiveListener, updateParticipantCount, updateParticipantPostion } from "../../../../firebase/firebaseRealtimeFunctions";
import { InBroadcastScreenAction, InBroadcastScreenBackAction } from "../../../../store/action/tempAction";
import { userDetailsLocal } from "../../../../helper/RoleConfig";
import { getStageData } from "../../../../aws/awsHelper";

function EnteringStream(_props = {}) {
  const { t } = useTranslation();
  const {
    handleEntering = () => { },
    handleMuteStatus = () => { },
    _handleBack = () => { },
    //  userRoleId
  } = _props;
  const broadcastScreenBackStatus = useSelector((state) => state?.BroadcastScreenBackReducer?.broadcastScreenBackStatus); //store
  const broadcastScreenStatus = useSelector((state) => state?.BroadcastScreenReducer?.broadcastScreenStatus); //store
  const [getVideo, setVideo] = useState(true);
  const [getVideoEle, setVideoEle] = useState(true);
  const [getVideoLoader, setVideoLoader] = useState(false);
  const [getMicOn, setMicOn] = useState(true);
  const [deviceBlocked, setDeviceBlocked] = useState(false);
  const [updateStream, setUpdateStream] = useState(false);
  const [enteringStatus, setEnteringStatus] = useState(false);
  const [showTrailPopup, setShowTrailPopup] = useState(false);
  const [getEnteringAnimation, setEnteringAnimation] = useState(false);
  const stageData = useSelector((state) => state?.awsStageReducer); //store
  const localStreams = useSelector((state) => state?.localStreams); //store
  const cameraPermissions = useSelector((state) => state?.cameraPermissions);
  const micPermissions = useSelector((state) => state?.micPermissions);
  const broadcastBranding = useSelector((state) => state?.broadcastBranding); //store
  const tempStreams = useSelector((state) => state?.tempStreams); //store

  const awsStageReducer = useSelector((state) => state?.awsStageReducer); //store
  const currentStageData = awsStageReducer.method === "create" ? getStageData(awsStageReducer) : awsStageReducer;
  const { sessionName = "" } = currentStageData;

  let unMuteVideo;
  let unMuteAudio;

  const setStream = async (videoDevices, audioDevices) => {
    const testVideo = document.getElementById("test-video-element");
    testVideo.srcObject = new MediaStream();
    const localcamera = new MediaStream(videoDevices);
    testVideo.srcObject = localcamera;
  };

  const handleToggleVideo = async (value) => {
    const { localCamera } = localStreams;
    if (value) {
      const tracks = localCamera.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      if (unMuteVideo) {
        const videoTracks = unMuteVideo.getTracks();
        videoTracks.forEach((track) => {
          track.stop();
        });
      }
    } else {
      unMuteVideo = await unmuteStream("VIDEO");
      setStream(unMuteVideo);
    }
    setVideo(!value);
    if (value === false) {
      setVideoLoader(true);
      setTimeout(() => {
        setVideoEle(!value);
        setVideoLoader(false);
      }, 600);
    }
    handleMuteStatus("VIDEO", value);
  };

  const handleToggleAudioMic = async (state) => {
    const { localMic } = localStreams;
    if (state) {
      const tracks = localMic.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      if (unMuteAudio) {
        const audioTracks = unMuteAudio.getTracks();
        audioTracks.forEach((track) => {
          track.stop();
        });
      }
    } else {
      unMuteAudio = await unmuteStream("AUDIO");
      startMeter(unMuteAudio);
    }
    setMicOn(!state);
    handleMuteStatus("AUDIO", state);
  };
  const layoutUpdate = () => {
    const { participantCount = 0 } = broadcastBranding;
    updateParticipantCount(getCurrentOrgId(), currentStageArrn(stageData), participantCount + 1);
    updateParticipantPostion(getCurrentOrgId(), currentStageArrn(stageData), participantCount + 1);
  };

  const _handleEntering = async () => {

    const _userDetails = userDetailsLocal() || {}; //logged userDetails
      const { data: { firstName = "", email = "", organisationName } = {} } = _userDetails; //logged userDetails
    if (isOffline()) {
      toastInternet(constantValue.INTERNET_ERROR);
      return;
    }
    if (micPermissions === "denied" || micPermissions === "prompt" || cameraPermissions === "denied" || cameraPermissions === "prompt") {
      setDeviceBlocked(true);
      handleMixpanelTrack("Enter_Stream_Failure", {
        otfName: firstName,
        otfEmail: email,
        otfOrganisationName: organisationName,
        otfBroadcastName: sessionName,
        OtfError : micPermissions
      });
      return;
    }

    const response = await getDeleteStageResponse(currentStageArrn(stageData))
    if (response?.isDelete === 1) {
      setShowTrailPopup(true);
      handleMixpanelTrack("Enter_Stream_Failure", {
        otfName: firstName,
        otfEmail: email,
        otfOrganisationName: organisationName,
        otfBroadcastName: sessionName,
        OtfError : "Stage Deleted"
      });
      return;
    }
    handleMixpanelTrack("Enter_Stream_Success", {
      otfName: firstName,
      otfEmail: email,
      otfOrganisationName: organisationName,
      otfBroadcastName: sessionName,
    });
    setEnteringAnimation(true);
    const deviceIds = {
      CamId: localStreams?.DeviceIds?.video,
      MicId: localStreams?.DeviceIds?.audio,
      SpeakerId: localStreams?.DeviceIds?.speaker,
    };
    saveCamMic(deviceIds);
    setEnteringStatus(true);
    !isHost(stageData) && layoutUpdate();
    setTimeout(async () => {
      joinStage(stageData, {
        isVideoMute: !getVideo,
        isAudioMute: !getMicOn,
      });
      setEnteringAnimation(false);
      handleEntering(stageData);
      store.dispatch(appStatusAction(BROADCAST_CALL));
    }, 2000);
  };

  useEffect(() => {
    store.dispatch(appStatusAction(PREVIEW));
    handleMuteStatus("VIDEO", !getVideo);
    handleMuteStatus("AUDIO", !getMicOn);
    store.dispatch(InBroadcastScreenAction(true));
    return () => {
      if (unMuteVideo) {
        const videoTracks = unMuteVideo.getTracks();
        videoTracks.forEach((track) => {
          track.stop();
        });
      }
      if (unMuteAudio) {
        const audioTracks = unMuteAudio.getTracks();
        audioTracks.forEach((track) => {
          track.stop();
        });
      }
    }

  }, []);
  useEffect(() => {
    if (cameraPermissions === "denied" || cameraPermissions === "prompt") {
      handleToggleVideo(true);
    }
  }, [cameraPermissions]);

  useEffect(() => {
    if (micPermissions === "denied" || micPermissions === "prompt") {
      handleToggleAudioMic(true);
    }
  }, [micPermissions]);

  useEffect(() => {
    if (stageData?.orgId && stageData?.stageArn) {
      fbLiveListener(stageData?.orgId, stageData?.stageArn);
    }
  }, [stageData]);

  useEffect(() => {
    const { localCamera, localMic } = localStreams;
    if (localMic) {
      getMicOn && startMeter(localMic);
    }
    if (localStreams && (localCamera?.id !== updateStream)) {
      getVideo && setStream(localCamera, localMic);
      setUpdateStream(localCamera?.id);
    }
  }, [localStreams, tempStreams]);

  useEffect(() => {
    store.dispatch(InBroadcastScreenBackAction(true));
  }, []);

  useEffect(() => {
    if (!broadcastScreenBackStatus && broadcastScreenStatus) {
      _handleBack();
    }
  }, [broadcastScreenBackStatus, broadcastScreenStatus]);
  return (
    <div className="entering_stream_wraper">
      <div className="entering_stream_inner">
        {!enteringStatus && (
          <button
            onClick={() => _handleBack()}
            className="action_back_btn"
            type="button"
          >
            <IconChevronLeft />
            {t("COMMON.BACK")}
          </button>
        )}
        <div className="entering_stream_head">
          <h1>Entering Stream...</h1>
        </div>
        <div className="entering_stream_body">
          <div className="entering_stream_customize border-none">
            {!getEnteringAnimation ? (
              <>
                <div className="entering_stream_customize_mic">
                  <i>
                    <IconMic />
                  </i>
                  <canvas
                    id="mic_volume"
                    className="mic_volume mic_volume_off mic_0 mic_30 mic_60 mic_90"
                  ></canvas>
                  <span className={` ${getMicOn ? "mic_on" : "mic_off"}`}>
                    {getMicOn ? "Mic is working " : "Turn on the mic"}
                  </span>
                </div>
                <div className="entering_stream_customize_video">
                  <div className="entering_stream_video">
                    <>
                      <video
                        className="video_mirror"
                        id="test-video-element"
                        style={{
                          display: getVideo ? "block" : "none",
                          opacity: getVideoEle ? 1 : 0,
                        }}
                        autoPlay
                      ></video>
                      {getVideoLoader && getVideo ? (
                        <div className="video_res_loader">
                          <IconLoader fill="#fff" />
                        </div>
                      ) : null}
                    </>
                    <img
                      width="117px"
                      height="117px"
                      style={{
                        "z:index": "100",
                        display: !getVideo ? "block" : "none",
                      }}
                      src={Imgplaceholder}
                      alt="profile"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="entering_stream_graphics">
                <img
                  width="520px"
                  height="268px"
                  src={ImgEnteringGraphics}
                  alt="entering"
                />
              </div>
            )}
          </div>
          <div className="entering_stream_note">
            <strong>Note: </strong>
            <p>Max 4 persons can be joined in the live streaming</p>
          </div>
        </div>
        <div className="entering_stream_foot">
          <div className="entering_stream_actions">
            <VideoActionButton
              enableHangup={false}
              _handleAudioMute={(e) => handleToggleAudioMic(e)}
              _handleVideoMute={(e) => handleToggleVideo(e)}
              _enteringStatus={enteringStatus}
              handleCameraPermissions={cameraPermissions}
              handleMicPermissions={micPermissions}
              isVideoMute={!getVideo}
              isAudioMute={!getMicOn}

            />
            {getEnteringAnimation ? (
              <div className="icon_loader_wraper">
                <Lottie
                  className="icon_loader"
                  animationData={LottieLoaderBlue}
                  loop={true}
                />
                <span>Loading</span>
              </div>
            ) : (
              <button
                onClick={_handleEntering}
                type="button"
                className="entering_stream_enter"
              >
                Enter Stream{" "}
              </button>
            )}
          </div>
        </div>
        {showTrailPopup ? <AddCohostPopup
          _handleOnOutsideClick={() => setShowTrailPopup(false)}
          type="joinDeletePopup"
          handleExit={() => {
            refreshPage();
          }}
        /> : null}
      </div>
      {deviceBlocked ? (
        <AddCohostPopup
          _handleOnOutsideClick={() => setDeviceBlocked(false)}
          type="assertAccess"
        />
      ) : null}
    </div>
  );
}

export default EnteringStream;
