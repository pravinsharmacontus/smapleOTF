import { DO_GET_VIDEO_RECORD_LIST, DO_GET_VIDEO_TABLE_LIST, EMPTY_VIDEO } from "../actionTypes/videoTableType";

export const getVideoTableAction = (data = {}, searchdata = {}) => {
  return {
    type: DO_GET_VIDEO_TABLE_LIST,
    data,
    searchdata
  };
};

export const getVideoRecordAction = (data = {},searchdata = {}) => {
  return {
    type: DO_GET_VIDEO_RECORD_LIST,
    data,
    searchdata
  };
};

export const emptyVideo = (data = []) => {
  return {
    type: EMPTY_VIDEO,
    list: data,
  };

};
