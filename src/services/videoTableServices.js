import { removeUnderscoreFromPrefix, validateBothUnderscoreAndSpace } from "../common/helper";
import { Get } from "../common/httpRestServices";
import { apiUrl, videoTableList } from "../helper/ApiUrl";

export const videoTableListRequest = (obj = {}) => {
  const { searchdata: { size = 10, page = 1, searchTerm = "" } = {} } = obj;
  return Get(
    `${apiUrl}${videoTableList.getVideoTableList}orgId=${obj.data.organisationId}&size=${size}&page=${page}
    &channelName=${encodeURIComponent(removeUnderscoreFromPrefix(validateBothUnderscoreAndSpace(searchTerm)))}`,
    true
  );
};

export const videoRecordListRequest = (obj = {}) => {
  const { data: { orgId = 0, channleArn = "" } = {} } = obj;
  return Get(
    `${apiUrl}${videoTableList.getVideoRecordList}channelArn=${channleArn}&orgId=${orgId}`,
    true
  );
};
