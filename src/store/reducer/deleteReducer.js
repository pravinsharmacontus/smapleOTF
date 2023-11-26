export const initalState = {
  deleteMsg: {},
  isLoading: false,
  getDeleteStatus: {}
};
export const deleteReducer = (state = initalState, action = {}) => {
  if (action.type === "DELETE_STAGE_REDUCER") {
    return {
      deleteMsg: action.deleteStage,
    };
  } else if (action.type === "REGISTER_USER_LOADER") {
    return {
      ...state,
      isLoading: action.loading,
    };
  } else {
    return { ...state };
  }
};

export const getDeleteStateReducer = (state = initalState, action = {}) => {
  if(action.type === "GET_DELETE_STAGE_REDUCER"){
    return {
      getDeleteStatus: action
    }
  }  else {
    return { ...state };
  }
}
