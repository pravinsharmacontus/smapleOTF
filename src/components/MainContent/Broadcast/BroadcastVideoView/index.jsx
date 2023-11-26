/* eslint-disable no-return-assign */
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import "./BroadcastVideoView.scss";
import { IconCopy, IconLoaderBlue, IconRedI, IconToastInfo, IconX } from "../../../../assets/images";
import BroadcastCaption from "../BroadcastCaption";
import {
  Imgplaceholder,
  IconMenu,
  IconSidebar,
  ImgDevUserPlaceholder,
  LottieLiveAnimation,
  IconParticipant,
  IconFullScreen,
  IconFullScreenActive,
  IconShareEmbed,
  mirrorflyDefault,
  ImgTransparent,
  ImgBroadcastBg0,
  ImgBroadcastBg1,
  ImgBroadcastBg2,
  ImgBroadcastBg3,
  IconPrivateChat,
} from "../../../../assets/img";
import BroadcastBrandDetails from "../BroadcastBrandDetails";
import BroadcastParticiapants from "../BroadcastParticiapants";
import { copyToast, failToast } from "../../../../helper/ApiToast";
import VideoActionButton from "../VideoActionButton";
import { useSelector } from "react-redux";
import { isEmptyArray } from "formik";
import SmallVideo from "../BroadcastParticiapants/smallVideo";
import {
  handleBannerUpdate,
  initialBroadCast,
  updateBannerTextBC,
  updateBannerThemeStyle,
  updateBroadcastImage,
  updateBroadcastLayout,
  updateLiveScreenShare,
  updateParticipantBannerStyle,
} from "../../../../aws/broadcastFunction";
import { leaveScreenShare, leaveStage, strategyUpdate } from "../../../../aws/ivsfunctions";
import store from "../../../../store";
import {
  getAwsStreamData,
  getStageData,
  hostData,
  localLeftStage,
  screenShareData,
} from "../../../../aws/awsHelper";
import {
  appStatusAction,
  awsGetBroadcastData,
  awsGetMeetingData,
  awsGetPast,
  updateCallStatusAction,
} from "../../../../store/action/awsActions";
import ComponentParticipant from "./ComponentParticipant";
import { useHistory } from "react-router-dom";
import Lottie from "lottie-react";
import {
  closeScreenShareAlert,
  getDeleteStageResponse,
  handleMixpanelTrack,
  isEmptyObject,
  localParticipantId,
} from "../../../../common/helper";
import { diableDevicesEndBC, verifyDeviceAdded } from "../../../../helper/AwsDeviceAccess";
import { encryptHls } from "../../../../helper/EncryptDecrpt";
import BroadcastLayouts from "../BroadcastBrandDetails/BroadcastLayouts";
import {
  fbLiveListener,
  unsubscribeStage,
  updateAudioMutedParticipants,
  updateBannerBgColor,
  updateBannerTextColor,
  updateCallStartTime,
  updateEndTime,
  updateGoLive,
  updateHlsLink,
  updateLayoutData,
  updateParticipantCount,
  updateParticipantPostion,
  updateScreenShare,
  updateVideoMutedParticipants,
  updateWarningTime,
} from "../../../../firebase/firebaseRealtimeFunctions";
import {
  YOUTUBE_API_KEY,
  apiUrl,
  broadcastURL,
  endTime,
  warningTime,
  youtubeApiUrl,
} from "../../../../helper/ApiUrl";
import {
  currentStageArrn,
  getCurrentOrgId,
  isHostJoined,
  positioningHost,
  positioningMembers,
  reorderParticipantList,
  HexColorRegex,
  setColorCode,
  getCurrentUserId,
  deleteChatGroup,
  filterSSDate,
  filteredSSDate,
} from "../../../../helper/utility";
import { AUDIO_MUTE_TOAST, BROADCAST_CALL, BROADCAST_CALL_LIVE, VIDEO_MUTE_TOAST } from "../../../../constant";
import AddCohostPopup from "../AddCohostPopup";
import { refreshPage } from "../../../../helper";
import {
  editStreamAction,
  editStreamPopupAction,
  editStreamSaveAction,
  endYTLoaderAction,
  getAccessTokenAction,
  showYoutubeAction,
  startYTLoaderAction,
  timerPopup,
} from "../../../../store/action/editStreamAction";
import axios from "axios";
import { Delete, Get, Post } from "../../../../common/httpRestServices";
import { colorContrastChecker } from "../BroadcastBrandDetails/ColorContrastChecker";
import BroadcastVideoOverlay from "./BroadcastVideoOverlay";
import { InBroadcastScreenAction, clearSession, recordedTimeAction } from "../../../../store/action/tempAction";
import moment from "moment";
import Loader from '../../../../common/Loader/index';
import { ToastService } from "../../../../common";
import { getParticipantListAction } from "../../../../store/action/participantAction";
import { userDetailsLocal } from "../../../../helper/RoleConfig";

const BroadcastVideoView = (props) => {
  const tempHide = false;
  const [getCanvasWidth, setCanvasWidth] = useState("");
  const [getShowAlert, setShowAlert] = useState(true);
  const [getImageWidth, setImageWidth] = useState(260);
  const [getImageheight, setImageheight] = useState(56);
  const [getDynImageWidth, setDynImageWidth] = useState(0);
  const [getDynImageHeight, setDynImageHeight] = useState(0);
  const [getSmallVideoHight, setSmallVideoHight] = useState(110);
  const [getCanvasHeight, setCanvasHeight] = useState("");
  const [getCanvasParentHeight, setCanvasParentHeight] = useState("");
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [mediaCheck, setMediaCheck] = useState(false);
  const [handleReferesh, setHandleReferesh] = useState(false);
  const history = useHistory();
  const {
    isHost,
    leftStage = () => { },
    muteStatus,
    FbData = {},
    setIsTimeout = () => { },
    searchData = {},
    currentOrg = 0,
    userId = 0,
    isTimeout,
  } = props;
  const {
    fbLayout,
    fbHlsLink,
    fbGoLive,
    fbBannerText,
    fbBannerStatus,
    fbBannerBackground,
    fbBannerStyle,
    fbBannerBgColor,
    FbBannerTextColor,
    FbBannerTopOverlay,
    fbWarningTime,
    fbEndTime,
    FbIsLogoRight,
  } = FbData;
  const myInput = useRef(null);
  const [getGoLive, setGoLive] = useState(true);
  const [getBannerImage, setBannerImage] = useState("");
  const [muteStatusUsed, setMuteStatusUsed] = useState(false);
  const [muteStatusUsedAudio, setMuteStatusUsedAudio] = useState(false);
  const [liveHls, setLiveHls] = useState("");
  const [getZoom, setZoom] = useState(true);
  const [showTrailPopup, setShowTrailPopup] = useState(false);
  const [getCohostEndPopup, setCohostEndPopup] = useState(false);
  const [getCohostWarningPopup, setCohostWarningPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [endTimeOut, setEndTimeOut] = useState(false);
  const [stageStatus, setStageStatus] = useState("");
  const [getLaytoutType, setLaytoutType] = useState("");
  const [getbroadcastId, setbroadcastId] = useState("");
  const [userClick, setUserClick] = useState(0);
  const [getStreamChannelId, setStreamChannelId] = useState("");
  const [getStreamInputId, setStreamInputId] = useState("");
  const [liveClick, setLiveCLick] = useState(false);
  const [offlineExit, setOfflineExit] = useState(false);
  const [getMenus, setMenus] = useState(isHost ? "Brand" : "Chat");
  const [getMenusOpen, setMenusOpen] = useState(true);
  const [callExit, setCallExit] = useState(false);
  const [layoutAltered, setLayoutAltered] = useState(false);
  const [formattedTime, setFormattedTime] = useState(0);
  const [getTimeMillesecond, setTimeMillesecond] = useState(0);
  const [currentUserPosition, setCurrentUserPosition] = useState(false);
  const [getConnectedMedia, setConnectedMedia] = useState(false);
  const participants = useSelector((state) => state?.stageParticipants); //store
  const participantsData = useSelector((state) => state?.stageParticipantsData); //store
  const awsStageReducer = useSelector((state) => state?.awsStageReducer); //store
  const broadcastKey = useSelector((state) => state?.broadcastKey); //store
  const recordT1 = store.getState();
  const broadcastBranding = useSelector((state) => state?.broadcastBranding); //store
  const appOnlineStatus = useSelector((state) => state?.appOnlineStatus); //store
  const appStatus = useSelector((state) => state?.appStatus); //store
  const ImgLogo = useSelector((state) => state?.broadcastLogo) || mirrorflyDefault;
  const [getLogoShowLoader, setLogoShowLoader] = useState(false);
  const [getLogo, setLogo] = useState(ImgLogo);
  const commonData = useSelector((state) => state?.commonData); //store
  const { getAccessToken, reconnectAccount, timerPopup:timerPopupState } = commonData;
  const [getYTDetails, setYTDetails] = useState("");
  const [currentParticipantToLive, setCurrentParticipantToLive] = useState([]);
  const [isVideoMute, setVideoMute] = useState(false);
  const [isAudioMute, setAudioMute] = useState(false);
  const [isDevicePermissionChange, setIsDevicePermissionChange] =
    useState(false);
  const _stageArn = currentStageArrn(awsStageReducer);
  const handleSaveYTHeader = localStorage.getItem("editStreamSave");
  // const handleStreamChannelId = JSON.parse(localStorage.getItem("streamChannelId"));
  // const handleStreamInputId = JSON.parse(localStorage.getItem("streamInputId"));
  const temphide = false;
  const mediaSelectionLocal = localStorage.getItem("Select_Media")
    ? JSON.parse(localStorage.getItem("Select_Media")) : "";
  const currentOrgList = window.localStorage.getItem("currntOrgid")
    ? JSON.parse(window.localStorage.getItem("currntOrgid"))
    : {};
  const fbHostId = broadcastBranding?.host || "";
  const fbPosition1 = broadcastBranding?.postion1 || "";
  const fbPosition2 = broadcastBranding?.postion2 || "";
  const fbPosition3 = broadcastBranding?.postion3 || "";
  const fbLogoDimension = broadcastBranding?.logoDimension || "";
  const fbIsScreenShare = broadcastBranding?.isScreenShare || false;
  const fbParticipantCount = broadcastBranding?.participantCount || "";
  const videoMutedParticipants = broadcastBranding?.videoMutedParticipants || [];
  const audioMutedParticipants = broadcastBranding?.audioMutedParticipants || [];
  const sessionMemberCount = broadcastBranding?.sessionMemberCount || [];
  const cameraPermissions = useSelector((state) => state?.cameraPermissions);
  const micPermissions = useSelector((state) => state?.micPermissions);
  const globalData = useSelector((state) => state) || {};
  const getFBUserPage = globalData?.facebookData?.facebookPageConnected;
  // const getFBUserPage = JSON.parse(localStorage.getItem("EditConnectedFB"));
  const currentStageData =
    awsStageReducer.method === "create"
      ? getStageData(awsStageReducer)
      : awsStageReducer;
  const { stageArn = "", sessionName = "" } = currentStageData;

  const deleteStream = async () => {
    const handleStreamChannelIds = JSON.parse(localStorage.getItem("streamChannelId"));
    const handleStreamInputIds = JSON.parse(localStorage.getItem("streamInputId"));
    try {
      const responseDeleteStream = await Delete(
        `${apiUrl}api/customer/deleteLiveStream?streamChannelId=${handleStreamChannelIds}&streamInputId=${handleStreamInputIds}`, {}, true
      );
      console.log("responseStopStream:", responseDeleteStream);

      if (responseDeleteStream.status === 400) {
        console.log("1q1q 400 responseDeleteStream:", responseDeleteStream);
        handleStreamChannelIds && deleteStream();
      }
      if (responseDeleteStream.status === 200) {
        localStorage.removeItem("streamChannelId");
        localStorage.removeItem("streamInputId");

      }
    } catch (error) {
      console.error("Error fetching deleteStream data:", error);
      console.log("Response deleteStream data error:", error?.response?.data);
    }
  };

  const endLiveStream = async (tokenResponse) => {
    console.log("endLiveStream", getbroadcastId);
    const ACCESS_TOKEN = tokenResponse?.access_token;
    const headers = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    try {
      const mediaSelection = JSON.parse(localStorage.getItem('Select_Media'));
      const responseBroadcastEndStreamTransition = mediaSelection === "YT" && await axios.post(
        `${youtubeApiUrl}liveBroadcasts/transition?part=id,snippet,contentDetails,status&broadcastStatus=complete&id=${getbroadcastId}`,
        "",
        { headers }
      );
      console.log(
        "1q1q Broadcast Status responseBroadcastEndStreamTransition:",
        responseBroadcastEndStreamTransition
      );
    } catch (error) {
      console.error("Error fetching endLiveStream data:", error);
      console.log("Response endLiveStream data error:", error?.response?.data);
    }
  };

  const stopStream = async (streamChannelId) => {
    const handleStreamChannelIds = JSON.parse(localStorage.getItem("streamChannelId"))
      ? JSON.parse(localStorage.getItem("streamChannelId")) : streamChannelId;
    try {
      const responseStopStream = await Post(
        `${apiUrl}api/customer/stopLiveStreamChannel?streamChannelId=${handleStreamChannelIds}`, {}, true
      );
      console.log("responseStopStream:", responseStopStream);

      if (responseStopStream?.status === 200) {
        deleteStream();
        endLiveStream(getYTDetails?.authToken);
      }
      if (responseStopStream?.status === 400) {
        const handleStreamChannel = JSON.parse(localStorage.getItem("streamChannelId"));
        console.log("1q1q 400 responseStopStream:", responseStopStream);
        handleStreamChannel && stopStream(handleStreamChannel);
      }
    } catch (error) {
      console.error("Error fetching StopStream data:", error);
      console.log("Response StopStream data error:", error?.response?.data);
    }
  };

  const fetchData = () => {
    return Get(`${apiUrl}api/customer/getMediaConfigs?mediaType=YT`, true).then((res) => {
      store.dispatch(getAccessTokenAction(res?.data?.data?.mediaConfigList[0]))
    }).catch((err) => {
      console.error('Error fetching responseGetMediaConfig data:', err);
    });
  };

  useEffect(() => {
    fetchData();
    setYTDetails(getAccessToken);
    localStorage.removeItem("streamChannelId");
    localStorage.removeItem("streamInputId");
    window.sessionStorage.removeItem("EndSessionPopStatus");
  }, []);

  useEffect(() => {
    setYTDetails(getAccessToken);
  }, [getAccessToken]);
  useEffect(() => {
    store.dispatch(InBroadcastScreenAction(true));
  }, []);

  useEffect(() => {
    async function getStageDetails() {
      await getDeleteStageResponse(
        currentStageArrn(awsStageReducer)
      );
    }
    getStageDetails();
  }, []);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleBroadCastLanding = (ele = "") => {

    const userDetails = userDetailsLocal() || {}; //logged userDetails
    const { data: { firstName = "", email = "", organisationName } = {} } = userDetails; //logged userDetails
    handleMixpanelTrack("Broadcast_Hangup", {
      otfName: firstName,
      otfEmail: email,
      otfOrganisationName: organisationName,
      otfBroadcastName: sessionName,
    });
    setIsTimeout(false);
    history.push({
      pathname: "/broadcast",
    });
    store.dispatch(InBroadcastScreenAction(false));
    store.dispatch(editStreamAction(false));
    store.dispatch(showYoutubeAction(false));
    store.dispatch(getAccessTokenAction());
    store.dispatch(startYTLoaderAction(false));
    store.dispatch(editStreamPopupAction(false));
    store.dispatch(editStreamSaveAction(false));
    localStorage.removeItem("EditConnectedFB");
    localStorage.removeItem("editStreamSave");
    localStorage.removeItem("Select_Media");
    deleteChatGroup();
    const handleStreamChannelIds = JSON.parse(localStorage.getItem("streamChannelId"))
      ? JSON.parse(localStorage.getItem("streamChannelId")) : "";
    if (getStreamChannelId || getStreamInputId && getbroadcastId) {
      handleStreamChannelIds && stopStream(handleStreamChannelIds);
    }
  };

  const handleResizedImage = (width, height) => {
    setLogoShowLoader(true);
    setImageWidth(width);
    setImageheight(height);
  };

  const handleVideoMute = async (status) => {
    console.log(status, "isVideoPresent---6")
    const localStream = store.getState()?.localStreams;
    const olderOne = localStream?.DeviceIds?.video;
    const videoId = verifyDeviceAdded(localStream?.DeviceIds?.video, "video");
    if (olderOne !== videoId) {
      strategyUpdate(localStream?.DeviceIds?.audio, videoId);
    }
    setVideoMute(status);
    const localId = localParticipantId(participants);
    const stream = participantsData[localId]?.stream;
    const videoStream = stream.filter((ele) => ele?.streamType === "video")[0];
    videoStream.setMuted(status);
  };
  const handleRefreshPage = () => {
    !(
      micPermissions === "denied" ||
      micPermissions === "prompt" ||
      cameraPermissions === "denied" ||
      cameraPermissions === "prompt"
    ) && window.location.reload();
  };

  const handleAudioMute = async (status) => {
    const localStream = store.getState()?.localStreams;
    const olderOne = localStream?.DeviceIds?.audio;
    const audioId = verifyDeviceAdded(localStream?.DeviceIds?.audio, "audio");
    if (olderOne !== audioId) {
      strategyUpdate(audioId, localStream?.DeviceIds?.video);
    }
    setAudioMute(status);
    const localId = localParticipantId(participants);
    const stream = participantsData[localId]?.stream;
    const audioStream = stream.filter((ele) => ele?.streamType === "audio")[0];
    audioStream.setMuted(status);
  };

  const orderingParticipants = (parcipants) => {
    let orderedList = parcipants;
    if (parcipants.length > 1) {
      orderedList = positioningHost(
        parcipants,
        isHostJoined(parcipants, fbHostId.toString()),
        fbHostId.toString()
      );
      orderedList = positioningMembers(
        orderedList,
        isHostJoined(parcipants, fbHostId.toString()),
        fbPosition1,
        fbPosition2,
        fbPosition3
      );
    }
    console.log(orderedList, "orderingParticipants");
    return orderedList;
  };

  const getParticipantInLive = (layoutType, allParticipants) => {
    console.log(layoutType, allParticipants, "getParticipantInLive---1");
    if (layoutType === "layout1" && allParticipants.length > 0) {
      return [
        { ...allParticipants.filter((ele) => ele?.isLocal)[0], position: 0 },
      ];
    } else {
      return orderingParticipants(
        allParticipants.map((ele, ind) => {
          return { ...ele, position: ind };
        })
      );
    }
  };
  console.log("recordT1", recordT1);

  const responseStartLiveStreaming = async (
    responseMediaLiveStream,
    responseBroadcasts,
    headers
  ) => {
    try {
      const responseStartLiveStream = await Post(
        `${apiUrl}api/customer/startLiveStreamChannel?streamChannelId=${responseMediaLiveStream?.data?.data?.mediaLiveStreamingResponse?.streamChannelId}`, {}, true
      );
      console.log("1q1q responseStartLiveStream:", responseStartLiveStream);
      if (responseStartLiveStream?.status === 400) {
        console.log(
          "1q1q 400 responseStartLiveStream:",
          responseMediaLiveStream
        );
        responseStartLiveStreaming(
          responseMediaLiveStream,
          responseBroadcasts,
          headers
        );
      } else if (responseStartLiveStream?.status === 200) {
        console.log(
          "1q1q Broadcast Start responseBroadcastTransition:",
          responseBroadcasts
        );
        if (getFBUserPage) {
          setTimeout(() => {
            store.dispatch(endYTLoaderAction({ status: 200 }));
          }, 40000);
        }
        const mediaSelection = JSON.parse(localStorage.getItem('Select_Media'));
        const responseBroadcastTransition = mediaSelection === "YT" && await axios.post(
          `${youtubeApiUrl}liveBroadcasts/transition?part=id,snippet,contentDetails,status&broadcastStatus=live&id=${responseBroadcasts?.data?.id}`,
          "",
          { headers }
        );
        console.log(
          "1q1q Broadcast Status responseBroadcastTransition:",
          responseBroadcastTransition
        );
        store.dispatch(endYTLoaderAction(responseBroadcastTransition));
      }
    } catch (error) {
      console.error("Error fetching StartLiveStream data:", error);
      console.log("Response StartLiveStream data error:", error.response.data);
      if (error.response.data.error.code === 403) {
        responseStartLiveStreaming(
          responseMediaLiveStream,
          responseBroadcasts,
          headers
        );
      }
    }
  };

  const getMediaLiveStream = async (
    responseStream,
    responseBroadcasts,
    headers,
    mediaSelect
  ) => {
    const mediaStreamDetails = {
      channelArn: broadcastKey?.channel?.channelArn,
      name: sessionName,
      playbackUrl: broadcastKey?.channel?.playbackUrl,
      rtmpUrl: mediaSelect === "YT" ? responseStream?.data?.cdn?.ingestionInfo?.rtmpsIngestionAddress : responseStream?.streaming_url,
      streamKey: mediaSelect === "YT" ? responseStream?.data?.cdn?.ingestionInfo?.streamName : responseStream?.streaming_key,
      // streamKey:"122118132212029176?s_asc=1&s_bl=1&s_oil=2&s_psm=1&s_pub=1&s_sw=0&s_tids=1&s_vt=api-s&a=AbxRpLCZHp7e8Hnl",
      // rtmpUrl:"rtmps://live-api-s.facebook.com:443/rtmp/"
    };
    console.log("1q1q mediaStreamDetails", mediaStreamDetails);
    try {
      const responseMediaLiveStream = await Post(
        `${apiUrl}api/customer/createMediaLiveStream`,
        mediaStreamDetails,
        true
      );
      console.log("1q1q responseMediaLiveStream:", responseMediaLiveStream);
      const mediaData = responseMediaLiveStream?.data?.data?.mediaLiveStreamingResponse;
      localStorage.setItem(
        "streamChannelId",
        JSON.stringify(mediaData?.streamChannelId)
      );
      localStorage.setItem(
        "streamInputId",
        JSON.stringify(mediaData?.inputId)
      );
      setStreamChannelId(
        mediaData?.streamChannelId
      );
      setStreamInputId(
        mediaData?.inputId
      );

      if (responseMediaLiveStream?.status === 200) {
        console.log(
          "1q1q responseMediaLiveStream.status:",
          responseMediaLiveStream.status
        );
        responseStartLiveStreaming(
          responseMediaLiveStream,
          responseBroadcasts,
          headers
        );
      }
    } catch (error) {
      console.error("Error fetching MediaLiveStream data:", error);
      console.log("Response MediaLiveStream data error:", error?.response?.data);
    }
  };

  const getBroadcastStatusByYTEmail = async (tokenResponse) => {
    const ACCESS_TOKEN = tokenResponse?.authToken;
    const headers = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const broadcastDetails = {
      snippet: {
        title: sessionName,
        scheduledStartTime: new Date().toISOString(), //"2023-08-15T12:00:00.000Z"
      },
      contentDetails: {
        // "enableClosedCaptions":true,
        // "enableContentEncryption":true,
        // "enableDvr":true,
        // // "enableEmbed":true,
        // "recordFromStart":true,
        // "startWithSlate":true,
        latencyPreference: "ultraLow",
        monitorStream: {
          enableMonitorStream: false,
        },
      },
      status: {
        privacyStatus: "public",
        selfDeclaredMadeForKids: false,
      },
    };

    const streamDetails = {
      id: `OTF-${new Date().toISOString()}`,
      snippet: {
        title: `OTF-${new Date().toISOString()}`,
      },
      cdn: {
        format: "",
        ingestionType: "rtmp",
        resolution: "variable",
        frameRate: "variable",
      },
    };

    try {
      //Step 1: Retrieve the BROADCAST_ID
      const responseBroadcasts = await axios.post(
        `${youtubeApiUrl}liveBroadcasts?part=id,snippet,status,contentDetails&key=${YOUTUBE_API_KEY}`,
        broadcastDetails,
        { headers }
      );
      console.log("Broadcast Status responseBroadcasts:", responseBroadcasts);
      setbroadcastId(responseBroadcasts?.data?.id);
      localStorage.setItem(
        "broadcastId",
        JSON.stringify(responseBroadcasts?.data?.id)
      );

      // Step 2: Retrieve the boundStreamId
      const responseStream = await axios.post(
        `${youtubeApiUrl}liveStreams?part=id&part=snippet&part=cdn&key=${YOUTUBE_API_KEY}`,
        streamDetails,
        { headers }
      );
      console.log("responseStream Status responseStream:", responseStream);

      // Step 3: Bind BROADCAST_ID  and BoundStreamId
      const bindStream = await axios.post(
        `${youtubeApiUrl}liveBroadcasts/bind?id=${responseBroadcasts?.data?.id}&streamId=${responseStream?.data?.id}&key=${YOUTUBE_API_KEY}`,
        "",
        { headers }
      );
      console.log("bindStream Status bindStream:", bindStream);
      if (bindStream.status === 200) {
        getMediaLiveStream(responseStream, responseBroadcasts, headers, "YT");
      }
    } catch (error) {
      console.error("Error fetching broadcast data:", error);
      console.log("Response data broadcast error:", error?.response?.data);
      if (error?.response?.data?.error?.code === 401) {
        const refreshDetails = {
          "media_type": "YT",
          "media_id": tokenResponse?.mediaId,
        };
        const getToken = await Post(
          `${apiUrl}simulcast/api/media-config/refresh-token`, refreshDetails, true);
        console.log("qaqa getToken", getToken?.data?.response);
        fetchData();
      }
    }
  };

  const _handleGoLive = async () => {
    const response = await getDeleteStageResponse(
      currentStageArrn(awsStageReducer)
    );
    if (response?.isDelete === 1) {
      setDeletePopup(true);
      return;
    }
    setGoLive(!getGoLive);
    setLiveCLick(false);
    store.dispatch(startYTLoaderAction(true));
  };

  const fetchSavedMedia = async () => {
    const refreshBroadcast = awsStageReducer?.stage?.arn;
    // // const getsessionBroadcast = destructStageId(destructStage(stageArn || refreshBroadcast));
    return Get(`${apiUrl}simulcast/api/media-broadcast/list?broadcast_id=${stageArn || refreshBroadcast}`, true)
      .then((res) => {
        if (res?.status === 200) {
          const getMedia = res?.data?.response[0];
          let result = Object.values({ getMedia });
          setConnectedMedia(result);
          if (getMedia?.media_status === 2 ) {
            liveClick && setMediaCheck(true);
            setLiveCLick(false);
          } else {
            liveClick && !mediaCheck && _handleGoLive();
          }
        }
      })
      .catch((err) => {
        console.error("Error fetching responseGetMediaConfig data:", err);
      });
  }

  const checkMediaReconnect = () => {
    // return Get(`${apiUrl}simulcast/api/media-config-type/list`, true)
    return Get(`${apiUrl}simulcast/api/media-config/get-media-list?token_check=true`, true)
      .then((res) => {
        if (res?.status === 200) {
          fetchSavedMedia();
        } else {
          liveClick && _handleGoLive();
        }
      })
      .catch((err) => {
        console.error("Error fetching responseGetMediaConfig data:", err);
      });
  };

  useEffect(() => {
    liveClick && checkMediaReconnect();
  },[liveClick]);

  const checkMediaConnect = async () => {
    setLiveCLick(true);
    // checkMediaReconnect();
  };

  useEffect(() => {
    console.log("qaqa getYTDetails update", getYTDetails)
    if (getYTDetails?.status === 1 && handleSaveYTHeader && !getGoLive && Object.keys(broadcastKey).length > 0) {
      getBroadcastStatusByYTEmail(getYTDetails);
    }
  }, [getYTDetails]);

  useEffect(() => {
    checkMediaReconnect();
    // fetchSavedMedia();
  }, []);

  useEffect(() => {
    if (reconnectAccount) {
      checkMediaReconnect();
    }
  }, [reconnectAccount]);

  useEffect(() => {
    if (appStatus === "errored") {
      history.push("/broadcast");
      store.dispatch(InBroadcastScreenAction(false));
    }
  }, [appStatus]);

  useEffect(() => {
    if (getLogo !== ImgLogo) {
      setLogoShowLoader(true);
      setTimeout(() => {
        setLogo(ImgLogo);
      }, 1000);
      setTimeout(() => {
        setLogoShowLoader(false);
      }, 2000);
    }
  }, [ImgLogo, getImageheight, getImageWidth]);

  useEffect(() => {
    const localStream = store.getState()?.localStreams;
    if (isHost && !fbIsScreenShare) {
      setLaytoutType(fbLayout)
    } else if (!isHost && !fbIsScreenShare) {
      if (localStream?.screenShare?.active && !handleReferesh) {
        ToastService.infoToastblue((
          <div className="customToast">
            <i className="info">
              <IconToastInfo />
            </i>
            <p>{`Host has stopped your screen share for everyone in the ${fbHlsLink ? " live stream" : " broadcast "}`}</p>
          </div>
        ));
      }
      async function leaveSettle() {
        await leaveScreenShare()
      }
      leaveSettle();
      setLaytoutType(fbLayout)
    }
  }, [fbIsScreenShare])

  const handleMuteStatus = () => {
    participantsData[participants.find(element => element.isLocal)?.id]?.stream?.map((ele) => {
      switch (ele?.streamType) {
        case "video":
          if (ele?.isMute !== isVideoMute) {
            ele?.setMuted(isVideoMute);
          }
          break;
        case "audio":
          if (ele?.isMute !== isAudioMute) {
            ele?.setMuted(isAudioMute);
          }
          break;
        default:
        //code
      }
    });
    // const localAudioStream = participantsData[participants.find(ele => ele.isLocal)?.id]?.stream.find(ele => ele?.streamType === "audio");
    // const localVIdeoStream = participantsData[participants.find(ele => ele.isLocal)?.id]?.stream.find(ele => ele?.streamType === "video");
  }
  useEffect(() => {
    if (isHost) {
      if (screenShareData(participants, participantsData) && fbIsScreenShare) {
        !layoutAltered && filterSSDate(participants).length > 1 && updateLayoutData(
          getCurrentOrgId(),
          currentStageArrn(awsStageReducer),
          "layout2"
        );
      } else {
        console.log(screenShareData(participants, participantsData), fbIsScreenShare, "ayoutAltered && filterSSDate")
        !layoutAltered && filterSSDate(participants).length > 1 && setLaytoutType("layout2");
      }
      if (filterSSDate(participants).length > 1) setLayoutAltered(true);
      if (filterSSDate(participants)?.length === 1 && getLaytoutType === "layout2") {
        if (screenShareData(participants, participantsData) && fbIsScreenShare) {
          updateLayoutData(
            getCurrentOrgId(),
            currentStageArrn(awsStageReducer),
            "layout" + filterSSDate(participants).length
          );
          setLaytoutType("layout-share")
        } else {
          setLaytoutType("layout" + filterSSDate(participants).length);
          setLayoutAltered(false);
        }
      }
      if (filterSSDate(participants)?.length > 0) {
        setCurrentParticipantToLive(
          getParticipantInLive(getLaytoutType, filterSSDate(participants))
        );
      }
    }
    if (!isHost) {
      if (screenShareData(participants, participantsData) && fbIsScreenShare) {
        console.log(getLaytoutType, "fbLayout--0")
        setLaytoutType("layout-share")
      } else {
        if (!isHostJoined(filterSSDate(participants), fbHostId.toString())) {
          console.log(getLaytoutType, "fbLayout--1")
          filterSSDate(participants).length > 1
            ? setLaytoutType("layout2")
            : setLaytoutType("layout1");
        } else {
          console.log(getLaytoutType, "fbLayout--2")
          setLaytoutType(fbLayout);
        }
      }
    }
    if (!isEmptyObject(participantsData)) {
      if (!muteStatusUsed) {
        setTimeout(() => {
          handleVideoMute(muteStatus?.isVideoMute ? true : false);
          handleAudioMute(muteStatus?.isAudioMute ? true : false);
          setMuteStatusUsed(true);
          setMuteStatusUsedAudio(true);
        }, [1500]);
      }
    }
    if (filterSSDate(participants).length > 0) {
      store.dispatch(appStatusAction(BROADCAST_CALL));
    }
    if (!isHost && !currentUserPosition) {
      const currentPostions = filterSSDate(participants).filter(
        (ele) => ele.userId !== fbHostId
      ).length;
      setCurrentUserPosition(currentPostions);
    }
    handleMuteStatus();
    if (screenShareData(participants, participantsData) && fbIsScreenShare) {
      setLaytoutType("layout-share")
    }
    // if (fbIsScreenShare && !filteredSSDate(participants)?.length) {
    //   updateScreenShare(getCurrentOrgId(), false)
    // }
  }, [participants, participantsData]);
  console.log(getLaytoutType, "getLaytoutType---getLaytoutType")
  useEffect(() => {
    if (!isHost) {
      if (fbPosition1 !== "" && fbPosition2 !== "" && fbPosition3 !== "") {
        const orderedParticipantsList = [fbPosition1, fbPosition2, fbPosition3];
        const isPresentFb =
          orderedParticipantsList?.findIndex(
            (ele) => ele === parseInt(getCurrentUserId())
          ) !== -1;
        if (!isPresentFb && awsStageReducer && fbParticipantCount >= 0) {
          updateParticipantCount(
            getCurrentOrgId(),
            currentStageArrn(awsStageReducer),
            fbParticipantCount + 1 > 3 ? 3 : fbParticipantCount + 1
          );
          updateParticipantPostion(
            getCurrentOrgId(),
            currentStageArrn(awsStageReducer),
            fbParticipantCount + 1 > 3 ? 3 : fbParticipantCount + 1
          );
        }
      }
      if (videoMutedParticipants.includes(getCurrentUserId())) {
        if (!isVideoMute) {
          handleVideoMute(true);
          ToastService.infoToastblue((
            <div className="customToast">
              <i className="info">
                <IconToastInfo />
              </i>
              <p>{`Host has tuned off your camera for everyone in the ${fbHlsLink ? "  live stream" : " broadcast "}`}</p>
            </div>
          ));
        }
        const removeSelfFromMuted = videoMutedParticipants?.filter(ele => ele !== getCurrentUserId());
        updateVideoMutedParticipants(getCurrentOrgId(), currentStageArrn(awsStageReducer), removeSelfFromMuted);
      }
      if (audioMutedParticipants.includes(getCurrentUserId())) {
        if (!isAudioMute) {
          handleAudioMute(true);
          ToastService.infoToastblue((
            <div className="customToast">
              <i className="info">
                <IconToastInfo />
              </i>
              <p>{`Host muted you for everyone in the ${fbHlsLink ? " live stream" : " broadcast "}`}</p>
            </div>
          ));
        }
        const removeSelfFromMuted = audioMutedParticipants?.filter(ele => ele !== getCurrentUserId());
        updateAudioMutedParticipants(getCurrentOrgId(), currentStageArrn(awsStageReducer), removeSelfFromMuted);
      }
      if (!isHost && sessionMemberCount !== store.getState()?.participantListReducer?.participantList?.length) {
        store.dispatch(getParticipantListAction(stageArn));
      }
    }
  }, [broadcastBranding]);

  useEffect(() => {
    if (participants?.length > 0) {
      setCurrentParticipantToLive(
        getParticipantInLive(getLaytoutType, participants)
      );
      console.log(getLaytoutType, "getLaytoutType---1")
      isHost && getLaytoutType !== "layout-share" &&
        updateLayoutData(
          getCurrentOrgId(),
          currentStageArrn(awsStageReducer),
          getLaytoutType
        );
    }
    if (isHost && !getGoLive && getLaytoutType === "layout-share") {
      updateLiveScreenShare();
    }
  }, [getLaytoutType]);

  useEffect(() => {
    if (!isHost) {
      if (fbIsScreenShare) {
        setLaytoutType("layout-share");
      } else {
        participants.length > 1
          ? setLaytoutType(fbLayout)
          : setLaytoutType("layout1");
      }
    }
  }, [fbLayout]);

  useEffect(() => {
    if (!getGoLive) {
      userClick &&
        layoutAltered &&
        updateBroadcastLayout(
          getLaytoutType,
          currentParticipantToLive,
          fbBannerText,
          fbBannerStatus,
          fbBannerBgColor,
          awsStageReducer
        );
    }
  }, [userClick]);

  useEffect(() => {
    if (!getGoLive) {
      store.dispatch(
        awsGetBroadcastData({
          stageArn: stageArn,
          sessionName: sessionName,
          organisationId: currentOrgList?.organisationId,
        })
      );
      store.dispatch(
        updateCallStatusAction({
          stageArn: stageArn,
          callStatus: "on-live",
          duration: getTimeMillesecond.toString(),
        })
      );
      console.log("updatetime---9", getTimeMillesecond.toString());
      updateGoLive(
        getCurrentOrgId(),
        currentStageArrn(awsStageReducer),
        "on-live"
      );
      store.dispatch(appStatusAction(BROADCAST_CALL_LIVE));
    }
  }, [getGoLive]);

  const getFBUrl = async () => {
    const rtmpDetails = {
      "media_type": "FB",
      "media_id": getConnectedMedia[0]?.media_id ? getConnectedMedia[0]?.media_id : getFBUserPage[0]?.media_id,  // "122107703468033255"
      "config_id": getConnectedMedia[0]?.config_id ? getConnectedMedia[0]?.config_id : getFBUserPage[0]?.config_id, // "116709574865582"
      "config_type": "page",
      "title": sessionName,
      "description": sessionName
    };
    const getToken = await Post(
      `${apiUrl}simulcast/api/casting/connect-stream`, rtmpDetails, true);
    console.log("qaqa getToken", getToken?.data?.response);
    const responseFBStream = getToken?.data?.response;
    if (getToken?.status === 200) {
      localStorage.setItem("Facebook_Live_Url", JSON.stringify(responseFBStream?.live_url));
      getMediaLiveStream(responseFBStream, "", "", "FB");
    } else {
      store.dispatch(endYTLoaderAction({ status: 200 }));
      failToast(getToken?.data?.message);
    }
  }

  const checkFBLive = async () => {
    const channelArn = broadcastKey?.channel?.channelArn;
    const getFBLive = await Get(
      `${apiUrl}api/customer/getMediaLiveStreams?channelArn=${channelArn}`, true);
    if (getFBLive?.status === 400) {
      getFBUrl();
    } else if (getFBLive?.status === 200) {
      store.dispatch(endYTLoaderAction({ status: 200 }));
      console.log("getFBLivegetFBLive", getFBLive?.data);
      localStorage.setItem(
        "streamChannelId",
        JSON.stringify(getFBLive?.data?.data?.channelId)
      );
      localStorage.setItem(
        "streamInputId",
        JSON.stringify(getFBLive?.data?.data?.inputId)
      );
      setStreamChannelId(
        getFBLive?.data?.data?.channelId
      );
      setStreamInputId(
        getFBLive?.data?.data?.inputId
      );
    }
  }

  const editStreamTimeout = () => {
    store.dispatch(editStreamAction(false));
    store.dispatch(showYoutubeAction(false));
    store.dispatch(startYTLoaderAction(false));
    store.dispatch(editStreamPopupAction(false));
    store.dispatch(editStreamSaveAction(false));
    localStorage.removeItem("EditConnectedFB");
    localStorage.removeItem("editStreamSave");
    localStorage.removeItem("Select_Media");
    store.dispatch(endYTLoaderAction());
    const handleStreamChannelIds = JSON.parse(localStorage.getItem("streamChannelId")) ?
      JSON.parse(localStorage.getItem("streamChannelId")) : "";
    handleStreamChannelIds && stopStream(handleStreamChannelIds);
  }

  useEffect(() => {
    if (!getGoLive && Object.keys(broadcastKey).length > 0) {
      initialBroadCast(
        getLaytoutType,
        broadcastKey,
        currentParticipantToLive,
        fbBannerStatus,
        fbBannerText,
        fbBannerStyle,
        fbBannerBgColor
      );
      const mediaSelection = JSON.parse(localStorage.getItem('Select_Media'));
      if (getYTDetails?.status === 1 && handleSaveYTHeader && mediaSelection === "YT") {
        getBroadcastStatusByYTEmail(getYTDetails)
      }
      console.log("handleSaveYTHeader && mediaSelection", handleSaveYTHeader, mediaSelection)
      if (handleSaveYTHeader && mediaSelection === "FB") {
        checkFBLive();
      }
      const playData = {
        playbackUrl: broadcastKey?.channel?.playbackUrl,
        sessionName: sessionName,
      };
      async function getUrlToken(bcData) {
        const responseGetUrl = await encryptHls(
          JSON.stringify(bcData),
          broadcastKey?.channel?.channelArn
        );
        setLiveHls(responseGetUrl);
        updateHlsLink(
          getCurrentOrgId(),
          currentStageArrn(awsStageReducer),
          responseGetUrl
        );
      }
      getUrlToken(playData);
    }
  }, [broadcastKey]);

  useEffect(() => {
    const awsStageData =
      awsStageReducer?.method === "create"
        ? getStageData(awsStageReducer)
        : awsStageReducer;
    if (awsStageData?.stageArn) {
      console.log(awsStageData, "fbLiveListener---1");
      fbLiveListener(awsStageData?.orgId, awsStageData?.stageArn);
    }
  }, [isHost]);

  useEffect(() => {
    const awsStageData =
      awsStageReducer?.method === "create"
        ? getStageData(awsStageReducer)
        : awsStageReducer;
    if (ImgLogo?.length > 0) {
      updateBroadcastImage(ImgLogo, awsStageData?.stageArn);
    }
  }, [ImgLogo, FbIsLogoRight]);

  useEffect(() => {
    let currentCallstatus = "";
    const handleTabClose = (event) => {
      setHandleReferesh(true);
      const recordedDuration =
        store.getState()?.recordedTimeReducer?.recordedTime; //store
      leaveScreenShare();
      if (isHost) {
        store.dispatch(
          updateCallStatusAction({
            stageArn: stageArn,
            callStatus: "pending",
            duration: recordedDuration.toString(),
          })
        );
        store.dispatch(clearSession());
        updateGoLive(
          getCurrentOrgId(),
          currentStageArrn(awsStageReducer),
          "ended"
        );
        updateHlsLink(
          getCurrentOrgId(),
          currentStageArrn(awsStageReducer),
          ""
        );
        updateEndTime(
          getCurrentOrgId(),
          currentStageArrn(awsStageReducer),
          false
        );
        updateWarningTime(
          getCurrentOrgId(),
          currentStageArrn(awsStageReducer),
          false
        );
      }
      store.dispatch(InBroadcastScreenAction(true));
      store.dispatch(
        awsGetMeetingData({
          userId: userId,
          orgId: currentOrg,
          searchData: {
            page: 1,
            searchTerm: "",
            size: 10,
          },
          position: "Upcoming",
        })
      );
      store.dispatch({ type: "ENABLE_BROADCAST", loading: true });
      store.dispatch(
        awsGetPast({
          userId: userId,
          orgId: currentOrg,
          position: "Past",
        })
      );
      store.dispatch({ type: "ENABLE_BROADCAST", loading: true });
      if (!isHost) {
        reorderParticipantList(awsStageReducer);
      }
    };
    const trailTimeout =
      setTimeout(() => {
        window.sessionStorage.setItem("EndSessionPopStatus", true);
        setShowTrailPopup(true);
        store.dispatch(timerPopup(false));
        updateWarningTime(
          getCurrentOrgId(),
          currentStageArrn(awsStageReducer),
          true
        );
      }, [warningTime]);

    const endTimeout = isHost && setTimeout(async () => {
      setIsTimeout(true);
      await leaveScreenShare()
      await leaveStage();
      closeScreenShareAlert();
      // deleteChatGroup();
      unsubscribeStage(
        getCurrentOrgId(),
        awsStageReducer?.stageArn || awsStageReducer?.stage?.arn
      );
      diableDevicesEndBC();
      !isHost && reorderParticipantList(awsStageReducer);
      const recordedTime = store.getState()?.recordedTimeReducer?.recordedTime; //store
      if (isHost) {
        editStreamTimeout();
        store.dispatch(
          updateCallStatusAction({
            stageArn: stageArn,
            callStatus: "ended",
            duration: recordedTime.toString(),
          })
        );
        store.dispatch(clearSession());
        console.log("updatetime", recordedTime.toString());
        updateGoLive(
          getCurrentOrgId(),
          currentStageArrn(awsStageReducer),
          "timeout"
        );
        setEndTimeOut(true);
        updateEndTime(
          getCurrentOrgId(),
          currentStageArrn(awsStageReducer),
          true
        );
      }
      store.dispatch(InBroadcastScreenAction(false));
      setTimeout(() => {
        store.dispatch(
          awsGetMeetingData({
            userId: userId,
            orgId: currentOrg,
            searchData: {
              page: 1,
              searchTerm: "",
              size: 10,
            },
            position: "Upcoming",
          })
        );
      }, 500);
      store.dispatch({ type: "ENABLE_BROADCAST", loading: true });
      setTimeout(() => {
        store.dispatch(
          awsGetPast({
            userId: userId,
            orgId: currentOrg,
            position: "Past",
          })
        );
      }, 500);
      store.dispatch({ type: "ENABLE_BROADCAST", loading: true });
      store.dispatch(appStatusAction(""));
      setMenus(false);
      setGoLive(true);
      localLeftStage();
      setStageStatus("ended");
      currentCallstatus = "ended";
    }, [endTime]);

    window.addEventListener("beforeunload", handleTabClose);
    return async () => {
      const recordTime = store.getState()?.recordedTimeReducer?.recordedTime;
      if (!isTimeout) {
        isHost && clearTimeout(trailTimeout);
        isHost && clearTimeout(endTimeout);
        diableDevicesEndBC();
        await leaveScreenShare()
        await leaveStage();
        closeScreenShareAlert();
        // deleteChatGroup();
        unsubscribeStage(
          getCurrentOrgId(),
          awsStageReducer?.stageArn || awsStageReducer?.stage?.arn
        );
        window.removeEventListener("beforeunload", handleTabClose);
        !isHost && reorderParticipantList(awsStageReducer);
        if (isHost) {
          store.dispatch(
            updateCallStatusAction({
              stageArn: stageArn,
              callStatus: "ended",
              duration: recordTime.toString(),
            })
          );
          store.dispatch(clearSession());
          store.dispatch(InBroadcastScreenAction(false));
          updateGoLive(
            getCurrentOrgId(),
            currentStageArrn(awsStageReducer),
            "ended"
          );
          updateEndTime(
            getCurrentOrgId(),
            currentStageArrn(awsStageReducer),
            true
          );
        }
        setTimeout(() => {
          store.dispatch(
            awsGetMeetingData({
              userId: userId,
              orgId: currentOrg,
              searchData: {
                page: 1,
                searchTerm: "",
                size: 10,
              },
              position: "Upcoming",
            })
          );
        }, 500);
        store.dispatch({ type: "ENABLE_BROADCAST", loading: true });
        setTimeout(() => {
          store.dispatch(
            awsGetPast({
              userId: userId,
              orgId: currentOrg,
              position: "Past",
            })
          );
        }, 500);
        store.dispatch({ type: "ENABLE_BROADCAST", loading: true });
        store.dispatch(appStatusAction(""));
        leftStage();
        setMenus(false);
        setGoLive(true);
        localLeftStage();
      }
    };
  }, []);

  useEffect(() => {
    if (cameraPermissions === "denied" || cameraPermissions === "prompt") {
      handleVideoMute(true);
      setIsDevicePermissionChange(true);
    }
  }, [cameraPermissions]);

  useEffect(() => {
    console.log(micPermissions, "micPermissionsmicPermissions");
    if (micPermissions === "denied" || micPermissions === "prompt") {
      handleAudioMute(true);
      setIsDevicePermissionChange(true);
    }
  }, [micPermissions]);

  const _handleMenus = (state = "") => {
    handleResizeByVideoSizeByRatio();
    setMenusOpen(getMenus === state ? !getMenusOpen : true);
    setMenus(state);
    if (state === "Chat") {
      setTimeout(() => {
        const text = document.getElementById("typingContainer");
        text.focus();
      }, 600);
    }
  };
  const _handleMenusOpen = (state = false) => {
    if (!getMenusOpen) {
      setMenusOpen(true);
      setMenus(!getMenus ? "Brand" : getMenus);
      if (getMenus === "Chat") {
        setTimeout(() => {
          const text = document.getElementById("typingContainer");
          text.focus();
        }, 600);
      }
    }
    else {
      setMenusOpen(false);
      setMenus(!getMenus ? "Brand" : getMenus);
    }
  };

  const _handleCopy = (value = "") => {
    navigator.clipboard.writeText(value);
    copyToast("Copied", "copy"); //toast
  };

  const handleLayoutViewType = (layoutType = "", type = "") => {
    console.log(layoutType, "layoutType---1");
    if (type === "initial") {
      participants.length > 1
        ? setLaytoutType("layout2")
        : setLaytoutType("layout1");
    } else {
      setLaytoutType(layoutType);
    }
  };
  const [getInput, setInput] = useState({
    getCaption: fbBannerText,
    getColor: "",
    getBannerStatus: false,
    getBannerNewContent: "",
  });

  const { getColor, getCaption, getBannerStatus, getBannerNewContent } =
    getInput;

  const handleInput = (ele = {}) => {
    const { name = "", value = "" } = ele.target;
    console.log(
      "inputvalue",
      value,
      getCaption,
      getBannerStatus,
      getBannerNewContent
    );
    setInput({
      ...getInput,
      [name]: value,
    });
  };

  useEffect(() => {
    return () => {
      store.dispatch(editStreamAction(false));
      store.dispatch(showYoutubeAction(false));
      store.dispatch(startYTLoaderAction(false));
      store.dispatch(editStreamPopupAction(false));
      store.dispatch(editStreamSaveAction(false));
      localStorage.removeItem("EditConnectedFB");
      localStorage.removeItem("editStreamSave");
      localStorage.removeItem("Select_Media");
      store.dispatch(endYTLoaderAction());
    };
  }, []);

  useEffect(() => {
    return () => {
      if (getStreamChannelId && getStreamInputId && getbroadcastId) {
        store.dispatch(editStreamAction(false));
        store.dispatch(showYoutubeAction(false));
        store.dispatch(startYTLoaderAction(false));
        store.dispatch(editStreamPopupAction(false));
        store.dispatch(editStreamSaveAction(false));
        localStorage.removeItem("EditConnectedFB");
        localStorage.removeItem("editStreamSave");
        localStorage.removeItem("Select_Media");
        store.dispatch(endYTLoaderAction());
        const handleStreamChannelIds = JSON.parse(localStorage.getItem("streamChannelId")) ?
          JSON.parse(localStorage.getItem("streamChannelId")) : "";
        handleStreamChannelIds && stopStream(handleStreamChannelIds);
        // // endLiveStream(getAccessToken)
      }
    };
  }, [getStreamChannelId, getStreamInputId, getbroadcastId]);

  useEffect(() => {
    if (window.matchMedia("(max-width: 1365px)").matches) {
      setTimeout(() => {
        _handleMenusOpen(false);
      }, 500);
    }
  }, []);

  const handleZoom = () => {
    const elem = document && document.getElementById("full_screen_wraper");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  };

  /* Close fullscreen */
  const closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
  };

  useEffect(() => {
    if (!appOnlineStatus) {
      setOfflineExit(true);
    }
  }, [appOnlineStatus]);

  useEffect(() => {
    if (
      window.location.pathname === "/broadcast" &&
      window.location.search === ""
    ) {
      leftStage();
    }
  }, [window.location.search]);

  const parentEle = document.getElementById("video_parent");

  function handleResizeByVideoSizeByRatio() {
    const parentEleSm = document.getElementById("small_video_wraper");
    const parentLayoutSm = document.getElementById("broadcast_layouts");

    if (parentEleSm && parentLayoutSm) {
      const ratio = "16:9";
      const ratioWidth = ratio.split(":")[0];
      const ratioHeight = ratio.split(":")[1];
      const parentEleWidth = parentEle?.offsetWidth;
      setSmallVideoHight(parentEleSm?.offsetHeight);
      const parentEleHeight =
        parentEle?.offsetHeight -
        parentEleSm?.offsetHeight -
        parentLayoutSm?.offsetHeight;
      setCanvasParentHeight(parentEleHeight);
      const ratioCalculatedWidth = (ratioWidth * parentEleHeight) / ratioHeight;
      const ratioCalculatedHeight = (ratioHeight * parentEleWidth) / ratioWidth;

      if (
        parentEleWidth > ratioCalculatedWidth &&
        parentEleHeight > ratioCalculatedHeight
      ) {
        setCanvasWidth(ratioCalculatedWidth);
        setCanvasHeight(ratioCalculatedHeight);
      } else if (
        parentEleWidth < ratioCalculatedWidth &&
        parentEleHeight > ratioCalculatedHeight
      ) {
        setCanvasWidth((ratioWidth * ratioCalculatedHeight) / ratioHeight);
        setCanvasHeight(ratioCalculatedHeight);
      } else if (
        parentEleWidth > ratioCalculatedWidth &&
        parentEleHeight < ratioCalculatedHeight
      ) {
        setCanvasWidth((ratioWidth * parentEleHeight) / ratioHeight);
        setCanvasHeight(parentEleHeight);
      }
    }
  }

  useEffect(() => {
    const imageWidthSize = fbLogoDimension ? fbLogoDimension[0] : getImageWidth;
    const imageHeightSize = fbLogoDimension
      ? fbLogoDimension[1]
      : getImageheight;
    if (getCanvasWidth / 3 > imageWidthSize) {
      setDynImageWidth(imageWidthSize);
    } else {
      setDynImageWidth(getCanvasWidth * 0.3);
    }
    if (getCanvasWidth / 3 > imageHeightSize) {
      setDynImageHeight(imageHeightSize);
    } else {
      setDynImageHeight(getCanvasHeight * 0.3);
    }
  }, [getImageWidth, fbLogoDimension, getCanvasWidth]);

  useEffect(() => {
    setTimeout(() => {
      handleResizeByVideoSizeByRatio();
    }, 400);
  }, [participantsData, getMenusOpen, getMenus, parentEle?.offsetWidth, isFullscreen]);

  useLayoutEffect(() => {
    setTimeout(() => {
      handleResizeByVideoSizeByRatio();
    }, 200);
    const handlefindResizeWindow = () => {
      handleResizeByVideoSizeByRatio();
    };
    window.addEventListener("resize", handlefindResizeWindow);
    return () => window.removeEventListener("resize", handlefindResizeWindow);
  }, []);

  const handleStyle = (largeVideo) => {
    return {
      borderTopLeftRadius:
        fbBannerStyle === "" && largeVideo
          ? `calc(calc(1.25/100) * ${getCanvasHeight}px) calc(calc(1.25/100) * ${getCanvasHeight}px)`
          : null,
      borderBottomLeftRadius:
        fbBannerStyle === "" && largeVideo
          ? `calc(calc(1.25/100) * ${getCanvasHeight}px) calc(calc(1.25/100) * ${getCanvasHeight}px)`
          : null,
      marginLeft: largeVideo
        ? `calc(calc(.5/100) * ${getCanvasHeight}px)`
        : null,
      borderLeftWidth: largeVideo
        ? `calc(calc(2/100) * ${getCanvasHeight}px)`
        : null,
      fontSize: largeVideo
        ? `calc(calc(3.46/100) * ${getCanvasHeight}px)`
        : null,
      padding: largeVideo
        ? `calc(calc(1.4/100) * ${getCanvasHeight}px) calc(calc(2.8/100) * ${getCanvasHeight}px)`
        : null,
      borderLeftColor: fbBannerStyle === "" ? fbBannerBgColor : "",
      background: fbBannerStyle === "" ? ` ` : fbBannerBgColor,
      color: setColorCode(fbBannerStyle, fbBannerBgColor, FbBannerTextColor),
    };
  };

  const handleBannerComponent = () => {
    return (
      <div
        style={{ opacity: getZoom ? 1 : 0 }}
        className={`broadcast_banner_text banner_component ${getAwsStreamData(
          hostData(isHost, participants, participantsData),
          "video"
        )?.isMuted
          ? "with_img"
          : " with_vdo "
          }`}
      >
        <span
          style={handleStyle(true)}
          className={`broadcast_particiapant_badge ${fbBannerStyle === "" ? "default" : "style" + fbBannerStyle
            }`}
          id={`dpName-broadcast-participants-${participantsData.id}`}
        >
          {fbBannerText}{" "}
        </span>
      </div>
    );
  };

  useEffect(() => {
    switch (fbBannerBackground) {
      case 0:
        setBannerImage(ImgBroadcastBg0);
        break;
      case 1:
        setBannerImage(ImgBroadcastBg1);
        break;
      case 2:
        setBannerImage(ImgBroadcastBg2);
        break;
      case 3:
        setBannerImage(ImgBroadcastBg3);
        break;
      default:
        setBannerImage(ImgTransparent);
        break;
    }
  }, [fbBannerBackground]);

  useEffect(() => {
    setInput({
      ...getInput,
      getColor: fbBannerBgColor,
    });
    localStorage.setItem("fbBannerBgColor", JSON.stringify(fbBannerBgColor));
    if (fbBannerStatus) {
      updateBannerTextBC(fbBannerText, _stageArn, fbBannerStatus);
      updateBannerThemeStyle(
        fbBannerText,
        fbBannerStyle,
        fbBannerBgColor,
        _stageArn
      );
    } else {
      updateParticipantBannerStyle(participants, getLaytoutType);
    }
  }, [fbBannerBgColor]);

  useEffect(() => {
    localStorage.setItem("fbBannerStyle", JSON.stringify(fbBannerStyle));
    if (fbBannerStatus) {
      updateBannerThemeStyle(
        fbBannerText,
        fbBannerStyle,
        fbBannerBgColor,
        _stageArn
      );
    } else {
      console.log("useEffect else updateParticipantBannerStyle");
      updateParticipantBannerStyle(participants, getLaytoutType);
    }
  }, [fbBannerStyle]);

  useEffect(() => {
    if (getColor.length > 3 && HexColorRegex.test(getColor)) {
      updateBannerBgColor(getCurrentOrgId(), _stageArn, getColor);
      updateBannerTextColor(
        getCurrentOrgId(),
        _stageArn,
        colorContrastChecker(getColor, "#fff")
      );
    }
  }, [getColor]);

  useEffect(() => {
    handleBannerUpdate(getBannerStatus, participants, getLaytoutType);
  }, [getBannerStatus, getCaption]);

  const handleOutsideclik = () => {
    setShowTrailPopup(false);
    store.dispatch(timerPopup(false));
    setTimeout(() => {
      window.sessionStorage.setItem("EndSessionPopStatus", false);
      window.sessionStorage.removeItem("EndSessionPopStatus");
      window.sessionStorage.clear();
    }, 300);
  };
  const handleWarningClose = () => {
    setCohostWarningPopup(false);
    store.dispatch(timerPopup(false));
  };
  const handleTimeUpdate = (time) => {
    console.log("updatetime@@", time);
    setTimeMillesecond(time * 1000);
    store.dispatch(recordedTimeAction(time * 1000));
    const hours = Math.floor(time / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    setFormattedTime(`${hours}:${minutes}:${seconds}`);
  };
  const handleCallEnd = () => {
    setCohostEndPopup(false);
    history.push("/broadcast");
    store.dispatch(InBroadcastScreenAction(false));
    store.dispatch(editStreamAction(false));
    store.dispatch(showYoutubeAction(false));
    store.dispatch(editStreamPopupAction(false));
    store.dispatch(editStreamSaveAction(false));
    localStorage.removeItem("EditConnectedFB");
    localStorage.removeItem("editStreamSave");
    localStorage.removeItem("Select_Media");
    store.dispatch(getAccessTokenAction());
  };
  useEffect(() => {
    setCohostWarningPopup(fbWarningTime);
    store.dispatch(timerPopup(true));
  }, [fbWarningTime]);

  useEffect(() => {
    setCohostEndPopup(fbEndTime);
  }, [fbEndTime]);

  useEffect(() => {
    window.sessionStorage.removeItem("EndSessionPopStatus");
    setCohostWarningPopup(false);
    store.dispatch(timerPopup(false));

    const m = moment();
    const ms =
      m.milliseconds() +
      1000 * (m.seconds() + 60 * (m.minutes() + 60 * m.hours()));
    updateCallStartTime(
      getCurrentOrgId(),
      currentStageArrn(awsStageReducer),
      ms
    );
  }, []);

  useEffect(() => {
    // To prevent Tab key navigation for unverified Email Account

    const handlePreventKey = (event = {}) => {
      const code = event.keyCode || event.which;
      if (code === 9 || event.key === 'Tab') {
        event.preventDefault();
      }
    };

    if (showTrailPopup || getCohostEndPopup || getCohostWarningPopup || endTimeOut) {
      window.addEventListener("keydown", handlePreventKey, false);
    }
    if (getCohostEndPopup || endTimeOut) {
      diableDevicesEndBC();
    }
    return () => {
      window.removeEventListener("keydown", handlePreventKey);
    };
  }, [endTimeOut, getCohostWarningPopup, getCohostEndPopup, showTrailPopup]);

  // Watch for fullscreenchange
  React.useEffect(() => {
    function onFullscreenChange() {
      setZoom(false);
      setTimeout(() => {
        setZoom(true);
      }, 1000);
      setIsFullscreen(Boolean(document.fullscreenElement));
    }
    document.addEventListener('fullscreenchange', onFullscreenChange);

    return () => {
      setZoom(false);
      setTimeout(() => {
        setZoom(true);
      }, 1000);
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    }
  }, []);
  return (
    <div className="broadcast_video_view">
      <div className="broadcast_video_inner">
        <div className="broadcast_video_call">
          <div
            id="video_parent"
            style={{ height: `${getCanvasParentHeight}px` }}
            className="broadcast_video_player"
          >
            <div
              style={{
                width: `${getCanvasWidth}px`,
                height: `${getCanvasHeight}px`,
                minHeight: `${getCanvasHeight}px`,
              }}
              id="big_video_wraper"
              className="broadcast_video_canvas"
            >
              {isHost && getShowAlert ? (
                <div
                  className={` ${getShowAlert ? " active " : " "
                    } broadcast_30_minutes`}
                >
                  <div className="broadcast_30_minutes_inner">
                    <i>
                      <IconRedI />
                    </i>
                    <p>This broadcast is valid for 30 minutes only.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCloseAlert}
                    className="broadcast_30_action"
                  >
                    <IconX />
                  </button>
                </div>
              ) : null}
              <div id="full_screen_wraper" className="full_screen_wraper">
                <div
                  style={{
                    backgroundImage: `url(${getBannerImage})`,
                  }}
                  id="full_screen_wraper_inner"
                  className="full_screen_wraper_inner"
                >
                  <div className={`video`}>
                    {getLogo !== "no-image" && (
                      <div
                        style={{
                          opacity: getZoom ? 1 : 0,
                          maxWidth: `${getDynImageWidth}px`,
                          maxHeight: `${getDynImageHeight}px`,
                          left: !FbIsLogoRight ? `calc(calc(5/100) * ${getCanvasHeight}px)` : "",
                          right: FbIsLogoRight ? `calc(calc(5/100) * ${getCanvasHeight}px)` : "",
                          top: `calc(calc(5/100) * ${getCanvasHeight}px)`,
                        }}
                        className="broadcast_video_logo"
                      >
                        {getLogoShowLoader ? <IconLoaderBlue /> : <img
                          style={{
                            maxWidth: `${185}px`,
                            maxHeight: `${getDynImageHeight}px`,
                          }}
                          id="broadcast-logo"
                          src={ImgLogo}
                          alt="logo"
                        />}
                      </div>
                    )}
                    {screenShareData(participants, participantsData) && getLaytoutType === "layout-share" &&
                      (
                        <>
                          <div className="layout1 screen_share">
                            <SmallVideo
                              _getZoom={getZoom}
                              fbBannerBgColor={fbBannerBgColor}
                              fbBannerStyle={fbBannerStyle}
                              FbBannerTextColor={FbBannerTextColor}
                              largeVideo={true}
                              _getBannerStatus={getInput.getBannerStatus}
                              _getBannerText={getInput.getCaption}
                              getCanvasHeight={getCanvasHeight}
                              type="screen-share"
                              screenShareId={fbIsScreenShare}
                              key={
                                screenShareData(participants, participantsData)
                                  ?.id
                              }
                              participantsData={screenShareData(participants, participantsData)}
                              wholeParticipantsData={participantsData}
                              videoMute={false}
                            />
                            {/* {fbBannerStatus ? handleBannerComponent() : null} */}
                          </div>
                        </>
                      )}
                    {muteStatusUsed && muteStatusUsedAudio && getLaytoutType === "layout1" &&
                      !isEmptyArray(
                        Object.keys(
                          hostData(isHost, participants, participantsData)
                        )
                      ) && (
                        <>
                          <div className="layout1 ">
                            <SmallVideo
                              _getZoom={getZoom}
                              fbBannerBgColor={fbBannerBgColor}
                              fbBannerStyle={fbBannerStyle}
                              FbBannerTextColor={FbBannerTextColor}
                              largeVideo={true}
                              _getBannerStatus={getInput.getBannerStatus}
                              _getBannerText={getInput.getCaption}
                              getCanvasHeight={getCanvasHeight}
                              type="broadcast-participants"
                              key={
                                hostData(isHost, participants, participantsData)
                                  ?.id
                              }
                              participantsData={hostData(
                                isHost,
                                participants,
                                participantsData
                              )}
                              wholeParticipantsData={participantsData}
                              videoMute={
                                getAwsStreamData(
                                  hostData(
                                    isHost,
                                    participants,
                                    participantsData
                                  ),
                                  "video"
                                ).isMuted
                              }
                            />
                            {/* {fbBannerStatus ? handleBannerComponent() : null} */}
                          </div>
                        </>
                      )}
                    {muteStatusUsed && muteStatusUsedAudio && getLaytoutType === "layout2" ? (
                      <>
                        <div
                          className={`layout layout${participants.length > 2 ? "3" : participants.length
                            } ${getLaytoutType === "layout2_1" ? " full_view " : " "
                            }  ${getMenus === "" ? " open " : " "}`}
                        >
                          {orderingParticipants(participants).length > 1 &&
                            orderingParticipants(participants).map((ele) => {
                              let videoMute;
                              if (!ele?.isLocal) {
                                if (participantsData[ele?.id]) {
                                  videoMute = getAwsStreamData(
                                    participantsData[ele?.id],
                                    "video"
                                  ).isMuted;
                                }
                              } else {
                                videoMute = isVideoMute;
                              }

                              return (
                                <ComponentParticipant
                                  fbBannerBgColor={fbBannerBgColor}
                                  fbBannerStyle={fbBannerStyle}
                                  FbBannerTextColor={FbBannerTextColor}
                                  largeVideo={true}
                                  getCanvasHeight={getCanvasHeight}
                                  _participantsData={participantsData}
                                  key={ele?.id}
                                  participantsId={ele?.id}
                                  imgSrc={Imgplaceholder}
                                  participantName={"Morrison venz"}
                                  videoMute={videoMute}
                                />
                              );
                            })}
                          {fbBannerStatus ? handleBannerComponent() : null}
                        </div>
                      </>
                    ) : null}
                    {getLaytoutType === "layout3" ? (
                      <>
                        <div className="layout layout3">
                          <ComponentParticipant
                            videoMute={true}
                            imgSrc={ImgDevUserPlaceholder}
                            participantName={" Harsha Sai"}
                          />
                          <div className="layout3_inner">
                            <ComponentParticipant
                              videoMute={true}
                              imgSrc={ImgDevUserPlaceholder}
                              participantName={" Harsha Sai"}
                            />
                            <ComponentParticipant
                              videoMute={true}
                              imgSrc={ImgDevUserPlaceholder}
                              participantName={" Harsha Sai"}
                            />
                          </div>
                          {fbBannerStatus ? handleBannerComponent() : null}
                        </div>
                      </>
                    ) : null}
                    {getLaytoutType === "layout4" ? (
                      <>
                        <div className="layout layout4">
                          <ComponentParticipant
                            videoMute={true}
                            imgSrc={ImgDevUserPlaceholder}
                            participantName={" Harsha Sai"}
                          />
                          <ComponentParticipant
                            videoMute={true}
                            imgSrc={ImgDevUserPlaceholder}
                            participantName={" Harsha Sai"}
                          />
                          <ComponentParticipant
                            videoMute={true}
                            imgSrc={Imgplaceholder}
                            participantName={"Morrison venz"}
                          />
                          <ComponentParticipant
                            videoMute={true}
                            imgSrc={ImgDevUserPlaceholder}
                            participantName={" Harsha Sai"}
                          />
                          <ComponentParticipant
                            videoMute={true}
                            imgSrc={Imgplaceholder}
                            participantName={"Morrison venz"}
                          />
                          <ComponentParticipant
                            videoMute={true}
                            imgSrc={ImgDevUserPlaceholder}
                            participantName={" Harsha Sai"}
                          />
                          {fbBannerStatus ? handleBannerComponent() : null}
                        </div>
                      </>
                    ) : null}
                    {getLaytoutType === "layout5" ||
                      getLaytoutType === "layout6" ? (
                      <>
                        <div className="layout layout5">
                          <ComponentParticipant
                            videoMute={true}
                            imgSrc={ImgDevUserPlaceholder}
                            participantName={" Harsha Sai"}
                          />
                          {getLaytoutType === "layout5" ? (
                            <div className="layout5_inner">
                              <ComponentParticipant
                                videoMute={true}
                                imgSrc={ImgDevUserPlaceholder}
                                participantName={" Harsha Sai"}
                              />
                            </div>
                          ) : null}
                          {fbBannerStatus ? handleBannerComponent() : null}
                        </div>
                      </>
                    ) : null}

                    {FbBannerTopOverlay !== 0 ? (
                      <BroadcastVideoOverlay
                        FbBannerTopOverlay={FbBannerTopOverlay}
                      />
                    ) : null}
                    {fbBannerStatus ? handleBannerComponent() : null}
                    <button
                      title={" Full screen "}
                      className="full_screen"
                      onClick={() => handleZoom()}
                      type="button"
                    >
                      <IconFullScreenActive className="maximize" />
                    </button>
                    <button
                      title={" Exit full screen "}
                      className="full_screen minimize"
                      onClick={() => closeFullscreen()}
                      type="button"
                    >
                      <IconFullScreen className="minimize" />{" "}
                    </button>
                  </div>
                </div>
              </div>
              {false ? <BroadcastCaption /> : null}
            </div>

            <div
              id="broadcast_layouts"
              style={{
                display: isHost ? null : "none",
                width: `${getCanvasWidth}px`,
                minHeight: getCanvasHeight < 200 ? "0px" : null,
                height: getCanvasHeight < 200 ? "0px" : null,
              }}
              className="broadcast_layouts"
            >
              {isHost && getCanvasHeight > 200 ? (
                <BroadcastLayouts
                  handleLayoutViewType={(e, i) => {
                    handleLayoutViewType(e, i);
                  }}
                  currentLayout={getLaytoutType}
                  layoutCount={participants.length}
                  isUserChanged={(e) => setUserClick(userClick + 1)}
                  isScreenShare={screenShareData(participants, participantsData) && getLaytoutType === "layout-share"}
                />
              ) : null}
            </div>
            <div
              id="small_video_wraper"
              className="broadcast_video_particiapants"
            >
              <div style={{ height: `${getSmallVideoHight}px` }} className="">
                {muteStatusUsed && muteStatusUsedAudio && !isEmptyArray(Object.keys(participantsData)) && (
                  <BroadcastParticiapants
                    participants={orderingParticipants(filterSSDate(participants))}
                    participantsData={participantsData}
                    localMuteStatus={{
                      videoMute: isVideoMute,
                      audioMute: isAudioMute,
                    }}
                  />
                )}
              </div>
            </div>
            <div className="flex-grow"></div>
          </div>

          <div className="broadcast_video_action">
            <div className="broadcast_video_action_inner">
              {!getGoLive && liveHls && isHost && (
                <div className="broadcast_video_link_copy">
                  <span ref={myInput}>{`${broadcastURL}${liveHls}`}</span>
                  <div className="copy_btn">
                    <button
                      onClick={() => _handleCopy(myInput.current.textContent)}
                      className=""
                      type="button"
                    >
                      <IconCopy />
                    </button>
                  </div>
                </div>
              )}
              {fbHlsLink && fbGoLive === "on-live" && !isHost && (
                <div className="broadcast_video_link_copy">
                  <span ref={myInput}>{`${broadcastURL}${fbHlsLink}`}</span>
                  <div className="copy_btn">
                    <button
                      onClick={() => _handleCopy(myInput.current.textContent)}
                      className=""
                      type="button"
                    >
                      <IconCopy />
                    </button>
                  </div>
                </div>
              )}
              <VideoActionButton
                _getGoLive={!getGoLive}
                enableAddParticipants={true}
                enableAdditionAction={true}
                _handleAudioMute={(e) => handleAudioMute(e)}
                _handleVideoMute={(e) => handleVideoMute(e)}
                handleHangup={() => setCallExit(true)}
                _handleTimeUpdate={handleTimeUpdate}
                formattedTime={formattedTime}
                muteStatus={muteStatus}
                type={"broadcastView"}
                _liveHls={liveHls}
                _isHost={isHost}
                handleCameraPermissions={cameraPermissions}
                handleMicPermissions={micPermissions}
                isVideoMute={isVideoMute}
                isAudioMute={isAudioMute}
                isScreenShare={screenShareData(participants, participantsData) && getLaytoutType === "layout-share"}
              // handleHangup={handleHangup}
              />
              {Object.keys(participantsData).length > 0 && isHost && (
                <div className="broadcast_video_record">
                  {getGoLive ? (
                    <button
                      className="blue"
                      onClick={checkMediaConnect}
                      type="button"
                    >
                      Go Live
                    </button>
                  ) : (
                    <div className="live_status_wraper">
                      <div className="live_status">
                        <Lottie
                          className="icon_animate"
                          animationData={LottieLiveAnimation}
                          loop={true}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
              {fbGoLive === "on-live" && !isHost && (
                <div className="broadcast_video_record">
                  <div className="live_status_wraper">
                    <div className="live_status">
                      <Lottie
                        className="icon_animate"
                        animationData={LottieLiveAnimation}
                        loop={true}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <BroadcastBrandDetails
          _handleMenusOpen={() => _handleMenusOpen(false)}
          getBannerText={getInput}
          handleResizedImage={handleResizedImage}
          handleInput={handleInput}
          videoId={`video-broadcast-participants-${hostData(isHost, participants, participantsData).id
            }`}
          getGoLive={getGoLive}
          _handleAudioMute={(e) => handleAudioMute(e)}
          _handleVideoMute={(e) => handleVideoMute(e)}
          getMenusOpen={getMenusOpen}
          currentLayout={""}
          muteStatus={muteStatus}
          // handleLayoutViewType={(e) => handleLayoutViewType(e)}
          getMenus={getMenus}
          isHost={isHost}
          getvideoDetailsEle={{ title: "temp", createdAt: 123123123 }}
          getSelectedUrl={broadcastKey?.channel?.playbackUrl}
          playData={JSON.stringify(liveHls)}
          disableClick={
            showTrailPopup ||
            endTimeOut ||
            offlineExit ||
            callExit ||
            isDevicePermissionChange
          }
        />
        <div className="broadcast_video_layout">
          <div className="broadcast_layout_top">
            {isHost && (
              <button
                title="Banner Customization"
                type="button"
                onClick={() => _handleMenus("Brand")}
                className={`${getMenus === "Brand" ? " active " : " "}`}
              >
                <IconMenu />
              </button>
            )}
            <button
              title="Participants"
              type="button"
              onClick={() => _handleMenus("Participants")}
              className={`${getMenus === "Participants" ? " active " : " "
                }`}
            >
              <IconParticipant />
            </button>
            {!getGoLive && liveHls && (
              <button
                style={{ display: temphide ? "none" : "" }}
                title="Share"
                type="button"
                onClick={() => _handleMenus("Share")}
                className={`${getMenus === "Share" ? " active " : " "}`}
              >
                <IconShareEmbed />
              </button>
            )}
            <button
              title="Private Chat"
              type="button"
              onClick={() => _handleMenus("Chat")}
              className={`${getMenus === "Chat" ? " active " : " "}`}
            >
              <IconPrivateChat />
              {tempHide && <div className="dot_theme_color"></div>}
            </button>
          </div>
          <div className="broadcast_layout_bottom">
            <button
              title="Hide/Show"
              className={` ${getMenus === "" || getMenusOpen ? "active" : ""} `}
              onClick={() => _handleMenusOpen(false)}
              type="button   "
            >
              <IconSidebar />
            </button>
          </div>
        </div>
      </div>
      {showTrailPopup && isHost ? (
        <AddCohostPopup
          _handleOnOutsideClick={() => handleOutsideclik()}
          type="warning"
        />
      ) : null}
      {getCohostWarningPopup && !isHost ? (
        <AddCohostPopup
          _handleOnOutsideClick={() => handleWarningClose()}
          type="Cohostwarning"
        />
      ) : null}
      {getCohostEndPopup && !isHost && fbHlsLink ? (
        <AddCohostPopup
          _handleOnOutsideClick={() => {
            if (getCohostWarningPopup) {
              setCohostWarningPopup(false);
              store.dispatch(timerPopup(false));
            }
            handleCallEnd();
          }}
          type="cohostCallEnd"
        />
      ) : null}
      {getCohostEndPopup && !isHost && !fbHlsLink ? (
        <AddCohostPopup
          _handleOnOutsideClick={() => {
            if (getCohostWarningPopup) {
              setCohostWarningPopup(false);
              store.dispatch(timerPopup(false));

            }
            handleCallEnd();
          }}
          type="cohostCallEndWithoutLive"
        />
      ) : null}
      {endTimeOut && isHost ? (
        <AddCohostPopup
          _handleOnOutsideClick={() => {
            if (showTrailPopup) {
              setShowTrailPopup(false);
              store.dispatch(timerPopup(false));
            }
            setEndTimeOut(false);
            handleCallEnd();
          }}
          type="timeOut"
        />
      ) : null}

      {offlineExit ? (
        <AddCohostPopup
          _handleOnOutsideClick={() => {
            if (appOnlineStatus) {
              refreshPage();
            } else {
              console.log("offline");
            }
          }}
          type="offline"
        />
      ) : null}

      {callExit ? (
        <AddCohostPopup
          _handleOnOutsideClick={() => {
            setCallExit(false);
          }}
          handleExit={() => {
            handleBroadCastLanding();
            setCallExit(false);
          }}
          type="callExit"
        />
      ) : null}
      {isDevicePermissionChange ? (
        <AddCohostPopup
          handleExit={() => {
            setIsDevicePermissionChange(false);
            handleBroadCastLanding();
          }}
          cameraPermissions={cameraPermissions}
          micPermissions={micPermissions}
          _handleRefreshPage={handleRefreshPage}
          type="DeviceChanege"
        />
      ) : null}
      {deletePopup ? (
        <AddCohostPopup
          _handleOnOutsideClick={() => setDeletePopup(false)}
          handleExit={() => {
            handleBroadCastLanding();
          }}
          type="joinDeletePopup"
        />
      ) : null}

      {mediaCheck && <AddCohostPopup
        _handleOnOutsideClick={timerPopupState ? () => { } : () => setMediaCheck(false)}
        handleExit={() => setMediaCheck(false)}
        type="socialAccountAccess"
        mediaDetails={getConnectedMedia[0]}
      />}
    </div>
  );
};

export default BroadcastVideoView;
