import React, { useEffect, useState } from "react";
import { IconMicInActive, Imgplaceholder } from "../../../../assets/img";
import { getStream, isMuted } from "../../../../aws/awsHelper";
import { getUserListName } from "../../../../common/helper";
import "./BroadcastParticiapants.scss";
import { useSelector } from "react-redux";
import { getCurrentUserId, setColorCode } from "../../../../helper/utility";
import store from "../../../../store";
import { awsParticipantDataAction } from "../../../../store/action/awsActions";

export const setSpeaker = async () => {
  const localStream = {};
  const participantsData = {};
  const audioStream = {};
  const {
    DeviceIds: { speaker },
  } = localStream;
  if (audioStream && !participantsData.isLocal) {
    const audioElement = document.getElementById(
      `audio-participants-${participantsData.id}`
    );
    if (audioElement) {
      await audioElement.setSinkId(speaker);
    }
  }
};

function SmallVideo(props) {
  const {
    largeVideo = false,
    getCanvasHeight = 0,
    participantsData = {},
    type = "",
    videoMute,
    _getZoom = true,
    audioMute,
    getMetaData = () => { },
    fbBannerStyle = "",
    fbBannerBgColor = "",
    FbBannerTextColor = "",
    screenShareId = ""
  } = props;
  const bannerStatus = useSelector((state) => state?.broadcastBranding?.bannerStatus); //store
  const localStream = useSelector((state) => state?.localStreams);
  console.log(participantsData, "participantsDataparticipantsDataparticipantsData")
  const style = {
    borderTopLeftRadius: fbBannerStyle === "" && largeVideo ? `calc(calc(1.25/100) * ${getCanvasHeight}px) calc(calc(1.25/100) * ${getCanvasHeight}px)` : null,
    borderBottomLeftRadius: fbBannerStyle === "" && largeVideo ? `calc(calc(1.25/100) * ${getCanvasHeight}px) calc(calc(1.25/100) * ${getCanvasHeight}px)` : null,
    marginLeft: largeVideo ? `calc(calc(.5/100) * ${getCanvasHeight}px)` : null,
    borderLeftWidth: fbBannerStyle === "" && largeVideo ? `calc(calc(2/100) * ${getCanvasHeight}px)` : null,
    // height: largeVideo ? `calc(calc(7/100) * ${getCanvasHeight}px)` : null,
    fontSize: largeVideo ? `calc(calc(3.46/100) * ${getCanvasHeight}px)` : null,
    padding: largeVideo ? `calc(calc(1.4/100) * ${getCanvasHeight}px) calc(calc(2.8/100) * ${getCanvasHeight}px)` : null,
    borderLeftColor: fbBannerStyle === "" ? fbBannerBgColor : '',
    background: fbBannerStyle === "" ? ` ` : fbBannerBgColor,
    color: setColorCode(fbBannerStyle, fbBannerBgColor, FbBannerTextColor)
  };
  const [isVideoMute, setIsVideoMute] = useState();
  const [isAudioMute, setIsAudioMute] = useState();
  const [userName, setUserName] = useState("");
  const videoStream =
    Object.keys(participantsData).length !== 0 &&
    getStream(participantsData, "video");
  const audioStream =
    Object.keys(participantsData).length !== 0 &&
    getStream(participantsData, "audio");
  const setMuteStatus = (participantMute) => {
    const videoStreamReadyState =
      participantMute?.stream?.find((ele) => ele.streamType === "video")
        ?.mediaStreamTrack?.readyState === "live";
    const audioStreamReadyState =
      participantMute?.stream?.find((ele) => ele.streamType === "audio")
        ?.mediaStreamTrack?.readyState === "live";
    if (videoStreamReadyState) {
      setIsVideoMute(isMuted(participantMute, "video"));
    }
    if (audioStreamReadyState) {
      setIsAudioMute(isMuted(participantMute, "audio"));
    }
  };
  const setStream = (muteType = "") => {
    if (
      muteType === "" &&
      videoStream &&
      (isVideoMute !== isMuted(participantsData, "video") || (participantsData?.updateLocalStream))
    ) {
      const videoElement = document.getElementById(
        `video-${type}-${participantsData.id}`
      );
      if (videoElement) {
        videoElement.srcObject = new MediaStream();
        videoElement.srcObject.addTrack(videoStream);
      }
      setTimeout(() => {
        if (type === "participants" && participantsData?.updateLocalStream) {
          store.dispatch(
            awsParticipantDataAction({ ...participantsData, updateLocalStream: "alter" })
          );
        }
      }, [400]);
    }
    if (
      audioStream &&
      !participantsData.isLocal &&
      isAudioMute !== isMuted(participantsData, "audio")
    ) {
      const audioElement = document.getElementById(
        `audio-participants-${participantsData.id}`
      );
      if (audioElement) {
        audioElement.srcObject = new MediaStream();
        audioElement.srcObject.addTrack(audioStream);
      }
    }
    if (screenShareId !== getCurrentUserId()) {
      const audioElement = document.getElementById(
        `audio-screen-share-${participantsData.id}`
      );
      if (audioElement) {
        audioElement.srcObject = new MediaStream();
        audioElement.srcObject.addTrack(audioStream);
      }
    }
    setMuteStatus(participantsData);

  };

  useEffect(() => {
    console.log(participantsData, "participantsData---participantsData")
    setStream();
    async function fetchUserName() {
      const response = await getUserListName(participantsData?.userId);
      setUserName(response);
    }
    fetchUserName();
  }, [participantsData]);

  useEffect(() => {
    setStream("audio");
  }, [audioMute]);
  useEffect(() => {
    setStream();
  }, [videoMute]);
  useEffect(() => {
    getMetaData(`video-${type}-${participantsData.id}`);
    return () => {
      setIsVideoMute();
      setIsAudioMute();
    };
  }, []);

  useEffect(() => {
    if (localStream) {
      const {
        DeviceIds: { speaker },
      } = localStream;
      async function updateSpeaker() {
        const audioElement = document.getElementById(
          `audio-participants-${participantsData.id}`
        );
        if (audioElement) {
          await audioElement.setSinkId(speaker);
        }
      }
      updateSpeaker();
    }
  }, [localStream])

  return (
    <>
      {videoMute ? (
        <div className={`broadcast_particiapant_pic `}>
          <img
            style={{ "z:index": "100" }}
            src={Imgplaceholder}
            alt="profile"
          />
          {(!bannerStatus || type !== "broadcast-participants") && userName !== "" ?
            <div style={{ opacity: _getZoom ? 1 : 0 }}
              className={`broadcast_particiapant_name ${videoMute ? "with_img" : " with_vdo "
                }`}
            >
              <span style={style}
                className={`broadcast_particiapant_badge ${fbBannerStyle === "" ? "default" : "style" + fbBannerStyle}`}
                id={`dpName-${type}-${participantsData.id}`} title={userName}>
                {userName}{" "}
              </span>
            </div>
            : null}
        </div>
      ) : (
        <>
          <video
            id={`video-${type}-${participantsData.id}`}
            autoPlay
            preload="none"
            className={`${participantsData.isLocal ? "video_mirror" : ""}`}
          ></video>
          {(!bannerStatus || type !== "broadcast-participants") && userName !== "" && type !== "screen-share" ?
            <div
              style={{ opacity: _getZoom ? 1 : 0 }}
              className={`broadcast_particiapant_name ${videoMute ? "with_img" : " with_vdo "
                }`}
            >
              <span style={style}
                className={`broadcast_particiapant_badge ${fbBannerStyle === "" ? "default" : "style" + fbBannerStyle}`}
                id={`dpName-${type}-${participantsData.id}`} title={userName}>
                {userName}{" "}
              </span>
            </div> : null
          }
        </>
      )}
      {type === "participants" && isMuted(participantsData, "audio") ?
        <div className="mic_inactive"><IconMicInActive /></div> :
        null
      }
      {!audioMute && (
        <>
          <audio id={`audio-${type}-${participantsData.id}`} autoPlay />
        </>
      )}
    </>
  );
}

export default React.memo(SmallVideo);
