import React, { useState, useEffect } from "react";
import "./ParticipantsList.scss";
import {
  IconRemoveUser,
  IconToastInfo,
  IconX,
} from "../../../../../assets/images";
import {
  IconCrown,
  IconMicActive,
  IconMicInActive,
  IconScreenShare,
  IconStopScreenShare,
  IconVideoActive,
  IconVideoInActive,
  Imgplaceholder,
} from "../../../../../assets/img";
import CommonImageTag from "../../../../../common/CommonImageTag";
import { getInitials } from "../../../../../helper";
import ActionPopup from "../../../../Common/ActionPopup";
import Modal from "../../../../../common/Modal";
import store from "../../../../../store";
import { removeParticipantAction } from "../../../../../store/action/deleteAction";
import { updateAudioMutedParticipants, updateParticipantList, updateScreenShare, updateVideoMutedParticipants } from "../../../../../firebase/firebaseRealtimeFunctions";
import {
  currentStageArrn,
  getColorCodeInitials,
  getCurrentOrgId,
  getCurrentUserId,
  isHostJoined,
  positioningHost,
  positioningMembers,
} from "../../../../../helper/utility";
import { getParticipantListAction } from "../../../../../store/action/participantAction";
import { userDetailsLocal } from "../../../../../helper/RoleConfig";
import { useSelector } from "react-redux";
import { ToastService } from "../../../../../common";
import { isMuted } from "../../../../../aws/awsHelper";

function ParticipantsList(_props) {
  const {
    _handleScreenShare = () => { },
    // _handleRemoveParticipant = () => { },
    isHost = false,
    isScreenShare = false,
    userName = "Prabhu Mariappan",
    getGoLive
  } = _props;
  const [getAudioMute, setAudioMute] = useState(false);
  const [getVideoMute, setVideoMute] = useState(false);
  const [getScreenShare, setScreenShare] = useState(isScreenShare);
  const [getDeletepopup, setDeletepopup] = useState(false);
  const [getUserName, setUserName] = useState("");

  const [selectedparticpant, setSelectedParticipant] = useState("");
  const participants = useSelector((state) => state?.stageParticipants); //store
  const participantsData = useSelector((state) => state?.stageParticipantsData); //store
  const [getSelectedUser, setSelectedUser] = useState({});
  const participantList =
    store.getState()?.participantListReducer?.participantList;
  const awsStageReducer = store.getState()?.awsStageReducer; //store
  const broadcastBranding = store.getState()?.broadcastBranding; //store
  const videoMutedParticipants = broadcastBranding?.videoMutedParticipants || [];
  const audioMutedParticipants = broadcastBranding?.audioMutedParticipants || [];
  const fbHlsLink = broadcastBranding?.hlsLink || "";
  const fbRemoveStatus = broadcastBranding?.removeParticipant || false;
  const fbHostId = broadcastBranding?.host || "";
  const fbPosition1 = broadcastBranding?.postion1 || "";
  const fbPosition2 = broadcastBranding?.postion2 || ""
  const fbPosition3 = broadcastBranding?.postion3 || "";
  const fbIsScreenShare = broadcastBranding?.isScreenShare || false;
  const userDetails = userDetailsLocal() || {}; //logged userDetails
  const { data: { email: userEmailLocal = "" } = {} } = userDetails;

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
    return orderedList;
  };

  const videoMuteSetter = () => {
    console.log(videoMutedParticipants, selectedparticpant?.userId, "videoMuteSettervideoMuteSetter")
    const updateMuteparticipants = [...videoMutedParticipants, selectedparticpant?.userId];
    updateVideoMutedParticipants(getCurrentOrgId(), currentStageArrn(awsStageReducer), updateMuteparticipants);
    ToastService.infoToastblue((
      <div className="customToast">
        <i className="info">
          <IconToastInfo />
        </i>
        <p>{`You tuned off ${selectedparticpant?.userName}'s camera for everyone in the ${!getGoLive ? " live stream" : " broadcast "}`}</p>
      </div>
    ));
  };
  const audioMuteSetter = () => {
    const updateMuteparticipants = [...audioMutedParticipants, selectedparticpant?.userId];
    updateAudioMutedParticipants(getCurrentOrgId(), currentStageArrn(awsStageReducer), updateMuteparticipants);
    ToastService.infoToastblue((
      <div className="customToast">
        <i className="info">
          <IconToastInfo />
        </i>
        <p>{`You muted ${selectedparticpant?.userName} for everyone in the ${!getGoLive ? " live stream" : " broadcast "}`}</p>
      </div>
    ));
  };
  const screenShareMuteSetter = () => {
    updateScreenShare(getCurrentOrgId(), false);
    ToastService.infoToastblue((
      <div className="customToast">
        <i className="info">
          <IconToastInfo />
        </i>
        <p>{`You stopped ${selectedparticpant?.userName} screen share for everyone in the  ${!getGoLive ? " live stream" : " broadcast "}`}</p>
      </div>
    ));
  };

  const handleAudioMute = (state = false, participant = {}) => {
    setUserName(participant?.userName);
    setSelectedParticipant(participant);
    setAudioMute(state);
    if (!state) {
      audioMuteSetter();
    }
  };

  const handleScreenShare = (state = false, participant = {}) => {
    setUserName(participant?.userName);
    setSelectedParticipant(participant);
    setScreenShare(state);
    if (!state) {
      screenShareMuteSetter();
    }
  };

  const handleVideoMute = (state = false, participant = {}) => {
    setUserName(participant?.userName);
    setSelectedParticipant(participant);
    setVideoMute(state);
    if (!state) {
      videoMuteSetter();
    }
  };

  const _handleOnOutsideClick = (state = false) => {
    setDeletepopup(state);
  };

  const _handleRemoveParticipant = (ele = {}) => {
    setUserName(
      ele.userName === "" ? ele.userEmail.split("@")[0] : ele.userName
    );
    setSelectedUser(ele);
    setDeletepopup(true);
  };
  const _handleRemoveAction = () => {
    store.dispatch(removeParticipantAction(getSelectedUser));
    setDeletepopup(false);
    updateParticipantList(
      getCurrentOrgId(),
      currentStageArrn(awsStageReducer),
      participantList.length
    );
  };
  const handleModerationAction = (type = "") => {
    switch (type) {
      case "audio": handleAudioMute(false);
        break;
      case "video": handleVideoMute(false);
        break;
      case "screenShare": handleScreenShare(false);
        break;
      default: return false;
    }
  };

  useEffect(() => {
    store.dispatch(
      getParticipantListAction(currentStageArrn(awsStageReducer))
    );
  }, [fbRemoveStatus, participantsData]);
  useEffect(() => {
    if (!fbIsScreenShare) {
      setScreenShare(fbIsScreenShare);
    }
  }, [fbIsScreenShare]);

  const nameSplit = (username = "", userEmailId = "") => {
    if (username === "") {
      return userEmailId.split("@")[0];
    } else {
      return username;
    }
  };
  const filterJoined = (participantListReducer) => {
    return participantListReducer.filter(ele => participants.findIndex(elements => elements?.userId == ele?.userId) > -1);
  };

  const filterMembersNotJoined = (participantListReducer) => {
    const regUsers = participantListReducer.filter(ele => ele?.userId !== null);
    return regUsers.filter(ele => participants.findIndex(elements => elements?.userId == ele?.userId) < 0);
  };
  const isAudioMuted = (userId) => {
    return isMuted(participantsData[userId], "audio");
  }
  const isVideoMuted = (userId) => {
    return isMuted(participantsData[userId], "video");
  }
  const isScreenShareFunc = (userId) => {
    const screenShareParticipant = participants?.find(ele => ele?.attributes?.type === "screenShare")
    return participantsData[userId]?.userId === screenShareParticipant?.userId;
  }
  return (
    <>
      <div className="participants_list_wraper">
        <div className="participants_list">
          {orderingParticipants(filterJoined(participantList)).map((ele) => {
            return participantsData[ele?.stageParticipantId] && (
              <React.Fragment key={ele.userId}>
                {
                  <div style={{ paddingRight: 0 }} className="participants_list_info">
                    <div className="participant_info">
                      {ele?.userId !== null ? (
                        <>
                          <span
                            data-email={ele.userEmail}
                            style={{
                              background:
                                ele?.userId !== null
                                  ? getColorCodeInitials(ele.userEmail)
                                  : "transparent",
                            }}
                            className="initial relative"
                          >
                            {ele.userId === fbHostId ? <div className="icon_crown"><IconCrown /></div> : null}
                            {getInitials(nameSplit(ele.userName, ele.userEmail))}
                          </span>
                        </>
                      )
                        : (
                          <div className="relative">
                            {ele.isHost === 0 ? <div className="icon_crown"><IconCrown /></div> : null}
                            <CommonImageTag
                              style={{ width: "32px", height: "32px" }}
                              src={Imgplaceholder}
                              name={userName}
                              className="img"
                              placeholder={Imgplaceholder}
                            />
                          </div>
                        )}
                      <strong title={ele.userName === ""
                        ? ele.userEmail.split("@")[0]
                        : ele.userName} className="">
                        {ele.userName === ""
                          ? ele.userEmail.split("@")[0]
                          : ele.userName}
                      </strong>
                      {userEmailLocal === ele.userEmail ? <span className="badge_you">You</span> : null}
                    </div>
                    <div className="call_actions">
                      {isScreenShareFunc(ele?.stageParticipantId) ? (
                        <button
                          onClick={() => {
                            isHost && (ele.userId !== getCurrentUserId()) &&
                              isScreenShareFunc(ele?.stageParticipantId) && handleScreenShare(true, ele);
                          }}
                          style={{
                            cursor: (isHost && (ele.userId !== getCurrentUserId())) ? " pointer " : " default "
                          }}
                          className={` ${(isHost && (ele.userId !== getCurrentUserId()))
                            ? " hover_btn " : ""} call_action_button  tooltip_black_wraper relative ${isScreenShareFunc(ele?.stageParticipantId)
                              ? " active " : " inactive "
                            }`}
                          type="button"
                        >
                          <IconScreenShare />
                          {
                            isHost && (ele.userId !== getCurrentUserId()) &&
                            <div className="tooltip_black left flex full">
                              {!isScreenShareFunc(ele?.stageParticipantId) ? "" :
                                <>Stop <span title={ele.userName === "" ? ele.userEmail.split("@")[0] : ele.userName}
                                  className="text_controler"
                                  style={{ maxWidth: "120px" }}>
                                  {ele.userName === "" ? ele.userEmail.split("@")[0] : ele.userName}
                                </span>'s {" "} Screen share</>
                              }
                            </div>
                          }
                        </button>
                      ) : null}
                      <button
                        style={{
                          cursor: (isHost && userEmailLocal !== ele.userEmail) && (ele.userId !== getCurrentUserId()) &&
                            !isVideoMuted(ele?.stageParticipantId) ? " pointer " : " default "
                        }}
                        onClick={() => {
                          isHost && (ele.userId !== getCurrentUserId()) &&
                            !isVideoMuted(ele?.stageParticipantId) && handleVideoMute(true, ele);
                        }}
                        className={` ${(isHost && (ele.userId !== getCurrentUserId()))
                          ? " hover_btn " : ""} call_action_button tooltip_black_wraper relative ${!isVideoMuted(ele?.stageParticipantId)
                            ? " active " : " inactive "
                          }`}
                        type="button"
                      >
                        {!isVideoMuted(ele?.stageParticipantId) ? (
                          <IconVideoActive style={{ color: ele.userId === fbHostId ? "#959595" : "" }} />
                        ) : (
                          <IconVideoInActive style={{ color: ele.userId === fbHostId ? "#959595" : "" }} />
                        )}
                        {
                          isHost && (ele.userId !== getCurrentUserId()) &&
                          <div className="tooltip_black left flex full">
                            {isVideoMuted(ele?.stageParticipantId) ? "You can't turn on someone's Camera" :
                              <>Turn Off <span title={ele.userName === "" ? ele.userEmail.split("@")[0] : ele.userName}
                                className="text_controler"> {ele.userName === "" ?
                                  ele.userEmail.split("@")[0] : ele.userName}</span>'s Camera</>
                            }
                          </div>
                        }
                      </button>
                      <button
                        style={{
                          cursor: (isHost && userEmailLocal !== ele.userEmail) && (ele.userId !== getCurrentUserId()) &&
                            !isAudioMuted(ele?.stageParticipantId) ? " pointer " : " default "
                        }}
                        className={`${(isHost && (ele.userId !== getCurrentUserId()))
                          ? " hover_btn " : ""} call_action_button tooltip_black_wraper relative ${!isAudioMuted(ele?.stageParticipantId)
                            ? " active " : " inactive "
                          }`}
                        onClick={() => {
                          isHost && (ele.userId !== getCurrentUserId()) &&
                            !isAudioMuted(ele?.stageParticipantId) && handleAudioMute(true, ele);
                        }}

                        type="button"
                      >
                        {!isAudioMuted(ele?.stageParticipantId) ? (
                          <IconMicActive style={{ color: ele.userId === fbHostId ? "#959595" : "" }} />
                        ) : (
                          <IconMicInActive style={{ color: ele.userId === fbHostId ? "#959595" : "" }} />
                        )}
                        {
                          isHost && (ele.userId !== getCurrentUserId()) &&
                          <div className="tooltip_black left flex full">
                            {isAudioMuted(ele?.stageParticipantId) ? "You can't unmute someone's Mic" :
                              <>Mute <span title={ele.userName === "" ? ele.userEmail.split("@")[0] : ele.userName}
                                className="text_controler"> {ele.userName === "" ? ele.userEmail.split("@")[0] : ele.userName}</span>'s Mic</>
                            }
                          </div>
                        }
                      </button>
                      {isHost && <button
                        style={{
                          cursor: isHost && userEmailLocal !== ele.userEmail ? " pointer " : " default ",
                          visibility: isHost && (ele.userId !== getCurrentUserId()) ? "visible" : "hidden"
                        }}
                        title="Remove"
                        className={`call_action_remove`}
                        onClick={(isHost && ele.isHost) !== 0 ? () => _handleRemoveParticipant(ele) : () => { }}
                        type="button"
                      >
                        <IconX />
                      </button>}
                    </div>
                  </div>
                }              </React.Fragment>
            );
          })}
        </div>
        {(filterMembersNotJoined(participantList)?.length > 0 || participantList.filter(ele => !ele.userId)?.length > 0) &&
          <div className="invited_participants">
            <div className="invited_participants_inner">
              <div className="invited_participants_head">
                <h4>Invited Participants</h4>
              </div>
              <div className="participants_list">
                {
                  filterMembersNotJoined(participantList).map((ele) => {
                    return (
                      <React.Fragment key={ele.userId}>
                        <div id={`Unjoined-Id-${ele?.userEmail}`} className="participants_list_info">
                          <div className="participant_info">
                            {ele?.userName ?
                              <>
                                <span
                                  data-email={ele.userEmail}
                                  style={{
                                    background:
                                      ele?.userId !== null
                                        ? getColorCodeInitials(ele.userEmail)
                                        : "transparent",
                                  }}
                                  className="initial relative"
                                >
                                  {ele.userId === fbHostId ? <div className="icon_crown"><IconCrown /></div> : null}
                                  {getInitials(nameSplit(ele.userName, ele.userEmail))}
                                </span>
                              </>
                              :
                              <CommonImageTag
                                style={{ width: "32px", height: "32px" }}
                                src={Imgplaceholder}
                                name={ele?.userEmail}
                                className="img"
                                placeholder={Imgplaceholder}
                              />
                            }
                            <strong title={ele.userName === ""
                              ? ele.userEmail.split("@")[0]
                              : ele.userName}
                              className="">{ele?.userName ? ele?.userName : ele?.userEmail}</strong>
                          </div>
                          <div className="call_actions">
                            <span className={`status ${ele?.userId ? "not_joined" : "joined"} `}>{ele?.userId ? "Yet to join" : "invited"}</span>
                            {isHost && (ele.isHost !== 0 || ele.isHost === 0) ? <button
                              style={{ visibility: isHost && ele.isHost !== 0 ? "visible" : "hidden" }}
                              title="Remove"
                              className={`call_action_remove`}
                              onClick={(isHost && ele.isHost) !== 0 ? () => _handleRemoveParticipant(ele) : () => { }}
                              type="button"
                            >
                              <IconX />
                            </button> : null
                            }
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })
                }
                {
                  participantList.filter(ele => !ele.userId).map((ele) => {
                    return (
                      <React.Fragment key={ele.userId}>
                        <div id={`Unjoined-Id-${ele?.userEmail}`} className="participants_list_info">
                          <div className="participant_info">
                            {ele?.userName ?
                              <>
                                <span
                                  data-email={ele.userEmail}
                                  style={{
                                    background:
                                      ele?.userId !== null
                                        ? getColorCodeInitials(ele.userEmail)
                                        : "transparent",
                                  }}
                                  className="initial relative"
                                >
                                  {ele.userId === fbHostId ? <div className="icon_crown"><IconCrown /></div> : null}
                                  {getInitials(nameSplit(ele.userName, ele.userEmail))}
                                </span>
                              </>
                              :
                              <CommonImageTag
                                style={{ width: "32px", height: "32px" }}
                                src={Imgplaceholder}
                                name={ele?.userEmail}
                                className="img"
                                placeholder={Imgplaceholder}
                              />
                            }
                            <strong title={ele?.userName ? ele?.userName : ele?.userEmail}
                              className="">{ele?.userName ? ele?.userName : ele?.userEmail}</strong>
                          </div>
                          <div className="call_actions">
                            <span className={`status ${ele?.userId ? "not_joined" : "joined"} `}>{ele?.userId ? "Yet to join" : "invited"}</span>
                            {isHost && (ele.isHost !== 0 || ele.isHost === 0) ? <button
                              style={{ visibility: isHost && ele.isHost !== 0 ? "visible" : "hidden" }}
                              title="Remove"
                              className={`call_action_remove`}
                              onClick={(isHost && ele.isHost) !== 0 ? () => _handleRemoveParticipant(ele) : () => { }}
                              type="button"
                            >
                              <IconX />
                            </button> : null
                            }
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })
                }

              </div>
            </div>
          </div>
        }
      </div>
      {getDeletepopup ? (
        <Modal>
          <ActionPopup
            iconComponentClass="icon_custom_size"
            iconComponent={<IconRemoveUser />}
            title="Remove Participant?"
            description={
              <>
                Are you sure you want to remove <strong> "{getUserName}" </strong>{" "}
                from {fbHlsLink ? "the Live stream?" : "the Broadcast?"}
              </>
            }
            setActive={true}
            onExited={() => _handleOnOutsideClick(false)}
            actionButtonText="Remove"
            cancelButtonText="Cancel"
            handleClose={() => _handleOnOutsideClick(false)}
            handleAction={() => _handleRemoveAction()}
          />
        </Modal>
      ) : null}
      {getAudioMute ? (
        <Modal>
          <ActionPopup
            iconComponent={<IconMicInActive />}
            title="Mute Mic?"
            description={
              <> Mute <strong> "{getUserName}" </strong>{" "} for everyone in the call? Only {getUserName} can unmute themselves.</>
            }
            setActive={true}
            onExited={() => handleAudioMute(false)}
            actionButtonText="Mute"
            cancelButtonText="Cancel"
            handleClose={() => setAudioMute(false)}
            handleAction={() => handleModerationAction("audio")}
          />
        </Modal>
      ) : null}
      {getVideoMute ? (
        <Modal>
          <ActionPopup
            iconComponent={<IconVideoInActive />}
            title="Turn Off Camera?"
            description={
              <>
                Turn Off <strong> "{getUserName}" </strong>{" "} Camera for everyone in the live? Only {getUserName} can turn on themselves.
              </>
            }
            setActive={true}
            onExited={() => handleVideoMute(false)}
            actionButtonText="Turn Off"
            cancelButtonText="Cancel"
            handleClose={() => setVideoMute(false)}
            handleAction={() => handleModerationAction("video")}
          />
        </Modal>
      ) : null}
      {getScreenShare ? (
        <Modal>
          <ActionPopup
            iconComponent={<IconStopScreenShare />}
            title="Stop Screen Share?"
            description={
              <>
                Stop <strong> "{getUserName}" </strong>{" "} screen share for everyone in the {fbHlsLink ? "Live stream?" : "Broadcast?"}
              </>
            }
            setActive={true}
            onExited={() => setScreenShare(false)}
            actionButtonText="Stop"
            cancelButtonText="Cancel"
            handleClose={() => setScreenShare(false)}
            handleAction={() => handleModerationAction("screenShare")}
          />
        </Modal>
      ) : null}
    </>
  );
}

export default ParticipantsList;
