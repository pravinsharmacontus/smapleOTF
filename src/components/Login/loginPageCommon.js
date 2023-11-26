import { Put } from "../../common/httpRestServices";
import { apiUrl, registerApiUrl } from "../../helper/ApiUrl";
import { DecryptLogInDetails } from "../../helper/Encypt";

/**PassWord Type Change */
export const passwordTypeChange = (Type = "") => {
    return Type === "password" ? "text" : "password";
};

/**
 * @param  {string} pathType=""
 * Find url is resetPasswordPage or CreatePasswordPage
 */
export const pathChenage = (pathType = "") => {
    return pathType === "/reset-password/:token" ? true : false;
};

/**
 * @param  {boolean} type=false
 * design purpose
 */
export const errMsgDesignClass = (emptyMail = false, type = false) => {
    if (emptyMail || type) {
        return "input error";
    } return " input ";
};

/**
 * @param  {boolean} type=false
 * design purpose
 */
export const errMsg = (emptyMail = false, type = false) => {
    if (emptyMail) {
        return "LOGIN.PASS_ERR_EMPTY";
    } else if (type) {
        return "LOGIN.PASS_ERR";
    }
    return "";
};

/**
 * @param  {boolean} type=false
 * button enable and disable purpose
 */
export const formValidate = (type = false) => {
    return type === true ? "" : "Invalid";
};

/**
 * @param  {boolean} type=false
 * Heading name change
 */
export const pageHeading = (type = true) => {
    return type === true ? "LOGIN.RESET_YOUR_PASS" : "LOGIN.CREATE_NEW_PASS";
};

/**
 * @param  {boolean} type=false
 * Heading name change
 */
export const buttonName = (type = true) => {
    return type === true ? "LOGIN.SUBMIT" : "LOGIN.CREATE_PASS";
};

/**
 * add cus or Edit cus validate,
 */
export const errorValidateLoginPage = (value = "", valiDate = false) => {
    return value ? !valiDate : false;
};

/**
 * when user not enter email and password throw error
 */
export const emptyErrorMsgThrow = (value = "",) => {
    return value ? false : true;
};

/**
 * when user not enter email and password throw error
 */
export const emptyErrorMsgThrowDegign = (errorMag1 = false, errorMag2 = false, errorMag3 = false,) => {
    if (errorMag1 || errorMag2 || errorMag3) {
        return "input error";
    } return "input";
};

/**
 * input filed not empty hide error msg
 */
export const findEmptyOrNotLoginInput = (value = "") => {
    if (value) {
        return false;
    }
    return null;
};

/**
 * empty input pree login button show error msg
 */
export const emptyInputErrorMsgThrow = (inputValue = "") => {
    return inputValue ? false : true;
};

export const resetPasswortErrorValiDate = (passwordValue = "", Password = false) => {
    return passwordValue ? !Password : false;
};

export const userLogRoleId = () => {
    const userDetails = DecryptLogInDetails() || {};//logged userDetails
    const { data: { userRoleId = 0 } = {} } = userDetails;//logedinUserDetails
    return userRoleId;
};

export const loginEmailValidate = (vaidateToken = "") => {
    const str = vaidateToken.substring(1);
    const newObj = {
        emailValidateToken: str
    };
    return Put(`${apiUrl}${registerApiUrl.userValidate}`, newObj);
};
