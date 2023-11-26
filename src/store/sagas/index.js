import { all, fork } from "redux-saga/effects";
import TeamsSaga from './teamsSaga';
import LoginSaga from "./loginSaga";
import ResetPassSaga from "./resetPassSaga";
import ForgetPassSaga from "./forgetPassSaga";
import ChangePasswordSaga from "./ChangePasswordSaga";
import customerSaga from "./customerSaga";
import inviteMemberSaga from "./inviteMemberSaga";
import rootAwsSaga from "./awsIvsSaga";
import organisationSaga from "./organisationSaga";
import videoTableListSaga from "./videoTableSaga";
import participantListSaga from "./participantSaga";
import CustomerListSaga from "./customerlistSaga";
import DeleteListSaga from "./deleteSaga";

export default function* rootSaga() {
  yield all([
    fork(TeamsSaga),//TeamsPage(list.addMember)
    fork(LoginSaga), //login
    fork(ResetPassSaga), //Reset
    fork(ForgetPassSaga), //Forget
    fork(ChangePasswordSaga), //change password
    fork(customerSaga),
    fork(inviteMemberSaga),
    fork(rootAwsSaga),
    fork(organisationSaga),
    fork(videoTableListSaga),
    fork(participantListSaga),
    fork(CustomerListSaga),
    fork(DeleteListSaga)
  ]);
}
