import { Put } from "../common/httpRestServices";
import { apiUrl, loginApi } from "../helper/ApiUrl";

export const passwordChange = (obj = {}) => {
    const { data: { password = "", token = "" } } = obj;
    const params = {
        "password": password,
        "passwordResetToken": token
    };
    return Put(`${apiUrl}${loginApi.resetPass}`, params,true);
};
