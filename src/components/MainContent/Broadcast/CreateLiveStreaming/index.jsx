import React, { useEffect, useState } from "react";
import "./CreateLiveStreaming.scss";
import Modal from "../../../../common/Modal";
import AnimatePopup from "../../../../common/AnimatePopup";
import LabelTooptip from "../../../../common/LabelTooptip";
import CommonFormInput from "../../../../common/CommonFormInput";
import {
  IconX,
  Iconplus,
  Imgplaceholder,
} from "../../../../assets/img";
import {
  FacebookIcon,
  ImgProfile,
  YoutubeIcon,
} from "../../../../assets/images";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { createBroadCastValidation } from "./createBroadCastValidation";
import { getInitials } from "../../../../helper";
import {
  checkWhiteSpaces,
  convertToLowerCase,
  nullToObject,
  replaceSpacesWithNonbreakSpace,
} from "../../../../helper/Validation";
import Loader from "../../../../common/Loader";
import { useGoogleLogin } from "@react-oauth/google";
import {
  getGoogleUserDetails,
  storeSSOLoginResponseDetails,
} from "../../../Login/SSOLogin/helperSSO";
import axios from "axios";
import store from "../../../../store";
import { deleteSocialAcc, getAccessTokenAction, showYoutubeAction } from "../../../../store/action/editStreamAction";
import { YOUTUBE_API_KEY, apiUrl, youtubeApiUrl, ytUserInfoUrl } from "../../../../helper/ApiUrl";
import SheduleEvent from "../SheduleEvent";
import { destructStage, destructStageId, handleMixpanelTrack, validateUnderscore } from "../../../../common/helper";
import { createMediaConfig, isAllowCreate, getColorCodeInitials, streamDetails } from "../../../../helper/utility";
import { Get, Post } from "../../../../common/httpRestServices";
import IntegrationsPopups from "../../Integrations/IntegrationsPopups";
import { facebookPageConnectedAction } from "../../../../store/action/facebookAction";
import EnableLiveStreaming from "../../Integrations/EnableLiveStreaming";
import ActivateYoutubePopup from "../../BroadcastedVideos/BroadcastedVideosTable/ActivateYoutubePopup";
import Image from "../../../../common/Image";
import IntegratedAccounts from "./IntegratedAccounts";
import ActionPopup from "../../../Common/ActionPopup";
import moment from "moment";
import { userDetailsLocal } from "../../../../helper/RoleConfig";
import Modal2 from "../../../../common/Modal/Modal2";
import AddAccComponent from "./AddAccComponent";

function CreateLiveStreaming(_props = {}) {
  const tempHide = false;
  let clearPopup;
  const { t } = useTranslation();
  const {
    _handleOnOutsideClick = () => { },
    _handleSaveYTAccount = () => { },
    _handleAddCohost = () => { },
    // // _handleConnectAccount = () => { },
    _handleCreateBroadcast = () => { },
    _getUnRegisteredEmails = [],
    unmountHandler = () => { },
    enableEditMode = false,
    editSessionCreated = {},
    isUpdateunmount = () => { },
    getYtHeader = false,
    mediaSelect = false,
    destination = false,
    handleGetAccountOpen = () => { },
  } = _props;
  const globalData = useSelector((state) => state) || {};
  const { facebookPageList, facebookProfileList } = globalData?.facebookData || {};
  const { commonData } = globalData || {};
  const { reconnectAccount, timerPopup = false } = commonData;
  const [getFbId, setFbId] = useState("");
  const [fbAccDetails, setFbAccDetails] = useState("");
  const [getAccDetails, setAccDetails] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(true);
  const [getEnableState, setEnableState] = useState(false);
  const [getScheduleError, setScheduleError] = useState(false);
  const [getScheduledateState, setScheduledateState] = useState(false);
  const [reconnectCount, setReconnectCount] = useState("");
  const [getScheduleTimeState, setScheduleTimeState] = useState(false);
  const [getScheduleTimeError, setScheduleTimeError] = useState(false);
  console.log(getScheduledateState, getScheduleTimeState)
  const [getActiveAcc, setActiveAcc] = useState(false);
  const [getRemoveAcc, setRemoveAcc] = useState(false);
  // // const [getRemoveAccName, setRemoveAccName] = useState(false);
  const [getBroadcastMediaId, setBroadcastMediaId] = useState(false);
  const [getSelectedBroadcastId, setSelectedBroadcastId] = useState(false);
  const [getRemoveAccId, setRemoveAccId] = useState('');
  // // const [getRemoveAccType, setRemoveAccType] = useState('');
  const [getAccSuccess, setAccSuccess] = useState(false);
  const [getEnableLiveStreaming, setEnableLiveStreaming] = useState(false);
  const [getEnableLoader, setEnableLoader] = useState(false);
  const [getSelectedAcc, setSelectedAcc] = useState("");
  const [muiltiClick, setMuiltiClick] = useState(false);
  const [youtubeEnable, setYoutubeEnable] = useState(false);
  const [youtubeDropdown, setYoutubeDropdown] = useState(false);
  const [getAccConnectMenu, setAccConnectMenu] = useState(false);
  const [getAccMenu, setAccMenu] = useState(false);
  const [getAccDropMenu, setAccDropMenu] = useState(false);
  const [getConnectedId, setConnectedId] = useState("");
  const [getYTAuthToken, setYTAuthToken] = useState("");
  const [getScheduledData, setScheduledData] = useState({});
  const hostDetails = useSelector((state) => state?.CusPage?.customerDtls);
  const awsStageReducer = useSelector((state) => state?.awsStageReducer); //store
  const { sessionName = "", stageArn = "" } = awsStageReducer;
  const [getAccountOpen, setAccountOpen] = useState(false);
  const [getEditFbId, setEditFbId] = useState("");
  const [socialMediaList, setSocialMediaList] = useState([]);
  const [selectedMediaList, setselectedMediaList] = useState([]);
  const currentOrganisation = window.localStorage.getItem("currntOrgid")
    ? JSON.parse(window.localStorage.getItem("currntOrgid"))
    : {};
  const formInitial = {
    title: {
      value: "",
      errorMsg: "",
    },
    displayName: {
      value: hostDetails.fullName,
      errorMsg: "",
    },
    membersdata: [{}],
    host: hostDetails,
    currentOrg: currentOrganisation,
  };
  const [stageData, setStageData] = useState(formInitial);
  // // const inviteList = useSelector(
  // //   (state) => state?.inviteMemberListReducer?.inviteMember
  // // ).filter((ele) => ele.userId !== hostDetails.userId);

  // // const handleAccountMenu = () => {
  // //  setAccountMenu(!getAccountMenu);
  // //};
  useEffect(() => {
    !getYtHeader && localStorage.removeItem("EditConnectedFB");
    !getYtHeader && localStorage.removeItem("editStreamSave");
    setYoutubeEnable(false);
    setYoutubeDropdown(false);
    const getFBconnected = JSON.parse(localStorage.getItem("EditConnectedFB"));
    setEditFbId(getFBconnected?.id);
    if (getFBconnected) {
      console.log("q1q1 getFBconnectedgetFBconnected ----", getFBconnected)
      setSelectedAcc("Fb");
    }
    return () => {
      setSubmitStatus(true);
    };
  }, []);
  const handleAccConnectMenu = () => {
    setAccConnectMenu(true);
    setAccDropMenu(!getAccDropMenu);
  };
  const handleAccMenu = (state) => {

    setAccMenu(state);
  };
  useEffect(() => {
    if (enableEditMode && getAccountOpen) {
      if (facebookPageList) {
        setAccountOpen("ChooseFacebookPage");
        setFbId(facebookPageList?.fbDetails);
      } else {
        setAccountOpen("FacebookPageNotFound");
      }
    }
  }, [facebookPageList]);

  useEffect(() => {
    console.log("qaqa facebookPageList", facebookPageList)
    if (enableEditMode && getAccountOpen) {
      if (facebookProfileList) {
        setAccountOpen("ChooseFacebookProfile");
        setFbId(facebookProfileList?.fbDetails);
      } else {
        setAccountOpen("FacebookProfileNotFound");
      }
    }
  }, [facebookProfileList]);

  // // const refreshPage = () => { console.log(submitStatus, "refreshPage") };

  const handleAccConnectMenuClose = () => {
    setAccConnectMenu(false);
    setAccDropMenu(false);
  };

  console.log(getAccountOpen, submitStatus, "getAccountOpen");

  const handleInput = (e) => {
    setMuiltiClick(false);
    const { name = "", value = "" } = e.target || {};
    setStageData((i) => ({
      ...i,
      [name]: {
        ...i[name],
        value: value,
        errorMsg: i[name].errorMsg ? createBroadCastValidation(e.target) : null,
      },
    }));
    setMuiltiClick(false);
  };
  // // const handleInviteParticipants = (members) => {
  // //  setStageData({
  // //    ...stageData,
  // //    membersdata: [{ ...members }],
  // //    host: hostDetails.userId,
  // //  });
  // //  handleAccountMenu();
  // //};
  const errorValidate = (event) => {
    const { name = "", value = "" } = event.target || {};
    setStageData((i) => ({
      ...i,
      [name]: {
        value: value,
        errorMsg: createBroadCastValidation(event.target),
      },
    }));
  };
  useEffect(() => {
    console.log(editSessionCreated, "editSessionCreated?.editSession")
    if (editSessionCreated?.editSession) {
      setStageData({
        title: {
          value: editSessionCreated?.sessionName,
          errorMsg: "",
        },
        displayName: {
          value: editSessionCreated?.displayName,
          errorMsg: "",
        },
        membersdata: editSessionCreated?.participantList,
        host: hostDetails,
        currentOrg: currentOrganisation,
        isUpdatePopup: true,
        timeZone: editSessionCreated?.timeZone,
        scheduledTime: editSessionCreated?.scheduledTime
      });
      setEnableState(true);
    }
    return () => {
      setMuiltiClick(false);
      unmountHandler();
      isUpdateunmount(false)
    };
  }, []);
  console.log(stageData, "stageDatastageData")
  const submitErrorMsg = () => {
    setStageData((i) => ({
      ...i,
      ["title"]: {
        value: stageData.title.value,
        errorMsg: createBroadCastValidation({
          name: "title",
          value: stageData.title.value,
        }),
      },
      ["displayName"]: {
        // ...i[inputsArray.role],
        value: stageData.displayName.value,
        errorMsg: createBroadCastValidation({
          name: "displayName",
          value: stageData.displayName.value,
        }),
      },
    }));
    setTimeout(() => {
      setEnableLoader(false);
    }, 2500);
  }
  const handleSubmit = (selectedMedia, broadcastId, mediaId, type = "") => {
    localStorage.removeItem("Group_Jid");
    if (!muiltiClick) {
      setEnableLoader(true);
      const inputsArray = Object.keys(stageData);
      console.log(stageData.title.value, "inputsArray");
      const isError = inputsArray.some((i) => {
        return createBroadCastValidation({
          name: i,
          value: stageData[i].value,
        });
      });
      if (!isError) {
        const userDetails = userDetailsLocal() || {}; //logged userDetails
        const { data: { firstName = "", email = "", organisationName } = {} } = userDetails; //logged userDetails
        handleMixpanelTrack("Create_Broadcast_Success", {
          otfName: firstName,
          otfEmail: email,
          otfmedia: mediaSelect ? mediaSelect : '',
          otfOrganisationName: organisationName,
          otfBroadcastName: stageData.title.value,
          otfMemberCount: _getUnRegisteredEmails.length,
          otfMemberDetails: _getUnRegisteredEmails.map((obj) => obj.emailId),
        });
        setEnableLoader(false);
        setTimeout(() => {
          setEnableLoader(false);
        }, 2500);
        setStageData({
          ...stageData,
          membersdata: _getUnRegisteredEmails,
          host: hostDetails.userId,
        });
        _handleCreateBroadcast(stageData, selectedMedia, broadcastId, mediaId, type);
        setSubmitStatus(false);
      } else {
        const userDetails = userDetailsLocal() || {}; //logged userDetails
        const { data: { firstName = "", email = "", organisationName } = {} } = userDetails; //logged userDetails
        handleMixpanelTrack("Create_Broadcast_Failure", {
          otfName: firstName,
          otfEmail: email,
          otfmedia: mediaSelect ? mediaSelect : '',
          otfOrganisationName: organisationName,
          otfBroadcastName: stageData.title.value,
          otfMemberCount: _getUnRegisteredEmails.length,
          otfMemberDetails: _getUnRegisteredEmails.map((obj) => obj.emailId),
        });
        submitErrorMsg();
      }
    }
  };
  const _handleErrorMsg = (state = "empty") => {
    console.log("state&&", state);
    if (state !== "empty") {
      setScheduledateState(false);
      setScheduleError(false);
    } else {
      setScheduledateState(true);
      setScheduleError(false);
    }
  };
  const _handleTimeErrorMsg = (state = "empty") => {
    console.log("state---", state);
    if (state !== "empty") {
      setScheduleTimeState(false);
      setScheduleTimeError(false);
    } else {
      setScheduleTimeState(true);
      setScheduleTimeError(false);
    }
  };

  const handleScheduleSubmit = (selectedMedia, broadcastId, mediaId, type = "") => {
    if (!muiltiClick) {
      setEnableLoader(true);
      const inputsArray = Object.keys(stageData);
      const isError = inputsArray.some((i) => {
        return createBroadCastValidation({
          name: i,
          value: stageData[i].value,
        });
      });
      console.log("type@@", type);
      if (type === "Update") {
        const scheduledUTCTime = new Date(moment.unix(stageData?.scheduledTime / 1000).utc())
        const scheduledDataApi = {
          scheduledTime: stageData?.scheduledTime,
          hostScheduledTime: `${moment(scheduledUTCTime).format("MMM DD YYYY")} at ${moment(scheduledUTCTime).format("h:mm A")
            + " " + moment.tz(stageData?.timeZone).zoneAbbr()
            } `
        }
        console.log(scheduledDataApi, "scheduledDataApischeduledDataApi")
        _handleCreateBroadcast({ ...stageData, scheduledData: scheduledDataApi }, selectedMedia, broadcastId, mediaId, type);
        setTimeout(() => {
          setEnableLoader(false);
        }, 2500);
        setSubmitStatus(false);
        setScheduleError(false);
        setScheduleTimeError(false);
        return
      }
      if (!isError && isAllowCreate(getScheduledData?.scheduledTime)) {
        setStageData({
          ...stageData,
          membersdata: _getUnRegisteredEmails,
          host: hostDetails.userId,
        });
        getEnableState ?
          _handleCreateBroadcast({ ...stageData, scheduledData: getScheduledData }, selectedMedia, broadcastId, mediaId, type) :
          _handleCreateBroadcast(stageData, selectedMedia, broadcastId, mediaId, type);
        setTimeout(() => {
          setEnableLoader(false);
        }, 2500);
        setSubmitStatus(false);
        setScheduleError(false);
        setScheduleTimeError(false);
      } else {
        setTimeout(() => {
          setEnableLoader(false);
        }, 2500);
        isError && submitErrorMsg();
        !isAllowCreate(getScheduledData?.scheduledTime) && setScheduleError(true);
      }
    }
  };

  const handleGetEnableState = (state = false) => {
    setEnableState(state);
  };

  console.log("selectedDate**", getScheduledData);
  const fetchData = (data) => {
    return Get(`${apiUrl}api/customer/getMediaConfigs?mediaType=YT`, true)
      .then((res) => {
        if (data === "select") {
          store.dispatch(
            getAccessTokenAction(res?.data?.data?.mediaConfigList[0])
          );
        } else {
          store.dispatch(getAccessTokenAction());
        }
        if (res.status === 200) {
          setYTAuthToken(res?.data?.data?.mediaConfigList[0]?.authToken);
          // setYTMediaMail(res.data.data.mediaConfigList[0].mediaMail)
        }
      })
      .catch((err) => {
        console.error("Error fetching responseGetMediaConfig data:", err);
      });
  };

  const chooseFbData = async (mediaId, mediaType, data) => {
    // return Get(`${apiUrl}simulcast/api/media-config/get-media-list?media_id=${mediaId}`, true)
    //   .then((res) => {
    if (mediaId) {
      const indexed = mediaType === "YT" ? socialMediaList.filter(res => res?.media_id === mediaId)
        : socialMediaList.filter(res => res?.config_id === mediaId);
      // // let result = Object.values({indexed});
      setselectedMediaList(indexed);
      store.dispatch(facebookPageConnectedAction(indexed));
      const accId = indexed[0]?.config_id ? indexed[0]?.config_id : indexed[0]?.media_id;
      setConnectedId(accId);
      if (data === "select" && indexed) {
        localStorage.setItem("EditConnectedFB", JSON.stringify(indexed));
      } else {
        store.dispatch(facebookPageConnectedAction());
        localStorage.removeItem("EditConnectedFB");
      }
    }
    // })
    // .catch((err) => {
    //   console.error("Error fetching responseGetMediaConfig data:", err);
    // });
  };

  const fetchFbDataInitial = (data) => {
    // return Get(`${apiUrl}simulcast/api/media-config-type/list`, true)
    return Get(`${apiUrl}simulcast/api/media-config/get-media-list?token_check=true`, true)
      .then((res) => {
        if (res?.status === 200) {
          setSocialMediaList(res?.data?.response);
          let count = 0;
          for (const element of res?.data?.response) {
            if (element?.status === 2) {
              count = count + 1;
            }
          }
          console.log(" resresresresreeerreerr", count)
          setReconnectCount(count);
        }
      })
      .catch((err) => {
        console.error("Error fetching responseGetMediaConfig data:", err);
      });
  };

  const mediaSelected = () => {
    // return Get(`${apiUrl}simulcast/api/media-config-type/list`, true)
    const editArn = editSessionCreated?.stageArn;
    const refreshBroadcast = awsStageReducer?.stage?.arn;
    const getsessionBroadcast = destructStageId(destructStage(editArn || refreshBroadcast || stageArn));
    if (getsessionBroadcast && editSessionCreated) {
      return Get(`${apiUrl}simulcast/api/media-broadcast/list?broadcast_id=${editArn || stageArn || refreshBroadcast}`, true)
        .then((res) => {
          if (res?.status === 200) {
            const getMedia = res?.data?.response[0];
            let result = Object.values({ getMedia });
            setselectedMediaList(result);
            const accId = result[0]?.config_id ? result[0]?.config_id : result[0]?.media_id;
            setConnectedId(accId);
            setBroadcastMediaId(result[0]?.broadcast_id);
            setSelectedBroadcastId(result[0]?.id);
          }
        })
        .catch((err) => {
          console.error("Error fetching responseGetMediaConfig data:", err);
        });
    }
  };

  const fetchSocialList = () => {
    // return Get(`${apiUrl}simulcast/api/media-config-type/list`, true)
    return Get(`${apiUrl}simulcast/api/media-config/get-media-list?token_check=true`, true)
      .then((res) => {
        if (res?.status === 200) {
          setSocialMediaList(res?.data?.response);
          const getInstantFbId = res?.data?.response[res?.data?.response?.length - 1];
          console.log("qaqa set res?.data?.response?.length - 1", res?.data?.response?.length - 1);
          console.log("qaqa set getInstantFbId", getInstantFbId);
          setEditFbId(getInstantFbId?.id);
          // // setSelectedAcc("facebook");
          store.dispatch(facebookPageConnectedAction(res?.data?.response[res?.data?.response?.length - 1]));
          localStorage.setItem("EditConnectedFB", JSON.stringify(res?.data?.response[res?.data?.response?.length - 1]));
        }
      })
      .catch((err) => {
        console.error("Error fetching responseGetMediaConfig data:", err);
      });
  };

  const deleteSelectedAcc = async (id, broadcastId) => {
    store.dispatch(deleteSocialAcc(false));
    if (id !== "" && broadcastId && typeof (id) === "string") {
      const deleteSelectAcc = {
        "id": id,
      };
      const selectedMediaDelete = await Post(
        // `${apiUrl}simulcast/api/media-broadcast/remove?id=${id}`, true
        `${apiUrl}simulcast/api/media-broadcast/remove`, deleteSelectAcc,
        true
      );
      setRemoveAcc(false);
      localStorage.removeItem('Select_Media');
      localStorage.removeItem("editStreamSave");
      if (selectedMediaDelete?.status === 200) {
        store.dispatch(deleteSocialAcc(true));
        mediaSelected();
      }
    }
    else {
      localStorage.removeItem("editStreamSave");
      setselectedMediaList([]);
      setConnectedId(false);
      mediaSelected();
      setRemoveAcc(false);
    }
  };
  // // const handleMediaTypeName = (mediaType) => {
  // //   switch (mediaType) {
  // //     case "FB": return setRemoveAccType("Facebook");
  // //     case "YT": return setRemoveAccType("YouTube");
  // //     case "IN": return setRemoveAccType("Instagram");
  // //     default: return setRemoveAccType("");
  // //   }
  // // };
  const handleRemoveAcc = (id = "") => {
    // // handleMediaTypeName(mediaType);
    setRemoveAcc(true);
    setRemoveAccId(id);
  };
  const handleRemoveAccPopup = (state = false) => {
    setRemoveAcc(state);
  };

  useEffect(() => {
    tempHide && fetchData("select");
  }, [youtubeEnable]);

  const handleisUpdate = (type = "") => {
    if (type === "setter") {
      return stageData?.isUpdatePopup ? "Update" : "Schedule";
    }
    return stageData?.isUpdatePopup ? "Update" : "Schedule Broadcast"
  }
  useEffect(() => {
    fetchFbDataInitial("select");
    mediaSelected();
  }, []);

  useEffect(() => {
    if (reconnectAccount) {
      fetchFbDataInitial();
    }
  }, [reconnectAccount]);

  const handleSelectedAcc = (mediaId, mediaType, selectedAcc = "") => {
    // // setSelectedAcc(getSelectedAcc === selectedAcc ? "" : selectedAcc);
    // // setSelectedAcc(id === getEditFbId ? "" : selectedAcc);
    // // fetchData("select");
    chooseFbData(mediaId, mediaType, "select");
    // // setEditFbId(id);
  };

  const _handleConnectAccount = (state) => {
    setAccountOpen(state);
    setAccDropMenu(false);
    setFbAccDetails("");
  };

  const handleFacebookPagePermissions = () => {
    setAccountOpen("ChooseFacebookPage");
  };

  const handleFacebookNotFound = () => {
    setAccountOpen(false);
    window.open("https://www.facebook.com/pages", "_blank", "noopener");
  };

  const handleChooseFacebookPage = async () => {
    console.log("qaqa pppeee ", fbAccDetails)
    if (fbAccDetails === "") {
      setAccountOpen(false);
    }
    const fbPageParams = {
      "media_type": fbAccDetails?.datas?.media_type,
      "media_id": fbAccDetails?.datas?.media_id,
      "config_id": fbAccDetails?.selectConfigId,
      "config_type": fbAccDetails?.datas?.config_type
    };
    const resFbPage = await Post(
      `${apiUrl}simulcast/api/media-config-type`, fbPageParams);
    console.log("qaqa resFbPage", resFbPage)
    if (resFbPage?.status === 200) {
      setAccountOpen("FacebookPageSuccess");
      fetchSocialList();
    }
  };

  const activePages = (data, fbDetails) => {
    console.log("qaqa active page int", data, fbDetails);
    console.log("qaqa actt setAccountOpen", getAccountOpen);
    if (fbDetails.media_id === undefined) {
      console.log("qaqa actt fbDetails.media_id ", fbDetails.media_id);
      store.dispatch({ type: "DO_LOADING_PAGE", loading: false });
    }
    if (fbDetails === "") {
      console.log("qaqa actt fbDetails", fbDetails);
      setAccountOpen(false);
    }
    if (fbDetails?.config_type === "page" && fbDetails.media_id !== undefined) {
      console.log("qaqa actt fbDetails?.config_type", fbDetails?.config_type);
      if (data && data?.length !== 0) {
        console.log("qaqa actt data?.length", data?.length);
        store.dispatch({ type: "DO_LOADING_PAGE", loading: false });
        setAccountOpen("ChooseFacebookPage");
        setFbId(fbDetails);
      } else {
        store.dispatch({ type: "DO_LOADING_PAGE", loading: false });
        setAccountOpen("FacebookPageNotFound");
      }
    } else if (fbDetails?.config_type === "profile" && fbDetails.media_id !== undefined) {
      console.log("qaqa actt fbDetails.media_id", fbDetails.media_id);
      if (data && data?.length !== 0) {
        console.log("qaqa active profile int", data, fbDetails);
        store.dispatch({ type: "DO_LOADING_PAGE", loading: false });
        setAccountOpen("ChooseFacebookProfile");
        setFbId(fbDetails);
      } else {
        store.dispatch({ type: "DO_LOADING_PAGE", loading: false });
        setAccountOpen("FacebookProfileNotFound");
      }
    }
  };

  const choosePage = (datas, selectConfigId) => {
    console.log("qaqa active ddssaa", datas, selectConfigId);
    setFbAccDetails({ datas, selectConfigId });
  };

  const handleFacebookProfilePermissions = () => {
    setAccountOpen("ChooseFacebookProfile");
  };

  const handleChooseFacebookProfile = async () => {
    console.log("qaqa cc pppeee ", fbAccDetails)
    const fbPageParams = {
      "media_type": fbAccDetails?.datas?.media_type,
      "media_id": fbAccDetails?.datas?.media_id,
      "config_id": fbAccDetails?.selectConfigId,
      "config_type": fbAccDetails?.datas?.config_type
    };
    if (fbAccDetails === "") {
      setAccountOpen(false);
    } else {
      const resFbPage = await Post(
        `${apiUrl}simulcast/api/media-config-type`, fbPageParams);
      console.log("qaqa cc resFbPage", resFbPage)
      if (resFbPage?.status === 200) {
        setSelectedAcc("Fb");
        setAccountOpen("FacebookProfileSuccess");
        fetchSocialList();
      }
    }
  };

  useEffect(() => {
    if (getAccountOpen === "FacebookPageSuccess" || getAccountOpen === "FacebookProfileSuccess") {
      clearPopup = setTimeout(() => {
        setAccountOpen(false);
        clearTimeout(clearPopup);
      }, 5000);
    }
    return (() => {
      clearTimeout(clearPopup);
    })
  }, [getAccountOpen])

  useEffect(() => {
    if (getAccountOpen === false && clearPopup) {
      clearTimeout(clearPopup);
    }
  }, [getAccountOpen])

  const getBroadcastStatusByEmail = async (
    tokenResponse,
    profileObj,
    userInfo
  ) => {
    const ACCESS_TOKEN = tokenResponse.access_token;
    const headers = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    try {
      //Checking Youtube channel availability
      const responseStream = await axios.get(
        `${youtubeApiUrl}liveStreams?part=status&mine=true&key=${YOUTUBE_API_KEY}`,
        { headers }
      );
      console.log("responseStream Status responseStream:", responseStream);
      if (responseStream?.status === 200 && responseStream?.data?.items?.length > 0) {
        setAccSuccess(true);
        const responseMediaConfig = await createMediaConfig(
          tokenResponse,
          userInfo,
          "YT"
        );
        console.log("1q1q responseMediaConfig:", responseMediaConfig);
        // // setYoutubeEnable(true);
        setSelectedAcc("youtube");
        fetchData("select");
        fetchSocialList();
        store.dispatch(showYoutubeAction(true));
        setTimeout(() => {
          setAccSuccess(false);
          store.dispatch(showYoutubeAction(false));
        }, 6000);
      }
      if (
        responseStream?.status === 200 &&
        responseStream?.data?.items?.length == 0
      ) {
        try {
          const responseInitialEditStream = await axios.post(
            `${youtubeApiUrl}liveStreams?part=id&part=snippet&part=cdn&key=${YOUTUBE_API_KEY}`,
            streamDetails,
            { headers }
          );
          console.log(
            "responseStream Status responseInitialStream:",
            responseInitialEditStream
          );
          if (responseInitialEditStream?.status === 200) {
            getBroadcastStatusByEmail(tokenResponse, profileObj, userInfo);
          }
        } catch (err) {
          setActiveAcc(err?.response?.data?.error?.code === 403);
        }
      }
    } catch (error) {
      console.error("Error fetching broadcast data:", error);
      console.log('Response data:', error?.response?.data);
      setEnableLiveStreaming(error?.response?.data?.error?.code === 403);
    }
  };

  //google
  const onSuccess = async (response, tokenResponse, userInfo) => {
    const { profileObj = {} } = nullToObject(response);
    const {
      email = "",
      type = "",
      givenName = "",
      googleId = "",
      // // data = {},
    } = profileObj;
    // //const { userData = null } = data;
    const newObj = {
      ...response,
      sso: true,
      email: email,
      type: type,
      name: givenName,
      unique: googleId,
      ssoresponse: true,
    };

    storeSSOLoginResponseDetails(newObj);
    getBroadcastStatusByEmail(tokenResponse, profileObj, userInfo);
  };

  const onFailure = (response = {}, type = "") => {
    const newObj = {
      ...response,
      name: "",
      email: "",
      sso: true,
      unique: "",
      type: type,
      ssoresponse: false,
    };
    storeSSOLoginResponseDetails(newObj);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      const auth_code = codeResponse?.code;
      const redirect_url = window.location.origin;
      const tokenParams = {
        code: auth_code,
        redirect_url: redirect_url,
        "media_type": "YT",
      };
      const getToken = await Post(
        `${apiUrl}simulcast/api/media-config/auth-code`,
        tokenParams
      );
      const tokenResponse = getToken.data.response;
      const { access_token } = getToken.data.response;
      localStorage.setItem("tokenResponse", JSON.stringify(codeResponse));
      const response = await getGoogleUserDetails(access_token);
      const { data: { data = {}, status = 0 } = {} } = nullToObject(response);
      if (status === 200) {
        const newObj = {
          profileObj: {
            email: data.email,
            googleId: data.ssoid,
            givenName: data.name,
            type: "google",
            data: data,
          },
        };
        const userInfo = await axios.get(`${ytUserInfoUrl}userinfo`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        onSuccess(newObj, tokenResponse, userInfo.data);
        console.log("onSuccess", tokenResponse, codeResponse);
      } else {
        console.log("onFailure", data);
        onFailure(data, "google");
      }
    },
    flow: "auth-code",
    scope: "https://www.googleapis.com/auth/youtube",
    // redirect_uri: "http://localhost:3000/account-connected",
    // prompt: "consent",
    // ux_mode: "popup | redirect",
    onError: (errorResponse) => {
      onFailure(errorResponse, "google");
    },
  });

  const handleClose = () => {
    setEnableLiveStreaming(false);
  };
  const handleAccClose = () => {
    setActiveAcc(false);
  };
  const handleAccSuccessClose = () => {
    setAccSuccess(false);
  };
  console.log(_getUnRegisteredEmails, "_getUnRegisteredEmails");

  useEffect(() => {
    handleGetAccountOpen(getAccountOpen);
  }, [getAccountOpen]);

  useEffect(() => {
    if (mediaSelect) {
      setAccDetails("Edit Destination");
    }
    else {
      setAccDetails("Add Destination")
    }
  }, [mediaSelect]);

  const handleHeading = () => {
    return destination ? getAccDetails : "Edit Live Streaming";
  };

  return (
    <>
      <Modal>
        <AnimatePopup
          setShow={true}
          _handleOnOutsideClick={
            (getEnableLiveStreaming || getActiveAcc || getRemoveAcc || getAccSuccess || getAccountOpen || getAccMenu) ? () => { } : () => _handleOnOutsideClick()
          }
        >
          <div className={` ${enableEditMode ? " edit_live_streaming" : " "} create_live_streaming`}>
            <button
              onClick={() => _handleOnOutsideClick()}
              className="action_close"
              type="button"
            >
              <IconX />
            </button>
            <div className="create_live_streaming_inner">
              <div className="create_live_streaming_head">
                <h2>{(enableEditMode || editSessionCreated) ? handleHeading() : t("BROADCAST.CREATE_LIVE_STREAM")}</h2>
                <p style={{ maxWidth: (enableEditMode || editSessionCreated) ? " 446px" : "" }}>
                  {(enableEditMode || editSessionCreated) ? "Edit Live broadcast and Tune in for an Exclusive Broadcast! Go Live and Share Your Moment with the World"
                    :
                    t("BROADCAST.CREATE_LIVE_STREAM_CAPTIONS")}</p>
              </div>
              <div className="create_live_streaming_body">
                <form action="">
                  <fieldset>
                    <CommonFormInput
                      autoFocus={!enableEditMode}
                      enableCustomLabel={true}
                      className="w-full mb-0"
                      disabled={enableEditMode || editSessionCreated}
                      mustFill={!editSessionCreated && !enableEditMode}
                      error={stageData.title.errorMsg}
                      type="text"
                      name={"title"}
                      value={
                        enableEditMode
                          ? validateUnderscore(
                            replaceSpacesWithNonbreakSpace(sessionName)
                          )
                          : stageData.title.value
                      }
                      palceholderOnly={"Enter the title for broadcasting"}
                      palceholder={"Title"}
                      //   _maxLength={100}
                      _onchange={(event) => handleInput(event)}
                      _onBlur={
                        checkWhiteSpaces(stageData.title.value)
                          ? (e) => errorValidate(e)
                          : () => { }
                      }
                    />
                  </fieldset>
                  {!enableEditMode && <fieldset>
                    <CommonFormInput
                      enableCustomLabel={true}
                      className="w-full mb-0"
                      mustFill={!editSessionCreated}
                      error={stageData.displayName.errorMsg}
                      disabled={editSessionCreated}
                      type="text"
                      name={"displayName"}
                      value={stageData.displayName.value}
                      palceholderOnly={"Enter display name"}
                      palceholder={"Display Name"}
                      //   _maxLength={36}
                      _onchange={(e) => handleInput(e)}
                      _onBlur={(e) => {
                        errorValidate(e);
                      }}
                    />
                  </fieldset>}
                  {tempHide && (
                    <fieldset>
                      <div className="invite_member_wraper custom_action">
                        <div className="head_info">
                          <span>{t("BROADCAST.INVITE_MEMBER")}</span>
                          <LabelTooptip
                            minHeight={"50px"}
                            iconType="question"
                            tooltipDesc={
                              "Linking social media will give access to live stream in selected social media platform."
                            }
                          />
                        </div>
                        <button
                          onClick={_handleAddCohost}
                          className="action_invite_member"
                          type="button"
                        >
                          <Iconplus />
                          <span>{t("BROADCAST.ADD_COHOST")}</span>
                        </button>
                      </div>
                    </fieldset>
                  )}
                  {!enableEditMode && (<fieldset>
                    <div className="invite_member_wraper custom_action">
                      <div className="action_invite_acc_list">
                        <div className="action_invite_member_list">
                          <div className="head_info">
                            <span>{t("BROADCAST.INVITE_MEMBER")}</span>
                            <LabelTooptip
                              minHeight={"50px"}
                              iconType="question"
                              tooltipDesc={
                                "Inviting cohost so they can make changes to the live stream settings if needed."
                              }
                            />
                          </div>
                          <button
                            onClick={_handleAddCohost}
                            className="action_invite_member"
                            type="button"
                          >
                            <Iconplus />
                            <span>{t("BROADCAST.ADD_COHOST")}</span>
                          </button>
                        </div>
                        {_getUnRegisteredEmails.map((item, i) => {
                          return (
                            <>
                              {i < 3 && (
                                <div
                                  className="_img tooltip_black_wraper"
                                  key={item.emailId}
                                >
                                  <div className="tooltip_black">
                                    {item.emailId}
                                  </div>
                                  {/* <img className='img' src={ImgDevUserPlaceholder} alt="user" width={50} height={50} /> */}
                                  <div style={{ background: item?.userId ? getColorCodeInitials(item.emailId) : "transparent" }} className="img ">
                                    {item?.userId &&
                                      item?.emailVerified !== 0 ? (
                                      <span className="initial">
                                        {getInitials(item.emailId)}
                                      </span>
                                    ) : (
                                      <img
                                        width="117px"
                                        height="117px"
                                        style={{ "z:index": "100" }}
                                        src={Imgplaceholder}
                                        alt="profile"
                                      />
                                    )}
                                  </div>
                                </div>
                              )}
                            </>
                          );
                        })}
                        {_getUnRegisteredEmails.length > 4 ? (
                          <div
                            className="_img black"
                            title={_getUnRegisteredEmails
                              .filter((item, i) => {
                                return i > 2;
                              })
                              .toString()}
                          >
                            <div className="img ">
                              <span className="initial">
                                {"+"}
                                {_getUnRegisteredEmails.length - 3}
                              </span>
                            </div>
                          </div>
                        ) : null}

                        {/* <div className='_img'>
                            <img className='img' src={ImgDevUserPlaceholder} alt="user" width={50} height={50} />
                            <div className='tooltip_black'>
                              John Morrison2
                            </div></div>
                          <div className='_img'>
                            <img className='img' src={ImgDevUserPlaceholder} alt="user" width={50} height={50} />
                            <div className='tooltip_black'>
                              John Morrison
                            </div></div> */}
                      </div>
                    </div>
                  </fieldset>
                  )}
                  {<fieldset className="custom_action_wraper mb-0">
                    <div className="custom_action_wraper_inner">
                      <div className="invite_member_wraper custom_action">
                        <div className="action_invite_acc_list">
                          <div className="action_invite_member_list">
                            <div className="head_info">
                              <span>{t("Link Social Media")}</span>
                              <LabelTooptip
                                minHeight={"50px"}
                                iconType="question"
                                tooltipDesc={
                                  "Linking social media will give access to live stream in selected social media platform."
                                }
                              />
                            </div>
                            <button
                              onClick={() => {
                                handleAccMenu(true);
                              }}
                              className={`action_invite_member ${getAccMenu ? "active" : ""}`}
                              type="button"
                            >
                              <Iconplus />
                              <span>Connect Account</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  }
                  {selectedMediaList?.length > 0 &&
                    <div className={`custom_action`}>
                      <div className="account_list">
                        {selectedMediaList[0] !== undefined &&
                          selectedMediaList.map((item, index) => {
                            const { id = "", profile = "", name = "", media_type: mediaType = "", config_type: configType = "",
                              media_name: mediaName = "", media_profile: mediaProfile = "", media_id: mediaId = "",
                            } = item;
                            let accType = "";
                            if (configType === "page") {
                              accType = "Facebook Page";
                            } else {
                              accType = "Facebook Profile";
                            }
                            if (mediaType === "YT") {
                              accType = "YouTube Channel";
                            }
                            // // const getFBconnected = JSON.parse(localStorage.getItem("EditConnectedFB"));
                            return (
                              <div
                                className={` acc_info_wraper button ${!(getSelectedAcc === mediaId && id === getEditFbId)
                                  ? " active "
                                  : " not_selected"
                                  } `}
                                key={convertToLowerCase(index + "socialMediaList")}
                              >
                                <button
                                  // onClick={() =>
                                  //   handleSelectedAcc(id, config_id, media_type)
                                  // }
                                  type="button"
                                  className={` ${(getSelectedAcc === mediaType && id === getEditFbId) ? " active " : " "}  acc_info_list`}
                                >
                                  <div className="acc_icon">
                                    {mediaType === "YT" ? <YoutubeIcon /> : <FacebookIcon />}
                                    <Image className="userinfo_img"
                                      placeholderImg={ImgProfile}
                                      src={profile || mediaProfile}
                                      alt={"profile"} />
                                  </div>
                                  <div className="acc_info">
                                    <h4 title={name}>{name || mediaName || "No name"}</h4>
                                    <h5>{accType}</h5>
                                  </div>
                                </button>
                                {<button
                                  className="acc_remove"
                                  type="button"
                                  onClick={() => handleRemoveAcc(id)}
                                >
                                  <IconX />
                                </button>}
                              </div>
                            );
                          })
                        }
                      </div>
                    </div>
                  }
                  {!enableEditMode ? <SheduleEvent
                    readOnly={editSessionCreated}
                    _handleGetEnableState={handleGetEnableState}
                    _handleErrorMsg={_handleErrorMsg}
                    _getScheduleError={getScheduleError}
                    getScheduledTime={(e) => setScheduledData(e)}
                    _getScheduleTimeError={getScheduleTimeError}
                    _handleTimeErrorMsg={_handleTimeErrorMsg}
                    isUpdatePopup={stageData?.isUpdatePopup ? true : false}
                    updatedTimeZone={stageData?.timeZone}
                    updatedScheduledTime={stageData?.scheduledTime}
                  />
                    : null
                  }
                  <div className="action_create_broadcast_wraper">
                    {console.log("q1q1 save getSelectedAcc", getSelectedAcc)}
                    {enableEditMode ? (
                      <button
                        className="action_create_broadcast"
                        onClick={(e) => _handleSaveYTAccount(selectedMediaList, getSelectedBroadcastId, getBroadcastMediaId)}
                        type="button"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="action_create_broadcast"
                        onClick={getEnableState ? (e) => {
                          handleScheduleSubmit(selectedMediaList, getSelectedBroadcastId, getBroadcastMediaId, handleisUpdate("setter"));
                          e.target.blur();
                        } : (e) => {
                          handleSubmit(selectedMediaList, getSelectedBroadcastId, getBroadcastMediaId, "create");
                          // _handleSaveYTAccount(selectedMediaList, getSelectedBroadcastId, getBroadcastMediaId)
                          e.target.blur();
                        }}
                        type="button"
                      >
                        {getEnableState ? handleisUpdate() : t("BROADCAST.CREATE_BROADCAST")}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </AnimatePopup>
        {getEnableLoader ? <Loader type="fixed overlay" /> : null}
        {getAccMenu ? <IntegratedAccounts
          AddAccComponent={
            <AddAccComponent
              customButton={true}
              handleAccConnectMenuClose={timerPopup || getAccSuccess ? () => { } : () => handleAccConnectMenuClose()}
              handleAccConnectMenu={handleAccConnectMenu}
              getAccConnectMenu={getAccConnectMenu}
              getAccDropMenu={getAccDropMenu}
              selectedMediaList={selectedMediaList}
              handleRemoveAcc={handleRemoveAcc}
              _handleConnectAccount={_handleConnectAccount}
              googleLogin={googleLogin}
              getSelectedAcc={getSelectedAcc}
              getEditFbId={getEditFbId}
              youtubeDropdown={youtubeDropdown}
            />}
          socialMediaList={socialMediaList}
          enableEditMode={enableEditMode}
          handleChooseMedia={handleSelectedAcc}
          youtubeEnable={youtubeEnable}
          getYTAuthToken={getYTAuthToken}
          _handleOnOutsideClick={timerPopup || getAccountOpen || getAccSuccess ? () => { } : () => handleAccMenu(false)}
          connectedId={getConnectedId}
          errorsCount={reconnectCount}
        /> : null}
        {getEnableLiveStreaming ? <EnableLiveStreaming editStream={true} _handleClose={handleClose} /> : null}
        {getActiveAcc ? <ActivateYoutubePopup editStream={true} _handleClose={handleAccClose} /> : null}
      </Modal>
      {getAccSuccess ?
        <Modal2>
          <IntegrationsPopups
            _type="YoutubeSuccess"
            _handleAction={() => handleAccSuccessClose()}
            _handleClose={() => handleAccSuccessClose()}
          />
        </Modal2>
        : null
      }
      {getAccountOpen === "FacebookPage" ? (
        <Modal2>
          <IntegrationsPopups
            _type="FacebookPagePermissions"
            _handleAction={handleFacebookPagePermissions}
            _handleClose={() => _handleConnectAccount(false)}
            activePage={activePages}
          />
        </Modal2>

      ) : null}
      {getAccountOpen === "ChooseFacebookPage" ?
        <Modal2>
          <IntegrationsPopups
            _type="ChooseFacebookPage"
            _handleAction={() => handleChooseFacebookPage()}
            _handleClose={() => _handleConnectAccount(false)}
            fbId={getFbId}
            choosePage={choosePage}
          />
        </Modal2>

        : null
      }
      {getAccountOpen === "FacebookPageSuccess" ?
        <Modal2>
          <IntegrationsPopups
            _type="FacebookPageSuccess"
            _handleAction={() => _handleConnectAccount(false)}
            _handleClose={() => _handleConnectAccount(false)}
          />
        </Modal2>

        : null
      }
      {getAccountOpen === "FacebookPageNotFound" ?
        <Modal2>
          <IntegrationsPopups
            _type="FacebookPageNotFound"
            _handleAction={() => handleFacebookNotFound()}
            _handleClose={() => _handleConnectAccount(false)}
          />
        </Modal2>

        : null
      }
      {getAccountOpen === "FacebookProfile" ?
        <Modal2>
          <IntegrationsPopups
            _type="FacebookProfilePermissions"
            _handleAction={handleFacebookProfilePermissions}
            _handleClose={() => _handleConnectAccount(false)}
            activePage={activePages}
          />
        </Modal2>

        : null
      }
      {getAccountOpen === "ChooseFacebookProfile" ?
        <Modal2>
          <IntegrationsPopups
            _type="ChooseFacebookProfile"
            _handleAction={() => handleChooseFacebookProfile()}
            _handleClose={() => _handleConnectAccount(false)}
            fbId={getFbId}
            choosePage={choosePage}
          />
        </Modal2>

        : null
      }
      {getAccountOpen === "FacebookProfileSuccess" ?
        <Modal2>
          <IntegrationsPopups
            _type="FacebookProfileSuccess"
            _handleAction={() => _handleConnectAccount(false)}
            _handleClose={() => _handleConnectAccount(false)}
          />
        </Modal2>

        : null
      }
      {
        getRemoveAcc && (
          <Modal>
            <ActionPopup
              title="Remove Account?"
              iconComponentCustom={<div
                style={{ background: "#ffdada", color: "#FF4747", padding: "12px" }}
                className="danger icon"
              >
                <IconX fill="#FF4747" />
              </div>}
              description={
                <>
                  Are you sure you want to remove this account from the broadcast?
                </>
              }
              setActive={true}
              onExited={() => handleRemoveAccPopup(false)}
              actionButtonText="Remove"
              cancelButtonText="Cancel"
              handleClose={() => handleRemoveAccPopup(false)}
              handleAction={() => { deleteSelectedAcc(getRemoveAccId, getBroadcastMediaId); }}
            />
          </Modal>
        )
      }
    </>
  );
}

export default CreateLiveStreaming;
