import { Delete, Get } from "../common/httpRestServices";
import { apiUrl, deleteStage } from "../helper/ApiUrl";

export const deleteStageRequest = (obj = []) => {
  const stageArn = obj.data;
  console.log("obj", obj, obj.data, stageArn);
  return Delete(
    `${apiUrl}${deleteStage.doDeleteStageList}stageArn=${encodeURIComponent(
      stageArn
    )}`,
    {}, true
  );
};
export const deleteParticipantRequest = (obj = {}) => {
  const { data: { userEmail = "", stageArn = "", stageParticipantId = "" } = {} } = obj;
  const removeList = stageParticipantId === "" ?
    {
      stageArn: stageArn,
      participantIds: [],
      userMailIds: [userEmail]
    } :
    {
      stageArn: stageArn,
      participantIds: [stageParticipantId],
      userMailIds: []
    };
  console.log("deleteParticipantRequest", obj, removeList, stageParticipantId, userEmail);

  return Delete(
    `${apiUrl}${deleteStage.doRemoveParticipantList}`, removeList,
    true
  );
};

export const getDeleteStageService = (obj = []) => {
    return Get(
      `${apiUrl}${deleteStage.dogetDeleteStage}stageArn=${encodeURIComponent(
        obj
      )}`,
      true
    );
};
