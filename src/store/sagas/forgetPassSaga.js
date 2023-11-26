import { put, takeLatest, call, all } from 'redux-saga/effects';
import * as forgetPassTypes from '../actionTypes/forgetPassTypes';
import { forgetPassReques } from "../../services/forgetPassServices";
import { succToast, failToast, serverNotRespond } from "../../helper/ApiToast";

function* doForget(obj = {}) {
    // const obj = { data:{"email": "email"}} obj Data;
    try {
        const loginData = yield call(forgetPassReques, obj);
        const { data = {} } = loginData || {};
        if (data.status === 200) {
            yield all([
                put({ type: "DO_LOADING_LOGIN_PAGE", loading: false }), //Loader open/close
            ]);
            succToast(data.message);
        } else if (data.status >= 201 && data.status <= 400) {
            failToast(data.message);
            yield all([
                put({ type: "DO_LOADING_LOGIN_PAGE", loading: false }),//Loader open/close
            ]);
        } else {
            serverNotRespond(data.message);
            yield all([
                put({ type: "DO_LOADING_LOGIN_PAGE", loading: false }),//lodering on / off
            ]);
        }
    }
    catch (error) {
        serverNotRespond();
        yield all([
            put({ type: "DO_LOADING_LOGIN_PAGE", loading: false }),
        ]);
    }
}

export default function* forgetPassSaga() {
    yield takeLatest(forgetPassTypes.DO_FORGET_ACTION, doForget);
}
