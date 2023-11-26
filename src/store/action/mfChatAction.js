import { MF_GROUP_DETAILS } from "../actionTypes/mfChatTypes";

export const mfGroupDetailsAction = (data = "") => {
  return {
    type: MF_GROUP_DETAILS,
    data,
  };
};
