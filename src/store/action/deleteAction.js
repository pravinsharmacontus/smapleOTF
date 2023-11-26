import { DELETE_STAGE_ACTION, GET_DELETE_STAGE_ACTION, REMOVE_PARTICIPANT_ACTION } from "../actionTypes/deleteType";

export const deleteStageAction = (data = "",tabType = {}) => {
  console.log("action@@@", data);
  return {
    type: DELETE_STAGE_ACTION,
    data,
    tabType
  };
};

export const removeParticipantAction = (data = "") => {
  console.log("removeParticipantAction", data);
  return {
    type: REMOVE_PARTICIPANT_ACTION,
    data,
  };
};

export const getDeleteStageAction = (data = "") => {
  console.log("getDeleteStageAction@@@", data);
  return {
    type: GET_DELETE_STAGE_ACTION,
    data,
  }
}
