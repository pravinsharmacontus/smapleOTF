import store from "../../../store";
import { Get, getWithOutToken } from "../../../common/httpRestServices";
import { encodeGetParams } from "../../../helper/Encypt";
import { apiUrl, ssoLoginDetails } from "../../../helper/ApiUrl";

//SSO login response details store
export const storeSSOLoginResponseDetails = (responses = {}) => {
    store.dispatch({
        type: "SSO_LOGIN_RESPONSE_DETAILS",
        ssoResponseDetails: responses,
    });
};

//SSOlogin checking
export const ssoLoginChecking = (responses = {}) => {
    const { email = "", unique = "", type = "" } = responses;
    const newObj = {
        email: email,
        ssoId: unique,
        ssoType: type,
    };
    const urlEncode = encodeGetParams(newObj);
    return Get(`${apiUrl}${ssoLoginDetails.ssoLoginCheck}?${urlEncode}`);
};

export const linkedInGenrateAccessToken = (accessTioken = {}) => {
    const {
        codes = "",
    } = accessTioken;
    return Get(`${apiUrl}${ssoLoginDetails.linkedIn}?code=${codes}`, true);
};

export const getGoogleUserDetails = async (accToken = "") => {
    return await getWithOutToken(`${apiUrl}${ssoLoginDetails.ssoDetaisGetGoogle}?accessToken=${accToken}`);
};

export const getLinketInUserDetails = async (accToken = "") => {
    return await getWithOutToken(`${apiUrl}${ssoLoginDetails.ssoDetaislinkedin}?code=${accToken}`);
};
