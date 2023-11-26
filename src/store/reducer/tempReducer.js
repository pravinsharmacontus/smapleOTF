export const initalState = {
  tempToken: "",
  recordTime: "",
  recordedTime: 0,
  broadcastScreenStatus: false,
  broadcastScreenBackStatus:false,
};
export const tempReducer = (state = initalState, action = {}) => {
  if (action.type === "Tempory_LOGIN_TOKEN") {
    return { tempToken: action.data };
  } else {
    return { ...state };
  }
};
export const recordReducer = (state = initalState, action = {}) => {
  if (action.type === "RECORD_TIME_START") {
    return { recordTime: action.data };
  } else {
    return { ...state };
  }
};
export const recordedTimeReducer = (state = initalState, action = {}) => {
  if (action.type === "RECORDED_TIME") {
    return { recordedTime: action.data };
  } else {
    return { ...state };
  }
};
export const BroadcastScreenReducer = (state = initalState, action = {}) => {
  if (action.type === "BROADCAST_CALL_SCREEN_STATUS") {
    return { broadcastScreenStatus: action.data };
  } else {
    return { ...state };
  }
};
export const BroadcastScreenBackReducer = (state = initalState, action = {}) => {
  if (action.type === "BROADCAST_CALL_SCREEN_BACK_STATUS") {
    return { broadcastScreenBackStatus: action.data };
  } else {
    return { ...state };
  }
};
