import { trailUserStatus } from "../../helper/ApiUrl";

export const initalState = {
  paidLogoUpdate: trailUserStatus
};
export const paidTrailLogoUpdateReducer = (
  state = initalState,
  action = {}
) => {
  if (action.type === "DO_GET_PAID_TRAIL_LOGO_TYPE") {
    return { paidLogoUpdate: action.data };
  } else {
    return { ...state };
  }
};
