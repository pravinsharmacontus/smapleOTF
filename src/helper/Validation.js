import moment from "moment";
import _get from "lodash/get";
import { getWithOutToken } from "../common/httpRestServices";
import { envPath, loacteFineUrl, userLoaction } from "../helper/ApiUrl";
import {
  isPossiblePhoneNumber,
  getCountryCallingCode,
} from "react-phone-number-input";
import store from "../store";
import { doLogout } from "../store/action/loginAction";
import { updateCallStatusAction, updateScreenShareStream } from "../store/action/awsActions";
import { updateGoLive, updateScreenShare } from "../firebase/firebaseRealtimeFunctions";
import { currentStageArrn, getCurrentOrgId, getCurrentUserId, isHost } from "./utility";

const md5 = require("md5");

export const devEnvironment = () => {
  return envPath === "dev" ? true : false;
};

/**
 * @param  {string} number
 * date to millisec conevrt
 */
export const convertDateToMillisec = (value = "") => {
  try {
    return moment(value).valueOf();
  } catch {
    return 0;
  }
};

/**
 * convert lower case
 * @param string
 */
export const spaceRemoveLowerCase = (convertValue = "") => {
  return (convertValue || "").toString().toLowerCase().split(" ").join("");
};

/**
 * convert lower case
 * @param string
 */
export const convertToLowerCase = (convertValue = "") => {
  return (convertValue || "").toString().toLowerCase();
};

/**
 * convert Upper case
 * @param string
 */
export const convertToUpperCase = (convertValue = "") => {
  return (convertValue || "").toString().toUpperCase();
};

export const getLocate = async () => {
  const getLoactionResponse = await getWithOutToken(loacteFineUrl);
  const { status: getLoactionStatus = 0, data: getLoactionData = {} } =
    getLoactionResponse || {};
  if (getLoactionStatus === 200) {
    return {
      IPv4: _get(getLoactionData, "ip", ""),
    };
  } else {
    return {
      IPv4: userLoaction, //may be ip not get javascript use get user location
    };
  }
};

/**
 * pass cookies name
 * get from cookiees value
 * @param {string} cookieName
 */
export const getCookieByName = (cookieName = "") => {
  if (document && document.cookie) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${cookieName}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  return "";
};
/**
 * convert Password md5 formate
 * @param {string} value;
 */
export const passwordEncrypt = (value = "") => {
  return md5(value);
};

export const imageValidate = (value = "") => {
  const allowFormet = ["jpeg", "png", "jpg", "PNG"];
  const extension = value.split(".").pop();
  return allowFormet.includes(extension);
};

export const imageSize = (value = 0) => {
  const size = value > 1e6;
  return size ? false : true;
};

/**
 * @param  {string} pnum=""
 * @param  {string} countryCode=""
 * @returns {boolean}
 * phone num validation
 */
export const PhoneNumValidate = (pnum = "", countryCode = "") => {
  if (convertToLowerCase(countryCode) === convertToLowerCase("in")) {
    return convertToLowerCase(pnum).length === 10 ? true : false;
  } else {
    if (isNaN(Number(countryCode))) {
      return isPossiblePhoneNumber(
        `+${getCountryCallingCode(countryCode)}${pnum}`
        , countryCode);
    }
    return false;
  }
};

export const EmailValidate = (email = "") => {
  const reg =
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return !reg.test(email) ? false : true;
};

export const publicEmailValidate = (email = "") => {
  const bannedDomains = ["gmail.com", "yahoo.com", "hotmail.com"];
  const domain = email.split("@")[1] || "";
  return !bannedDomains.some(
    (ele) => convertToLowerCase(ele) === convertToLowerCase(domain)
  );
};

/**
 * @param  {string} password
 * password allow user stories format
 * 1 Cap char
 * 1 Small Char
 * 1 Number
 * 8 digit Must
 */
export const passwordValidate = (password = "") => {
  const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])((?=.*\W)|(?=.*_)).{8,}$/;
  return reg.test(password) ? true : false;
};
/**
 * find number
 * @param {object} objDatas
 */
export const filterCountGet = (objDatas = {}) => {
  let valueCount = 0;
  Object.values(objDatas).forEach((val) => {
    if (
      convertToLowerCase(val) !== convertToLowerCase("all") &&
      convertToLowerCase(val) !== ""
    ) {
      valueCount = valueCount + 1;
    }
  });
  return valueCount;
};

export const validateForm = (errors = {}) => {
  let valid = true;
  Object.values(errors).forEach((val) => {
    if (val !== true) {
      valid = false;
    }
  });
  return valid;
};

export const validateForm2 = (values = {}) => {
  const error = {};
  if (values.fireBaseKey === "" && values.bundleIdAndroid !== "") {
    error["fireBaseKey"] =
      "Firebase key is mandatory if Android Package Name is provided";
  } else if (values.fireBaseKey !== "" && values.bundleIdAndroid === "") {
    error["bundleIdAndroid"] =
      "Android Package Name is mandatory if Firebase key is provided";
  }
  return error;
};

//create and resetpassword page
export const passwordMatchCheck = ({ newPassword = "", conpassword = "" }) => {
  return newPassword === conpassword;
};

//if input field non-empty
export const emptyCheck = (value = "") => {
  return convertToLowerCase(value) !== "";
};

export const ticketSubject = (value = "") => {
  return _get(value, "length", 0) <= 250 && _get(value, "length", 0) >= 1;
};

//customer page and memberPage  name validate
export const nameValidate = (value = "") => {
  return _get(value, "length", 0) <= 50 && _get(value, "length", 0) >= 1;
};

//Platform name validate
export const productNameValidate = (value = "") => {
  return _get(value, "length", 0) <= 15 && _get(value, "length", 0) >= 1;
};

//BroadCaste Title validate
export const titleNameValidate = (value = "") => {
  return _get(value, "length", 0) <= 128 && _get(value, "length", 0) >= 1;
};

//appversion page Details char limit
export const detailsValidate = (value = "") => {
  return _get(value, "length", 0) <= 500 && _get(value, "length", 0) >= 1;
};

export const ticketDiscription = (value = "") => {
  return _get(value, "length", 0) <= 2000 && _get(value, "length", 0) >= 1;
};

export const addressValidate = (value = "") => {
  return _get(value, "length", 0) <= 100 && _get(value, "length", 0) >= 1;
};

export const pincodeValidate = (value = "") => {
  return _get(value, "length", 0) <= 7 && _get(value, "length", 0) >= 4;
};

export const locationValidate = (value = "") => {
  return _get(value, "length", 0) <= 50;
};

//add cus page total member allow only 5 digit
export const totalUserValidate = (value = "") => {
  return convertToLowerCase(value).length <= 5 &&
    convertToLowerCase(value).length >= 1
    ? true
    : false;
};

export const checkWhiteSpaces = (value = "") => {
  if (typeof value !== "string") {
    // check if the string variable is some type other than string
    return false;
  } else {
    return value.trim().length > 0;
  }
};

export const startWithAlphanumeric = (value = "") => {
  const pattern = /^[a-zA-Z]/;
  return value.match(pattern) ? false : true;
};

export function containsEmoji(value = "") {
  // eslint-disable-next-line
  const pattern = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
  return value.match(pattern) ? false : true;
}

export const underscoreNotAllowed = (value = "") => {
  const pattern = /^[A-Za-z0-9 ]+$/;
  return value.match(pattern) ? false : true;
};

export const replaceSpacesWithNonbreakSpace = (value = "") => {
  // Use a regular expression to find all occurrences of a space (" ")
  // and replace them with a non-breaking space ("\xa0")
  const resultString = value.replace(/ /g, '\xa0');
  return resultString;
};

/**
 * @param  {string} value
 * validate if value is not "0"
 */
export const appversionPalnType = (value = "") => {
  return value !== "0";
};

/**
 * @param  {string} value
 * add app version SDK format check
 */
export const sdkValidate = (value = "") => {
  const allowFormet = ["zip", "rar", "tar", "gz", "tgz"];
  const extension = value.split(".").pop();
  return allowFormet.includes(extension);
};

export const sdkSizeValidate = (value = "") => {
  const size = value > 1e8;
  return size ? false : true;
};

export const docSizeValidate = (docsValue = "") => {
  const docSize = docsValue > 1e6;
  return docSize ? false : true;
};

/**
 * @param  {string} value
 * add app version doc format check
 */
export const docValidate = (value = "") => {
  const allowFormet = ["doc", "docx", "pdf", "odt", "txt"];
  const extension = value.split(".").pop();
  return allowFormet.includes(extension);
};

export const validateFormEmpty = (errors = {}) => {
  let valid = false;
  Object.values(errors).forEach((val) => {
    if (val !== "") {
      valid = true;
    }
  });
  return valid;
};

export const emptyCheckAllData = (obj = {}) => {
  let valid = true;
  Object.values(obj).forEach((val) => {
    if (val === "") {
      valid = false;
    }
  });
  return valid;
};

/**
 * @param  {string} value=""
 * white space check
 */
export const hasWhiteSpaces = (value = "") => {
  return value === null || value.trim() === "" ? false : true;
};

export const ageOfDeviceCalculation = (expireDate = "") => {
  const currenDate = moment(new Date()).format("DD/MM/YYYY");
  const nowDate = moment(currenDate, "DD/MM/YYYY");
  const expire = moment(expireDate).format("YYYY-MM-DD");
  const end = moment(expire);
  try {
    return end.diff(nowDate, "days") + 1;
  } catch {
    return "";
  }
};

/**
 * ipaddress validate
 * @param {string} e
 */
export const validateIPaddress = (e = "") => {
  const ip =
    /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
  return ip.test(e) ? true : false;
};

/**
 * Version validate
 * @param {string} e
 */
export const validateVersion = (e = "") => {
  const version = /[^a-zA-Z0-9\.]/;
  return version.test(e) ? true : false;
};

/**
 *  Validate Platform Name
 * Only allows space and dots (.)
 * @param {string} e
 */
export const validatePlatformProductName = (e = "") => {
  const version = /^[a-zA-Z\d\.\s]+$/;
  return version.test(e) ? true : false;
};

export const convertUTCDateToLocalDate = (date = "") => {
  const numberConvert = +date;
  return moment(numberConvert).format("YYYY-MM-DD HH:mm:ss");
};

export const nullToObject = (obj = null) => {
  return obj ? obj : {};
};

/**
 * User logOut
 * clear sessionStorage
 */
export const _userLogout = (data = {}, ownUser = {}, _awsStageReducer = {}) => {
  const _stageArn = currentStageArrn(_awsStageReducer)
  const broadcastBranding = store.getState()?.broadcastBranding; //store
  const fbIsScreenShare = broadcastBranding?.isScreenShare || false;
  if (getCurrentUserId() === fbIsScreenShare) {
    const screenUnload = {
      screenShare: {},
    };
    store.dispatch(updateScreenShareStream(screenUnload));
    updateScreenShare(getCurrentOrgId(), false);
  }

  const host = isHost(_awsStageReducer)
  console.log("data--logout", data, ownUser, _awsStageReducer, _stageArn, host)
  if (_stageArn && host) {
    store.dispatch(
      updateCallStatusAction({
        stageArn: _stageArn,
        callStatus: "ended",
      }))
    updateGoLive(
      getCurrentOrgId(),
      currentStageArrn(_awsStageReducer),
      "ended"
    );
  }
  store.dispatch(doLogout(data, ownUser));
  store.dispatch({ type: "REGISTER_USER_LOADER", loading: true }); //loader when editing customerdetails
};

export const taxCollectionDeCode = (taxCollections = "") => {
  if (taxCollections) {
    const stringData = decodeURI(taxCollections);
    return stringData ? JSON.parse(stringData) : {};
  }
  return {};
};
