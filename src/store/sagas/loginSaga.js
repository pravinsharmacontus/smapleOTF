import * as loginTypes from '../actionTypes/loginTypes';
import { put, takeLatest, call, all } from 'redux-saga/effects';
import { fetchLogin, logoutService, registerUserService } from "../../services/LoginServices";
import { succToast, serverNotRespond, failToast } from "../../helper/ApiToast";
import { Encrypt, EncryptLogInDetails, EncryptStoreInLocal, internetStatusEncrypt, userDetailsSet } from "../../helper/Encypt";
import store from '..';
import { doLogin } from '../action/loginAction';
import mixpanel from 'mixpanel-browser';
import { getCustDtlsNew } from '../action/customeAction';
import { handleMixpanelTrack, setCurrentOrg, signUpUpdateToken } from '../../common/helper';

export function* doUserLogin(obj = {}) { //Login Action Created
    try {
        const loginData = yield call(fetchLogin, obj);
        const { data = {} } = loginData || {};
        if (data.status === 200) {
            handleMixpanelTrack("Signin_Success", {
                email: obj.data.email
            });
            mixpanel.identify(data.data.email);
            mixpanel.people.set({
                "$name": data.data.firstName,
                "$email": data.data.email
            });
            yield getCustDtlsNew({ customerId : data.data.userId });
            Encrypt(obj.data);//login Details Store encrpt username and pass
            EncryptStoreInLocal(obj.data);
            succToast(data.message);
            userDetailsSet(data);//if developer store userDetails in sessionStorage for developer purpose
           yield EncryptLogInDetails(data);//user Data pass
            internetStatusEncrypt(true);//online status true
            if(obj.data.regOrgId !== 0 ? true : false){
                setCurrentOrg(obj.data.regOrgId);
            }
            if(obj.data.stateDetails){
               yield signUpUpdateToken(obj.data.stateDetails,data.data.userId,data.data.jwt )
            }

            yield all([
                put({ type: "DO_LOADING_LOGIN_PAGE", loading: false }),//lodering on / off
                put({ type: "DO_LOGIN_SUCCES", logingData: data, loginStatus: true }),//loginData Store
            ]);
             // // const firstName = data.data.firstName + data.data.userId;
            // // const firstName = data.data.email;
            // // const loginUserName = firstName.replace(/[^A-Z0-9]/ig, "").toLowerCase();
            // // InitializeChat(loginUserName)
        } else if (data.status >= 201 && data.status <= 400) {
            handleMixpanelTrack("Signin_Failure", {
                email: obj.data.email,
                errorMessage: data.message
            });
            failToast(data.message);
            yield all([
                put({ type: "DO_LOADING_LOGIN_PAGE", loading: false }),//lodering on / off
                put({ type: "DO_LOGIN_FAIL", loginStatus: false }),//login status
            ]);
        } else {
            handleMixpanelTrack("Signin_Failure", {
                email: obj.data.email,
                errorMessage: data.message
            });
            yield all([
                put({ type: "DO_LOADING_LOGIN_PAGE", loading: false }),//lodering on / off
                put({ type: "DO_LOGIN_FAIL", loginStatus: false }),//login status
            ]);
        }
    }
    catch (error) {
        yield all([
            put({ type: "DO_LOADING_LOGIN_PAGE", loading: false })]);//lodering on / off
    }
}

const passToLogin = async (obj = {}, stateDetails = [],orgDetail = []) => {
    const { data: { password = "", emailId = "", ssoType = "" } = {} } = obj;
    const newObj = {
        email: emailId,
        ssoType: ssoType,
        password: password,
        regOrgId: orgDetail[0]?.orgId,
        stateDetails: stateDetails
    };
    store.dispatch(doLogin(newObj));
};

export function* doRegisterUserSaga(obj = {}) { //Login Action Created
    try {
        const registerResponse = yield call(registerUserService, obj);
        const { data: { status = 0, message = "" } = {} } = registerResponse;
        console.log("singnup",registerResponse)
        if (status === 200) {
            const {data: { data :{ userDetails : {stageDetails = [] ,organisationDetails = []}} = {}} = {} } = registerResponse;
            console.log("signup--",stageDetails)
            handleMixpanelTrack("Signup_Success", {
                ...obj.data,
                email: obj.emailId
            });
            const { data: { ssoType = "", ssoId = "" } = {} } = obj;

            if (ssoType) {
                const newObj = {
                    ...obj,
                    password: ssoId,
                    ssoType: ssoType,
                };
               yield passToLogin(newObj,stageDetails,organisationDetails);
            } else {
                console.log("obj",obj)
               yield passToLogin(obj,stageDetails,organisationDetails);
            }
            mixpanel.identify(obj.data.emailId);
            mixpanel.people.set({
                "$name": obj.data.firstName,
                "$email": obj.data.emailId
            });
           yield passToLogin(obj,stageDetails,organisationDetails);
            yield all([
                put({ type: "REGISTER_USER_LOADER", loading: false }),
            ]);//lodering on / off
        } else {
            handleMixpanelTrack("Signin_Failure", {
                ...obj.data,
                otfName: obj.data.firstName,
                otfEmail: obj.emailId,
                errorMessage: message
            });
            failToast(message);
            yield all([
                put({ type: "REGISTER_USER_LOADER", loading: false }),
            ]);//lodering on / off
        }
    }
    catch (error) {
        console.log("catch",error)
        serverNotRespond();
        yield all([
            put({ type: "REGISTER_USER_LOADER", loading: false }),
        ]);//lodering on / off
    }
}
function* doLogOut(obj = {}) {
    console.log(obj, "dologout");
    try {
      const logout = yield call(logoutService, obj);
      const { data = {} } = logout || {};
      console.log(data,"datadatadata")
      if (data.status === 200) {
        window.sessionStorage.clear();
        window.localStorage.clear();
        refreshPage(); //after logOut reload page
        yield all([
            put({ type: "REGISTER_USER_LOADER", loading: false }),
        ]);//lodering on / off
        succToast(data.message);
      } else if (data.status >= 201 && data.status <= 400) {
        failToast(data.message);
        yield all([
          put({ type: "DO_LOADING_LOGIN_PAGE", loading: false }), //Loader open/close
        ]);
      } else {
        yield all([
          put({ type: "DO_LOADING_LOGIN_PAGE", loading: false }), //lodering on / off
        ]);
      }
    } catch (error) {
      yield all([put({ type: "DO_LOADING_LOGIN_PAGE", loading: false })]);
    }
  }
export default function* rootLoginPostSaga() {
    yield takeLatest(loginTypes.DO_LOGIN, doUserLogin);
    yield takeLatest(loginTypes.REGISTER_NEW_USER, doRegisterUserSaga);
    yield takeLatest(loginTypes.DO_LOGOUT,doLogOut)
}
