import { EDIT_STREAM, SHOW_YOUTUBE, ACCESS_TOKEN, START_YT_LOADER, END_YT_LOADER,
  EDIT_POPUPSTREAM, EDIT_STREAM_SAVE, DELETE_SOCIAL_ACCOUNT,
  RECONNECT_SOCIAL_ACCOUNT, TIMER_POPUP} from "../actionTypes/editStreamTypes";

export const editStreamAction = (data = "") => {
  return {
    type: EDIT_STREAM,
    data,
  };
};

export const editStreamPopupAction = (data = "") => {
  return {
    type: EDIT_POPUPSTREAM,
    data,
  };
};

export const showYoutubeAction = (data = "") => {
  return {
    type: SHOW_YOUTUBE,
    data,
  };
};

export const getAccessTokenAction = (data = "") => {
  return {
    type: ACCESS_TOKEN,
    data,
  };
};

export const startYTLoaderAction = (data = "") => {
  return {
    type: START_YT_LOADER,
    data,
  };
};

export const endYTLoaderAction = (data = "") => {
  return {
    type: END_YT_LOADER,
    data,
  };
};

export const editStreamSaveAction = (data = "") => {
  return {
    type: EDIT_STREAM_SAVE,
    data,
  };
};

export const deleteSocialAcc = (data = "") => {
  return {
    type: DELETE_SOCIAL_ACCOUNT,
    data,
  };
};

export const reconnectAccount = (data = "") => {
  return {
    type: RECONNECT_SOCIAL_ACCOUNT,
    data,
  };
};

export const timerPopup = (data = "") => {
  return {
    type: TIMER_POPUP,
    data,
  };
};
