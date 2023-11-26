import {
  addName2,
  profilePic,
  participantName,
  sessionBannerName,
  showLogo,
  showBg,
  showOverlayBg,
  screeShareBg,
  testOut,
  checkBg,
} from "../helper/AwsDeviceAccess";
import store from "../store";
import { getStream, isMuted } from "../aws/awsHelper";
import { destructStage, destructStageId } from "../common/helper";
import { broadcastPostionsUpdate } from "../store/action/awsActions";
import { endApiBroadcast } from "../services/aswServices";
import { recordTimeDelayAction } from "../store/action/tempAction";
import { positioningHost, positioningMembers } from "../helper/utility";
import { layoutPositionBasic, layoutPositionImageBasic, layoutPositionAdvance, layoutPositionImageAdvance, UpdateBgContrain, test8Participants } from "./BCPositioning";
import { BROADCAST_RESOLUTION } from "../helper/ApiUrl";

const layoutPosition = BROADCAST_RESOLUTION === "BASIC_LANDSCAPE" ? layoutPositionBasic : layoutPositionAdvance
const layoutPositionImage = BROADCAST_RESOLUTION === "BASIC_LANDSCAPE" ? layoutPositionImageBasic : layoutPositionImageAdvance
let broadcastClient;
const orderingParticipants = (parcipants) => {
  const broadcastBranding = store.getState()?.broadcastBranding;
  const fbHostId = broadcastBranding?.host || "";
  const fbPosition1 = broadcastBranding?.postion1 || "";
  const fbPosition2 = broadcastBranding?.postion2 || "";
  const fbPosition3 = broadcastBranding?.postion3 || "";

  let orderedList = parcipants;
  console.log(orderedList, "orderedList---3");
  orderedList = positioningHost(parcipants, true, fbHostId.toString());
  orderedList = positioningMembers(
    orderedList,
    true,
    fbPosition1,
    fbPosition2,
    fbPosition3
  );
  return orderedList;
};

export const updateLiveScreenShare = () => {
  const participants = store.getState()?.stageParticipants;
  const participantsStreamData = store.getState()?.stageParticipantsData;
  const screenShareDate = participantsStreamData[participants?.find(ele => ele?.attributes?.type === "screenShare")?.id]
  const storeScreenShare = store.getState()?.localStreams?.screenShare;
  if (broadcastClient) {
    const inputVideoStream = new MediaStream([
      getStream(screenShareDate, "video"),
    ]);
    // const inputAudioStream = new MediaStream([
    //   getStream(screenShareDate, "audio")
    // ]);
    if (broadcastClient.getAudioInputDevice(`audio-${screenShareDate?.id}`)) {
      broadcastClient.removeAudioInputDevice(`audio-${screenShareDate?.id}`)
    }
    if (storeScreenShare && storeScreenShare?.active && storeScreenShare?.getAudioTracks()[0]) {
      const inputLocalAudioStream = new MediaStream([
        storeScreenShare?.getAudioTracks()[0]
      ]);
      try {
        broadcastClient.addAudioInputDevice(
          inputLocalAudioStream,
          `audio-${screenShareDate?.id}`)
      } catch (e) {
        console.log(e, "erroe on audio")
      }
    }
    const constrains = {
      index: 6,
    };
    broadcastClient.addImageSource(
      screeShareBg(),
      `screenShareBg-${screenShareDate?.id}`,
      {
        index: 6, x: 0, y: 0
      }
    );
    broadcastClient.addVideoInputDevice(
      inputVideoStream,
      `video-${screenShareDate?.id}`,
      constrains
    );
  }
}

export const tryHigherUser = (participants, layout) => {
  broadcastClient.addImageSource(
    checkBg(),
    `checkBg1`,
    {
      index: 1, x: 0, y: 0
    }
  );

  const participantsStreamData = store.getState()?.stageParticipantsData;
  // if (layout === "layout1") {
  //   test8Participants.map((elements, ind) => {
  //     participants.map((ele) => {
  //       const inputVideoStream = new MediaStream([
  //         getStream(participantsStreamData[ele?.id], "video"),
  //       ]);
  //       const inputAudioStream = new MediaStream([
  //         getStream(participantsStreamData[ele?.id], "audio"),
  //       ]);

  //       broadcastClient.addVideoInputDevice(
  //         inputVideoStream,
  //         `video-${ele?.id}-${ind}`,
  //         elements
  //       );
  //       broadcastClient.addAudioInputDevice(
  //         inputAudioStream,
  //         `audio-${ele?.id}-${ind}`
  //       );
  //     });
  //   })
  // } else {
  test8Participants.map((elements, ind) => {
    const participantFIlterted = participants[ind % participants.length];
    const inputVideoStream = new MediaStream([
      getStream(participantsStreamData[participantFIlterted?.id], "video"),
    ]);
    const inputAudioStream = new MediaStream([
      getStream(participantsStreamData[participantFIlterted?.id], "audio"),
    ]);
    console.log(participantFIlterted?.id, "participantFIlterted")
    broadcastClient.addVideoInputDevice(
      inputVideoStream,
      `video-${participantFIlterted?.id}-${ind}`,
      elements
    );
    broadcastClient.addAudioInputDevice(
      inputAudioStream,
      `audio-${participantFIlterted?.id}-${ind}`
    );
  });
  // }

}

export const initialBroadCast = async (
  getlayout,
  broadcastKey,
  currentParticipant,
  fbBannerStatus,
  fbBannerText,
  fbBannerStyle,
  fbBannerBgColor,
  isEight = true
) => {
  const broadcastBranding = store?.getState()?.broadcastBranding || [];
  const fbLayout = broadcastBranding?.layout || "";
  const layout = getlayout === "layout-share" ? fbLayout : getlayout;
  const {
    channel: { ingestEndpoint = "" },
    streamKey: { streamKey = "" },
  } = broadcastKey;
  broadcastClient = IVSBroadcastClient.create({
    // Enter the desired stream configuration
    streamConfig: BROADCAST_RESOLUTION === "BASIC_LANDSCAPE" ? IVSBroadcastClient.BASIC_LANDSCAPE : IVSBroadcastClient.STANDARD_LANDSCAPE,
    // Enter the ingest endpoint from the AWS console or CreateChannel API
    ingestEndpoint: ingestEndpoint,
    // "rtmps://3f1ac6d7e5bc.global-contribute.live-video.net:443/app/",
  });

  console.log(broadcastClient, "broadcast---Objs");
  broadcastClient
    .startBroadcast(streamKey)
    .then((result) => {
      console.log("I am successfully broadcasting!");
      setTimeout(() => {
        store.dispatch(recordTimeDelayAction("Broadcasted"));
      }, 3000);
    })
    .catch((error) => {
      console.error("Something drastically failed while broadcasting!", error);
    });
  const participants = currentParticipant.filter(ele => ele?.attributes?.type !== "screenShare");
  const participantsStreamData = store.getState()?.stageParticipantsData;
  const broadcastLogo = store.getState()?.broadcastLogo;
  const awsStageReducer = store.getState()?.awsStageReducer;
  const logo = showLogo(broadcastLogo);
  const awsStageArn = awsStageReducer?.stageArn || awsStageReducer?.stage?.arn;
  const initLogoDimension = broadcastBranding?.logoDimension;
  const isLogoRight = broadcastBranding?.isLogoRight;
  const bannerBackground = broadcastBranding?.bannerBackground;
  const bannerTopOverlay = broadcastBranding?.bannerTopOverlay;
  const bannerBg = showBg(bannerBackground);
  const overlayBg = showOverlayBg(bannerTopOverlay);
  console.log("overlay", overlayBg);

  const bannerOverlayConstrains = {
    index: 7,
    x: 0,
    y: 0,
  };
  console.log(initLogoDimension, initLogoDimension, "isLogoRight");
  const logoConstrains = {
    index: 7,
    x: isLogoRight ? 830 - initLogoDimension[0] : 52,
    y: 25,
    width: initLogoDimension ? initLogoDimension[0] : 370,
    height: initLogoDimension ? initLogoDimension[1] : 118,
  };

  if (logo) {
    broadcastClient.addImageSource(
      logo,
      `logo-${destructStageId(destructStage(awsStageArn))}`,
      logoConstrains
    );
  }

  if (overlayBg) {
    broadcastClient.addImageSource(
      overlayBg,
      `BannerOverlayImg-${destructStageId(destructStage(awsStageArn))}`,
      bannerOverlayConstrains
    );
  }

  if (bannerBg) {
    broadcastClient.addImageSource(
      bannerBg,
      `BannerBg-${destructStageId(destructStage(awsStageArn))}`, UpdateBgContrain,
    );
  }
  getlayout === "layout-share" && updateLiveScreenShare();
  switch (layout) {
    case "layout1":
      if (isEight) {
        tryHigherUser(participants, "layout1");
        return;
      }
      participants.map((ele, ind) => {
        const inputVideoStream = new MediaStream([
          getStream(participantsStreamData[ele?.id], "video"),
        ]);
        const inputAudioStream = new MediaStream([
          getStream(participantsStreamData[ele?.id], "audio"),
        ]);
        console.log(inputAudioStream, "screenShareDatescreenShareDate----1")

        const constrains = {
          index: 4,
        };
        broadcastClient.addVideoInputDevice(
          inputVideoStream,
          `video-${ele?.id}`,
          constrains
        );
        if (ele?.videoStopped) {
          const profilePiclayoutOne = profilePic();
          if (profilePiclayoutOne) {
            broadcastClient.addImageSource(
              profilePiclayoutOne,
              `image-${ele?.id}`,
              { index: 5 }
            );
            console.log("profilepic>>>Added");
          }
        }
        if (!fbBannerStatus) {
          try {
            broadcastClient.addImageSource(
              participantName(ele?.id, ind),
              `DisplayName-${ele?.id}`,
              {
                index: 5,
              }
            );
          } catch (err) {
            console.log("displayName>>", err)
          }
        }
        fbBannerStatus &&
          broadcastClient.addImageSource(
            sessionBannerName(fbBannerText, fbBannerStyle, fbBannerBgColor),
            `Banner-${destructStageId(destructStage(awsStageArn))}`,
            {
              index: 7,
            }
          );

        broadcastClient.addAudioInputDevice(
          inputAudioStream,
          `audio-${ele?.id}`
        );
      });
      break;
    case "layout2":
      if (isEight) {
        tryHigherUser(participants, "layout2");
        return;
      }

      // eslint-disable-next-line no-case-declarations
      console.log(orderingParticipants(participants), "layout2");
      orderingParticipants(participants).map((ele, ind) => {
        const inputVideoStream = new MediaStream([
          getStream(participantsStreamData[ele?.id], "video"),
        ]);
        const inputAudioStream = new MediaStream([
          getStream(participantsStreamData[ele?.id], "audio"),
        ]);
        if (ele?.videoStopped) {
          const profilePiclayoutOne = profilePic();
          if (profilePiclayoutOne) {
            broadcastClient.addImageSource(
              profilePiclayoutOne,
              `image-${ele?.id}`,
              { ...layoutPositionImage[participants.length][ind] }
            );
          }
        }
        broadcastClient.addVideoInputDevice(
          inputVideoStream,
          `video-${ele?.id}`,
          { ...layoutPosition[participants.length][ind] }
        );
        !fbBannerStatus &&
          broadcastClient.addImageSource(
            addName2(ele?.id, ind, participants.length),
            `DisplayName-${ele?.id}`,
            {
              index: 3,
            }
          );
        broadcastClient.addAudioInputDevice(
          inputAudioStream,
          `audio-${ele?.id}`
        );
      });
      fbBannerStatus &&
        broadcastClient.addImageSource(
          sessionBannerName(fbBannerText, fbBannerStyle, fbBannerBgColor),
          `Banner-${destructStageId(destructStage(awsStageArn))}`,
          {
            index: 7,
          }
        );
      break;
    case "layout3":
      return "";
    default:
    // code block
  }
  store.dispatch(
    broadcastPostionsUpdate({
      layout: layout,
      participantsList: currentParticipant,
    })
  );
};
export const handleParticipantRemoved = (removedParticipant) => {
  if (broadcastClient) {
    const participantsStreamData = store.getState()?.stageParticipantsData;
    const participantsInStage = store
      .getState()
      ?.stageParticipants.filter((ele) => ele?.id !== removedParticipant?.id);
    const config = {
      index: 2,
    };
    const broadcastBranding = store?.getState()?.broadcastBranding || [];
    const positionParticipant = orderingParticipants(participantsInStage).map(
      (ele, ind) => {
        return { ...ele, position: ind };
      }
    );
    const fbBannerText = broadcastBranding?.bannerText || "";
    const fbBannerStyle = broadcastBranding?.bannerStyle || "";
    const fbBannerBgColor = broadcastBranding?.bannerBgColor || "";
    const fbBannerStatus = broadcastBranding?.bannerStatus || "";
    const awsStageReducer = store.getState()?.awsStageReducer || "";
    const awsStageArn =
      awsStageReducer?.stageArn || awsStageReducer?.stage?.arn;
    setTimeout(() => {
      if (removedParticipant?.attributes?.type === "screenShare") {
        try {
          broadcastClient?.removeImage(`screenShareBg-${removedParticipant?.id}`);
        } catch (err) {
          console.log("awsIvs>>>", err);
        }
        broadcastClient.removeVideoInputDevice(
          `video-${removedParticipant?.id}`
        );
        if (broadcastClient.getAudioInputDevice(`audio-${removedParticipant?.id}`)) {
          broadcastClient.removeAudioInputDevice(
            `audio-${removedParticipant?.id}`
          );
        }
        return;
      }
      try {
        broadcastClient?.removeImage(`image-${removedParticipant?.id}`);
      } catch (err) {
        console.log("awsIvs>>>", err);
      }
      if (!fbBannerStatus) {
        broadcastClient?.removeImage(`DisplayName-${removedParticipant?.id}`);
      }
      if (
        broadcastClient.getVideoInputDevice(`video-${removedParticipant?.id}`)
      )
        broadcastClient.removeVideoInputDevice(
          `video-${removedParticipant?.id}`
        );
      if (
        broadcastClient.getAudioInputDevice(`audio-${removedParticipant?.id}`)
      )
        broadcastClient.removeAudioInputDevice(
          `audio-${removedParticipant?.id}`
        );
      if (participantsInStage.length && participantsInStage.length < 2) {
        if (!fbBannerStatus) {
          broadcastClient?.removeImage(
            `DisplayName-${participantsInStage[0]?.id}`
          );
        }
        if (
          broadcastClient.getVideoInputDevice(
            `video-${participantsInStage[0]?.id}`
          )
        ) {
          if (
            isMuted(participantsStreamData[participantsInStage[0]?.id], "video")
          ) {
            broadcastClient?.removeImage(`image-${participantsInStage[0]?.id}`);
            const profilePiclayoutOne = profilePic();
            if (profilePiclayoutOne) {
              broadcastClient.addImageSource(
                profilePiclayoutOne,
                `image-${participantsInStage[0]?.id}`,
                { index: 5 }
              );
            }
          }
          broadcastClient.updateVideoDeviceComposition(
            `video-${participantsInStage[0]?.id}`,
            config
          );
          !fbBannerStatus &&
            broadcastClient.addImageSource(
              participantName(participantsInStage[0]?.id),
              `DisplayName-${participantsInStage[0]?.id}`,
              { index: 3 }
            );
        }
        fbBannerStatus &&
          broadcastClient.addImageSource(
            sessionBannerName(fbBannerText, fbBannerStyle, fbBannerBgColor),
            `Banner-${destructStageId(destructStage(awsStageArn))}`,
            {
              index: 7,
            }
          );
        if (isMuted(participantsStreamData[participantsInStage[0]?.id])) {
          broadcastClient?.removeImage(`image-${participantsInStage[0]?.id}`);
          const profilePiclayoutOne = profilePic();
          if (profilePiclayoutOne) {
            broadcastClient.addImageSource(
              profilePiclayoutOne,
              `image-${participantsInStage[0]?.id}`,
              { index: 5 }
            );
          }
        }
        store.dispatch(
          broadcastPostionsUpdate({
            layout: "layout1",
            participantsList: positionParticipant,
          })
        );
      } else if (participantsInStage.length > 1) {
        orderingParticipants(participantsInStage).map((ele, ind) => {
          if (!fbBannerStatus) {
            broadcastClient?.removeImage(`DisplayName-${ele?.id}`);
          }
          if (ele?.videoStopped) {
            broadcastClient?.removeImage(`image-${ele?.id}`);
            const profilePiclayoutOne = profilePic();
            if (profilePiclayoutOne) {
              broadcastClient.addImageSource(
                profilePiclayoutOne,
                `image-${ele?.id}`,
                { ...layoutPositionImage[participantsInStage.length][ind] }
              );
            }
          }
          if (broadcastClient.getVideoInputDevice(`video-${ele?.id}`)) {
            broadcastClient.updateVideoDeviceComposition(
              `video-${ele?.id}`,
              layoutPosition[participantsInStage.length][ind]
            );
            !fbBannerStatus &&
              broadcastClient.addImageSource(
                addName2(ele?.id, ind, participantsInStage.length),
                `DisplayName-${ele?.id}`,
                { index: 3 }
              );
          }
          fbBannerStatus &&
            broadcastClient.addImageSource(
              sessionBannerName(fbBannerText, fbBannerStyle, fbBannerBgColor),
              `Banner-${destructStageId(destructStage(awsStageArn))}`,
              {
                index: 7,
              }
            );
          store.dispatch(
            broadcastPostionsUpdate({
              layout: "layout2",
              participantsList: positionParticipant,
            })
          );
        });
      }
    }, []);
  }
};

export const muteBroadcastedVideo = (participant, stream) => {
  const stageParticipants = orderingParticipants(
    store.getState()?.stageParticipants
  );
  const broadcastBranding = store?.getState()?.broadcastBranding || [];
  const layout = broadcastBranding?.layout;
  if (stream.isMuted) {
    console.log(stream.isMuted, "muteBroadcastedVideo");
    switch (layout) {
      case "layout1":
        if (broadcastClient.getVideoInputDevice(`video-${participant?.id}`)) {
          const profilePiclayoutOne = profilePic();
          console.log(profilePiclayoutOne);
          if (profilePiclayoutOne) {
            broadcastClient.addImageSource(
              profilePiclayoutOne,
              `image-${participant?.id}`,
              { index: 5 }
            );
            console.log("profilepic>>>Added");
          }
        }
        break;
      case "layout2":
        if (stageParticipants.length < 2) {
          if (broadcastClient.getVideoInputDevice(`video-${participant?.id}`)) {
            const profilePiclayoutOne = profilePic();
            console.log(profilePiclayoutOne);
            if (profilePiclayoutOne) {
              broadcastClient.addImageSource(
                profilePiclayoutOne,
                `image-${participant?.id}`,
                { index: 5 }
              );
              console.log("profilepic>>>Added");
            }
          }
        } else {
          if (broadcastClient.getVideoInputDevice(`video-${participant?.id}`)) {
            const profilePiclayoutOne = profilePic();
            if (profilePiclayoutOne) {
              broadcastClient.addImageSource(
                profilePiclayoutOne,
                `image-${participant?.id}`,
                layoutPositionImage[stageParticipants.length][
                stageParticipants.findIndex(
                  (ele) => ele.id === participant?.id
                )
                ]
              );
            }
          }
        }
        break;
      case "layout3":
        break;
      default:
      // code block
    }
  } else {
    console.log(stream.isMuted, "muteBroadcastedVideo---2");
    broadcastClient?.removeImage(`image-${participant?.id}`);
  }
};

export const handleParticipantMute = (participant, stream) => {
  console.log(stream.isMuted, "muteBroadcastedVideo---0");
  if (broadcastClient) {
    muteBroadcastedVideo(participant, stream);
  }
};

export const handleStreamAddedinBroadcast = (participantData) => {
  if (participantData?.attributes?.type === "screenShare") {
    return;
  }
  if (broadcastClient) {
    const config = layoutPosition[2][0];
    const newConfig = layoutPosition[2][1];
    const stageParticipants = store.getState()?.stageParticipants;
    const prevParticipants = stageParticipants.filter(
      (ele) => ele?.id !== participantData.id
    );
    console.log(prevParticipants, config, "updateVideoDeviceComposition");
    const layout = prevParticipants.length > 0 && `layout2`;
    // const positionParticipant = [
    //   { ...prevParticipants[0], position: 0 },
    //   { ...participantData, position: 1 },
    // ];
    const positionParticipant = orderingParticipants(stageParticipants).map(
      (ele, ind) => {
        return {
          ...ele,
          position: ind,
        };
      }
    );

    const broadcastBranding = store?.getState()?.broadcastBranding || [];
    const fbBannerText = broadcastBranding?.bannerText || "";
    const fbBannerStyle = broadcastBranding?.bannerStyle || "";
    const fbBannerBgColor = broadcastBranding?.bannerBgColor || "";
    const fbBannerStatus = broadcastBranding?.bannerStatus || "";
    const awsStageReducer = store.getState()?.awsStageReducer || "";
    // const participantCount = broadcastBranding?.participantCount || "";

    const awsStageArn =
      awsStageReducer?.stageArn || awsStageReducer?.stage?.arn;

    if (layout === "layout2") {
      if (positionParticipant.length < 3) {
        if (
          broadcastClient.getVideoInputDevice(
            `video-${prevParticipants[0]?.id}`
          )
        ) {
          !fbBannerStatus &&
            broadcastClient?.removeImage(
              `DisplayName-${prevParticipants[0]?.id}`
            );
          if (prevParticipants[0]?.videoStopped) {
            broadcastClient?.removeImage(`image-${prevParticipants[0]?.id}`);
            const profilePiclayoutOne = profilePic();
            if (profilePiclayoutOne) {
              setTimeout(
                () =>
                  broadcastClient.addImageSource(
                    profilePiclayoutOne,
                    `image-${prevParticipants[0]?.id}`,
                    layoutPositionImage[2][0]
                  ),
                []
              );
            }
          }
          broadcastClient.updateVideoDeviceComposition(
            `video-${prevParticipants[0].id}`,
            config
          );
          if (
            !broadcastClient.getVideoInputDevice(`video-${participantData.id}`)
          ) {
            const inputVideoStream = new MediaStream([
              getStream(participantData, "video"),
            ]);
            const inputAudioStream = new MediaStream([
              getStream(participantData, "audio"),
            ]);
            if (participantData.videoStopped) {
              const profilePiclayoutOne = profilePic();
              if (profilePiclayoutOne) {
                broadcastClient.addImageSource(
                  profilePiclayoutOne,
                  `image-${participantData?.id}`,
                  layoutPositionImage[2][1]
                );
              }
            }
            !fbBannerStatus &&
              broadcastClient.addImageSource(
                addName2(participantData?.id, 1, 2),
                `DisplayName-${participantData?.id}`,
                {
                  index: 3,
                }
              );
            console.log(prevParticipants[0], "positionParticipant---0");
            !fbBannerStatus &&
              broadcastClient.addImageSource(
                addName2(prevParticipants[0]?.id, 0, 2),
                `DisplayName-${prevParticipants[0]?.id}`,
                {
                  index: 3,
                }
              );

            broadcastClient.addVideoInputDevice(
              inputVideoStream,
              `video-${participantData.id}`,
              newConfig
            );
            broadcastClient.addAudioInputDevice(
              inputAudioStream,
              `audio-${participantData.id}`
            );
          }
          fbBannerStatus &&
            broadcastClient.addImageSource(
              sessionBannerName(fbBannerText, fbBannerStyle, fbBannerBgColor),
              `Banner-${destructStageId(destructStage(awsStageArn))}`,
              {
                index: 7,
              }
            );
        }
      } else if (positionParticipant.length > 2) {
        positionParticipant.map((ele, ind) => {
          if (broadcastClient.getVideoInputDevice(`video-${ele?.id}`)) {
            !fbBannerStatus &&
              broadcastClient?.removeImage(`DisplayName-${ele?.id}`);
            if (ele.videoStopped) {
              broadcastClient?.removeImage(`image-${ele?.id}`);
              const profilePiclayoutOne = profilePic();
              if (profilePiclayoutOne) {
                broadcastClient.addImageSource(
                  profilePiclayoutOne,
                  `image-${ele?.id}`,
                  layoutPositionImage[positionParticipant.length][ind]
                );
              }
            }
            broadcastClient.updateVideoDeviceComposition(
              `video-${ele.id}`,
              layoutPosition[positionParticipant.length][ind]
            );
            !fbBannerStatus &&
              broadcastClient.addImageSource(
                addName2(ele?.id, ind, positionParticipant.length),
                `DisplayName-${ele?.id}`,
                {
                  index: 3,
                }
              );
          } else {
            const inputVideoStream = new MediaStream([
              getStream(participantData, "video"),
            ]);
            const inputAudioStream = new MediaStream([
              getStream(participantData, "audio"),
            ]);
            if (participantData.videoStopped) {
              const profilePiclayoutOne = profilePic();
              if (profilePiclayoutOne) {
                broadcastClient.addImageSource(
                  profilePiclayoutOne,
                  `image-${participantData?.id}`,
                  layoutPositionImage[positionParticipant.length][ind]
                );
              }
            }
            !fbBannerStatus &&
              broadcastClient.addImageSource(
                addName2(participantData?.id, ind, positionParticipant.length),
                `DisplayName-${participantData?.id}`,
                {
                  index: 3,
                }
              );
            broadcastClient.addVideoInputDevice(
              inputVideoStream,
              `video-${participantData.id}`,
              layoutPosition[positionParticipant.length][ind]
            );
            broadcastClient.addAudioInputDevice(
              inputAudioStream,
              `audio-${participantData.id}`
            );
          }
        });
      }
    } else {
      const inputAudioStream = new MediaStream([
        getStream(participantData, "audio"),
      ]);
      broadcastClient.addAudioInputDevice(
        inputAudioStream,
        `audio-${participantData.id}`
      );
    }
    store.dispatch(
      broadcastPostionsUpdate({
        layout: layout,
        participantsList: positionParticipant,
      })
    );
  }
};

export const updateBroadcastImage = (broadcastLogo, stageArn) => {
  const broadcastBranding = store?.getState()?.broadcastBranding || [];
  const initLogoDimension = broadcastBranding?.logoDimension;
  const isLogoRight = store.getState()?.broadcastBranding?.isLogoRight || false;
  console.log(
    broadcastLogo,
    broadcastClient,
    stageArn,
    initLogoDimension,
    "updateBroadcastImage"
  );
  const updateLogoConstrains = {
    index: 7,
    x: isLogoRight ? 830 - initLogoDimension[0] : 20,
    y: 25,
    width: initLogoDimension ? initLogoDimension[0] : 0,
    height: initLogoDimension ? initLogoDimension[1] : 1,
  };

  if (broadcastClient) {
    const logo = showLogo(broadcastLogo);
    if (logo) {
      try {
        broadcastClient?.removeImage(
          `logo-${destructStageId(destructStage(stageArn))}`
        );
      } catch (exception) {
        console.log(exception, "exception: updateBroadcastImage => removeImage");
      }
      try {
        broadcastClient.addImageSource(
          logo,
          `logo-${destructStageId(destructStage(stageArn))}`,
          updateLogoConstrains
        );
      } catch (exception) {
        console.log(exception, "exception: updateBroadcastImage => addImageSource");
      }
    }
  }
};

export const updateBroadcastLayout = (
  LaytoutType,
  unused,
  fbBannerText,
  fbBannerStatus,
  fbBannerBgColor,
  awsStageReducer
) => {
  const updateConfig = {
    index: 4,
  };
  console.log(
    fbBannerText,
    fbBannerStatus,
    fbBannerBgColor,
    awsStageReducer,
    unused,
    "<<<updateBroadcastLayout"
  );
  const participantsStreamData = store.getState()?.stageParticipantsData;
  const currentParticipant = orderingParticipants(
    store.getState()?.stageParticipants
  );
  if (broadcastClient) {
    switch (LaytoutType) {
      case "layout1":
        if (!fbBannerStatus) {
          broadcastClient?.removeImage(
            `DisplayName-${currentParticipant[0]?.id}`
          );
        }
        if (
          broadcastClient?.getVideoInputDevice(
            `video-${currentParticipant[0]?.id}`
          )
        ) {
          console.log(currentParticipant[0], "currentParticipant---0");
          broadcastClient?.updateVideoDeviceComposition(
            `video-${currentParticipant[0]?.id}`,
            updateConfig
          );
          !fbBannerStatus &&
            broadcastClient?.addImageSource(
              participantName(currentParticipant[0]?.id),
              `DisplayName-${currentParticipant[0]?.id}`,
              { index: 5 }
            );
          if (currentParticipant[0]?.videoStopped) {
            broadcastClient?.removeImage(`image-${currentParticipant[0]?.id}`);
            const profilePiclayoutOne = profilePic();
            if (profilePiclayoutOne) {
              broadcastClient?.addImageSource(
                profilePiclayoutOne,
                `image-${currentParticipant[0]?.id}`,
                { index: 5 }
              );
              console.log("profilepic>>>Added");
            }
          }
        }
        store.dispatch(
          broadcastPostionsUpdate({
            layout: "layout1",
            participantsList: currentParticipant,
          })
        );
        break;
      case "layout2":
        currentParticipant.map((ele, ind) => {
          if (broadcastClient?.getVideoInputDevice(`video-${ele?.id}`)) {
            if (!fbBannerStatus) {
              broadcastClient?.removeImage(`DisplayName-${ele?.id}`);
            }
            if (ele?.videoStopped) {
              broadcastClient?.removeImage(`image-${ele?.id}`);
            }
            broadcastClient?.updateVideoDeviceComposition(
              `video-${ele?.id}`,
              layoutPosition[currentParticipant.length][ind]
            );
            if (!fbBannerStatus) {
              broadcastClient?.addImageSource(
                addName2(ele?.id, ind, currentParticipant.length),
                `DisplayName-${ele?.id}`,
                {
                  index: 3,
                }
              );
            }

            if (ele?.videoStopped) {
              const profilePiclayoutOne = profilePic();
              if (profilePiclayoutOne) {
                broadcastClient?.addImageSource(
                  profilePiclayoutOne,
                  `image-${ele?.id}`,
                  layoutPositionImage[currentParticipant.length][ind]
                );
                console.log("profilepic>>>Added");
              }
            }
          } else {
            const inputVideoStream = new MediaStream([
              getStream(participantsStreamData[ele?.id], "video"),
            ]);
            if (!fbBannerStatus) {
              broadcastClient?.addImageSource(
                addName2(ele?.id, ind, currentParticipant.length),
                `DisplayName-${ele?.id}`,
                {
                  index: 3,
                }
              );
            }
            broadcastClient?.addVideoInputDevice(
              inputVideoStream,
              `video-${ele?.id}`,
              layoutPosition[currentParticipant.length][ind]
            );
            if (ele?.videoStopped) {
              const profilePiclayoutOne = profilePic();
              if (profilePiclayoutOne) {
                broadcastClient?.addImageSource(
                  profilePiclayoutOne,
                  `image-${ele?.id}`,
                  layoutPositionImage[currentParticipant.length][ind]
                );
                console.log("profilepic>>>Added");
              }
            }
          }
        });
        break;
      default:
      // code block
    }
  }
};

export const endBroadcast = async () => {
  const channelArn = store.getState()?.broadcastKey?.channel?.channelArn;
  if (broadcastClient) {
    const endResponse = await endApiBroadcast(channelArn);
    if (endResponse?.status !== 200) {
      broadcastClient.stopBroadcast();
    }
    broadcastClient = null;
  }
};
const removeDisplayName = (layout, participants) => {
  if (layout === "layout1") {
    const localUser = participants.find((ele) => ele.isLocal);
    broadcastClient?.removeImage(`DisplayName-${localUser?.id}`);
  } else {
    console.log(participants, "participants");
    participants.map((ele) => {
      broadcastClient?.removeImage(`DisplayName-${ele?.id}`);
    });
  }
};

const addDisplayName = (layout, participants) => {
  console.log("inputvalu##", layout, participants);
  if (layout === "layout1") {
    const localUser = participants.find((ele) => ele.isLocal);
    broadcastClient.addImageSource(
      participantName(localUser?.id),
      `DisplayName-${localUser?.id}`,
      {
        index: 5,
      }
    );
  } else {
    participants.map((ele, ind) => {
      broadcastClient.addImageSource(
        addName2(ele?.id, ind, participants.length),
        `DisplayName-${ele?.id}`,
        { index: 3 }
      );
    });
  }
};

const addBannerCaption = (awsStageArn) => {
  const fbBannerStyle = store.getState()?.broadcastBranding?.bannerStyle || "";
  const fbBannerBgColor =
    store.getState()?.broadcastBranding?.bannerBgColor || "";
  const fbBannerText = store.getState()?.broadcastBranding?.bannerText || "";
  broadcastClient.addImageSource(
    sessionBannerName(fbBannerText, fbBannerStyle, fbBannerBgColor),
    `Banner-${destructStageId(destructStage(awsStageArn))}`,
    {
      index: 7,
    }
  );
};

export const handleBannerUpdate = async (
  bannerStatus,
  participants,
  getLaytoutType
) => {
  console.log(bannerStatus,
    participants,
    getLaytoutType, "handleBannerUpdate")
  const awsStageReducer = store.getState()?.awsStageReducer;
  const awsStageArn = awsStageReducer?.stageArn || awsStageReducer?.stage?.arn;

  if (broadcastClient) {
    if (bannerStatus) {
      try {
        removeDisplayName(getLaytoutType, participants);
      } catch (exception) {
        console.log(exception, "exception: handleBannerUpdate => removeDisplayName");
      }
      addBannerCaption(awsStageArn);
    } else {
      try {
        broadcastClient?.removeImage(
          `Banner-${destructStageId(destructStage(awsStageArn))}`
        );
      } catch (exception) {
        console.log(exception, "exception: handleBannerUpdate => removeImage");
      }

      addDisplayName(getLaytoutType, participants);
    }
  }
};

export const updateBannerTextBC = (getBannerName, _stageArn) => {
  const bannerStatus = store.getState()?.broadcastBranding?.bannerStatus;
  const fbBannerStyle = store.getState()?.broadcastBranding?.bannerStyle || "";
  const fbBannerBgColor =
    store.getState()?.broadcastBranding?.bannerBgColor || "";
  console.log(bannerStatus, "bannerStatus");
  if (broadcastClient) {
    if (bannerStatus) {
      try {
        broadcastClient?.removeImage(
          `Banner-${destructStageId(destructStage(_stageArn))}`
        );
      } catch (exception) {
        console.log(exception, "exception: updateBannerTextBC => removeImage");

      }
      try {
        broadcastClient.addImageSource(
          sessionBannerName(getBannerName, fbBannerStyle, fbBannerBgColor),
          `Banner-${destructStageId(destructStage(_stageArn))}`,
          {
            index: 7,
          }
        );
      } catch (exception) {
        console.log(exception, "exception: updateBannerTextBC => addImageSource");
      }
    }
  }
};

export const updateBannerBG = (getBannerBG, _stageArn) => {
  console.log("updateBannerBG")
  const bannerBGImg = showBg(getBannerBG);
  if (broadcastClient) {
    broadcastClient?.removeImage(
      `BannerBg-${destructStageId(destructStage(_stageArn))}`
    );
    broadcastClient.addImageSource(
      bannerBGImg,
      `BannerBg-${destructStageId(destructStage(_stageArn))}`,
      UpdateBgContrain
    );
  }
};
export const updateBannerOverlayImg = (getBannerOverlayImg, _stageArn) => {
  const bannerBGImg = showOverlayBg(getBannerOverlayImg);
  const bannerOverlayConstrains = {
    index: 7,
    x: 0,
    y: 0,
  };
  if (broadcastClient) {
    broadcastClient?.removeImage(
      `BannerOverlayImg-${destructStageId(destructStage(_stageArn))}`
    );
    broadcastClient.addImageSource(
      bannerBGImg,
      `BannerOverlayImg-${destructStageId(destructStage(_stageArn))}`,
      bannerOverlayConstrains
    );
  }
};
export const updateBannerThemeStyle = (
  bannerText,
  bannerThemestyle,
  bannerBGC,
  _stageArn
) => {
  const bannerStatus = store.getState()?.broadcastBranding?.bannerStatus;
  if (broadcastClient) {
    console.log(
      bannerStatus,
      "sessionBannerName----",
      bannerText,
      bannerThemestyle,
      bannerBGC,
      _stageArn
    );
    if (bannerStatus) {
      broadcastClient?.removeImage(
        `Banner-${destructStageId(destructStage(_stageArn))}`
      );
      broadcastClient.addImageSource(
        sessionBannerName(
          bannerText,
          bannerThemestyle === "" ? 0 : bannerThemestyle,
          bannerBGC
        ),
        `Banner-${destructStageId(destructStage(_stageArn))}`,
        {
          index: 7,
        }
      );
    }
  }
};

export const updateParticipantBannerStyle = (participant, layoutTypeComp) => {
  const broadcastBranding = store?.getState()?.broadcastBranding || [];
  const fbLayout = broadcastBranding?.layout || "";
  const layoutType = layoutTypeComp === "layout-share" ? fbLayout : layoutTypeComp
  console.log(participant, layoutType, "updateParticipantBannerStyle if participant");

  const localUser = participant.find((ele) => ele.isLocal);
  if (broadcastClient) {
    if (layoutType === "layout1") {
      broadcastClient?.removeImage(`DisplayName-${localUser?.id}`);
      broadcastClient.addImageSource(
        participantName(localUser?.id),
        `DisplayName-${localUser?.id}`,
        {
          index: 5,
        }
      );
    } else {
      console.log("updateParticipantBannerStyle else DisplayName");

      participant.map((ele) => {
        if (broadcastClient?.getVideoInputDevice(`video-${ele?.id}`)) {
          try {
            broadcastClient?.removeImage(`DisplayName-${ele?.id}`);
          } catch (err) {
            console.log("BC>>", err)
          }
        }
      });
      participant.map((ele, ind) => {
        if (broadcastClient?.getVideoInputDevice(`video-${ele?.id}`)) {
          broadcastClient.addImageSource(
            addName2(ele?.id, ind, participant.length),
            `DisplayName-${ele?.id}`,
            { index: 3 }
          );
        }
      });
    }
  }
};

export const updateParticipantStream = (streamData) => {
  const participants = store.getState()?.stageParticipants;
  if (broadcastClient) {
    if (broadcastClient?.getVideoInputDevice(`video-${streamData?.id}`))
      broadcastClient?.removeVideoInputDevice(`video-${streamData?.id}`);
    if (broadcastClient?.getAudioInputDevice(`audio-${streamData?.id}`))
      broadcastClient?.removeAudioInputDevice(`audio-${streamData?.id}`);
    setTimeout(() => {
      const participantsStreamData = store.getState()?.stageParticipantsData;
      const inputVideoStream = new MediaStream([
        getStream(participantsStreamData[streamData?.id], "video"),
      ]);
      const inputAudioStream = new MediaStream([
        getStream(participantsStreamData[streamData?.id], "audio"),
      ]);
      broadcastClient?.addVideoInputDevice(
        inputVideoStream,
        `video-${streamData?.id}`,
        { ...layoutPosition[participants.length][0] }
      );
      broadcastClient?.addAudioInputDevice(
        inputAudioStream,
        `audio-${streamData?.id}`
      );
    }, [500]);
  }
};
