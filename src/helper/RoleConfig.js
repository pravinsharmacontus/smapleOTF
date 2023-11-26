import _get from "lodash/get";
import { DecryptLogInDetails } from "./Encypt";
import { constantValue } from "../const/errorTypes";

export const CustomersPage = ["1", "2"];
export const TeamsPage = ["1", "2", "4",];
export const PaymentPage = ["1", "2", "4"];
export const APPVersionsPage = ["1", "2", "3"];
export const ClientDashoardPage = ["1", "2", "4"];
export const callusageinfo = ["1", "2", "3", "4",];//call usage only for cus side super admin
export const paymentPagePermission = ["1", "2", "4",];//cus side superAdmin side
export const HelpPage = ["1", "2", "3", "4", "5", "6", "7"];
export const PopupPage = ["1", "2", "3", "4", "5", "6", "7"];
export const SettingPage = ["1", "2", "3", "4", "5", "6", "7"];
export const DashboardPage = ["1", "2", "3", "4", "5", "6", "7"];
export const Allpermission = ["1", "2", "3", "4", "5", "6", "7"];//for all permission

export const moveToLoginPage = (msg = "") => {
    const errorMsg = msg ? msg : constantValue.UNAUTHORIZED_SESSION_ACCOUNT;
    setTimeout(() => {
        console.log("UNAUTHORIZED_SESSION_ACCOUNT",errorMsg);
    }, 500);
};

/**
 * @param  {Array} allowedRoles;
 * everyPage have allowed userRole based id ;
 * UserDetails is initial null ,get value from  local and check

For customer screen
customer=>4
customeradmin => 5,
customermoderator => 6,
customerdeveloper => 7

For Super admin screen
portalsuperadmin => 1
portaladmin => 2
portaldeveloper => 3
*/

export const userRolePermission = (allowedRoles = []) => {
    if (localStorage.getItem("userData") !== null) {
        const userDetails = window.localStorage.getItem("userData") && DecryptLogInDetails();
        if ("userRoleId" in _get(userDetails, "data", {})) {
            const { data: { userRoleId = 0 } = {} } = userDetails || {};
            const roleValue = JSON.stringify(userRoleId);
            return allowedRoles.includes(roleValue);
        }
        return false;
    }
    return false;//userData is null Move to loginPage
};

/**
 * login user roleId
 */
export const roleIdPass = () => {
    if (localStorage.getItem("userData") !== null) {
        const userDetails = window.localStorage.getItem("userData") && DecryptLogInDetails();
        if ("userRoleId" in _get(userDetails, "data", {})) {
            const { data: { userRoleId = 0 } = {} } = userDetails || {};
            return userRoleId;
        }
        return 0;
    }
    return 0;
};

export const userDetailsLocal = () => {
    if (localStorage.getItem("userData") !== null) {
        return window.localStorage.getItem("userData") && DecryptLogInDetails();
    }
    return {};
};
