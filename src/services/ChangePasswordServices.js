import { Put } from '../common/httpRestServices';
import { encodeGetParams } from "../helper/Encypt";
import { apiUrl, passwordApi } from '../helper/ApiUrl';

/**
 *
 * @param {*} obj ={}
 * changePassword service
 */
export const changePwd = (obj = {}) => {
    const { data = {} } = obj;
    const newObj = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
    };
    const queryString = data ? encodeGetParams(newObj) : "";
    return Put(`${apiUrl}${passwordApi.changePwd}${queryString}`, true);
};
