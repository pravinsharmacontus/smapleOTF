import { DO_GET_PARTICIPANT_LIST, EMPTY_BROADCAST_MEMBERS } from "../actionTypes/participantType";

export const getParticipantListAction = (data = "") => {
  return {
    type: DO_GET_PARTICIPANT_LIST,
    data,
  };
};
export const emptyBroadcast = (data = []) => {
  return {
    type: EMPTY_BROADCAST_MEMBERS,
    list: data,
  };
};
