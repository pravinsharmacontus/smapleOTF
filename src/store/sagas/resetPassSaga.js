import store from "../../store";
import History from "../../common/History";
import { takeLatest, call } from 'redux-saga/effects';
import { passwordChange } from "../../services/resetPassword";
import * as ResetPassPassTypes from '../actionTypes/ResetPassPassTypes';
import { succToast, failToast, serverNotRespond } from "../../helper/ApiToast";

/**
 * @param  {object} data={}
 * action New pass create and reset pass action here
 */
const actionCreateResetPage = (data = {}) => {
    const { data: { status = 0, message = "" } = {} } = data || {};
    if (status === 200) {
        succToast(message);
        setTimeout(() => {
            History.push("/"); //200 Response success, Navigate to Login Page
            store.dispatch({ type: "DO_LOADING_LOGIN_PAGE", loading: false });//loder open/Close
        }, 4000);
    } else if (status >= 201 && status <= 400) {
        failToast(message);
        store.dispatch({ type: "DO_LOADING_LOGIN_PAGE", loading: false }); //loder open/Close
    } else {
        serverNotRespond(message);
        store.dispatch({ type: "DO_LOADING_LOGIN_PAGE", loading: false });//lodering on / off
    }
};

/*catch Call triiger */
const actionErrorResetPage = () => {
    serverNotRespond();
    store.dispatch({ type: "DO_LOADING_LOGIN_PAGE", loading: false }); //loder open/Close
};

/**
 * @param  {object} obj={}
 * resetPassword action
 */
function* doResetAction(obj = {}) {
    try {
        const restResponse = yield call(passwordChange, obj);
        actionCreateResetPage(restResponse);
    }
    catch (error) {
        actionErrorResetPage();
    }
}

/**
 * @param  {object} datas={}
 * createPassword Action
 */
function* createNewPassword(datas = {}) {
    try {
        const createPassword = yield call(passwordChange, datas);
        actionCreateResetPage(createPassword);
    }
    catch (error) {
        actionErrorResetPage();
    }
}
export default function* resetPassSaga() {
    yield takeLatest(ResetPassPassTypes.DO_RESETPASS_ACTION, doResetAction);
    yield takeLatest(ResetPassPassTypes.DO_CREATE_PASSWORD, createNewPassword);
}
