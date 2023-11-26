export const initalState = {
  videoTable: [],
  totalVideoList: []
};

export const videoRecordDataListReducer = (state = initalState, action = []) => {
  if (action.type === "GET_VIDEO_RECORD_LIST") {
    return { res: action.videoRecordListData };
  } else {
    return { ...state };
  }
};

export const videoTableListReducer = (
  state = initalState,
  action = {}
) => {
  switch (action.type) {
    case "GET_VIDEO_TABLE_LIST": {
      return {
        ...state,
        videoTable: action.videoTableListData,
      };
    }

    case "EMPTY_VIDEO": {
      return {
        ...state,
        videoTable: action.list || [],
      };
    }
    default:
      return {
        ...state,
      };
  }
};
