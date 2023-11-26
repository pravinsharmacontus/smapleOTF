import { Get } from "../common/httpRestServices";
import { apiUrl, participantList } from "../helper/ApiUrl";

export const participantListRequest = async (obj = "") => {
  const getList = await Get(
    `${apiUrl}${participantList.getParticipantList}size=${500}&stageArn=${
      obj.data
    }`,
    true
  );
  return getList;
};
