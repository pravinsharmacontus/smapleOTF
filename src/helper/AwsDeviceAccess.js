import store from "../store";
import {
  localStreamUpdate,
  updateBlockAccess,
  updateLocalCameraStream,
  updateLocalMicStream,
} from "../store/action/awsActions";
import {
  ImgTransparent,
  ImgBroadcastBg1,
  ImgBroadcastBg2,
  ImgBroadcastBg3,
  ImgBroadcastOverlayBg1,
  ImgBroadcastOverlayBg2,
  ImgBroadcastOverlayBg3,
  ImgBroadcastBg0,
  mirrorflyHdDefault,
  OTFLogo,
} from "../assets/img";
import { BLOCKED } from "../constant";
import { ImgplaceholderSm } from "../assets/images";
import { getUserListNameOld } from "../common/helper";
import { BROADCAST_RESOLUTION } from "./ApiUrl";

const ENABLE_HD = true;
const locBannerBgColor = JSON.parse(localStorage.getItem("fbBannerBgColor"));
const locBannerStyle = JSON.parse(localStorage.getItem("fbBannerStyle")) || "";

const handleGradientBG = (bannerStyle = "", bannerBGC = "") => {
  if (bannerStyle > 0) {
    return bannerBGC || locBannerBgColor;
  } else return "#202021";
};

export async function getStreams(videoDevicesList, audioDevicesList) {
  // Use Max Width and Height
  return navigator.mediaDevices
    .getUserMedia({
      video: {
        deviceId: videoDevicesList ? { exact: videoDevicesList } : null,
      },
      audio: {
        deviceId: audioDevicesList ? { exact: audioDevicesList } : null,
      },
    })
    .catch((err) => {
      if (err.name === "NotAllowedError") {
        store.dispatch(updateBlockAccess(BLOCKED));
      }
    });
}

export async function getCamera(deviceId) {
  // Use Max Width and Height
  return navigator.mediaDevices.getUserMedia({
    video: {
      deviceId: deviceId ? { exact: deviceId } : null,
      width: 1600,
      height: 900,
      facingMode: "user",
    },
    audio: false,
  });
}

export async function getMic(deviceId) {
  console.log(deviceId, "getMicgetMicgetMic");
  return navigator.mediaDevices.getUserMedia({
    video: false,
    audio: {
      deviceId: deviceId ? { exact: deviceId } : null,
    },
  });
}

export async function initializeDeviceSelect() {
  return await getDevices();
}

export async function getDevices() {
  // Prevents issues on Safari/FF so devices are not blank
  // await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

  const devices = await navigator.mediaDevices.enumerateDevices();
  // Get all video devices
  const videoDevices = devices.filter((d) => d.kind === "videoinput");
  // Get all audio devices
  const audioDevices = devices.filter((d) => d.kind === "audioinput");
  const audioOutputDevices = devices.filter((d) => d.kind === "audiooutput");
  return { videoDevices, audioDevices, audioOutputDevices };
}

export const testOut = () => {
  const defaultLogo = mirrorflyHdDefault;
  const defaultImage = new Image();
  defaultImage.src = defaultLogo;
  defaultImage.alt = "logo";
  return defaultImage;
}

export const showLogo = (broadcastLogo) => {

  if (broadcastLogo.length > 0) {
    if (broadcastLogo === "no-image") {
      const transparent = ImgTransparent;
      const transparentImage = new Image();
      transparentImage.src = transparent;
      transparentImage.alt = "logo";
      return transparentImage;
    } else {
      const logo1 = broadcastLogo;
      const image = new Image();
      image.src = logo1;
      image.alt = "logo";
      return image;
    }
  } else {
    const defaultLogo = OTFLogo;
    const defaultImage = new Image();
    defaultImage.src = defaultLogo;
    defaultImage.alt = "logo";
    return defaultImage;
  }
};

export const showBg = (_broadBg) => {

  let broadBgImage = ImgTransparent;
  switch (_broadBg) {
    case 0:
      broadBgImage = ImgBroadcastBg0;
      break;
    case 1:
      broadBgImage = ImgBroadcastBg1;
      break;
    case 2:
      broadBgImage = ImgBroadcastBg2;
      break;
    case 3:
      broadBgImage = ImgBroadcastBg3;
      break;
    default:
      broadBgImage = ImgBroadcastBg0;
      return broadBgImage;
  }
  const image = new Image();
  image.src = broadBgImage;
  image.alt = "Broadcast Bg";
  return image;
};

export const showOverlayBg = (_broadBg) => {
  let broadBgImage = ImgTransparent;
  switch (_broadBg) {
    case 0:
      broadBgImage = ImgTransparent;
      break;
    case 1:
      broadBgImage = ImgBroadcastOverlayBg1;
      break;
    case 2:
      broadBgImage = ImgBroadcastOverlayBg2;
      break;
    case 3:
      broadBgImage = ImgBroadcastOverlayBg3;
      break;
    default:
      broadBgImage = ImgTransparent;
      return broadBgImage;
  }
  const image = new Image();
  image.src = broadBgImage;
  image.alt = "overlay-bg";
  image.style.width = 1920;
  image.style.height = 1080;
  return image;
};

export const profilePic = () => {
  const logo1 = ImgplaceholderSm;
  const image = new Image();
  image.src = logo1;
  image.style.width = "auto";
  image.style.height = "35%";
  image.style.backgroundColor = "#343434";
  image.alt = "logo";
  return image;
};
const handleBannerColorUpdate = (bannerStyle = "", bannerTextColor = false) => {
  if (bannerStyle == "" || bannerStyle == 0) {
    return "#ffffff";
  } else {
    const colorCode = bannerTextColor ? "#ffffff" : "#000000";
    return colorCode;
  }
};

export const displayName = () => {
  const broadcastBranding = store.getState()?.broadcastBranding;
  const FbBannerTextColor = broadcastBranding?.bannerTextColor || "";
  const fbBannerStyle = broadcastBranding?.bannerStyle || "";
  const canvas = document.createElement("canvas");
  canvas.width = 200;
  canvas.height = 20;
  canvas.style.display = "none";
  const ctx = canvas.getContext("2d");
  ctx.font = "17px ProximaNovaRegular, sans-serif";
  ctx.fillStyle = handleBannerColorUpdate(fbBannerStyle, FbBannerTextColor);
  ctx.fillText("Pravin Sharma", 10, 50);
  return canvas;
};

const wrapText = function (ctx, text, x, _y, maxWidth, lineHeight) {
  let y = _y;
  // First, start by splitting all of our text into words, but splitting it into an array split by spaces
  const words = text.split(" ");
  let line = ""; // This will store the text of the current line
  let testLine = ""; // This will store the text when we add a word, to test if it's too long
  const lineArray = []; // This is an array of lines, which the function will return

  // Lets iterate over each word
  for (let n = 0; n < words.length; n++) {
    // Create a test line, and measure it..
    testLine += `${words[n]} `;
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    // If the width of this test line is more than the max width
    if (testWidth > maxWidth && n > 0) {
      // Then the line is finished, push the current line into "lineArray"
      lineArray.push([line, x, y]);
      // Increase the line height, so a new line is started
      y += lineHeight;
      // Update line and test line to use this word as the first word on the next line
      line = `${words[n]} `;
      testLine = `${words[n]} `;
    } else {
      // If the test line is still less than the max width, then add the word to the current line
      line += `${words[n]} `;
    }
    // If we never reach the full max width, then there is only one line.. so push it into the lineArray so we return something
    if (n === words.length - 1) {
      lineArray.push([line, x, y]);
    }
  }
  // Return the line array
  return lineArray;
};

const handleBannerStyle = (bannerStyle = "") => {
  switch (bannerStyle) {
    case 1:
      return [40, 40, 40, 40];
    case 2:
      return [6, 6, 6, 6];
    default:
      return [6, 0, 0, 6];
  }
};

export const sessionBannerName = (
  bannerText = "",
  bannerStyle = "",
  bannerBGC = ""
) => {
  console.log(bannerText, bannerStyle, bannerBGC, "sessionBannerName");
  const broadcastBranding = store.getState()?.broadcastBranding;
  const FbBannerTextColor = broadcastBranding?.bannerTextColor || "";
  const topicName = bannerText || "";
  const overlay = document.createElement("canvas");
  overlay.width = 1860;
  overlay.height = 1080;
  overlay.style.display = "none";
  const ctx = overlay.getContext("2d");
  ctx.lineWidth = 3;
  ctx.font = " 28px ProximaNovaSemibold, sans-serif";
  ctx.fillStyle = handleBannerColorUpdate(bannerStyle, FbBannerTextColor);
  ctx.fill();
  const wrappedText = wrapText(
    ctx,
    topicName,
    48,
    overlay.height - 40,
    overlay.width - 80 > ctx.measureText(topicName).width
      ? ctx.measureText(topicName).width + 40
      : overlay.width - 80,
    30
  );
  wrappedText.forEach(function (item, index) {
    ctx.fillText(item[0], item[1], item[2] - (wrappedText.length > 1 ? 20 : 0));
  });
  ctx.globalCompositeOperation = "destination-over";
  const grd = ctx.createLinearGradient(0, 0, 35, 0);
  grd.addColorStop(1, bannerBGC || locBannerBgColor);
  grd.addColorStop(
    1,
    handleGradientBG(
      bannerStyle !== "" ? bannerStyle : locBannerStyle,
      bannerBGC
    )
  );
  ctx.fillStyle = grd;
  ctx.roundRect(
    20,
    overlay.height -
    70 -
    (wrappedText.length > 1 ? wrappedText.length * 14 : 0),
    overlay.width - 80 > ctx.measureText(topicName).width
      ? ctx.measureText(topicName).width + 58
      : overlay.width - 58,
    44 * wrappedText.length,
    handleBannerStyle(bannerStyle || locBannerStyle)
  );
  ctx.fill();
  ctx.globalAlpha = 1;
  return overlay;
};

export const participantName = (participantId) => {
  const topicName = getUserListNameOld(participantId);
  const broadcastBranding = store.getState()?.broadcastBranding;
  const fbBannerStyle = broadcastBranding?.bannerStyle || "";
  const fbBannerBgColor = broadcastBranding?.bannerBgColor || "";
  const FbBannerTextColor = broadcastBranding?.bannerTextColor || "";
  const overlay = document.createElement("canvas");
  overlay.width = 1860;
  overlay.height = 1080;
  overlay.style.display = "none";
  const ctx = overlay.getContext("2d");
  ctx.lineWidth = 3;
  ctx.font = " 28px ProximaNovaSemibold, sans-serif";
  ctx.fillStyle = handleBannerColorUpdate(fbBannerStyle, FbBannerTextColor);
  ctx.fill();
  const wrappedText = wrapText(
    ctx,
    topicName,
    48,
    overlay.height - 40,
    overlay.width > ctx.measureText(topicName).width
      ? ctx.measureText(topicName).width + 58
      : overlay.width - 58,
    30
  );
  wrappedText.forEach(function (item, index) {
    ctx.fillText(item[0], item[1], item[2] - (wrappedText.length > 1 ? 20 : 0));
  });
  ctx.globalCompositeOperation = "destination-over";
  const grd = ctx.createLinearGradient(0, 0, 35, 0);
  grd.addColorStop(1, fbBannerBgColor || locBannerBgColor);
  grd.addColorStop(
    1,
    handleGradientBG(
      fbBannerStyle === "" ? 0 : fbBannerStyle || locBannerStyle,
      fbBannerBgColor
    )
  );
  ctx.fillStyle = grd;
  ctx.roundRect(
    20,
    overlay.height -
    70 -
    (wrappedText.length > 1 ? wrappedText.length * 14 : 0),
    overlay.width > ctx.measureText(topicName).width
      ? ctx.measureText(topicName).width + 58
      : overlay.width + 58,
    44 * wrappedText.length,
    handleBannerStyle(
      fbBannerStyle === "" ? 0 : fbBannerStyle || locBannerStyle
    )
  );
  ctx.fill();
  ctx.globalAlpha = 1;
  return overlay;
};

const displayCoordinatesBasic = (ind, participantsLength) => {
  switch (participantsLength) {
    case 2:
      return { x: ind === 0 ? 0 : 946, y: 730 };
    case 3:
      if (ind < 2) {
        return { x: ind === 0 ? 0 : 946, y: 495 };
      } else {
        return { x: 470, y: 1040 };
      }
    case 4:
      if (ind < 2) {
        return { x: ind === 0 ? 0 : 946, y: 495 };
      } else {
        return { x: ind === 2 ? 0 : 946, y: 1040 };
      }
    default:
    // code block
  }
};

const displayCoordinates = (ind, participantsLength) => {
  switch (participantsLength) {
    case 2:
      return { x: ind === 0 ? 52 : 954, y: 730 };
    case 3:
      if (ind < 2) {
        return { x: ind === 0 ? 52 : 954, y: 455 };
      } else {
        return { x: 500, y: 1000 };
      }
    case 4:
      if (ind < 2) {
        return { x: ind === 0 ? 52 : 954, y: 455 };
      } else {
        return { x: ind === 2 ? 52 : 954, y: 1000 };
      }
    default:
    // code block
  }
};
export const addName2 = (participantId, ind, participantsLength) => {
  const addDisplayNameCorrd = BROADCAST_RESOLUTION === "BASIC_LANDSCAPE" ? displayCoordinatesBasic(ind, participantsLength) : displayCoordinates(ind, participantsLength)
  const broadcastBranding = store.getState()?.broadcastBranding;
  const fbBannerStyle = broadcastBranding?.bannerStyle || "";
  const fbBannerBgColor = broadcastBranding?.bannerBgColor || "";
  const FbBannerTextColor = broadcastBranding?.bannerTextColor || "";
  const { x = 0, y = 0 } = addDisplayNameCorrd;
  const topicName = getUserListNameOld(participantId);
  const overlay = document.createElement("canvas");
  overlay.width = 1860;
  overlay.height = 1080;
  overlay.style.display = "none";

  const ctx = overlay.getContext("2d");
  ctx.globalAlpha = 0;

  ctx.fillRect(0, 0, 1920, 1080);

  ctx.globalAlpha = 1;
  ctx.strokeStyle = "";
  ctx.lineWidth = 3;
  ctx.font = "bold 28px ProximaNovaRegular, sans-serif";
  ctx.fillStyle = handleBannerColorUpdate(fbBannerStyle, FbBannerTextColor);
  ctx.fillText(topicName, x + 75, y, ctx.measureText(topicName).width + 50);
  ctx.globalCompositeOperation = "destination-over";
  const grd = ctx.createLinearGradient(0, 0, x + 50 + 15, 0);
  grd.addColorStop(1, fbBannerBgColor || locBannerBgColor);
  grd.addColorStop(
    1,
    handleGradientBG(
      fbBannerStyle === "" ? 0 : fbBannerStyle || locBannerStyle,
      fbBannerBgColor
    )
  );
  ctx.fillStyle = grd;
  ctx.roundRect(
    x + 50,
    y - 35,
    ctx.measureText(topicName).width + 45,
    50,
    handleBannerStyle(
      fbBannerStyle === "" ? 0 : fbBannerStyle || locBannerStyle
    )
  );
  ctx.fill();
  ctx.globalAlpha = 1;
  return overlay;
};

export const verifyDeviceAdded = (id, type) => {
  const {
    videoDevices = [],
    audioDevices = [],
    audioOutputDevices = [],
  } = store.getState()?.localDeviceLists;
  if (type === "video") {
    const isPresentVideo = videoDevices.findIndex(
      (ele) => ele?.deviceId === id
    );
    if (isPresentVideo < 0) {
      return videoDevices[0]?.deviceId;
    } else {
      return id;
    }
  } else if (type === "audio") {
    const isPresentAudio = audioDevices.findIndex(
      (ele) => ele?.deviceId === id
    );
    if (isPresentAudio < 0) {
      return audioDevices[0]?.deviceId;
    } else {
      return id;
    }
  } else {
    const isPresentSpeaker = audioOutputDevices.findIndex(
      (ele) => ele?.deviceId === id
    );
    if (isPresentSpeaker < 0) {
      return audioDevices[0]?.deviceId;
    } else {
      return id;
    }
  }
};

export const unmuteStream = async (type) => {
  const localStream = store.getState()?.localStreams;
  const videoId = verifyDeviceAdded(localStream?.DeviceIds?.video, "video");
  const audioId = verifyDeviceAdded(localStream?.DeviceIds?.audio, "audio");
  if (type === "VIDEO") {
    if (!videoId) {
      return;
    }
    const localCamera = await getCamera(videoId);
    store.dispatch(
      localStreamUpdate({
        ...localStream,
        DeviceIds: {
          ...localStream.DeviceIds,
          video: videoId,
        },
        localCamera: localCamera,
      })
    );
    return localCamera;
  }
  if (type === "AUDIO") {
    if (!audioId) {
      return;
    }

    const localMic = await getMic(audioId);
    store.dispatch(
      localStreamUpdate({
        ...localStream,
        DeviceIds: {
          ...localStream.DeviceIds,
          audio: audioId,
        },
        localMic: localMic,
      })
    );
    return localMic;
  }
};

export const muteStageJoin = async (type, deviceId) => {
  if (type === "VIDEO") {
    const localCamera = await getCamera(deviceId);
    console.log(localCamera, "localCameralocalCamera");
    store.dispatch(updateLocalCameraStream(localCamera));
    return localCamera;
  }
  if (type === "AUDIO") {
    const localMic = await getMic(deviceId);
    console.log(localMic, "localCameralocalCamera");
    store.dispatch(updateLocalMicStream(localMic));
    return localMic;
  }
};
export const diableScreen = () => {
  const localStreams = store.getState()?.localStreams;
  if (localStreams?.screenShare?.active) {
    const { screenShare } = localStreams;
    const screenShareTracks = screenShare?.getTracks();
    screenShareTracks.forEach((track) => {
      track?.stop();
    });
  }
};

export const diableDevices = () => {
  const localStreams = store.getState()?.localStreams;
  console.log(localStreams, "localStreamslocalStreams");
  if (localStreams?.localCamera?.active || localStreams?.localMic?.active) {
    const { localCamera, localMic } = localStreams;
    const videoTracks = localCamera?.getTracks();
    const audioTracks = localMic?.getTracks();
    videoTracks.forEach((track) => {
      track?.stop();
    });
    audioTracks.forEach((track) => {
      track?.stop();
    });
  }
  diableScreen();
};

export const diableVideo = () => {
  const localStreams = store.getState()?.localStreams;
  if (localStreams?.localCamera?.active) {
    const { localCamera } = localStreams;
    const videoTracks = localCamera?.getTracks();
    videoTracks.forEach((track) => {
      track?.stop();
    });
  }
};

export const diableAudio = () => {
  const localStreams = store.getState()?.localStreams;
  if (localStreams?.localMic?.active) {
    const { localMic } = localStreams;
    const audioTracks = localMic?.getTracks();
    audioTracks.forEach((track) => {
      track?.stop();
    });
  }
};

export const diableDevicesEndBC = () => {
  const localStreams = store.getState()?.localStreams;
  console.log(localStreams, "localStreams----localStreams");
  const { localCamera, localMic } = localStreams;
  const videoTracks = localCamera?.getTracks();
  const audioTracks = localMic?.getTracks();
  setTimeout(() => {
    videoTracks?.forEach((track) => {
      track?.stop();
    });
    audioTracks?.forEach((track) => {
      track?.stop();
    });
    console.log(localStreams, "localStreams----localStreams---1");
  }, [2000]);
  diableScreen();
};

export const screeShareBg = () => {
  const overlay = document.createElement("canvas");
  overlay.width = 1920;
  overlay.height = 1080;
  const ctx = overlay.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, overlay.width, overlay.height);
  return overlay;
};

export const checkBg = () => {
  const overlay = document.createElement("canvas");
  overlay.width = 1920;
  overlay.height = 1080;
  const ctx = overlay.getContext("2d");
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, overlay.width, overlay.height);
  return overlay;
};
