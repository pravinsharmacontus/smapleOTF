import { Post } from "../common/httpRestServices";
import { apiUrl, loginApi } from "../helper/ApiUrl";

export const forgetPassReques = (obj = {}) => {
    const { data: { email = "" } = {} } = obj;
    const forgetParams = {
        "email": email
    };
    return Post(`${apiUrl}${loginApi.forgetPass}`, forgetParams,true);
};
