import { roleIdPass } from '../../../../../helper/RoleConfig';
import { ImgCustomerPlaceholer } from '../../../../../assets/images';
import { superAdminRole, superCustomerRole, AdminRoleTeams } from "../../../../../common/MonckDataJson";
// /src/common/MonckDataJson.js
/**
 * user logIn based role defiend
 */

export const roleDefined = (fromAdmin = false) => {
    const userRoleId = roleIdPass() || 0;
    if (userRoleId === 1) {
        return superAdminRole;
    } else if (userRoleId === 2) {
        return fromAdmin ? superAdminRole : AdminRoleTeams;//from TeamBody.jsx fromAdmin--->true otherwise false
    } else if (userRoleId === 4 || userRoleId === 5) {
        return superCustomerRole;
    } else {
        return [];
    }
};
/**
 * userLogin base default value define
 * superAdmin means 1
 * portal admin means 4
 */
export const userRoleIdDefine = (userRoleId = 4) => {
    if (userRoleId === 1 || userRoleId === 2) {
        return "portaladmin";
    } else if (userRoleId === 4 || userRoleId === 5) {
        return "portalsuperadmin";
    } else {
        return "";
    }
};

/**
 * Form not validate and validate defined
 * @returns if valid "Btn" return
 * @returns if not valid "Btn disabled" return
 */
export const createTeamButtonStyle = (isValidForm = false) => {
    return isValidForm ? "Btn" : "Btn disabled";
};

/**
 * add and Edit button show based in conditonal
 * userId is customer unique id
 */
export const addAndeditMember = (state = false) => {
    return state ? "Edit Member" : "Add Member";
};

/**
 * if value is not empty return same value otherwise reurn empty
 */
export const valueCheckisEmpty = (value = "") => {
    return value ? value : "";
};

/**
 * contional check for addMember and edit member Status
 */
export const constionalReturn = (status = true) => {
    return status === true ? true : false;
};

/**
 * image is null return defalut placeHolder
 */
export const imageReturn = (image = null, placHolderImage = "") => {
    return image ? image : placHolderImage;
};

/**
 * roleId return
 */
export const roleIdReturn = (role = null) => {
    return role ? role.value : "";
};

/**
 * profile Image is empty send to default image
 */
export const TeamsPageProfile = (profileImage = "") => {
    return profileImage ? profileImage : ImgCustomerPlaceholer;
};

/**
 * add cus or Edit cus validate,
 */
export const editCusManage = (userId = "", loadEditPage = false) => {
    return userId && !loadEditPage ? true : false;
};

/**
 * add cus or Edit cus validate,
 */
export const errorValidateTeamsPage = (value = "", valiDate = false) => {
    return value ? !valiDate : false;
};

export const editandViewMode = (value = false) => {
    return !value ? "editMode" : "ViewMode";
};
