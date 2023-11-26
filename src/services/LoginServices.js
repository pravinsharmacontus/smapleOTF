import { Post } from "../common/httpRestServices";
import { apiUrl, loginApi, registerApiUrl } from "../helper/ApiUrl";

export const fetchLogin = (obj = {}) => {
    const { data: { email = "", password = "", ssoType = "" } = {} } = obj;
    const logValue = {
        "email": email,
        "ssoType": ssoType,
        "password": password,
    };
    return Post(`${apiUrl}${loginApi.logIn}`, logValue,true);
};

export const registerUserService = (obj = {}) => {
    const { data = {} } = obj;
    return Post(`${apiUrl}${registerApiUrl.trialUser}`, data, true);
};

export const logoutService = (obj = {}) => {
 console.log("logout",obj);
 return Post(`${apiUrl}${loginApi.logout}?orgId=${obj.data.organisationId}&userId=${obj.ownUser.userId}`,{},true);
}
