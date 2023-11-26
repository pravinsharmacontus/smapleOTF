import { BANNER_DEFAULT } from "../constant";
import { BROADCAST_RESOLUTION } from "../helper/ApiUrl";
import {
  currentStageArrn,
  getCurrentOrgId,
  getCurrentUserId,
  isHostJoined,
} from "../helper/utility";
import store from "../store";
import {
  updateParticipantCount,
  updateParticipantPostion,
  writeUserData,
} from "./firebaseRealtimeFunctions";

export const initializeFirebaseRealDb = (sessionData, inviteParticipants) => {
  const { host = {} } = inviteParticipants;
  const brandData = {
    bannerText: BANNER_DEFAULT,
    brandColor: sessionData?.brandColor,
    embeddedTag: sessionData?.embeddedTag,
    logoUrl: sessionData?.logoUrl,
    sessionName: sessionData?.sessionName,
    stageArn: sessionData?.stageArn,
    initialLogo: true,
    host: host?.userId,
    membersData: "",
    layout: "layout1",
    goliveStatus: "",
    hlsLink: "",
    bannerStatus: false,
    participantCount: 0,
    postion1: -1,
    postion2: -1,
    postion3: -1,
    bannerStyle: 0,
    bannerBgColor: "#FF0935",
    bannerBackground: 0,
    bannerTopOverlay: 0,
    logoDimension: BROADCAST_RESOLUTION === "BASIC_LANDSCAPE" ? [185 , 59] : [246.6 , 78.6],
    bannerTextColor: true,
    callWaringTime: false,
    callEndTime: false,
    callStartTime: 0,
    removeParticipant: 0,
    videoMutedParticipants: [],
    audioMutedParticipants: [],
    isLogoRight: false,
    sessionMemberCount: sessionData?.participantIds?.length,
    isScreenShare: false
  };
  writeUserData(sessionData?.orgId, sessionData?.stageArn, brandData);
};

export const handleCrashOrdering = (removedParticipan) => {
  const participants = store.dispatch()?.stageParticipants; //store
  const broadcastBranding = store.dispatch()?.broadcastBranding;
  const removedParticipanId = parseInt(removedParticipan?.userId);
  const postioningOrder = [
    broadcastBranding?.postion1,
    broadcastBranding?.postion2,
    broadcastBranding?.postion3,
  ];
  const awsStageReducer = store.dispatch()?.awsStageReducer;
  const isHost = getCurrentUserId() === broadcastBranding?.host;
  const fbParticipantCount = broadcastBranding?.participantCount || 0;
  const removedParticipantPosition = postioningOrder?.findIndex(
    (ele) => ele === removedParticipanId
  );
  const currentParticipantPosition = postioningOrder?.findIndex(
    (ele) => ele === getCurrentUserId()
  );

  if (removedParticipantPosition > -1) {
    switch (removedParticipantPosition) {
      case 0:
        if (
          isHost ||
          (!isHostJoined(participants, broadcastBranding?.host.toString()) &&
            currentParticipantPosition === 1)
        ) {
          updateParticipantCount(
            getCurrentOrgId(),
            currentStageArrn(awsStageReducer),
            fbParticipantCount - 1
          );
          updateParticipantPostion(
            getCurrentOrgId(),
            currentStageArrn(awsStageReducer),
            1,
            "ordering",
            postioningOrder[1]
          );
          updateParticipantPostion(
            getCurrentOrgId(),
            currentStageArrn(awsStageReducer),
            2,
            "ordering",
            postioningOrder[2]
          );
          updateParticipantPostion(
            getCurrentOrgId(),
            currentStageArrn(awsStageReducer),
            3,
            "ordering",
            -1
          );
        }
        break;
      case 1:
        if (
          isHost ||
          (!isHostJoined(participants, broadcastBranding?.host.toString()) &&
            currentParticipantPosition === 0)
        ) {
          updateParticipantCount(
            getCurrentOrgId(),
            currentStageArrn(awsStageReducer),
            fbParticipantCount - 1
          );
          updateParticipantPostion(
            getCurrentOrgId(),
            currentStageArrn(awsStageReducer),
            2,
            "ordering",
            postioningOrder[2]
          );
          updateParticipantPostion(
            getCurrentOrgId(),
            currentStageArrn(awsStageReducer),
            3,
            "ordering",
            -1
          );
        }
        break;
      case 2:
        if (
          isHost ||
          (!isHostJoined(participants, broadcastBranding?.host.toString()) &&
            currentParticipantPosition === 1)
        ) {
          updateParticipantCount(
            getCurrentOrgId(),
            currentStageArrn(awsStageReducer),
            fbParticipantCount - 1
          );
          updateParticipantPostion(
            getCurrentOrgId(),
            currentStageArrn(awsStageReducer),
            3,
            "ordering",
            -1
          );
        }
        break;
      default:
      // code block
    }
  }
};

export const orderMyself = () => {
  const broadcastBranding = store.dispatch()?.broadcastBranding;
  console.log(broadcastBranding, "broadcastBrandingbroadcastBranding");
  const postioningOrder = [
    broadcastBranding?.postion1,
    broadcastBranding?.postion2,
    broadcastBranding?.postion3,
  ];
  const fbParticipantCount = broadcastBranding?.participantCount || 0;
  const awsStageReducer = store.dispatch()?.awsStageReducer;
  const currentParticipantPosition = postioningOrder?.findIndex(
    (ele) => ele === getCurrentUserId()
  );
  if (currentParticipantPosition < 0) {
    updateParticipantCount(
      getCurrentOrgId(),
      currentStageArrn(awsStageReducer),
      fbParticipantCount + 1
    );
    updateParticipantPostion(
      getCurrentOrgId(),
      currentStageArrn(awsStageReducer),
      fbParticipantCount + 1
    );
  }
};
