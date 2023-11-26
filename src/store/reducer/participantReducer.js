export const initalState = {
    participantList: [],
};
export const participantListReducer = (state = initalState, action = {}) => {
  if (action.type === "GET_PARTICIPANT_LIST") {
    console.log("action----", action.participantListData.data.participantsList);
    return { participantList: action.participantListData.data.participantsList };
  } else {
    return { ...state };
  }
};
