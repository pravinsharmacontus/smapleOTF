import "./AddCohostPopup.scss";
import "./action-popup.scss";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CommonPopupForm from "../../CommonPopupForm";
import { FacebookIcon, IconClose, IconInfoSm, IconToastInfo, IconX, ImgProfile, YoutubeIcon } from "../../../../assets/images";
import AnimatePopup from "../../../../common/AnimatePopup";
import OutsideClickHandler from "react-outside-click-handler";
import { EmailValidate } from "../../../../helper/Validation";
import CommonFormInput from "../../../../common/CommonFormInput";
import { translate } from "../CreateLiveStreaming/createBroadCastValidation";
import {
  inviteMemberAction,
  inviteMemberListAction,
} from "../../../../store/action/inviteMemberAction";
import store from "../../../../store";
import {
  IconBroadcastEnded,
  IconPauseTimer,
  IconSettingAccess,
  IconTimer,
  Iconplus,
} from "../../../../assets/img";
import { constantValue } from "../../../../const/errorTypes";
import { isOffline } from "../../../../common/helper";
import { toastInternet } from "../../../../helper/ApiToast";
import Ripples from "react-ripples";
import TrailUserLogoUpdata from "../BroadcastBrandDetails/TrailUserLogoUpdata";
import {
  getCurrentOrgId,
  getCurrentUserId,
  isCamMicGranted,
} from "../../../../helper/utility";
import Modal1 from "../../../../common/Modal/Modal1";
import { getTeamMembers } from "../../../../services/inviteMemberServices";
import Image from "../../../../common/Image";
import SocialReconnect from "../../Integrations/SocialReconnect";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ssoYTGmailClientId } from "../../../../helper/ApiUrl";
import YTReconnect from "../../Integrations/YTReconnect";

function AddCohostPopup(_props = {}) {
  const buttonRef = useRef(null);
  const {
    heading = "",
    _handleOnOutsideClick = () => { },
    _handleGetRegisteredEmails = () => { },
    _handleGetUnRegisteredEmails = () => { },
    type = "",
    seletedEmailArray,
    tooltipDesc = "Inviting cohost so they can make changes to the live stream settings if needed.",
    handleExit = () => { },
    _handleRefreshPage = () => { },
    cameraPermissions,
    micPermissions,
    participantList = [],
    editSessionCreated,
    mediaDetails
  } = _props;
  const [getinputs, setInputs] = useState("");
  const [getCohostList, setCohostList] = useState([]);
  const [getErrorMsg, setErrorMsg] = useState(false);
  const [getEmailList, setEmailList] = useState(false);
  const [emailNotFound, setEmailNotFound] = useState([]);
  const [userList, setUserList] = useState([]);
  const hostDetails = useSelector((state) => state?.CusPage?.customerDtls);
  const inviteList = useSelector(
    (state) => state?.inviteMemberListReducer?.inviteMember
  ).filter((ele) => ele.emailId !== hostDetails.emailId);
  const invitedMemberData = useSelector(
    (state) => state?.inviteMemberListReducer?.inviteMemberData
  );
  const inviteMemberList = useSelector(
    (state) => state?.inviteMemberListReducer?.inviteMember
  ).filter((ele) => ele.userRoleId === 1);
  const [filterList, setFilterList] = useState([{}]);
  const [getFilterSelectedList, setFilterSelectedList] = useState([]);
  const [getFilterSelectedEmailList, setFilterSelectedEmailList] = useState([]);
  const currentOrgList = window.localStorage.getItem("currntOrgid")
    ? JSON.parse(window.localStorage.getItem("currntOrgid"))
    : {};
  const omitInvited = (filteredArray) => {
    const reducedLocalUser = participantList?.filter(
      (ele) => ele?.userId !== getCurrentUserId()
    );
    switch (participantList?.length) {
      case 0:
        return filteredArray;
      case 1:
        return filteredArray;
      case 2:
        return filteredArray.filter((ele) =>
          ele?.userId
            ? ele?.userId !== reducedLocalUser[0]?.userId
            : ele?.emailId !== reducedLocalUser[0]?.userEmail
        );
      case 3:
        return filteredArray
          .filter((ele) =>
            ele?.userId
              ? ele?.userId !== reducedLocalUser[0]?.userId
              : ele?.emailId !== reducedLocalUser[0]?.userEmail
          )
          .filter((ele) =>
            ele?.userId
              ? ele?.userId !== reducedLocalUser[1]?.userId
              : ele?.emailId !== reducedLocalUser[1]?.userEmail
          );
      default:
        return filteredArray;
    }
  };
  const inviteMember = {
    ...hostDetails,
    currentOrgDetails: currentOrgList,
  };
  const emailValidation = (value) => {
    if (!EmailValidate(value)) return translate("ERROR.EMAIL");
  };
  const inviteMemberSearchList = (searchWith) => {
    const searchResult = inviteList.filter((ele) =>
      ele.emailId.toLowerCase().includes(searchWith.toLowerCase().trim())
    );
    const searchResult1 = searchResult.filter((item) => {
      return !getFilterSelectedList.some(
        ({ emailId }) => emailId.toLowerCase() === item.emailId.toLowerCase()
      );
    });
    setFilterList(searchResult1);
  };
  const handleInputChange = (event) => {
    const { value = "" } = event.target || {};
    setInputs(value);
    setCohostList([...getCohostList, value]);
    setEmailList(true);
    inviteMemberSearchList(value);
    if (value === "") {
      setErrorMsg(false);
      return;
    }
    getErrorMsg && setErrorMsg(emailValidation(value));
  };
  const errorValidate = (event) => {
    const { value = "" } = event.target || {};
    if (value === "") {
      setErrorMsg(false);
      return;
    }
    setErrorMsg(emailValidation(value));
    setInputs(value);
  };
  const handleInviteParticipant = (ele = "") => {
    const filteredArray = filterList.filter(
      (obj) => obj.emailId.toLowerCase() !== ele.emailId.toLowerCase()
    );
    setInputs("");
    setErrorMsg(false);
    setEmailList(false);
    setFilterList(filteredArray);
    if (
      emailNotFound.filter(
        (obj) => obj.emailId.toLowerCase() === ele.emailId.toLowerCase()
      ).length === 0
    ) {
      setFilterSelectedList((prevArray) => [...prevArray, ele]);
    } else {
      setErrorMsg(constantValue.EMAIL_ALREADY_ADDED);
    }
  };

  const handleRemoveParticipant = (ele = "") => {
    const filteredArray = getFilterSelectedList.filter(
      (obj) => obj.emailId !== ele.emailId
    );
    setFilterSelectedList(filteredArray);
    setErrorMsg(false);
  };

  const handleRemoveEmail = (emailId = "") => {
    const filterEmail = emailNotFound.filter((obj) => obj.emailId !== emailId);
    setEmailNotFound(filterEmail);
  };

  const handleDropMenu = (status = false) => {
    setEmailList(status);
    if (getFilterSelectedList.length >= 1) {
      setFilterList(
        inviteList.filter((obj) => {
          return !getFilterSelectedList.some(
            (obj2) => obj.emailId === obj2.emailId
          );
        })
      );
    } else {
      if (document.getElementById("email").value.length < 1) {
        setFilterList(inviteList);
      }
    }
  };
  useEffect(() => {
    setUserList(inviteMemberList);
  }, []);
  useEffect(() => {
    if (seletedEmailArray?.length > 0) {
      setFilterSelectedList(seletedEmailArray);
    }
  }, [seletedEmailArray]);
  const ownerMailValidation = (value) => {
    console.log("user", userList);
    return hostDetails.emailId.toLowerCase() === value.toLowerCase()
      ? false
      : true;
  };
  const handleValidate = (value = "") => {
    if (EmailValidate(value)) {
      if (ownerMailValidation(value)) {
        if (emailNotFound.length === 0) {
          if (getFilterSelectedEmailList.indexOf(value.toLowerCase()) === -1) {
            setInputs("");
            setErrorMsg(false);
            const filteredData = inviteList.filter(
              (obj) => obj.emailId.toLowerCase() === value.toLowerCase().trim()
            );
            if (filteredData.length === 0) {
              setEmailNotFound([
                ...emailNotFound,
                {
                  emailId: value,
                  isCheck: true,
                  emailVerified: 0,
                  invitedMemberData: invitedMemberData,
                },
              ]);
              setEmailList(false);
            } else {
              setInputs("");
              setErrorMsg(false);
              setEmailList(false);
              setFilterSelectedList((prevArray) => [
                ...prevArray,
                filteredData[0],
              ]);
            }
          } else {
            setErrorMsg(constantValue.EMAIL_ALREADY_ADDED);
          }
        } else if (
          emailNotFound.filter(
            (obj) => obj.emailId.toLowerCase() === value.toLowerCase()
          ).length === 0 &&
          getFilterSelectedEmailList.indexOf(value.toLowerCase()) === -1
        ) {
          setInputs("");
          setErrorMsg(false);
          const filteredData = inviteList.filter(
            (obj) => obj.emailId.toLowerCase() === value.toLowerCase().trim()
          );
          if (filteredData.length === 0) {
            setEmailNotFound([
              ...emailNotFound,
              {
                emailId: value,
                isCheck: true,
                emailVerified: 0,
                invitedMemberData: invitedMemberData,
              },
            ]);
            setEmailList(false);
          } else {
            setInputs("");
            setErrorMsg(false);
            setEmailList(false);
            setFilterSelectedList((prevArray) => [
              ...prevArray,
              filteredData[0],
            ]);
          }
        } else {
          setErrorMsg(constantValue.EMAIL_ALREADY_ADDED);
        }
      } else {
        setErrorMsg(translate("ERROR.Email ID already exists"));
      }
    } else {
      setErrorMsg(translate("ERROR.EMAIL"));
      setEmailList(false);
    }
  };

  const onKeyDown = (ele = {}, clickEvent = false) => {
    const { value = "" } = ele.target;
    const { keyCode = "", code = " " } = ele;
    if (keyCode === 13 || code === "Enter" || clickEvent) {
      handleValidate(value);
    }
    if (keyCode === 8) {
      if (document.getElementById("email").value.length <= 1) {
        if (getFilterSelectedList.length === 0) {
          setFilterList(inviteList);
        } else {
          const searchResult1 = inviteList.filter((item) => {
            return !getFilterSelectedList.some(
              ({ emailId }) => emailId === item.emailId
            );
          });
          setFilterList(searchResult1);
        }
      } else {
        inviteMemberSearchList(document.getElementById("email").value);
      }
    }
  };

  const handleEmailSelect = (ele = {}, index = 0, ref = {}) => {
    const { isCheck = false } = ele;
    emailNotFound[index].isCheck = !isCheck;
    setEmailNotFound([...emailNotFound]);
    ref.current.blur();
  };

  const handleMakeAdmin = () => {
    if (isOffline()) {
      toastInternet(constantValue.INTERNET_ERROR);
      return;
    }

    const InviteAdminList = [
      ...emailNotFound.map((obj) => {
        if (obj.isCheck === true) return obj.emailId;
      }),
    ];
    const unRegisteredList = InviteAdminList.filter((obj) => obj !== undefined);
    if (unRegisteredList.length > 0) {
      const AdminValue = 2;
      const inviteListArray1 = unRegisteredList.map((email) => {
        return {
          inviteUserEmail: email,
          inviteUserRoleId: AdminValue,
        };
      });
      store.dispatch({ type: "DO_LOADING_LOGIN_PAGE", loading: true });
      store.dispatch(inviteMemberAction(inviteListArray1, inviteMember));
      setEmailNotFound(
        emailNotFound.filter((item) => !unRegisteredList.includes(item.emailId))
      );
      const seletedList = getFilterSelectedList.concat(
        emailNotFound
          .map((obj) => {
            if (obj.isCheck === true) return obj;
          })
          .filter((obj) => obj !== undefined)
      );
      setFilterSelectedList(seletedList);
      setErrorMsg("");
    } else {
      setErrorMsg(constantValue.PLEASE_SELECT_EMAIL);
    }
  };

  const handleMakeCohost = () => {
    if (isOffline()) {
      toastInternet(constantValue.INTERNET_ERROR);
      return;
    }

    const InviteCohostList = [
      ...emailNotFound.map((obj) => {
        if (obj.isCheck === true) return obj.emailId;
      }),
    ];
    const unRegisteredList = InviteCohostList.filter(
      (obj) => obj !== undefined
    );
    if (unRegisteredList.length > 0) {
      const cohostValue = 3;
      const inviteListArray2 = unRegisteredList.map((email) => {
        return {
          inviteUserEmail: email,
          inviteUserRoleId: cohostValue,
        };
      });
      store.dispatch({ type: "DO_LOADING_LOGIN_PAGE", loading: true });
      store.dispatch(inviteMemberAction(inviteListArray2, inviteMember));
      setEmailNotFound(
        emailNotFound.filter((item) => !unRegisteredList.includes(item.emailId))
      );
      const seletedList = getFilterSelectedList.concat(
        emailNotFound
          .map((obj) => {
            if (obj.isCheck === true) return obj;
          })
          .filter((obj) => obj !== undefined)
      );
      setFilterSelectedList(seletedList);
      setErrorMsg("");
    } else {
      setErrorMsg(constantValue.PLEASE_SELECT_EMAIL);
    }
  };
  useEffect(() => {
    setFilterList(inviteList);
    store.dispatch(inviteMemberListAction(currentOrgList, {}, true));
    store.dispatch({ type: "DO_LOADING_PAGE", loading: true });
  }, []);

  useEffect(() => {
    const emailList = getFilterSelectedList.map((obj) => {
      return obj.emailId.toLowerCase();
    });
    setFilterSelectedEmailList(emailList);
  }, [getFilterSelectedList]);

  const handleSubmit = async () => {
    const {
      data: { data: teamMembersDetails = [] },
    } = await getTeamMembers(getCurrentOrgId());
    const teamMembers = teamMembersDetails?.teamMembersDetails;
    console.log(teamMembers, "teamMembersteamMembers");
    if (getFilterSelectedList.length > 0) {
      if (participantList?.length > 0) {
        if (getFilterSelectedList.length + participantList.length - 1 <= 3) {
          _handleGetRegisteredEmails(getFilterSelectedList);
          const getUnregList = getFilterSelectedList.map((ele) => {
            if (ele?.userId) {
              return { ...ele };
            } else {
              return {
                ...teamMembers.find(
                  (element) => element?.emailId === ele?.emailId
                ),
                emailId: ele?.emailId,
              };
            }
          });
          console.log(getUnregList, "updateCreateParticipantToken----1");
          _handleGetUnRegisteredEmails(getUnregList);
          _handleOnOutsideClick();
        } else {
          participantList.length - 1 > 0
            ? setErrorMsg(
              `You can add only ${4 - participantList.length
              } more participants `
            )
            : setErrorMsg(constantValue.ONLY_2_MEMBER_ALLOWED);
        }
      } else {
        if (getFilterSelectedList.length <= 3) {
          _handleGetRegisteredEmails(getFilterSelectedList);
          const getUnregList = getFilterSelectedList.map((ele) => {
            if (ele?.userId) {
              return { ...ele };
            } else {
              return {
                ...teamMembers.find(
                  (element) => element?.emailId === ele?.emailId
                ),
                emailId: ele?.emailId,
              };
            }
          });
          console.log(getUnregList, "updateCreateParticipantToken----2");
          _handleGetUnRegisteredEmails(getUnregList);
          _handleOnOutsideClick();
        } else {
          setErrorMsg(constantValue.ONLY_2_MEMBER_ALLOWED);
        }
      }
    } else {
      if (editSessionCreated?.editSession) {
        _handleGetUnRegisteredEmails([]);
        _handleOnOutsideClick();
      }
      setErrorMsg(constantValue.Please_add_atleast_one_cohost);
    }
  };
  const assertAccess = () => {
    return (
      <Modal1>
        <AnimatePopup
          parentClass={"common_action_popup"}
          setShow={true}
          _handleOnOutsideClick={_handleOnOutsideClick}
        >
          <div>
            <div className="ActionPopupInner ">
              <div className="Action_popup_header">
                <IconSettingAccess />
                <h4>Grant Access</h4>
              </div>
              <p>
                To enhance your experience please provide{" "}
                <strong>Microphone</strong> and <strong>Camera</strong> access.
              </p>
              <div className="group-btn">
                <Ripples className="li">
                  <button
                    type="button"
                    className="btn-Blue sm red"
                    onClick={_handleOnOutsideClick}
                  >
                    Ok
                  </button>
                </Ripples>
              </div>
            </div>
          </div>
        </AnimatePopup>
      </Modal1>
    );
  };
  const warningComp = () => {
    return (
      <Modal1>
        <AnimatePopup
          parentClass={"common_action_popup"}
          setShow={true}
          _handleOnOutsideClick={_handleOnOutsideClick}
        >
          <div>
            <div className="ActionPopupInner ">
              <div className="Action_popup_header">
                <div className="danger icon">
                  <IconTimer />
                </div>
                <h4>Broadcast Ends in 10 Minutes</h4>
              </div>
              <p style={{ maxWidth: "361px" }}>
                This is to keep you informed that your broadcast is ending soon.
              </p>
              <div className="group-btn">
                <Ripples className="li">
                  <button
                    type="button"
                    className="btn-Blue sm red"
                    onClick={_handleOnOutsideClick}
                  >
                    Ok
                  </button>
                </Ripples>
              </div>
            </div>
          </div>
        </AnimatePopup>
      </Modal1>
    );
  };
  const timeOut = () => {
    return (
      <Modal1>
        <AnimatePopup
          parentClass={"common_action_popup"}
          setShow={true}
          _handleOnOutsideClick={_handleOnOutsideClick}
        >
          <div>
            <div className="ActionPopupInner ">
              <div className="Action_popup_header">
                <div className="danger icon">
                  <IconPauseTimer />
                </div>
                <h4>Broadcast Quota Expired</h4>
              </div>
              <p style={{ maxWidth: "361px" }}>
                Your Broadcast Quota limit has Expired. Please contact
                <span className="heightlight_blue">
                  {" "}
                  support@onthefly.stream
                </span>
              </p>
              <div className="group-btn">
                <Ripples className="li">
                  <button
                    type="button"
                    className="btn-Blue sm red"
                    onClick={_handleOnOutsideClick}
                  >
                    Ok
                  </button>
                </Ripples>
              </div>
            </div>
          </div>
        </AnimatePopup>
      </Modal1>
    );
  };
  const cohostCallEnd = () => {
    return (
      <Modal1>
        <AnimatePopup
          parentClass={"common_action_popup"}
          setShow={true}
          _handleOnOutsideClick={_handleOnOutsideClick}
        >
          <div>
            <div className="ActionPopupInner ">
              <div className="Action_popup_header">
                <div className="danger icon">
                  <IconBroadcastEnded />
                </div>
                <h4>Live Stream Disconnected</h4>
              </div>
              <p style={{ maxWidth: "361px" }}>
                Host has ended the Live stream. Please contact host for further details.
              </p>
              <div className="group-btn">
                <Ripples className="li">
                  <button
                    type="button"
                    className="btn-Blue sm red"
                    onClick={_handleOnOutsideClick}
                  >
                    Ok
                  </button>
                </Ripples>
              </div>
            </div>
          </div>
        </AnimatePopup>
      </Modal1>
    );
  };
  const cohostCallEndWithoutLive = () => {
    return (
      <Modal1>
        <AnimatePopup
          parentClass={"common_action_popup"}
          setShow={true}
          _handleOnOutsideClick={_handleOnOutsideClick}
        >
          <div>
            <div className="ActionPopupInner ">
              <div className="Action_popup_header">
                <div className="danger icon">
                  <IconBroadcastEnded />
                </div>
                <h4>Broadcast Disconnected</h4>
              </div>
              <p style={{ maxWidth: "361px" }}>
                Host has ended the Broadcast. Please contact host for further details.
              </p>
              <div className="group-btn">
                <Ripples className="li">
                  <button
                    type="button"
                    className="btn-Blue sm red"
                    onClick={_handleOnOutsideClick}
                  >
                    Ok
                  </button>
                </Ripples>
              </div>
            </div>
          </div>
        </AnimatePopup>
      </Modal1>
    );
  };
  const offlineExit = () => {
    return (
      <Modal1>
        <AnimatePopup
          parentClass={"common_action_popup"}
          setShow={true}
          _handleOnOutsideClick={_handleOnOutsideClick}
        >
          <div>
            <div className="ActionPopupInner ">
              <div className="Action_popup_header">
                <div style={{ color: "#FF4747" }} className="danger icon">
                  <IconToastInfo fill="#FF4747" />
                </div>
                <h4>Something went wrong</h4>
              </div>
              <p>Please ensure you are connected to the internet.</p>
              <div className="group-btn">
                <Ripples className="li">
                  <button
                    type="button"
                    className="btn-Blue sm red"
                    onClick={_handleOnOutsideClick}
                  >
                    Try again
                  </button>
                </Ripples>
              </div>
            </div>
          </div>
        </AnimatePopup>
      </Modal1>
    );
  };
  const invitePopUp = () => {
    return (
      <Modal1>
        <AnimatePopup
          parentClass={"teams_create_edit_form"}
          setShow={true}
          _handleOnOutsideClick={_handleOnOutsideClick}
        >
          <div className="ActionPopupInner">
            <>
              <CommonPopupForm
                heading={heading ? heading : "Add Cohost"}
                handleAction={() => handleSubmit()}
                handleClose={_handleOnOutsideClick}
                tooltipDesc={tooltipDesc}
              >
                <div id="input" className={`input-badge`}>
                  <fieldset>
                    <div
                      className={
                        getErrorMsg ? "input error-border " : " input "
                      }
                    >
                      <OutsideClickHandler
                        onOutsideClick={() => handleDropMenu()}
                      >
                        <div className="relative">
                          <CommonFormInput
                            readOnly={false}
                            enableCustomLabel={false}
                            disabled={false}
                            label={false}
                            type="text"
                            caps={false}
                            autoFocus={true}
                            value={getinputs.trim()}
                            headingPlaceholder={true}
                            name={"email"}
                            enableLable={false}
                            palceholder={"Search with email"}
                            _onBlur={(e) => errorValidate(e)}
                            _onchange={handleInputChange}
                            _onFocus={() => handleDropMenu(true)}
                            className={` mb-0 ${getErrorMsg ? "  " : " "}`}
                            customClass={"input_transparent"}
                            _onKeyDown={onKeyDown}
                          >
                            {
                              <button
                                onClick={
                                  getinputs && !getErrorMsg
                                    ? () => handleValidate(getinputs)
                                    : () => { }
                                }
                                className={` ${getinputs && !getErrorMsg
                                  ? " active "
                                  : " inactive "
                                  } input_plus_action`}
                              >
                                <Iconplus /> <span>Add</span>
                              </button>
                            }
                          </CommonFormInput>
                        </div>
                        {getEmailList &&
                          omitInvited(filterList).length !== 0 ? (
                          <div className="email_list_popup">
                            {omitInvited(filterList).map((ele) => {
                              return (
                                <ul key={ele}>
                                  <li>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        handleInviteParticipant(ele);
                                      }}
                                    >
                                      {" "}
                                      <span>{ele.emailId}</span>
                                    </button>
                                  </li>
                                </ul>
                              );
                            })}
                          </div>
                        ) : null}
                      </OutsideClickHandler>
                      {getFilterSelectedList.length > 0 ? (
                        <div className="badgeWrapper pt-0">
                          <div className="badgeList ">
                            {getFilterSelectedList.map((ele) => {
                              return (
                                <div key={ele} className="item badgelist_item">
                                  <div className={`badge`}>
                                    <span>{ele.emailId}</span>
                                    <button
                                      title="remove"
                                      className="btn_close"
                                      type="button"
                                      onClick={(e) => {
                                        handleRemoveParticipant(ele);
                                      }}
                                    >
                                      <IconClose />
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : null}
                    </div>
                    {getErrorMsg !== "" && (
                      <div className="errMsg">{getErrorMsg}</div>
                    )}
                  </fieldset>
                  {emailNotFound.length > 0 ? (
                    <fieldset>
                      <div className="invite_new_cohost">
                        <ul>
                          {emailNotFound.map((ele, i) => {
                            return (
                              <li key={ele.emailId}>
                                <div className="check_box">
                                  <button
                                    ref={buttonRef}
                                    className="checkbox_action"
                                    type="button"
                                    onClick={() =>
                                      handleEmailSelect(ele, i, buttonRef)
                                    }
                                  >
                                    <div className="checkbox-custom">
                                      <input
                                        type="checkbox"
                                        name={"checkbox"}
                                        value={ele.emailId}
                                        id={`check-${i}`}
                                        checked={ele.isCheck}
                                      />
                                      <div className="label_border"></div>
                                    </div>
                                    <span title={ele.emailId}>
                                      {ele.emailId}
                                    </span>
                                  </button>
                                  <button
                                    type="button"
                                    title="remove"
                                    className="email_edit"
                                    onClick={() => {
                                      handleRemoveEmail(ele.emailId);
                                    }}
                                  >
                                    <IconClose />
                                  </button>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                        <div className="invite_actions">
                          <button
                            type="button"
                            onClick={() => handleMakeAdmin()}
                            className="action_btn"
                          >
                            Invite as Admin
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMakeCohost()}
                            className="action_btn"
                          >
                            Invite as Cohost
                          </button>
                        </div>
                      </div>
                    </fieldset>
                  ) : null}
                </div>
              </CommonPopupForm>
            </>
          </div>
        </AnimatePopup>
      </Modal1>
    );
  };
  const callExit = () => {
    return (
      <Modal1>
        <AnimatePopup
          parentClass={"common_action_popup"}
          setShow={true}
          _handleOnOutsideClick={_handleOnOutsideClick}
        >
          <div>
            <div className="ActionPopupInner ">
              <div className="Action_popup_header">
                <IconSettingAccess />
                <h4>Ending Call</h4>
              </div>
              <p>
                Are you sure You want to <strong>end this call</strong>?
              </p>
              <div className="group-btn">
                <Ripples className="li">
                  <button
                    type="button"
                    className="btn-Blue sm red"
                    onClick={handleExit}
                  >
                    Ok
                  </button>
                </Ripples>
              </div>
              <div className="group-btn">
                <Ripples className="li">
                  <button
                    type="button"
                    className="btn-Blue sm red"
                    onClick={_handleOnOutsideClick}
                  >
                    Cancel
                  </button>
                </Ripples>
              </div>
            </div>
          </div>
        </AnimatePopup>
      </Modal1>
    );
  };
  const leave = () => {
    return (
      <Modal1>
        <AnimatePopup
          parentClass={"common_action_popup"}
          setShow={true}
          _handleOnOutsideClick={_handleOnOutsideClick}
        >
          <div>
            <div className="ActionPopupInner ">
              <div className="Action_popup_header">
                <div
                  style={{ color: "#FF4747", padding: "12px" }}
                  className="danger icon"
                >
                  <IconX fill="#FF4747" />
                </div>
                <h4>Leave Broadcast?</h4>
              </div>
              <p style={{ maxWidth: "361px" }}>
                If you exit the broadcast, your live streaming will be
                terminated. Do you still wish to exit the broadcast?
              </p>
              <div className="group-btn">
                <Ripples className="li">
                  <button
                    type="button"
                    className="btn-Blue sm red"
                    onClick={handleExit}
                  >
                    Leave
                  </button>
                </Ripples>
                <Ripples className="li">
                  <button
                    type="button"
                    className="btn-cancel sm cancel"
                    onClick={_handleOnOutsideClick}
                  >
                    Cancel
                  </button>
                </Ripples>
              </div>
            </div>
          </div>
        </AnimatePopup>
      </Modal1>
    );
  };
  const trailUserLogoUpdata = () => {
    return (
      <TrailUserLogoUpdata _handleOnOutsideClick={_handleOnOutsideClick} />
    );
  };

  const deviceChange = () => {
    return (
      <Modal1>
        <AnimatePopup
          parentClass={"common_action_popup"}
          setShow={true}
          _handleOnOutsideClick={_handleOnOutsideClick}
        >
          <div>
            <div className="ActionPopupInner ">
              <div className="Action_popup_header">
                <div style={{ color: "#FF4747" }} className="danger icon">
                  <IconToastInfo fill="#FF4747" />
                </div>
                <h4>Your Camera or Mic is Disabled</h4>
              </div>
              <p style={{ maxWidth: "100%" }}>
                Your Camera or Mic is currently disabled from your browser
                settings. Enable your Camera and Mic to actively participate in
                the Livestream.
              </p>
              <div className="group-btn">
                <Ripples className="li">
                  <button
                    type="button"
                    className="btn-Blue sm red"
                    onClick={handleExit}
                  >
                    Leave Call
                  </button>
                </Ripples>
                <Ripples
                  className={`li ${isCamMicGranted(cameraPermissions, micPermissions)
                    ? " "
                    : " _disabled_btn "
                    } rounded-sm `}
                >
                  <button
                    type="button"
                    className={` ${isCamMicGranted(cameraPermissions, micPermissions)
                      ? " "
                      : " _disabled_btn "
                      }
                      btn-cancel sm cancel `}
                    onClick={
                      isCamMicGranted(cameraPermissions, micPermissions)
                        ? () => _handleRefreshPage()
                        : () => { }
                    }
                  >
                    Refresh Page
                  </button>
                </Ripples>
              </div>
            </div>
          </div>
        </AnimatePopup>
      </Modal1>
    );
  };
  const noDeviceFount = () => {
    return (
      <Modal1>
        <AnimatePopup
          parentClass={"common_action_popup"}
          setShow={true}
          _handleOnOutsideClick={_handleOnOutsideClick}
        >
          <div>
            <div className="ActionPopupInner ">
              <div className="Action_popup_header">
                <IconSettingAccess />
                <h4>No Device Found</h4>
              </div>
              <p>
                To begin a Livestream, please ensure that you have both camera
                and microphone available.
              </p>
              <div className="group-btn">
                <Ripples className="li">
                  <button
                    type="button"
                    className="btn-Blue sm red"
                    onClick={_handleOnOutsideClick}
                  >
                    Ok
                  </button>
                </Ripples>
              </div>
            </div>
          </div>
        </AnimatePopup>
      </Modal1>
    );
  };
  const joinDeletePopup = () => {
    return (
      <Modal1>
        <AnimatePopup
          parentClass={"common_action_popup"}
          setShow={true}
          _handleOnOutsideClick={_handleOnOutsideClick}
        >
          <div>
            <div className="ActionPopupInner " style={{ width: 460 }}>
              <div className="Action_popup_header">
                <div style={{ color: "#FF4747" }} className="danger icon">
                  <IconToastInfo fill="#FF4747" />
                </div>
                <h4>Event Deleted </h4>
              </div>
              <p>This event was deleted by the host</p>
              <div className="group-btn">
                <Ripples className="li">
                  <button
                    type="button"
                    className="btn-Blue sm red"
                    onClick={handleExit}
                  >
                    Close
                  </button>
                </Ripples>
              </div>
            </div>
          </div>
        </AnimatePopup>
      </Modal1>
    );
  };
  const joinRemovePopup = () => {
    return (
      <Modal1>
        <AnimatePopup
          parentClass={"common_action_popup"}
          setShow={true}
          _handleOnOutsideClick={_handleOnOutsideClick}
        >
          <div>
            <div className="ActionPopupInner " style={{ width: 460 }}>
              <div className="Action_popup_header">
                <div style={{ color: "#FF4747" }} className="danger icon">
                  <IconToastInfo fill="#FF4747" />
                </div>
                <h4>Joining Restricted </h4>
              </div>
              <p style={{ paddingTop: "0", marginTop: "-4px" }}>You have been restricted from joining the broadcast by the Host.</p>
              <div className="group-btn">
                <Ripples className="li">
                  <button
                    type="button"
                    className="btn-Blue sm red"
                    onClick={handleExit}
                  >
                    Close
                  </button>
                </Ripples>
              </div>
            </div>
          </div>
        </AnimatePopup>
      </Modal1>
    );
  };
  const DeletePopup = () => {
    return (
      <Modal1>
        <AnimatePopup
          parentClass={"common_action_popup"}
          setShow={true}
          _handleOnOutsideClick={_handleOnOutsideClick}
        >
          <div>
            <div className="ActionPopupInner " style={{ width: 460 }}>
              <div className="Action_popup_header">
                <div style={{ color: "#FF4747" }} className="danger icon">
                  <IconToastInfo fill="#FF4747" />
                </div>
                <h4> Event Deleted! </h4>
              </div>
              <p style={{ paddingTop: "0", marginTop: "-4px" }}>This event was already deleted by Host/Admin.</p>
              <div className="group-btn">
                <Ripples className="li">
                  <button
                    type="button"
                    className="btn-Blue sm red"
                    onClick={handleExit}
                  >
                    Close
                  </button>
                </Ripples>
              </div>
            </div>
          </div>
        </AnimatePopup>
      </Modal1>
    );
  };
  const pastCallEnded = () => {
    return (
      <Modal1>
        <AnimatePopup
          parentClass={"common_action_popup"}
          setShow={true}
          _handleOnOutsideClick={_handleOnOutsideClick}
        >
          <div>
            <div className="ActionPopupInner " style={{ width: 460 }}>
              <div className="Action_popup_header">
                <div style={{ color: "#FF4747" }} className="danger icon">
                  <IconToastInfo fill="#FF4747" />
                </div>
                <h4>Invalid Link </h4>
              </div>
              <p>This Link is invalid. Contact host to connect further!</p>
              <div className="group-btn">
                <Ripples className="li">
                  <button
                    type="button"
                    className="btn-Blue sm red"
                    onClick={handleExit}
                  >
                    Close
                  </button>
                </Ripples>
              </div>
            </div>
          </div>
        </AnimatePopup>
      </Modal1>
    );
  };

  const socialAccountAccess = (data) => {
    const {media_type : mediaType = "", profile = "", media_id : mediaId = "", config_id : configId = "",
    config_type : configType = "", name = "", media_status : mediaStatus = ""} = data;
    let accType = "";
    if (configType === "page") {
        accType = "Facebook Page";
    } else {
        accType = "Facebook Profile";
    }
    if (mediaType == "YT") {
        accType = "YouTube Channel";
    }
    return (
      <Modal1>
        <AnimatePopup
          parentClass={"common_action_popup"}
          setShow={true}
          _handleOnOutsideClick={_handleOnOutsideClick}
        >
          <div>
            <div className="ActionPopupInner " style={{ width: "566px" }}>
              <div className="Action_popup_header">
                <div style={{ color: "#FF4747" }} className="danger icon">
                  <IconToastInfo style={{ transform: "rotate(-180deg)" }} fill="#FF4747" />
                </div>
                <h4>Social Account Access</h4>
              </div>
              <p style={{ maxWidth: "100%" }}>Access to some of your social media account was lost. Please click on reconnect to connect and continue using services.</p>
              <div style={{ maxWidth: "100%" }} className="">
                <button
                  type="button"
                  onClick={() => { }}
                  className={` acc_info_wraper_li  button `}
                >
                  <div
                    className={` acc_info_list `}
                  >
                    <div className="acc_icon">
                      {mediaType === "YT" ? <YoutubeIcon /> : <FacebookIcon />}
                      <Image className="userinfo_img"
                        placeholderImg={ImgProfile}
                        src={profile || ImgProfile}
                        alt={"profile"} />
                    </div>
                    <div className="acc_info">
                      <h4 title={"Abhishek Sahu"}>{name}</h4>
                      <h5>{accType}</h5>
                    </div>
                    {mediaStatus === 2 ?
                    <button type='button' className='btn_reconnection'>
                      <span className='btn_reconnection_icon'><IconInfoSm /></span>
                      <div className={`btn_reconnection_info_toast top `}>
                      Access to your  {mediaType === "FB" ? " Facebook " : " YouTube "} account was lost. Please click on reconnect to connect and continue using service.
                      </div>
                      {mediaType === "FB" ?
                        <SocialReconnect
                          className={`btn_reconnection_text btn_reconnection`}
                          textActionButton={"Reconnect"}
                          scope={"public_profile,publish_video"}
                          type={configId ? "page" : ""}
                          reconnectItems={{mediaId, mediaType, configId, configType}}
                        />
                        :
                        // // <strong className='btn_reconnection_text'>Reconnect</strong>
                        <GoogleOAuthProvider clientId={ssoYTGmailClientId}>
                          <YTReconnect />
                        </GoogleOAuthProvider>
                      }
                    </button>
                    : null }
                  </div>
                </button>

              </div>
              <div className="group-btn">
                <Ripples className="li">
                  <button
                    type="button"
                    className="btn-Blue sm red "
                    onClick={handleExit}
                  >
                    Done
                  </button>
                </Ripples>
              </div>
            </div>
          </div>
        </AnimatePopup>
      </Modal1>
    );
  };

  switch (type) {
    case "assertAccess":
      return assertAccess();
    case "warning":
      return warningComp();
    case "Cohostwarning":
      return warningComp();
    case "cohostCallEnd":
      return cohostCallEnd();
    case "cohostCallEndWithoutLive":
      return cohostCallEndWithoutLive();
    case "timeOut":
      return timeOut();
    case "callExit":
      return leave();
    case "leave":
      return callExit();
    case "offline":
      return offlineExit();
    case "DeviceChanege":
      return deviceChange();
    case "noDeviceFound":
      return noDeviceFount();
    case "TrailUserLogo":
      return trailUserLogoUpdata();
    case "joinDeletePopup":
      return joinDeletePopup();
    case "joinRemovePopup":
      return joinRemovePopup();
    case "DeletePopup":
      return DeletePopup();
    case "pastEnded":
      return pastCallEnded();
    case "socialAccountAccess":
      return socialAccountAccess(mediaDetails);
    default:
      return invitePopUp();
    // code block
  }
}

export default AddCohostPopup;
