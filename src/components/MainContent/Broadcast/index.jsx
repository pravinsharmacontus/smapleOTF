import React, { memo, useEffect, useState } from "react";
import "./Broadcast.scss";
import BroadcastTable from "./BroadcastTable";
import BroadcastInitial from "./BroadcastInitial";
import BroadcastVideoView from "./BroadcastVideoView";
import CreateLiveStreaming from "./CreateLiveStreaming";
import EnteringStream from "./EnteringStream";
import { useDispatch, useSelector } from "react-redux";
import _get from "lodash/get";
import {
  appStatusAction,
  awsCreateStageAction,
  awsGetMeetingData,
  awsGetPast,
  awsGetUpcoming,
  awsJoinStage,
} from "../../../store/action/awsActions";
import {
  addDeviceChange,
  assertsPermissionStatus,
  deviceDispatch,
  initialLocalStreamSetup,
} from "../../../helper/assetsAwsHelper";
import { userDetailsLocal } from "../../../helper/RoleConfig";
import { callCusDetails } from "../Setting/settingPageCommon";
import store from "../../../store";
import { inviteMemberListAction } from "../../../store/action/inviteMemberAction";
import AddCohostPopup from "./AddCohostPopup";
import { getCustDtls } from "../../../store/action/customeAction";
import { useHistory } from "react-router-dom";
import { joinStage } from "../../../aws/ivsfunctions";
import { organisationMemberListAction } from "../../../store/action/organisationAction";
import { getStageArnId } from "../../../helper/EncryptDecrpt";
import { diableDevices } from "../../../helper/AwsDeviceAccess";
import {
  addCreateMeet,
  getDeleteStageResponse,
  handleMixpanelTrack,
  isOffline,
} from "../../../common/helper";
import { toastInternet } from "../../../helper/ApiToast";
import { constantValue } from "../../../const/errorTypes";
import { updateMembersDetails } from "../../../firebase/firebaseRealtimeFunctions";
import {
  getParticipantListAction,
  emptyBroadcast,
} from "../../../store/action/participantAction";
import Loader from "../../../common/Loader";
import { setPermissionOnChange } from "../../../systemDevices/camMicAsserts";
import { refreshPage } from "../../../helper";
import { editStreamAction } from "../../../store/action/editStreamAction";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { mfLicenseKey, ssoYTGmailClientId } from "../../../helper/ApiUrl";
import { isArray } from "lodash";
import { participantListRequest } from "../../../services/participantServices";
import { getCurrentUserId, selectStream } from "../../../helper/utility";
import { deleteParticipantRequest, updateParticipantToken } from "../../../services/aswServices";
import { InBroadcastScreenAction, InBroadcastScreenBackAction } from "../../../store/action/tempAction";
import { InitializeMirrorfly } from "mf-chat-uikit/dist";
import { getStageData } from "../../../aws/awsHelper";

const Broadcast = (_props = {}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userDetails = useSelector((state) => state?.CusPage?.customerDtls);
  const sessionInfo = useSelector((state) => state?.sessionInfo);
  const globalData = useSelector((state) => state) || {};
  const { loader: { isLoadingEdit = false } = {} } = globalData;
  const awsStageReducer = useSelector((state) => state?.awsStageReducer); //store
  const sessionPastInfo = useSelector(
    (state) => state?.sessionPastRecordReducer?.totalRecords
  );
  const sessionUpcomingInfo = useSelector(
    (state) => state?.sessionUpcomingRecordReducer?.totalRecords
  );
  const sessionTotalRecord = useSelector(
    (state) => state?.sessionTotalRecordReducer
  );
  const currentOrganisation = useSelector(
    (state) => state?.currentOrganisationReducer?.currentOrganisation
  );
  const deleteStatus = useSelector((state) => state?.deleteReducer?.deleteMsg);
  const broadcastBranding = useSelector((state) => state?.broadcastBranding); //store
  const broadcastScreenStatus = useSelector((state) => state?.BroadcastScreenReducer?.broadcastScreenStatus); //store

  const currentStageData = awsStageReducer.method === "create" ? getStageData(awsStageReducer) : awsStageReducer;
  const { sessionName = "" } = currentStageData;

  const fbLayout = broadcastBranding?.layout || "";
  const fbHlsLink = broadcastBranding?.hlsLink || "";
  const fbGoLive = broadcastBranding?.goliveStatus || "";
  const fbWarningTime = broadcastBranding?.callWaringTime || "";
  const fbEndTime = broadcastBranding?.callEndTime || "";
  const fbCallStartTime = broadcastBranding?.callStartTime || "";
  const fbBannerText = broadcastBranding?.bannerText || "";
  const fbBannerStatus = broadcastBranding?.bannerStatus || "";
  const fbBannerBackground = broadcastBranding?.bannerBackground || 0;
  const fbBannerStyle = broadcastBranding?.bannerStyle || "";
  const fbBannerBgColor = broadcastBranding?.bannerBgColor || "";
  const FbBannerTextColor = broadcastBranding?.bannerTextColor || "";
  const FbBannerTopOverlay = broadcastBranding?.bannerTopOverlay || 0;
  const fbRemoveStatus = broadcastBranding?.removeParticipant || false;
  const FbIsLogoRight = broadcastBranding?.isLogoRight || false;

  const FbData = {
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
    fbCallStartTime,
    FbIsLogoRight,
  };

  const [getAddCohost, setAddCohost] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);
  const [getEnableLoader, setEnableLoader] = useState(false);
  const [deviceBlocked, setDeviceBlocked] = useState(false);
  const [getPastStageStatus, setPastStageStatus] = useState(false);
  const [getMuteStatus, setMuteStatus] = useState({
    isVideoMute: false,
    isAudioMute: false,
  });
  const [searchEnable, setSearchEnable] = useState(false);
  const [stageUpdate, setStageUpdate] = useState(true);
  const [initialArg, setInitialArg] = useState(false);
  const [getRegisteredEmails, setRegisteredEmails] = useState([]);
  const [getUnRegisteredEmails, setUnRegisteredEmails] = useState([]);
  const [getLoginEmail, setLoginEmail] = useState(false);
  const [getLoginProfileName, setLoginProfileName] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [disableAction, setDisableActon] = useState(true);
  const [noDeviceFound, setNoDeviceFound] = useState(false);
  const [getTabPosition, setTabPosition] = useState("Upcoming");
  const [showTrailPopup, setShowTrailPopup] = useState(false);
  const [editSessionCreated, setEditSessionCreated] = useState(false);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [getRemoveParticipantPopup, setRemoveParticipantPopup] = useState(false);
  const [getView, setView] = useState({
    getBroadcastInitialshow: true,
    getBroadcastTableShow: false,
    getEnteringStreamShow: false,
    getCreateLiveStreaming: false,
    getVideoViewShow: false,
  });
  const userDetailsTeams = userDetailsLocal() || {}; //logged userDetails
  const [searchData, setSearchData] = useState({
    page: 1,
    searchTerm: "",
    size: 10,
  });
  const { page = 1 } = searchData;
  const onChange = (pageChange, event = {}) => {
    const { target: { name = "", value = "" } = {} } = event;
    if (pageChange) {
      const newObj = {
        ...searchData,
        [name]: value,
        page: 1,
      };
      setSearchData(newObj);
    } else {
      const newObj = {
        ...searchData,
        [name]: value,
      };
      setSearchData(newObj);
    }
  };
  const pageSizeChange = (event = {}) => {
    const { name = "", value = 10 } = _get(event, "target", {});
    setSearchData({ ...searchData, page: 1, [name]: value });
  };

  const changePageactive = (pageNum = 1) => {
    onChange(false, {
      target: {
        name: "page",
        value: pageNum,
      },
    });
  };

  const handleGetAddCohostClose = () => {
    setAddCohost(false);
  };
  const handleDeviceBlockedClose = () => {
    setDeviceBlocked(false);
    setInitialArg(!initialArg);
    setTimeout(() => addCreateMeet(), [2000]);
  };
  const handleBroadcastInDetail = (ele = "") => {
    history.push({
      pathname: "/broadcast",
      search: ele,
    });
  };
  const editSession = async (sessiondata) => {
    const objData = { data: sessiondata?.stageArn };
    const participantList = await participantListRequest(objData) || [];
    const participantConstruct = participantList?.data?.data?.participantsList.map(ele => {
      return {
        fullName: ele?.userName,
        userId: ele?.userId,
        emailId: ele?.userEmail,
        organisationId: ele?.orgId,
        emailVerified: ele?.userId ? 1 : 0,
      }
    }).filter(ele => ele?.userId !== getCurrentUserId());
    console.log(participantConstruct, "participantList----participantList")
    setUnRegisteredEmails(participantConstruct);
    setEditSessionCreated({ ...sessiondata, editSession: true, participantList: participantList?.data?.data?.participantsList });
  };
  const handleGetRegisteredEmails = (emailArray = []) => {
    setRegisteredEmails(emailArray);
  };
  const handleGetUnRegisteredEmails = (emailArray = []) => {
    setUnRegisteredEmails(emailArray);
  };
  const _handleEntering = (stageData) => {
    setEnableLoader(true);
    let stageArn;
    if (stageData.method === "create") {
      stageArn = stageData?.stage?.arn;
      setIsHost(true);
      store.dispatch(getParticipantListAction(stageData?.stage?.arn));
      setEnableLoader(false);
    } else {
      stageArn = stageData?.stageArn;
      setIsHost(stageData.hostId === 0 ? true : false);
      store.dispatch(getParticipantListAction(stageData?.stageArn));
      setEnableLoader(false);
    }
    store.dispatch(editStreamAction(true));
    setView({
      getBroadcastInitialshow: false,
      getBroadcastTableShow: false,
      getEnteringStreamShow: false,
      getCreateLiveStreaming: false,
      getVideoViewShow: true,
    });
    handleBroadcastInDetail(getStageArnId(stageArn));
  };
  const currentOrgId = window.localStorage.getItem("currntOrgid")
    ? JSON.parse(window.localStorage.getItem("currntOrgid"))
    : {};

  useEffect(() => {
    if (editSessionCreated) {
      setView({
        ...getView,
        getCreateLiveStreaming: true,
      });
    }
  }, [editSessionCreated]);

  useEffect(async () => {
    const loginDetail = window.localStorage.getItem("userDetails")
      ? JSON.parse(window.localStorage.getItem("userDetails"))
      : {};
    // // const firstName = loginDetail.data.email;
    const { data: { firstName = "", email = "" } = {} } = loginDetail;
    const loginUserEmail = email.replace(/[^A-Z0-9]/ig, "").toLowerCase();
    // // const getJid = await SDK.getJid(loginUserEmail);
    setLoginEmail(loginUserEmail);
    setLoginProfileName(firstName);
    // // InitializeChat(loginUserName)
  }, []);

  useEffect(() => {
    if (Object.keys(userDetails).length === 0) {
      const userDetailsGot = userDetailsLocal() || {}; //logged userDetails
      const { data: { userId = 0 } = {} } =
        userDetailsGot; //logged userDetails
      callCusDetails(userId); //get userDetails
      store.dispatch(inviteMemberListAction(userDetails.data));
    }
    const arn = history.location.search.replace("?", "");
    if (
      (Object.keys(currentOrganisation).length !== 0 ||
        Object.keys(currentOrgId).length !== 0) &&
      currentOrgId.organisationId !== userDetailsTeams.data.organisationId
    ) {
      if (arn.length < 1) {
        if (
          currentOrgId?.userRoleId === 3 ||
          currentOrgId?.invitedUserRoleId === 3
        ) {
          setView({
            getBroadcastInitialshow:
              sessionInfo?.length > 0 ||
                searchData.searchTerm !== "" ||
                sessionPastInfo > 0 ||
                sessionUpcomingInfo > 0
                ? false
                : true,
            getBroadcastTableShow:
              sessionInfo?.length > 0 ||
                searchData.searchTerm !== "" ||
                sessionPastInfo > 0 ||
                sessionUpcomingInfo > 0
                ? true
                : false,
            getEnteringStreamShow: false,
            getCreateLiveStreaming: false,
            getVideoViewShow: false,
          });
        }
      }

      store.dispatch(inviteMemberListAction(currentOrgId));
      store.dispatch(
        awsGetMeetingData({
          userId: userDetailsTeams?.data?.userId,
          orgId: currentOrgId?.organisationId,
          searchData: searchData,
          position: getTabPosition,
        })
      );
      store.dispatch({ type: "ENABLE_BROADCAST", loading: true });
      store.dispatch(organisationMemberListAction());
    } else {

      if (userDetails?.userRoleId === 3) {
        setView({
          getBroadcastInitialshow:
            sessionInfo?.length > 0 ||
              searchData.searchTerm !== "" ||
              sessionPastInfo > 0 ||
              sessionUpcomingInfo > 0
              ? false
              : true,
          getBroadcastTableShow:
            sessionInfo?.length > 0 ||
              searchData.searchTerm !== "" ||
              sessionPastInfo > 0 ||
              sessionUpcomingInfo > 0
              ? true
              : false,
          getEnteringStreamShow: false,
          getCreateLiveStreaming: false,
          getVideoViewShow: false,
        });
      }
      store.dispatch(inviteMemberListAction(userDetailsTeams.data));
      store.dispatch(getCustDtls({ customerId: userDetailsTeams.data.userId })); //userId
      store.dispatch({ type: "DO_LOADING_LOGIN_PAGE", loading: true });
      store.dispatch(
        awsGetMeetingData({
          userId: userDetailsTeams?.data?.userId,
          orgId: currentOrgId?.organisationId,
          searchData: searchData,
          position: getTabPosition,
        })
      );
      store.dispatch({ type: "ENABLE_BROADCAST", loading: true });
      store.dispatch(organisationMemberListAction());
    }
  }, [currentOrganisation, searchData, getTabPosition]);

  useEffect(() => {
    setSearchData({
      page: 1,
      searchTerm: "",
      size: 10,
    });
  }, [currentOrganisation, getTabPosition]);
  useEffect(() => {
    if (!broadcastScreenStatus) {
      setTabPosition("Upcoming");
      setSearchData({
        page: 1,
        searchTerm: "",
        size: 10,
      });
    }
  }, [broadcastScreenStatus]);
  useEffect(() => {
    if (!isHost && getView?.getBroadcastTableShow) {
      store.dispatch(
        awsGetMeetingData({
          userId: userDetailsTeams?.data?.userId,
          orgId: currentOrgId?.organisationId,
          searchData: searchData,
          position: "Upcoming",
        })
      );
      store.dispatch({ type: "ENABLE_BROADCAST", loading: true });
      store.dispatch(
        awsGetPast({
          userId: userDetailsTeams?.data?.userId,
          orgId: currentOrgId?.organisationId,
          searchData: searchData,
          position: "Past",
        })
      );
      store.dispatch({ type: "ENABLE_BROADCAST", loading: true });
    }
  }, [fbRemoveStatus]);

  useEffect(() => {
    if (sessionInfo?.length <= 0 &&
      sessionPastInfo <= 0 &&
      sessionUpcomingInfo <= 0) {
      setTabPosition("Upcoming");
    }
  }, [currentOrganisation]);
  useEffect(() => {
    setPermissionOnChange();
    store.dispatch(InBroadcastScreenAction(false));
  }, []);
  useEffect(() => {
    if (deleteStatus?.status === 400) {
      setShowDeletePopup(true);
    }
  }, [deleteStatus]);
  useEffect(() => {
    store.dispatch(
      awsGetUpcoming({
        userId: userDetailsTeams?.data?.userId,
        orgId: currentOrgId?.organisationId,
        searchData: searchData,
        position: "Upcoming",
      })
    );
    store.dispatch({ type: "ENABLE_BROADCAST", loading: true });
    store.dispatch(
      awsGetPast({
        userId: userDetailsTeams?.data?.userId,
        orgId: currentOrgId?.organisationId,
        searchData: searchData,
        position: "Past",
      })
    );
    store.dispatch({ type: "ENABLE_BROADCAST", loading: true });
  }, [getTabPosition, currentOrganisation]);
  useEffect(() => {
    return () => {
      setPastStageStatus(false);
      store.dispatch(emptyBroadcast());
    };
  }, []);

  useEffect(() => {
    if (
      sessionInfo?.length > 0 ||
      searchData.searchTerm !== "" ||
      sessionPastInfo > 0 ||
      sessionUpcomingInfo > 0
    ) {
      const arn = history.location.search.replace("?", "");
      const currentStageData2 = isArray(sessionInfo) && sessionInfo?.filter(
        (ele) => getStageArnId(ele?.stageArn) === arn
      );
      if (arn.length > 0 && currentStageData2?.length === 1) {
        setPastStageStatus(false);
        if (stageUpdate && !isTimeout) {
          dispatch(awsJoinStage(currentStageData2[0]));
          async function setAwsStage() {
            await deviceDispatch();
            await joinStage(currentStageData2[0]);
          }
          setAwsStage();
          _handleEntering(currentStageData2[0]);
          setStageUpdate(false);
        }
      } else if (arn.length > 0 && currentStageData2.length === 0) {
        if (!isTimeout && isArray(sessionInfo)) {
          setPastStageStatus(true);
        }
      } else {
        setView({
          getBroadcastInitialshow: false,
          getBroadcastTableShow: true,
          getEnteringStreamShow: false,
          getCreateLiveStreaming: false,
          getVideoViewShow: false,
        });
      }
    } else {
      const arn1 = history.location.search.replace("?", "");
      const currentStageData1 = isArray(sessionInfo) && sessionInfo?.filter(
        (ele) => getStageArnId(ele?.stageArn) === arn1
      );
      if (arn1.length > 0 && currentStageData1?.length === 0) {
        if (!isTimeout && isArray(sessionInfo)) {
          setPastStageStatus(true);
        }
      } else {
        setView({
          getBroadcastInitialshow: true,
          getBroadcastTableShow: false,
          getEnteringStreamShow: false,
          getCreateLiveStreaming: false,
          getVideoViewShow: false,
        });
      }
    }
    setTimeout(() => {
      setEnableLoader(false);
    }, 2500);
  }, [sessionInfo, sessionPastInfo]);

  useEffect(() => {
    if (userDetails?.userRoleId === 3) {
      setView({
        getBroadcastInitialshow:
          sessionInfo?.length > 0 ||
            searchData.searchTerm !== "" ||
            sessionPastInfo > 0 ||
            sessionUpcomingInfo > 0
            ? false
            : true,
        getBroadcastTableShow:
          sessionInfo?.length > 0 ||
            searchData.searchTerm !== "" ||
            sessionPastInfo > 0 ||
            sessionUpcomingInfo > 0
            ? true
            : false,
        getEnteringStreamShow: false,
        getCreateLiveStreaming: false,
        getVideoViewShow: false,
      });
    }
  }, [userDetails]);

  const {
    getBroadcastInitialshow,
    getCreateLiveStreaming,
    getBroadcastTableShow,
    getEnteringStreamShow,
    getVideoViewShow,
  } = getView;

  const handleCreateStreaming = () => {
    const _userDetailsLocal = userDetailsLocal() || {}; //logged userDetails
    const { data: { firstName = "", email = "", organisationName } = {} } = _userDetailsLocal; //logged userDetails
    handleMixpanelTrack("Create_Broadcast", {
      otfName: firstName,
      otfEmail: email,
      otfOrganisationName: organisationName,
      otfBroadcastName: sessionName
    });
    localStorage.removeItem("Select_Media");
    setView({
      ...getView,
      getCreateLiveStreaming: !getView.getCreateLiveStreaming,
    });
  };
  const handleCreateBroadcast = async (stageData, select, selectedId, broadcastId, type = "") => {
    const _userDetailsLocal = userDetailsLocal() || {}; //logged userDetails
    const { data: { firstName = "", email = "", organisationName } = {} } = _userDetailsLocal;
    handleMixpanelTrack("Join_Broadcast", {
      otfName: firstName,
      otfEmail: email,
      otfOrganisationName: organisationName,
      otfBroadcastName: sessionName
    });
    setEnableLoader(true);
    const { camera = "", mic = "" } = await assertsPermissionStatus();
    if (isOffline()) {
      setEnableLoader(false);
      toastInternet(constantValue.INTERNET_ERROR);
      return;
    }
    if (type === "Update") {
      const { membersdata = [], scheduledData = {} } = stageData;
      console.log(stageData, "stageDatastageDatastageData")
      const removedParticipant = membersdata?.filter(ele => ele?.userId !== getCurrentUserId())
        ?.filter(ele => getUnRegisteredEmails?.findIndex(element => element?.emailId === ele?.userEmail) < 0);
      const newlyAddedparticipant = getUnRegisteredEmails?.filter(ele => membersdata?.findIndex(element => element?.userEmail === ele?.emailId) < 0);
      const removeToList = removedParticipant.map(ele => {
        return ele?.stageParticipantId === ""
          ? {
            stageArn: ele?.stageArn,
            participantIds: [],
            userMailIds: [ele?.userEmail],
          }
          : {
            stageArn: ele?.stageArn,
            participantIds: [ele?.stageParticipantId],
            userMailIds: [],
          };
      });
      await removeToList.map(async (ele) => {
        await deleteParticipantRequest(ele);
      })
      console.log(scheduledData, "scheduledDatascheduledData")
      await updateParticipantToken({
        updatedArray: newlyAddedparticipant,
        addFromBroadcast: true,
        invitedMailIds: [],
        stageArn: membersdata[0]?.stageArn,
        type: "UPDATE",
        scheduledData: scheduledData
      });
      if(select){
        const stageArnData = membersdata?.filter(ele => ele.isHost === 0);
        selectStream(stageArnData[0]?.stageArn, select, selectedId, broadcastId);
      }

      setTimeout(() => {
        setAddCohost(false);
      }, 1000);
      setUnRegisteredEmails([])
      setView({
        ...getView,
        getCreateLiveStreaming: false,
      });
      setTimeout(() => {
        setEnableLoader(false);
      }, 2500);    }
    if (type === "Schedule") {
      setTabPosition("Upcoming");
      dispatch(
        awsCreateStageAction({
          ...stageData,
          membersdata: getUnRegisteredEmails,
          scheduledTime: stageData?.scheduledData?.scheduledTime,
          hostScheduledTime: stageData?.scheduledData?.hostScheduledTime,
          scheduledTimeZone: stageData?.scheduledData?.scheduledTimeZone,
          select, selectedId, broadcastId
        })
      );
      setTimeout(() => {
        setAddCohost(false);
        setSearchData({
          page: 1,
          searchTerm: "",
          size: 10,
        });
      }, 1000);
      setUnRegisteredEmails([]);
      setView({
        ...getView,
        getCreateLiveStreaming: false,
      });
    }
    if (stageData.callStatus !== "completed") {
      if (type === "create") {
        dispatch(
          awsCreateStageAction({
            ...stageData,
            membersdata: getUnRegisteredEmails, select, selectedId, broadcastId
          })
        );
        setTimeout(() => {
          setAddCohost(false);
        }, 1000);
        setDisableActon(false);
      }
      else {
        const response = await getDeleteStageResponse(stageData.stageArn);
        if (response?.data?.stageDetails?.isDelete !== 1) {
          dispatch(awsJoinStage(stageData));
          setTimeout(() => {
            setEnableLoader(false);
          }, 2500);
        }
        else {
          setShowTrailPopup(true);
          setTimeout(() => {
            setEnableLoader(false);
          }, 2500);
          return;
        }
        if (response?.message === "You'r not associated with this stage") {
          type !== "Schedule" && type !== "Update" && setRemoveParticipantPopup(true);
          setTimeout(() => {
            setEnableLoader(false);
          }, 2500);
          return;
        }
      }
      if (camera === "denied" || mic === "denied") {
        setDeviceBlocked(true);
        setTimeout(() => {
          setEnableLoader(false);
        }, 2500);
        navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
      }
      const deviceStatus = await initialLocalStreamSetup();
      await addDeviceChange();
      if (deviceStatus === "NO_DEVICE_CONNECTED") {
        setNoDeviceFound(true);
        return;
      }
      setView({
        ...getView,
        getBroadcastTableShow: false,
        getBroadcastInitialshow: false,
        getCreateLiveStreaming: false,
        getEnteringStreamShow: true,
      });
      if (type === "join" && !isHost) {
        setEnableLoader(false);
        updateMembersDetails(
          stageData?.orgId,
          stageData?.stageArn,
          userDetails
        );
      }
      setTimeout(() => {
        setEnableLoader(false);
      }, 10);
      store.dispatch(InBroadcastScreenBackAction(true));
    }
    setRegisteredEmails([]);
    setUnRegisteredEmails([]);
  };
  const _handleBroadcastInfo = () => {
    setView({
      ...getView,
      getBroadcastTableShow: false,
      getEnteringStreamShow: true,
    });
  };

  const handleCreateStreamingClose = () => {
    setView({
      ...getView,
      getCreateLiveStreaming: false,
    });
    setRegisteredEmails([]);
    setUnRegisteredEmails([]);
  };
  const handleAddCohost = (state = false) => {
    setAddCohost(state);
  };
  const handleConnectAccount = (state = false) => {
    switch (state) {
      case "FacebookPage":
        return console.log(state);
      case "FacebookProfile":
        return console.log(state);
      case "FacebookGroup":
        return console.log(state);
      case "YoutubeChannel":
        return console.log(state);
      case "LinkedInPage":
        return console.log(state);
      case "LinkedInProfile":
        return console.log(state);
      default:
        return "";
    }
  };
  const leftStage = () => {
    setMuteStatus({
      isVideoMute: false,
      isAudioMute: false,
    });
    if (userDetails?.userRoleId === 3) {
      setView({
        getBroadcastInitialshow: false,
        getBroadcastTableShow: true,
        getEnteringStreamShow: false,
        getCreateLiveStreaming: false,
        getVideoViewShow: false,
      });
    } else {
      setView({
        getBroadcastInitialshow:
          sessionInfo?.length === 0 ||
            searchData.searchTerm !== "" ||
            sessionPastInfo === 0 ||
            sessionUpcomingInfo > 0
            ? true
            : false,
        getBroadcastTableShow:
          sessionInfo?.length !== 0 ||
            searchData.searchTerm !== "" ||
            sessionPastInfo !== 0 ||
            sessionUpcomingInfo > 0
            ? true
            : false,
        getEnteringStreamShow: false,
        getCreateLiveStreaming: false,
        getVideoViewShow: false,
      });
    }
  };

  const handleMuteStatus = (type, isMute) => {
    if (type === "VIDEO") {
      setMuteStatus({
        ...getMuteStatus,
        isVideoMute: isMute,
      });
    } else if (type === "AUDIO") {
      setMuteStatus({
        ...getMuteStatus,
        isAudioMute: isMute,
      });
    }
  };

  const handleBackFromStream = () => {
    store.dispatch(InBroadcastScreenAction(false));
    setTabPosition("Upcoming");
    diableDevices();
    addCreateMeet();
    store.dispatch(appStatusAction(""));
    store.dispatch(
      awsGetMeetingData({
        userId: userDetailsTeams.data.userId,
        orgId: currentOrgId.organisationId,
        searchData: searchData,
        position: "Upcoming",
      })
    );
    store.dispatch({ type: "ENABLE_BROADCAST", loading: true });
    store.dispatch(
      awsGetUpcoming({
        userId: userDetailsTeams?.data?.userId,
        orgId: currentOrgId?.organisationId,
        searchData: searchData,
        position: "Upcoming",
      })
    );
    store.dispatch({ type: "ENABLE_BROADCAST", loading: true });
    setView({
      getBroadcastInitialshow:
        sessionInfo?.length === 0 ||
          searchData.searchTerm !== "" ||
          sessionPastInfo === 0 ||
          sessionUpcomingInfo > 0
          ? true
          : false,
      getBroadcastTableShow:
        sessionInfo?.length !== 0 ||
          searchData.searchTerm !== "" ||
          sessionPastInfo !== 0 ||
          sessionUpcomingInfo > 0
          ? true
          : false,
      getEnteringStreamShow: false,
      getCreateLiveStreaming: false,
      getVideoViewShow: false,
    });
  };

  const handleBroadCastLanding = () => {
    history.push({
      pathname: "/broadcast",
    });
    setPastStageStatus(false);
    store.dispatch(
      awsGetMeetingData({
        userId: userDetailsTeams.data.userId,
        orgId: currentOrgId.organisationId,
        searchData: searchData,
        position: getTabPosition,
      })
    );
    store.dispatch({ type: "ENABLE_BROADCAST", loading: true });
  };

  const handleTapPosition = (tapPostion) => {
    setTabPosition(tapPostion);
  };
  useEffect(() => {
    if (sessionInfo.length === 0 && searchData.page > 1) {
      setSearchData((d) => ({ ...d, page: searchData.page - 1 || 1 }));
    }
  }, [sessionInfo]);

  return (
    <>
      {isLoadingEdit ? <Loader type={"fixed overlay"} /> : null}
      <div className="WrapperSection MainWrapper">
        <div className="broadcast_wrapper w-full h-full">
          {getBroadcastTableShow ? (
            <BroadcastTable
              sessionInfo={sessionInfo}
              handleBroadcastInfo={_handleBroadcastInfo}
              userRoleId={
                currentOrgId.invitedUserRoleId || currentOrgId.userRoleId
              }
              handleJoinMeeting={handleCreateBroadcast}
              _handleTableBroadcastCreate={handleCreateStreaming}
              resetMuiltipleClick={initialArg}
              searchTerm={searchData.searchTerm}
              _onChangeData={(e) => {
                onChange(true, e);
                setSearchEnable(true);
              }}
              initialPage={page}
              pageSizeChange={pageSizeChange}
              changePageactive={changePageactive}
              bottomDetails={{
                size: searchData.size,
                totalPages: sessionTotalRecord?.totalPages,
                totalRecords: sessionTotalRecord?.totalRecords,
                page: searchData.page,
              }}
              searchEnable={searchEnable}
              currentOrg={currentOrgId.organisationId}
              setSearchEnable={(e) => setSearchEnable(e)}
              setNoDeviceFound={noDeviceFound}
              _userRoleId={
                currentOrgId.invitedUserRoleId || currentOrgId.userRoleId
              }
              handleTableType={handleTapPosition}
              userId={userDetailsTeams.data.userId}
              enableEdits={(e) => editSession(e)}
              _searchData={searchData}
            />
          ) : null}
          {getBroadcastInitialshow ? (
            <BroadcastInitial
              handleCreateStreaming={handleCreateStreaming}
              userRoleId={
                currentOrgId.invitedUserRoleId || currentOrgId.userRoleId
              }
            />
          ) : null}

          {getCreateLiveStreaming ? (
            <GoogleOAuthProvider clientId={ssoYTGmailClientId}>
              <CreateLiveStreaming
                _getUnRegisteredEmails={getUnRegisteredEmails}
                _getRegisteredEmails={getRegisteredEmails}
                _handleCreateBroadcast={(stageData, selectedMediaList, getSelectedBroadcastId, getBroadcastMediaId, type) =>
                  handleCreateBroadcast(stageData, selectedMediaList, getSelectedBroadcastId, getBroadcastMediaId, type)
                }
                // handleTableType= {handleTapPosition}
                _handleAddCohost={(state) => handleAddCohost(state)}
                _handleConnectAccount={(host) => handleConnectAccount(host)}
                _handleOnOutsideClick={
                  getAddCohost ? () => { } : () => handleCreateStreamingClose()
                }
                userRoleId={userDetails?.userRoleId}
                unmountHandler={() => setDisableActon(true)}
                editSessionCreated={editSessionCreated}
                isUpdateunmount={() => setEditSessionCreated(false)}
                _handleSaveYTAccount={(select, selectedId, broadcastId) => _handleEditStream(select, selectedId, broadcastId, false)}
              />
            </GoogleOAuthProvider>
          ) : null}

          {getEnteringStreamShow ? (
            <EnteringStream
              handleEntering={_handleEntering}
              handleMuteStatus={(e, i) => handleMuteStatus(e, i)}
              _handleBack={() => handleBackFromStream()}
            />
          ) : null}
          {getVideoViewShow ? (
            <BroadcastVideoView
              FbData={FbData}
              isHost={isHost}
              leftStage={leftStage}
              muteStatus={getMuteStatus}
              setIsTimeout={(e) => setIsTimeout(e)}
              isTimeout={isTimeout}
              searchData={searchData}
              currentOrg={currentOrgId.organisationId}
              userId={userDetailsTeams.data.userId}
            />
          ) : null}
        </div>
      </div>
      {getAddCohost && disableAction ? (
        <AddCohostPopup
          _handleGetRegisteredEmails={handleGetRegisteredEmails}
          _handleGetUnRegisteredEmails={handleGetUnRegisteredEmails}
          _handleOnOutsideClick={handleGetAddCohostClose}
          seletedEmailArray={getUnRegisteredEmails}
          editSessionCreated={editSessionCreated}

        />
      ) : null}

      {deviceBlocked ? (
        <AddCohostPopup
          _handleOnOutsideClick={handleDeviceBlockedClose}
          type="assertAccess"
        />
      ) : null}
      {getPastStageStatus ? (
        <AddCohostPopup
          _handleOnOutsideClick={() => {
            handleBroadCastLanding();
          }}
          handleExit={() => {
            handleBroadCastLanding();
          }}
          type="pastEnded"
        />
      ) : null}
      {noDeviceFound ? (
        <AddCohostPopup
          _handleOnOutsideClick={() => {
            setEnableLoader(false);
            setNoDeviceFound(false);
          }}
          type="noDeviceFound"
        />
      ) : null}
      {showTrailPopup ? (
        <AddCohostPopup
          _handleOnOutsideClick={() => setShowTrailPopup(false)}
          handleExit={() => {
            refreshPage();
          }}
          type="joinDeletePopup"
        />
      ) : null}
      {getRemoveParticipantPopup ? (
        <AddCohostPopup
          _handleOnOutsideClick={() => setRemoveParticipantPopup(false)}
          handleExit={() => {
            refreshPage();
          }}
          type="joinRemovePopup"
        />
      ) : null}
      {showDeletePopup ? (
        <AddCohostPopup
          _handleOnOutsideClick={() => setShowDeletePopup(false)}
          handleExit={() => {
            refreshPage();
          }}
          type="DeletePopup"
        />
      ) : null}
      {getEnableLoader && <Loader type="fixed overlay" />}
      {getLoginEmail &&
        <InitializeMirrorfly
          licenseKey={mfLicenseKey}
          userIdentifier={getLoginEmail}
          profileName={getLoginProfileName}
        />
      }
    </>
  );
};

export default memo(Broadcast);
