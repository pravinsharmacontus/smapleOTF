import { RECORDED_TIME, RECORD_TIME_START, Tempory_LOGIN_TOKEN } from "../actionTypes/customerTypes"

export const tempAction = (data = "") => {
    console.log("ads",data)
    return{
      type: Tempory_LOGIN_TOKEN,
      data
    }
  }

  export const recordTimeDelayAction = (data = "") => {
    console.log("action@@@",data)
    return{
      type: RECORD_TIME_START,
      data
    }
  }

  export const recordedTimeAction = (data = 0) => {
    return{
      type: RECORDED_TIME,
      data
    }
  }
  export const clearSession = () => {
    return{
      type: "CLEAR_SESSION",

    };
  };
  export const InBroadcastScreenAction = (data = false) => {
    return{
      type: "BROADCAST_CALL_SCREEN_STATUS",
      data
    };
  };
  export const InBroadcastScreenBackAction = (data = false) => {
    return{
      type: "BROADCAST_CALL_SCREEN_BACK_STATUS",
      data
    };
  };
