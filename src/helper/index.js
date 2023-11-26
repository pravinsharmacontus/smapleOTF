import moment from "moment";
import _get from "lodash/get";
import { infoToast } from "./ApiToast";
import { locationFindUrl } from "./ApiUrl";
import { convertToLowerCase } from "./Validation";
import { constantValue } from "../const/errorTypes";

/**
 * @param  {string} value=""
 */
export const DateTimeFormeterStart = (value = "") => {
  return value ? moment(value).format("YYYY-MM-DDT00:00") : "";
};

/**
 * @param  {string} value=""
 */
export const DateTimeFormeterEnd = (value = "") => {
  return value ? moment(value).format("YYYY-MM-DDT23:59") : "";
};

/**
 * @param  {string} value=""
 * seletected date convert to milli sec
 */
export const DateTimeFormeterMilliSec = (value = "") => {
  return value ? moment.utc(value).valueOf() : "";
};

/**
 * @param  {object} event
 * input allow only number
 */
export const numOnlyAllow = (event = {}) => {
  if (!/\d/.test(event.key)) {
    event && event.preventDefault && event.preventDefault();
  }
};

/**
 * @param  {object} event
 * input allow alph and number  only
 */
export const numAndCharOnlyAllow = (event = {}) => {
  if (!/[a-zA-Z0-9]/.test(event.key)) {
    event && event.preventDefault && event.preventDefault();
  }
};

/**
 * @param  {object} event
 * input allow only number
 */
export const processInput = (e = {}) => {
  const value = _get(e, "target.value", "");
  const numbers = value.replace(/\D/g, "");
  e.target.value = numbers;
};

/**
 * @param  {object} event
 * input allow only number and char
 */
export const allowOnlyNumAndChar = (e = {}) => {
  const value = _get(e, "target.value", "");
  const numbers = value.replace(/[a-zA-Z0-9]/g, "");
  e.target.value = numbers;
};

/**
 * @param  {object} date
 * moment library use convert local time
 */
export const utcTolocalConvert = (date = "") => {
  return date ? moment(new Date(`${date}`)).format("MMM DD, YYYY") : "";
};

export const utcToISOConvert = (date = "") => {
  if (date) {
    const dateISO = date ? moment(new Date(`${date}`)).toISOString() : "";
    return dateISO
      ? moment(new Date(`${dateISO.split("T")[0]}`)).format("MMM DD, YYYY")
      : "";
  }
  return "";
};

export const utcToISOConvertTime = (dateOfLastLogin = "") => {
  if (dateOfLastLogin) {
    const dateOfLastLoginIso = new Date(dateOfLastLogin).toISOString();
    return moment(dateOfLastLoginIso).format("DD MMM YYYY, hh:mmA");
  }
  return "";
};

export const momentUTCtoIST = (dateOfLastLogin = "") => {
  if (dateOfLastLogin) {
    return moment.utc(dateOfLastLogin).local().format("DD/MM/YYYY h:mm A");
  }
  return "";
};

export const momentUTCtoISTWithComma = (dateOfLastLogin = "") => {
  if (dateOfLastLogin) {
    return moment.utc(dateOfLastLogin).local().format("DD/MM/YYYY, h:mm A");
  }
  return "";
};

export const momentUTCtoISTDate = (dateOfLastLogin = "") => {
  if (dateOfLastLogin) {
    return moment.utc(dateOfLastLogin).local().format("DD/MM/YYYY");
  }
  return "";
};

export const momentUTCtoISTTime = (dateOfLastLogin = "") => {
  if (dateOfLastLogin) {
    return moment.utc(dateOfLastLogin).local().format("h:mmA");
  }
  return "";
};

/**
 * @param  {object} date
 * moment library use convert local time
 */
export const utcTolocalConvertTimeDate = (date = "") => {
  return date ? moment(new Date(`${date}`)).format("MMM DD, YYYY HH:mm a") : "";
};

/**
 * @param  {object} date
 * moment library use milli sec to local time
 */
export const millisecToIstConvert = (date = "") => {
  const dateValue = +date;
  try {
    return dateValue
      ? moment
          .utc(dateValue * 1000)
          .local()
          .format("DD MMM YYYY HH:mm a")
      : "";
  } catch (error) {
    return "";
  }
};

/**
 * @param  {object} date
 * moment library use milli sec to local time
 */
export const dateToIstConvert = (date = "") => {
  try {
    return date
      ? moment(new Date(`${date}`)).format("DD MMM YYYY HH:mm a")
      : "";
  } catch (error) {
    return "";
  }
};

/**
 * @param  {object} date
 * moment library use convert local time
 */
export const dateMonthYearFormate = (date = "") => {
  return date ? moment(new Date(`${date}`)).format("DD MM, YYYY") : "";
};

/**
 * @param  {object} date
 * check given date is future date or past date
 */
export const checkIsFutureDate = (date = "") => {
  return date ? moment(new Date(`${date}`)).isAfter(moment(), "day") : false;
};

/**
 * @param  {string} value
 * Remove White space
 */
export const leadingAndTrailingspaceAvoid = (value = "") => {
  if (value) {
    const removeExtraSpace = (s) => (s || "").trim().split(/ +/).join(" ");
    return removeExtraSpace(value);
  }
  return "";
};

/**
 * @param  {string} value=""
 * @param  {string} stringLength=1000 Default value is 1000
 * text length is moreThen fixed place disPlay like ...
 */
export const titleToast = (value = "", stringLength = 1000) => {
  if (value !== "") {
    return convertToLowerCase(value).length > stringLength
      ? value.toString().substring(0, parseInt(stringLength)).concat("...")
      : value;
  }
  return "";
};

/**
 * @param  {string} text=""
 * @param  {string} stringLength=1000 Default value is 1000
 * text length is moreThen fixed place display a title card
 */
export const titleCart = (text = "", stringLength = 1) => {
  if (text !== "") {
    return convertToLowerCase(text).length >= stringLength ? text : null;
  }
  return null;
};

/**
 * @param  {string} name=""
 * letter splint
 */
export const getInitials = (name = "") => {
  const names = name.split(" ");
  let initials = names[0].substring(0, 1).toUpperCase();
  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

/**
 * @param  {string} value=""
 * conditinal check and return same value
 */
export const sameValueReturn = (value = "") => {
  return value ? value : "";
};

/**
 * @param  {object} e={}
 * toAvoid paste cut copy
 */
export const onPaste = (e = {}) => {
  infoToast(_get(constantValue, "COPY_PASTE_ERROR", ""));
  e.preventDefault();
};

/**
 * @param  {string} value=""
 * enter value has been change upperCase
 * first letter convert to upperCase
 */
export const toUpperConvertCase = (value = "") => {
  return (value || "")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/**
 * @param  {array} array=[]
 *if length is "0" return false
 *if length is not "0" return true
 */
export const arrayLengthCheck = (array = []) => {
  return array.length !== 0 ? true : false;
};

/**
 * when interNet connet back page reload
 */
export const refreshPage = () => {
  window.location.reload();
};

/**
 * @param  {string} value=""
 */
export const validateNullCheck = (input) => {
  return input === "undefined" ? "" : input;
};

export const nullCheckString = (value = "") => {
  if (value) {
    return value;
  }
  return "";
};

/**
 * null exception check
 * null to array check
 * @param {array} value
 */
export const nullCheckArray = (value = null) => {
  if (value) {
    return value;
  }
  return [];
};

export const fetchLocalLocation = async () => {
  fetch(locationFindUrl) //location find api call
    .then((response) => response.json())
    .then((localData) => {
      const localDataStore = localData || {};
      const { country_code: cCode = "" } = localDataStore;
      const { data: { country_code: countryCode } = {} } = localDataStore;
      sessionStorage.setItem("country_code", cCode ? cCode : countryCode);
    })
    .catch(() => {
      //have write condition check undefined is string so if error call defult assign undefined
      sessionStorage.setItem("country_code", "undefined");
    });
};
