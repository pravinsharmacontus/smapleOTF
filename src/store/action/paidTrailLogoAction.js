import { DO_GET_PAID_TRAIL_LOGO_TYPE } from "../actionTypes/paidTrailLogoTypes"

export const paidTrailLogoAction = (data = "") => {
    console.log("ads",data)
    return{
      type: DO_GET_PAID_TRAIL_LOGO_TYPE,
      data
    }
  }
