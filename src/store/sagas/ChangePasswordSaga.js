import { Decrypt, Encrypt, EncryptStoreInLocal } from "../../helper/Encypt";
import { call, put, all, takeLatest } from "redux-saga/effects";
import { changePwd } from "../../services/ChangePasswordServices";
import * as changePasswordTypes from "../actionTypes/changePasswordTypes";
import { succToast, failToast, serverNotRespond } from "../../helper/ApiToast";

export function* doChngPasswrd(obj = {}) {//chnagepassword created
    try {
        const changPasswd = yield call(changePwd, obj);
        const { data = {} } = changPasswd || {};
        if (data.status === 200) {
            succToast(data.message);
            const { data: { newPassword = "" } = {} } = obj || {};
            const loginDetails = Decrypt();//updated password is decrypted and saved for developer purpose
            loginDetails.password = newPassword;
            Encrypt(loginDetails);//encrypted with update password
            EncryptStoreInLocal(loginDetails)
            yield all([
                put({ type: 'CHANGE_PASSWORD_LOADER', isLoading: false }),//loader on off
            ]);
            yield all([
                put({ type: 'CHANGE_PASSWORD_SUCESS', isSucess: true })//reset the fields after updatepassword
            ]);

        } else if (data.status >= 201 && data.status <= 400) {
            failToast(data.message);
            yield all([
                put({ type: 'CHANGE_PASSWORD_LOADER', isLoading: false })//loader on or off
            ]);
            yield all([
                put({ type: 'CHANGE_PASSWORD_SUCESS', isSucess: false })//dont reset the fields if any error
            ]);
        } else {
            serverNotRespond(data.message);
            yield all([
                put({ type: 'CHANGE_PASSWORD_LOADER', isLoading: false })//loader on or off
            ]);
            yield all([
                put({ type: 'CHANGE_PASSWORD_SUCESS', isSucess: false })//dont reset the fields if any error
            ]);
        }
    }
    catch (error) {
        serverNotRespond();
        yield all([
            put({ type: 'CHANGE_PASSWORD_LOADER', isLoading: false }),//loader on off
        ]);
        yield all([
            put({ type: 'CHANGE_PASSWORD_SUCESS', isSucess: false })//dont reset the fields if any error
        ]);
    }
}

export default function* rootChangePswPostSaga() {
    yield takeLatest(changePasswordTypes.CHANGE_PASSWORD_INITIAL, doChngPasswrd);
}
