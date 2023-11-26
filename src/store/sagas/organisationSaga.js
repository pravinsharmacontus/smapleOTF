import { all, call, put, takeLatest } from "redux-saga/effects";
import { getCustomerOrganisationList } from "../../services/organisationServices";
import { GET_CUSTOMER_ORGANISATION_DETAILS } from "../actionTypes/customerTypes";
import { serverNotRespond } from "../../helper/ApiToast";

function* getCustomerOrganisation() {
    try {
        const organisationMemberList = yield call(getCustomerOrganisationList);
        const { data = {} } = organisationMemberList || {};
        if (data.status === 200) {
            yield all([
                put({ type: "DO_GET_ORGANISATION_LIST", organisationMemberList: data }),//Result Store
            ]);
            // yield all([
            //     put({ type: "DO_LOADING_PAGE", loading: false }),
            // ]);
        } else if (data.status >= 201 && data.status <= 400) {
            yield all([
                put({ type: "DO_GET_ORGANISATION_LIST", organisationMemberList: {} }),//Result Store
            ]);
            // yield all([
            //     put({ type: "DO_LOADING_PAGE", loading: false }),
            // ]);
        } else {
            serverNotRespond(data.message);
            yield all([
                put({ type: "DO_GET_ORGANISATION_LIST", organisationMemberList: {} }),//Result Store
            ]);
            // yield all([
            //     put({ type: "DO_LOADING_PAGE", loading: false }),
            // ]);
        }
    }
    catch (error) {
        serverNotRespond();
        yield all([
            put({ type: "DO_LOADING_PAGE", loading: false }),
        ]);
    }
}

export default function* organisationSaga() {
    yield takeLatest(GET_CUSTOMER_ORGANISATION_DETAILS,getCustomerOrganisation);
}
