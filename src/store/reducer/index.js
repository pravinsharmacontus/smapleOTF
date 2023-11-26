import { combineReducers } from "redux";
import { CusReducer } from "./CusReducer";
import { loginReducer } from "./loginReducer";
import { loderReducer } from "./loaderReducer";
import { commonDataReducer } from "./commonDataReducer";
import { changPasswrdReducer } from "./changePasswordReducer";
import { inviteMemberListReducer } from "./inviteMemberReducer";
import {
  appOnlineStatusReducer,
  appStatusReducer,
  awsParticipantDataReducer,
  awsStageReducer,
  broadcastKeyReducer,
  broadcastPostionReducer,
  cameraPermissionReducer,
  getTempStreams,
  localDeviceListsReducers,
  localStreamsReducers,
  micPermissionReducer,
  sessionPastRecordReducer,
  sessionTotalRecordReducer,
  sessionUpcomingRecordReducer,
  stageParticipantsReducer,
  updateBlockAccessReducer,
  updateBrandingReducer,
  updateLogoReducer,
  updateSessionInfoReducer,
} from "./awsReducer";
import {
  currentOrganisationReducer,
  organisationMemberListReducer,
} from "./organisationReducer";
import { BroadcastScreenBackReducer, BroadcastScreenReducer, recordReducer, recordedTimeReducer, tempReducer } from "./tempReducer";
import {
  videoRecordDataListReducer,
  videoTableListReducer,
} from "./videoTableReducer";
import { participantListReducer } from "./participantReducer";
import {
  customerListReducer,
  broadcastCountListReducer,
} from "./customerListReducer";
import { paidTrailLogoUpdateReducer } from "./paidTrailLogoUpdateReducer";
import { deleteReducer, getDeleteStateReducer } from "./deleteReducer";
import { teamsAddMember } from "./teamsAddMember";
import { teamsReducer } from "./teamsReducer";
import { facebookDataReducer } from "./facebookDataReducer";

const rootReducer = combineReducers({
  loader: loderReducer, //loder
  CusPage: CusReducer, //add,delete,edit page action manage
  loginPage: loginReducer, //handle by loging,forget,reset page action manage
  changPasswrdReducer: changPasswrdReducer, //changePwdReducer
  awsStageReducer: awsStageReducer,
  commonData: commonDataReducer, //common
  addMember: teamsAddMember, //Add member
  teamsPage: teamsReducer, //teamsPage reducer
  stageParticipants: stageParticipantsReducer,
  stageParticipantsData: awsParticipantDataReducer,
  inviteMemberListReducer: inviteMemberListReducer, //inviteMemberListReducer
  localStreams: localStreamsReducers,
  localDeviceLists: localDeviceListsReducers,
  broadcastLogo: updateLogoReducer,
  broadcastBranding: updateBrandingReducer,
  sessionInfo: updateSessionInfoReducer,
  broadcastKey: broadcastKeyReducer,
  organisationMemberListReducer: organisationMemberListReducer,
  currentOrganisationReducer: currentOrganisationReducer,
  tempReducer: tempReducer,
  recordReducer: recordReducer,
  recordedTimeReducer: recordedTimeReducer,
  BroadcastScreenReducer: BroadcastScreenReducer,
  BroadcastScreenBackReducer: BroadcastScreenBackReducer,
  broadcastPostion: broadcastPostionReducer,
  videoTableListReducer: videoTableListReducer,
  participantListReducer: participantListReducer,
  appStatus: appStatusReducer,
  deviceGrant: updateBlockAccessReducer,
  customerListReducer: customerListReducer,
  broadcastCountListReducer: broadcastCountListReducer,
  videoRecordDataListReducer: videoRecordDataListReducer,
  appOnlineStatus: appOnlineStatusReducer,
  sessionTotalRecordReducer: sessionTotalRecordReducer,
  sessionPastRecordReducer: sessionPastRecordReducer,
  sessionUpcomingRecordReducer: sessionUpcomingRecordReducer,
  paidTrailLogoUpdateReducer: paidTrailLogoUpdateReducer,
  deleteReducer: deleteReducer,
  cameraPermissions: cameraPermissionReducer,
  micPermissions: micPermissionReducer,
  getDeleteStateReducer: getDeleteStateReducer,
  tempStreams: getTempStreams,
  facebookData: facebookDataReducer, //facebook
});
export default rootReducer;
