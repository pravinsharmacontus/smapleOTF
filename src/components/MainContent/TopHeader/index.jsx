import React, { useState, useEffect } from "react";
import "./TopHeader.scss";
import LogOutPopUp from "./LogOutPopUp";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import HamburgerMenu from "./HamburgerMenu/index";
import { useLocation, Link, useHistory } from "react-router-dom";
import "../../../common/DataTable/sticky-table.scss";
import UserProfileDropDown from "./UserProfileDropDown";
import {
  nullToObject,
  replaceSpacesWithNonbreakSpace,
} from "../../../helper/Validation";
import { userDetailsLocal } from "../../../helper/RoleConfig";
import "../../PopupWrapper/PopupWrapper.scss";
import {
  IconBellNotify,
  ImgLogoHeader2,
  IconDropdown2Cc,
  IconTicketMenu,
  IconQuestionMenu,
  IconDocumentMenu,
  ImgLogoInCall,
} from "../../../assets/images";
import { getInitials } from "../../../helper";
import { ssoYTGmailClientId, docsPage, apiUrl } from "../../../helper/ApiUrl";
import store from "../../../store";
import { currentOrganisation } from "../../../store/action/organisationAction";
import { DecryptLogInDetails } from "../../../helper/Encypt";
import History from "../../../common/History";
import { validateUnderscore } from "../../../common/helper";
import OutsideClickHandler from "react-outside-click-handler";
import { capitalize } from "lodash";
import CreateLiveStreaming from "../Broadcast/CreateLiveStreaming";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AccountsIntegration from "./AccountsIntegration";
import { getColorCodeInitials, isHost } from "../../../helper/utility";
import {
  editStreamAction,
  editStreamPopupAction, editStreamSaveAction,
  getAccessTokenAction, showYoutubeAction, startYTLoaderAction
} from "../../../store/action/editStreamAction";
import AddCohostPopup from "../Broadcast/AddCohostPopup";
import { InBroadcastScreenBackAction } from "../../../store/action/tempAction";
import { Post } from "../../../common/httpRestServices";

const TopHeader = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const location = useLocation() || {}; //get user path
  const { pathname = "" } = location;
  const globalData = useSelector((state) => state) || {};
  // // const getFBConnectPage = globalData?.facebookData?.facebookPageConnected;
  const {
    CusPage = {},
    loader = {},
    organisationMemberListReducer = {},
    commonData,
  } = globalData || {};
  console.log("commonDatacommonData", commonData);
  const { editStreambutton, getAccessToken, editStreamPopup, startYTLoader } = commonData;
  const getFBUserPage = JSON.parse(localStorage.getItem("EditConnectedFB"));
  const { organisations = [] } = organisationMemberListReducer;
  const { customerDtls = {} } = CusPage;
  const { fullName = "" } = customerDtls;
  const {
    profileUpdateData: {
      data: { userDetails: { profileImage = "" } = {} } = {},
    } = {},
  } = nullToObject(loader);
  const userDetails = userDetailsLocal() || {}; //logged userDetails
  const broadcastScreenStatus = useSelector((state) => state?.BroadcastScreenReducer?.broadcastScreenStatus); //store
  const broadcastScreenBackStatus = useSelector((state) => state?.BroadcastScreenBackReducer?.broadcastScreenBackStatus); //store
  const {
    data: { firstName = "", email = "", image = "", userRoleId = 0 } = {},
  } = userDetails; //logged userDetails
  const userName = firstName;
  const prifileImg = profileImage ? profileImage : image;
  const [orgList, setOrgList] = useState([]);
  const [pageName, setPageName] = useState("");
  const [getSelectedMedia, setSelectedMedia] = useState(false);
  const [userNameState, setUserNameState] = useState("");
  const [getOrganisation, setOrganisation] = useState("");
  const [getEditStream, setEditStream] = useState(false);
  const [getHandleDrop, setHandleDrop] = useState(false);
  const [getClose, setClose] = useState(false);
  const [mediaSelect, setMediaSelect] = useState(false);
  const [getCallExitPopup, setCallExitPopup] = useState(false);
  // // const [getYtLogin, setYtLogin] = useState(false);
  const [getYtHeader, setYtHeader] = useState(false);
  const [getIntegration, setIntegration] = useState(true);
  // //const loginDetail = window.localStorage.getItem("userDetails")
  // //  ? JSON.parse(window.localStorage.getItem("userDetails"))
  // // : {};
  // // const { data: { email: emailId = "" } = {} } = loginDetail;
  const broadcastBranding = useSelector((state) => state?.broadcastBranding); //store
  const [tab, setTab] = useState(false);
  const awsStageReducer = useSelector((state) => state?.awsStageReducer); //store
  const appStatus = useSelector((state) => state?.appStatus); //store
  const { sessionName = "", stageArn = "" } = awsStageReducer;
  const [stateManage, setStateManage] = useState({
    popupAnimate: false,
    ProfileOption: false,
    ProfileWidget: false,
  });
  const ownerDetails = userDetailsLocal() || {}; //logged userDetails
  const handleSave = localStorage.getItem("editStreamSave");
  const isHosting = isHost(awsStageReducer);
  const setOrganisationDrop = (item = {}) => {
    if (Object.keys(item).length !== 0) {
      setOrganisation(item);
      window.localStorage.setItem("currntOrgid", JSON.stringify(item));
      store.dispatch(currentOrganisation(item));
    }
    setTab(false);
  };
  const handleProfile = () => {
    setTab(!tab);
  };

  const handleHandleDrop = (state = false) => {
    setHandleDrop(state);
  };

  const handleClose = () => {
    setTab(false);
  };
  useEffect(() => {
    setOrgList(organisations);
  }, [organisations]);

  useEffect(() => {
    const handleSaved = localStorage.getItem("editStreamSave") ? localStorage.getItem("editStreamSave") : "";
      if(handleSaved){
        setClose(true);
      }else {
        setClose(false);
      }
    }, [broadcastBranding]);

    useEffect(() => {
      if(handleSave !== null){
        setClose(true);
      }else {
        setClose(false);
      }
    }, []);

  const currentOrgList = window.localStorage.getItem("currntOrgid")
    ? JSON.parse(window.localStorage.getItem("currntOrgid"))
    : {};

  useEffect(() => {
    const loginCurrentOrg = organisations.filter(
      (ele) => ele?.organisationId === ownerDetails.data.userSession.orgId
    )[0];
    const currentOrgId = window.localStorage.getItem("currntOrgid");
    if (!currentOrgId) {
      if (ownerDetails.data.userSession.orgId === 0) {
        setOrganisationDrop(ownerDetails.data);
      } else if (loginCurrentOrg !== undefined) {
        setOrganisationDrop(loginCurrentOrg);
      }
    } else {
      console.log("orgSetName");
    }
  }, [organisations]);

  const _handleProfileOption = () => {
    setStateManage({
      ...stateManage,
      ProfileOption: true,
    });
  };

  const _handleOnOutsideClick = (value = false) => {
    setStateManage({
      ...stateManage,
      ProfileOption: value,
    });
  };

  const setpopupAnimate = (value = false) => {
    setStateManage({
      ...stateManage,
      popupAnimate: value,
    });
  };

  useEffect(() => {
    const currentOrgId = window.localStorage.getItem("currntOrgid")
      ? JSON.parse(window.localStorage.getItem("currntOrgid"))
      : {};
    if (currentOrgId === null && orgList.length === 0) {
      setOrganisation({});
    } else {
      const currentOrgName = orgList.filter(
        (ele) => ele?.organisationId === currentOrgId.organisationId
      )[0];
      setOrganisation(currentOrgName !== undefined ? currentOrgName : {});
    }
  }, [orgList]);

  const _handleOpenEditStream = (state = false) => {
    setEditStream(state);
    store.dispatch(editStreamPopupAction(true));
  };

  const mediaBroadcast = async (select) => {
    const refreshBroadcast = awsStageReducer?.stage?.arn;
    // // const getsessionBroadcast = destructStageId(destructStage(stageArn || refreshBroadcast));
    const selectMedia = {
      "media_type": select[0]?.media_type,
      "media_id": select[0]?.media_id,
      "config_id": select[0]?.config_id === null ? undefined : select[0]?.config_id,
      "config_type": select[0]?.config_type === null ? undefined : select[0]?.config_type,
      "broadcast_id": stageArn || refreshBroadcast,
      "name": select[0]?.name ? select[0]?.name : select[0]?.media_name
    };
    store.dispatch({ type: "DO_LOADING_PAGE", loading: true });
    const resSelectMedia = await Post(
      `${apiUrl}simulcast/api/media-broadcast`, selectMedia);
    console.log("qaqa resFbPage", resSelectMedia);
        if (resSelectMedia.status === 200) {
      setYtHeader(true);
      store.dispatch(editStreamSaveAction(true));
      localStorage.setItem("Select_Media", JSON.stringify(select[0]?.media_type));
      localStorage.setItem("editStreamSave", true);
      store.dispatch({ type: "DO_LOADING_PAGE", loading: false });
      setClose(true);
    } else {
      localStorage.setItem("Select_Media", JSON.stringify(select));
      store.dispatch({ type: "DO_LOADING_PAGE", loading: false });
      setClose(false);
    }
  }

  const _handleEditStream = async (select, selectedId, broadcastId, state = false) => {
    localStorage.removeItem("Facebook_Live_Url");
    setEditStream(state);
    setMediaSelect(select[0]?.media_type);
    localStorage.removeItem("Select_Media");
    if (select) {
      if (selectedId && broadcastId) {
        const deleteSelectAcc = {
          "id": selectedId,
        };
        const selectedMediaDelete = await Post(
          // `${apiUrl}simulcast/api/media-broadcast/remove?id=${id}`, true
          `${apiUrl}simulcast/api/media-broadcast/remove`, deleteSelectAcc,
          true
        );
        localStorage.setItem("Select_Media", JSON.stringify(select));
        if (selectedMediaDelete?.status === 200) {
          mediaBroadcast(select);
        }
      }
      else {
        localStorage.setItem("Select_Media", JSON.stringify(select));
        mediaBroadcast(select);
      }
    }

    // // if (select === "youtube") {
    // //   store.dispatch(editStreamSaveAction(true));
    // //   localStorage.setItem("editStreamSave", true);
    // //   store.dispatch(showYoutubeAction(true));
    // //   localStorage.setItem("Select_Media", JSON.stringify(select));
    // //   const handleSaveOnClick = localStorage.getItem("editStreamSave");
    // //   if (getAccessToken?.status === 1 && handleSaveOnClick) {
    // //     setYtHeader(handleSaveOnClick);
    // //   }
    // // } else if (select === "facebook") {
    // //   if(getFBConnectPage){
    // //     localStorage.setItem("EditConnectedFB", JSON.stringify(getFBConnectPage));
    // //   }
    // //   store.dispatch(editStreamSaveAction(true));
    // //   localStorage.setItem("editStreamSave", true);
    // //   store.dispatch(showYoutubeAction(true));
    // //   localStorage.setItem("Select_Media", JSON.stringify(select));
    // //   const handleSaveOnClick = localStorage.getItem("editStreamSave");
    // //   if (getFBUserPage && handleSaveOnClick) {
    // //     setYtHeader(handleSaveOnClick);
    // //   }
    // // } else {
    // //   store.dispatch(editStreamSaveAction(false));
    // //   localStorage.removeItem("EditConnectedFB");
    // //   localStorage.removeItem("editStreamSave");
    // //   store.dispatch(showYoutubeAction(false));
    // //   // // const handleSave = localStorage.getItem("editStreamSave");
    // //   // // if (getAccessToken?.status === 1 && handleSave) {
    // //   setYtHeader(false);
    // //   // // }
    // // }
  };

  useEffect(() => {
    const handleSaveInitial = localStorage.getItem("editStreamSave");
    if (getAccessToken?.status === 1 && handleSaveInitial) {
      setYtHeader(handleSave);
    }
  }, [getAccessToken]);

  useEffect(() => {
    console.log("qaaqa", getFBUserPage)
    const handleSaveInitial = localStorage.getItem("editStreamSave");
    console.log("qaaqa handleSaveInitial", handleSaveInitial);
    if (getFBUserPage && handleSaveInitial) {
      setYtHeader(handleSave);
    }
  }, [getFBUserPage]);

  useEffect(() => {
    validateUnderscore(replaceSpacesWithNonbreakSpace(sessionName));
    console.log("qaaqa", getFBUserPage)
    if (getFBUserPage) {
      setYtHeader(true);
    }
  }, []);

  const _handleClosePopup = (state = false) => {
    if(handleSave){
      setClose(true);
    }else {
      setClose(false);
    }
    const sessionpopStatus = window.sessionStorage.getItem(
      "EndSessionPopStatus"
    );
    console.log("qwqw outsideclick", state, "sessionpopStatus", sessionpopStatus)
    if (!sessionpopStatus) {
      setEditStream(state);
    }
    // // store.dispatch(getAccessTokenAction());
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
        console.log('YoutubeChannel', state);
        setYtLogin(true);
        setEditStream(false);
        return "";
      case "LinkedInPage":
        return console.log(state);
      case "LinkedInProfile":
        return console.log(state);
      default:
        return "";
    }
  };

  // landing page welcome note
  const handlePageName = (path = "") => {
    switch (path) {
      case "/teams":
        return setPageName(t("Teams"));
      case "/broadcast":
        return setPageName(t("Broadcast"));
      case "/videos":
        return setPageName(t("Videos"));
      case "/integration":
        return setPageName(t("Integration"));
      case "/customers":
        return setPageName(t("Customers"));
      case "/raise-ticket":
        return setPageName(t("Raise a ticket"));
      case "/no-of-broadcasts":
        return setPageName(t("No. of Broadcasts"));
      default:
        return setPageName(t(""));
    }
  };
  useEffect(() => {
    setInterval(() => {
      if (!DecryptLogInDetails()) {
        History.push({ pathname: "/" });
      }
    }, 1000);
  });

  function isEllipsisActive(element) {
    return element.offsetWidth < element.scrollWidth;
  }
  setTimeout(() => {
    Array.from(document.querySelectorAll(".ellipsis")).forEach((element) => {
      if (isEllipsisActive(element)) {
        element.title = element.innerText;
      }
    });
  }, 300);

  useEffect(() => {
    handlePageName(pathname);
  }, [pathname]);

  useEffect(() => {
    if (handleSave) {
      return () => {
        setYtHeader(false);
      };
    }
  }, [handleSave]);

  useEffect(() => {
    if (appStatus === "integration") {
      setIntegration(false);
    } else {
      setIntegration(true);
    }
  }, [appStatus]);

  useEffect(() => {
    if (pathname !== "/profile") {
      setUserNameState(userName);
    }
  }, [userName]);

  const hideSwitch = () => {
    if (appStatus !== "") {
      return true;
    }
  };
  const handleHangup = (state = false) => {
    setCallExitPopup(state);
  };

  const handleBroadCastLanding = () => {
    setCallExitPopup(false);
    history.push({
      pathname: "/broadcast",
    });
    store.dispatch(editStreamAction(false));
    store.dispatch(showYoutubeAction(false));
    store.dispatch(getAccessTokenAction());
    store.dispatch(startYTLoaderAction(false));
    store.dispatch(editStreamPopupAction(false));
    store.dispatch(editStreamSaveAction(false));
    localStorage.removeItem("editStreamSave");
  };
  return (
    <React.Fragment>
      <div className="TopHeader">
        {sessionName ? null : <HamburgerMenu />}
        <div className="logo">
          <img src={ImgLogoHeader2} alt="logo" />
        </div>
        <div style={{
          paddingLeft: sessionName ? "0px" : ''
        }} className="leftMenu">
          {(broadcastScreenStatus) ?
            <button onClick={broadcastScreenBackStatus ? () => store.dispatch(InBroadcastScreenBackAction(false))
              : () => handleHangup(true)} className="logo1">
              <img width="157px" height="34px" src={ImgLogoInCall} alt="logo" />
            </button> :
            null}
          <h1
            title={
              hideSwitch() &&
              sessionName &&
              pathname === "/broadcast" &&
              broadcastScreenStatus && capitalize(validateUnderscore(replaceSpacesWithNonbreakSpace(sessionName)))
            }
            style={{ maxWidth: "400px" }}
            className="headerName"
          >
            {pathname !== "/profile" ? (
              <>
                {hideSwitch() && sessionName && pathname === "/broadcast" && broadcastScreenStatus ? (
                  <strong>
                    {validateUnderscore(
                      replaceSpacesWithNonbreakSpace(sessionName)
                    )}
                  </strong>
                ) : <> {pathname !== "/no-of-broadcasts" ?
                  pageName
                  :
                  <>
                    <strong className="ellipsis hide_in_mobile">
                      {pageName}
                    </strong>
                    <span className="hide_in_mobile">{" / "}</span>
                    <small className="hide_in_mobile">Customers</small>
                  </>
                }
                </>
                }
              </>
            ) : (
              <>
                {fullName ? (
                  <>
                    <div className="show_in_mobile">Customers</div>
                    <strong className="ellipsis hide_in_mobile">
                      {fullName}
                    </strong>
                    <span className="hide_in_mobile">{" / "}</span>
                    <small className="hide_in_mobile">Customers</small>
                  </>
                ) : null}
              </>
            )}
          </h1>
          <div id="PortalHeader"></div>
        </div>

        <div className="rightMenu">
          {/* customer plan details */}

          <button
            style={{ display: "none" }}
            type="button"
            className="relative unreadNotify hoverable blue"
          >
            <i className="icon">
              <IconBellNotify />
            </i>
            <div className="unReadcount ">
              <div className="badges red rounded">9</div>
            </div>
          </button>
          {editStreambutton && isHosting && <AccountsIntegration chooseMedia={mediaSelect} closeStream={getEditStream} handleGetSelectedMedia={setSelectedMedia} />}
          {editStreambutton && isHosting && (
            <button
              type="button"
              onClick={startYTLoader ? () => { } : () => _handleOpenEditStream(true)}
              className={startYTLoader ? `edit_stream_fade` : `edit_stream`}
              disabled={startYTLoader}
            >
              {getClose || getSelectedMedia ? "Edit Destination" : "Add Destination"}
            </button>
          )}
          <div className="dropMenuList hoverShow">
            <ul className="droplist">
              <Link
                className="list"
                to="/raise-ticket"
                onClick={() => _handleMirrorflySupportLinkClick()}
              >
                <i>
                  <IconTicketMenu />
                </i>
                <span>{t("NAVBAR.RAISE_TICKET")}</span>
              </Link>
              <a
                className="list"
                target="_blank"
                rel="noreferrer"
                href={docsPage}
              >
                <i>
                  <IconDocumentMenu />
                </i>
                <span>{t("NAVBAR.DOCUMENTATION")}</span>
              </a>
            </ul>
          </div>
          {console.log(getEditStream && editStreamPopup, "sscasasca")}
          {getEditStream && editStreamPopup ? (
            <GoogleOAuthProvider clientId={ssoYTGmailClientId}>
              <CreateLiveStreaming
                mediaSelect={getSelectedMedia}
                enableEditMode={true}
                destination = {true}
                // _getUnRegisteredEmails={getUnRegisteredEmails}
                // _getRegisteredEmails={getRegisteredEmails}
                // _handleCreateBroadcast={(stageData, type) =>
                //   handleCreateBroadcast(stageData, type)
                // }
                // _handleAddCohost={(state) => handleAddCohost(state)}
                _handleConnectAccount={(host) => handleConnectAccount(host)}
                _handleSaveYTAccount={(select, selectedId, broadcastId) => _handleEditStream(select, selectedId, broadcastId, false)}
                _handleOnOutsideClick={() => _handleClosePopup(false)}
                getYtHeader={getYtHeader}
              // unmountHandler={() => setDisableActon(true)}
              />
            </GoogleOAuthProvider>
          ) : null}
          {!hideSwitch() &&
            orgList.length > 0 &&
            getIntegration &&
            userRoleId !== 4 ? (
            <OutsideClickHandler onOutsideClick={() => handleClose()}>
              <div
                className={` ${tab ? " open " : " "
                  } dropMenuWraper relative hasDrop `}
              >
                <button
                  onClick={handleProfile}
                  type="button"
                  className={`multi_login btn-icon `}
                >
                  <span title={getOrganisation?.organisationName}>
                    {getOrganisation?.organisationName}{" "}
                    {!getOrganisation.invitedUserId && `(me)`}{" "}
                  </span>
                  <i className="drop_icon">
                    <IconDropdown2Cc />
                  </i>
                </button>
                <div className="dropMenuList hoverShow">
                  <div className="droplist">
                    {orgList.map((item) => {
                      return (
                        <button
                          key={item.organisationId}
                          className={` ${getOrganisation?.organisationId ===
                            item?.organisationId
                            ? " active "
                            : " "
                            } list`}
                          onClick={() => setOrganisationDrop(item)}
                        >
                          {" "}
                          {/* for uniq identity organisationName with organisationId added as string */}
                          <div style={{ background: getColorCodeInitials(`${item.organisationName} ${item.organisationId}`) }} className="initial_wraper">
                            <span className="">
                              {getInitials(item.organisationName)}
                            </span>
                          </div>
                          <span
                            title={` ${item.organisationName} ${!item.invitedUserId ? "(me)" : ""
                              }`}
                          >
                            {item.organisationName}{" "}
                            {!item.invitedUserId && `(me)`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </OutsideClickHandler>
          ) : null}
          {(userRoleId !== 4 && userRoleId !== 5 && !broadcastScreenStatus) ? (
            <OutsideClickHandler onOutsideClick={() => handleHandleDrop(false)}>
              <div
                className={` ${getHandleDrop ? " open " : " "
                  } dropMenuWraper relative hasDrop `}
              >
                <button
                  type='button'
                  onClick={() => handleHandleDrop(true)}
                  className={`help btn-icon  ${getHandleDrop ? " active " : ""}`}
                >
                  <i className='icon1'>
                    <IconQuestionMenu />
                  </i>
                  <span>{(t("COMMON.HELP"))}</span>
                </button>
                <div style={{ minWidth: "169px" }} className="dropMenuList hoverShow">
                  <div className="droplist">
                    <Link
                      className="list"
                      to="/raise-ticket"
                      onClick={() => handleHandleDrop(false)}
                    >
                      <i>
                        <IconTicketMenu />
                      </i>
                      <strong>{t("COMMON.RAISE_TICKET")}</strong>
                    </Link>
                  </div>
                </div>
              </div>
            </OutsideClickHandler>
          ) : null}
          {hideSwitch() && userRoleId !== 4 && getIntegration && (
            <div className={`dropMenuWraper relative hasDrop `}>
              <div className={`multi_login btn-icon `}>
                <span title={getOrganisation?.organisationName}>
                  {getOrganisation?.organisationName}{" "}
                  {!getOrganisation.invitedUserId && `(me)`}{" "}
                </span>
              </div>
            </div>
          )}
          {/* header dropDown */}
          <UserProfileDropDown
            email={email}
            image={prifileImg}
            userName={userNameState}
            _handleProfileOption={_handleProfileOption}
          />
        </div>
      </div>
      <div className="TopHeader_height"></div>
      {/* logOut popUp */}
      <LogOutPopUp
        stateManage={stateManage}
        setpopupAnimate={setpopupAnimate}
        _handleOnOutsideClick={_handleOnOutsideClick}
        currentOrgList={currentOrgList}
        ownerUserId={ownerDetails.data}
        _awsStageReducer={awsStageReducer}
      />
      {getCallExitPopup ? (
        <AddCohostPopup
          _handleOnOutsideClick={() => handleHangup(false)}
          type="callExit"
          handleExit={() => {
            handleBroadCastLanding();
          }}
        />
      ) : null}
    </React.Fragment>
  );
};

export default React.memo(TopHeader);
