import { firebaseRealtimeDb } from "./config";
import { onValue, ref, set, off } from "firebase/database";
import { destructStage, destructStageId } from "../common/helper";
import store from "../store";
import { updateBranding, updateLogo } from "../store/action/awsActions";
import { currentStageArrn, getCurrentUserId } from "../helper/utility";

export const writeUserData = (orgId, stageArn, brandData) => {
  set(
    ref(
      firebaseRealtimeDb,
      `/${orgId}/${destructStageId(destructStage(stageArn))}/brandData`
    ),
    brandData
  );
};

export const updateLayoutData = (orgId, stageArn, layout) => {
  console.log(layout, "updateLayoutData");
  set(
    ref(
      firebaseRealtimeDb,
      `/${orgId}/${destructStageId(destructStage(stageArn))}/brandData/layout`
    ),
    layout
  );
};

export const updateBannerText = (orgId, stageArn, bannerText) => {
  console.log("updatetext---", orgId, stageArn, bannerText);
  set(
    ref(
      firebaseRealtimeDb,
      `/${orgId}/${destructStageId(
        destructStage(stageArn)
      )}/brandData/bannerText`
    ),
    bannerText
  );
};
export const updateBannerBackground = (orgId, stageArn, bannerBackground) => {
  console.log("updateBannerBackground---", orgId, stageArn, bannerBackground);
  set(
    ref(
      firebaseRealtimeDb,
      `/${orgId}/${destructStageId(
        destructStage(stageArn)
      )}/brandData/bannerBackground`
    ),
    bannerBackground
  );
};
export const updateParticipantList = (orgId, stageArn, removeStatus) => {
  console.log("updateParticipantList---", orgId, stageArn, removeStatus);
  set(
    ref(
      firebaseRealtimeDb,
      `/${orgId}/${destructStageId(
        destructStage(stageArn)
      )}/brandData/removeParticipant`
    ),
    removeStatus
  );
};
export const updateBannerTopOverlay = (orgId, stageArn, bannerTopOverlay) => {
  console.log("updateBannerTopOverlay---", orgId, stageArn, bannerTopOverlay);
  set(
    ref(
      firebaseRealtimeDb,
      `/${orgId}/${destructStageId(
        destructStage(stageArn)
      )}/brandData/bannerTopOverlay`
    ),
    bannerTopOverlay
  );
};
export const updateBannerBgColor = (orgId, stageArn, bannerBgColor) => {
  console.log("updateBannerBgColor---", orgId, stageArn, bannerBgColor);
  set(
    ref(
      firebaseRealtimeDb,
      `/${orgId}/${destructStageId(
        destructStage(stageArn)
      )}/brandData/bannerBgColor`
    ),
    bannerBgColor
  );
};

export const updateBannerTextColor = (orgId, stageArn, bannerTextColor) => {
  console.log("updateBannerBgColor---", orgId, stageArn, bannerTextColor);
  set(
    ref(
      firebaseRealtimeDb,
      `/${orgId}/${destructStageId(
        destructStage(stageArn)
      )}/brandData/bannerTextColor`
    ),
    bannerTextColor
  );
};

export const updateBannerStyle = (orgId, stageArn, bannerStyle) => {
  console.log("updateBannerStyle---", orgId, stageArn, bannerStyle);
  set(
    ref(
      firebaseRealtimeDb,
      `/${orgId}/${destructStageId(
        destructStage(stageArn)
      )}/brandData/bannerStyle`
    ),
    bannerStyle
  );
};

export const updateEnableBanner = (orgId, stageArn, bannerStatus) => {
  set(
    ref(
      firebaseRealtimeDb,
      `/${orgId}/${destructStageId(
        destructStage(stageArn)
      )}/brandData/bannerStatus`
    ),
    bannerStatus
  );
};

export const updateLogoRight = (orgId, stageArn, isLogoRight) => {
  set(
    ref(
      firebaseRealtimeDb,
      `/${orgId}/${destructStageId(
        destructStage(stageArn)
      )}/brandData/isLogoRight`
    ),
    isLogoRight
  );
};

export const updateGoLive = (orgId, stageArn, liveStatus) => {
  set(
    ref(
      firebaseRealtimeDb,
      `/${orgId}/${destructStageId(
        destructStage(stageArn)
      )}/brandData/goliveStatus`
    ),
    liveStatus
  );
};
export const updateWarningTime = (orgId, stageArn, waringStatus) => {
  set(
    ref(
      firebaseRealtimeDb,
      `/${orgId}/${destructStageId(
        destructStage(stageArn)
      )}/brandData/callWaringTime`
    ),
    waringStatus
  );
};
export const updateEndTime = (orgId, stageArn, callEndStatus) => {
  set(
    ref(
      firebaseRealtimeDb,
      `/${orgId}/${destructStageId(
        destructStage(stageArn)
      )}/brandData/callEndTime`
    ),
    callEndStatus
  );
};
export const updateCallStartTime = (orgId, stageArn, callStartTime) => {
  set(
    ref(
      firebaseRealtimeDb,
      `/${orgId}/${destructStageId(
        destructStage(stageArn)
      )}/brandData/callStartTime`
    ),
    callStartTime
  );
};

export const updateHlsLink = (orgId, stageArn, hlsLink) => {
  set(
    ref(
      firebaseRealtimeDb,
      `/${orgId}/${destructStageId(destructStage(stageArn))}/brandData/hlsLink`
    ),
    hlsLink
  );
};

export const updateLogoUrlData = (orgId, stageArn, Url) => {
  console.log(orgId, stageArn, Url, "updateLogoUrlData");
  set(
    ref(
      firebaseRealtimeDb,
      `/${orgId}/${destructStageId(destructStage(stageArn))}/brandData/logoUrl`
    ),
    Url
  );
  set(
    ref(
      firebaseRealtimeDb,
      `/${orgId}/${destructStageId(
        destructStage(stageArn)
      )}/brandData/initialLogo`
    ),
    false
  );
};

export const handleUploadImageDimensions = (
  orgId,
  stageArn,
  getFinalWidth,
  getFinalHeight
) => {
  console.log(
    orgId,
    stageArn,
    getFinalWidth,
    getFinalHeight,
    "handleUploadImageDimensions"
  );
  const logoDim = [getFinalWidth, getFinalHeight];
  set(
    ref(
      firebaseRealtimeDb,
      `/${orgId}/${destructStageId(
        destructStage(stageArn)
      )}/brandData/logoDimension`
    ),
    logoDim
  );
};

export const fbLiveListener = (orgId, stageArn) => {
  console.log(stageArn, "fbLiveListener---2");
  const starCountRef = ref(
    firebaseRealtimeDb,
    `/${orgId}/${destructStageId(destructStage(stageArn))}/brandData`
  );
  onValue(starCountRef, (snapshot) => {
    const logoUrl = snapshot.val()?.logoUrl || "";
    const brandData = snapshot.val();
    store.dispatch(updateLogo(logoUrl));
    console.log(brandData, "brandDatabrandData");
    store.dispatch(updateBranding(brandData));
  });
};

export const unsubscribeStage = (orgId, stageArn) => {
  console.log(orgId, stageArn, "unsubscribeStage");
  const stopCountRef = ref(
    firebaseRealtimeDb,
    `/${orgId}/${destructStageId(destructStage(stageArn))}/brandData`
  );
  off(stopCountRef);
};

export const updateMembersDetails = (orgId, stageArn, membersData) => {
  if (stageArn) {
    set(
      ref(
        firebaseRealtimeDb,
        `/${orgId}/${destructStageId(
          destructStage(stageArn)
        )}/brandData/membersData`
      ),
      membersData
    );
  }
};

export const updateParticipantPostion = (
  orgId,
  stageArn,
  postion,
  type,
  userId
) => {
  if (postion > -1) {
    if (stageArn) {
      if (type === "ordering" && userId) {
        set(
          ref(
            firebaseRealtimeDb,
            `/${orgId}/${destructStageId(
              destructStage(stageArn)
            )}/brandData/postion${postion > 3 ? 3 : postion}`
          ),
          userId
        );
      } else {
        set(
          ref(
            firebaseRealtimeDb,
            `/${orgId}/${destructStageId(
              destructStage(stageArn)
            )}/brandData/postion${postion > 3 ? 3 : postion}`
          ),
          getCurrentUserId()
        );
      }
    }
  }
};

export const updateParticipantCount = (orgId, stageArn, participantCount) => {
  if (participantCount > -1) {
    if (stageArn) {
      set(
        ref(
          firebaseRealtimeDb,
          `/${orgId}/${destructStageId(
            destructStage(stageArn)
          )}/brandData/participantCount/`
        ),
        parseInt(participantCount) > 3 ? 3 : parseInt(participantCount)
      );
    }
  }
};

export const updateVideoMutedParticipants = (
  orgId,
  stageArn,
  participantArray
) => {
  if (stageArn) {
    set(
      ref(
        firebaseRealtimeDb,
        `/${orgId}/${destructStageId(
          destructStage(stageArn)
        )}/brandData/videoMutedParticipants/`
      ),
      participantArray
    );
  }
};

export const updateAudioMutedParticipants = (
  orgId,
  stageArn,
  participantArray
) => {
  if (stageArn) {
    set(
      ref(
        firebaseRealtimeDb,
        `/${orgId}/${destructStageId(
          destructStage(stageArn)
        )}/brandData/audioMutedParticipants/`
      ),
      participantArray
    );
  }
};

export const updateSessionMember = (orgId, participantCount) => {
  const stageArn = currentStageArrn(store.getState()?.awsStageReducer);
  console.log(orgId, stageArn, participantCount, "updateSessionMember---updateSessionMember");
  set(
    ref(
      firebaseRealtimeDb,
      `/${orgId}/${destructStageId(
        destructStage(stageArn)
      )}/brandData/sessionMemberCount/`
    ),
    participantCount
  );
};

export const updateScreenShare = (orgId, isScreenShare) => {
  const stageArn = currentStageArrn(store.getState()?.awsStageReducer);
  set(
    ref(
      firebaseRealtimeDb,
      `/${orgId}/${destructStageId(
        destructStage(stageArn)
      )}/brandData/isScreenShare/`
    ),
    isScreenShare
  );
};
