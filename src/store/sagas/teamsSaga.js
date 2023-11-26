import * as teamsTypes from '../actionTypes/teamsTypes';
import { put, call, takeLatest, all } from 'redux-saga/effects';
import {
    failToast,
    infoToast,
    succToast,
    serverNotRespond,
} from "../../helper/ApiToast";
import {
    addTeamMember,
    deleteMemberList,
    updateUserDetail,
    getMemberListData,
    getSingleUserDetails,
    getTeamsList,
} from '../../services/teamsServices';

/**
 * @param  {object} obj
 * add new member
 */
function* addMemberSaga(obj = {}) {
    yield put({ type: "DO_LOADING_PAGE", loading: true });
    try {
        const response = yield call(addTeamMember, obj);
        const { data: { status = 0, message = "" } = {} } = response || {};
        if (status === 200) {
            succToast(message);
            yield put({ type: "MEMBER_POPUP_OPEN", memberPopupOpen: false });
        } else {
            failToast(message);
        }
        const resData = yield call(getTeamsList, obj.data.searchData);
        if (resData?.data?.status === 200) {
            yield put({ type: "DO_INVITE_MEMBER_LIST", inviteMember: resData?.data || {} });
        }
    }
    catch (error) {
        serverNotRespond();
    }
    yield put({ type: "DO_LOADING_PAGE", loading: false });
}

/**
 * @param  {object} obj
 * update
 */
function* updateUserDetails(obj = {}) {
    yield put({ type: "DO_LOADING_PAGE", loading: true });

    try {
        const updateCusData = yield call(updateUserDetail, obj);
        const { data: { status = 0, message = "" } = {} } = updateCusData || {};
        if (status === 200) {
            succToast(message || "Member updated successfully");
            yield put({ type: "MEMBER_POPUP_OPEN", memberPopupOpen: false });
        } else {
            failToast(message);
        }
        const resData = yield call(getTeamsList, obj.data.searchData);
        if (resData?.data?.status === 200) {
            yield put({ type: "DO_INVITE_MEMBER_LIST", inviteMember: resData?.data || {} });
        }
    }
    catch (error) {
        serverNotRespond();
    }
    yield put({ type: "DO_LOADING_PAGE", loading: false });
}

/**
 * @param  {object} obj={}
 * getMemberList
 */
function* getMemberList(obj = {}) { //GetMember Data
    try {
        const response = yield call(getMemberListData, obj);
        const { data = {} } = response || {};
        const { status = 0 } = data || {};
        if (status >= 200 && status <= 300) {
            yield all([
                put({ type: "GET_MEMBER_LIST_DATA", MemberData: data }),//GetMember List and store
                put({ type: "GET_MEMBER_LIST_DATA_LOAD", memberListLoad: false }),
            ]);
        } else {
            serverNotRespond(); //serverIs Not Respont Call this Toast
            yield all([
                put({ type: "GET_MEMBER_LIST_DATA_LOAD", memberListLoad: false }),
            ]);
        }
    }
    catch (error) {
        serverNotRespond(); //serverIs Not Respont Call this Toast
        yield put({ type: "GET_MEMBER_LIST_DATA_LOAD", memberListLoad: false });
    }
}

/**
 * @param  {object} obj;
 * inside object have array is contain
 * have user deleted id
*/
function* deleteMember(obj = {}) {
    yield put({ type: "DO_LOADING_PAGE", loading: true });
    try {
        const delCusData = yield call(deleteMemberList, obj.data.singleDelete || []);
        const { data: { status = 0, message = "" } = {} } = delCusData || {};
        if (status === 200) {
            succToast(message);
        } else {
            message ? infoToast(message) : serverNotRespond();
        }
        const resData = yield call(getTeamsList, obj.data.searchData);
        if (resData?.data?.status === 200) {
            yield put({ type: "DO_INVITE_MEMBER_LIST", inviteMember: resData?.data || {} });
        }
    }
    catch (error) {
        serverNotRespond();
    }
    yield put({ type: "DO_LOADING_PAGE", loading: false });
}

function* getUserDetails(obj = {}) {
    try {
        const delCusData = yield call(getSingleUserDetails, obj);
        const { data: { status = 0, message = "", data: { userDetails = {} } = {} } = {} } = delCusData || {};
        if (status === 200) {
            yield all([
                put({ type: "MEMBER_CUSTOMER_DETAILS", userDtls: userDetails }),//Result Store
                put({ type: "EDIT_MEMBER_LOADER", editLoader: false }),//Loader open/close
            ]);
        } else {
            failToast(message);
            yield all([
                put({ type: "MEMBER_CUSTOMER_DETAILS", userDtls: {} }),//Result Store
                put({ type: "EDIT_MEMBER_LOADER", editLoader: false }),//Loader open/close
            ]);
        }
    }
    catch (error) {
        yield all([
            put({ type: "EDIT_MEMBER_LOADER", editLoader: false }),// Loader open/close
        ]);
        serverNotRespond(); //serverIs Not Respont Call this Toast
    }
}
export default function* teamsSaga() {
    yield takeLatest(teamsTypes.MEMBER_DELETE, deleteMember);
    yield takeLatest(teamsTypes.TYPE_ADD_MEMBER, addMemberSaga);
    yield takeLatest(teamsTypes.GET_MEMBER_LIST, getMemberList);
    yield takeLatest(teamsTypes.GET_MEMBER_DETAILS, getUserDetails);
    yield takeLatest(teamsTypes.UPDATE_MEMBER_DETAILS, updateUserDetails);
}
