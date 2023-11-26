import CryptoES from 'crypto-es';
import CryptoJS from "crypto-js";
import { secretKEY } from "./ApiUrl";
import { moveToLoginPage } from "./RoleConfig";

let userToken = "";

const logOutUnAuthCall = () => {
  moveToLoginPage();
};

/**
 * @param  {object} value;
 * user input encrypt Here
 */
export const customerIdEncrypt = (value = 0) => {
  try {
    const cipherEncrypt = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      secretKEY
    );
    sessionStorage.setItem("cryptoJScustomerId", cipherEncrypt);
    return true;
  } catch (e) {
    return null;
  }
};

export const decryptProfileDetails = (
  data = "",
  decrptKey = "",
  licenseKey = ""
) => {
  try {
    const key = CryptoES.enc.Hex.parse(CryptoES.SHA256(decrptKey, 32));
    return decodeURIComponent(CryptoES.AES.decrypt(data, key, licenseKey));
  } catch (error) {
    return data;
  }
};

export const customerIdDecrypt = () => {
  if (sessionStorage.getItem("cryptoJScustomerId") !== null) {
    try {
      const cipherDecrypt = sessionStorage.getItem("cryptoJScustomerId");
      const bytes = CryptoJS.AES.decrypt(cipherDecrypt.toString(), secretKEY);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (e) {
      return null;
    }
  } else {
    logOutUnAuthCall();
  }
};

/**
 * @param  {object} value;
 * user input encrypt Here
 */
export const Encrypt = (value = {}) => {
  try {
    const cipherlogUser = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      secretKEY
    );
    localStorage.setItem("cipherlogUser", cipherlogUser);
    return true;
  } catch (e) {
    return null;
  }
};

/**
 * @param  {object} value;
 * user input encrypt Here
 */
export const EncryptStoreInLocal = (value = {}) => {
  window.localStorage.setItem("encryptuserDetail", JSON.stringify(value));
};

/**
 * encrypt value decrypt Here
 */
export const Decrypt = () => {
  if (localStorage.getItem("cipherlogUser") !== null) {
    try {
      const ciphertext = localStorage.getItem("cipherlogUser");
      const bytes = CryptoJS.AES.decrypt(ciphertext.toString(), secretKEY);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (e) {
      return null;
    }
  } else {
    logOutUnAuthCall();
  }
};

/**
 * @param  {object} value;
 * user input encrypt Here
 */
export const EncryptLogInDetails = (value = {}) => {
  const { data: { jwt = "" } = {} } = value;
  userToken = jwt;
  try {
    const cipherlogUser = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      secretKEY
    );
    localStorage.setItem("userData", cipherlogUser);
    return true;
  } catch (e) {
    logOutUnAuthCall();
  }
};

/**
 * encrypt value decrypt Here
 */
export const DecryptLogInDetails = () => {
  try {
    const ciphertext = localStorage.getItem("userData");
    const bytes = CryptoJS.AES.decrypt(ciphertext.toString(), secretKEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) || {};
  } catch (e) {
    console.log("");
  }
};

export const userDetailsSet = (data = {}) => {
  window.localStorage.setItem("userId", JSON.stringify(data.data.userId));
  window.localStorage.setItem("userDetails", JSON.stringify(data));
};

/**
 * @param  {object} params;
 * Api request params convert to queryParams
 */
export const encodeGetParams = (params) => {
  return Object.entries(params)
    .map((key) => key.map(encodeURIComponent).join("="))
    .join("&");
};

/**
 *userToken
 */
export const userDataTokenReturn = () => {
  return userToken;
};

/**
 *internet  online offline stauts
 *encryption
 */
export const internetStatusEncrypt = (stauts = false) => {
  try {
    const cipherlogUser = CryptoJS.AES.encrypt(
      JSON.stringify(stauts),
      secretKEY
    );
    localStorage.setItem("onlineStatus", cipherlogUser);
    return true;
  } catch (e) {
    logOutUnAuthCall();
  }
};

/**
 *internet  online offline stauts
 *Decrypt
 */
export const internetStatusDecrypt = () => {
  try {
    const ciphertext = sessionStorage.getItem("onlineStatus");
    const bytes = CryptoJS.AES.decrypt(ciphertext.toString(), secretKEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (e) {
    logOutUnAuthCall();
  }
};

/**
 * @param  {object} value;
 */
export const payMentEncrypt = (value = {}) => {
  try {
    const payment = CryptoJS.AES.encrypt(JSON.stringify(value), secretKEY);
    sessionStorage.setItem("payment_succeeded_fail", payment);
    return true;
  } catch (e) {
    return null;
  }
};

/**
 * encrypt value decrypt Here
 */
export const payMentDecrypt = () => {
  if (sessionStorage.getItem("payment_succeeded_fail") !== null) {
    try {
      const ciphertext = sessionStorage.getItem("payment_succeeded_fail");
      const bytes = CryptoJS.AES.decrypt(ciphertext.toString(), secretKEY);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (e) {
      return null;
    }
  } else {
    return {};
  }
};

export const decodeRegistertoken = (data) => {
  try {
    return JSON.parse(data);
    // Continue with further processing of the parsed JSON data
  } catch (error) {
    return "";

    // Handle the error, e.g., display an error message to the user
  }
};

export const saveCamMic = (value = {}) => {
  value?.CamId &&
    window.localStorage.setItem("CamId", JSON.stringify(value?.CamId));
  value?.MicId &&
    window.localStorage.setItem("MicId", JSON.stringify(value?.MicId));
  value?.SpeakerId &&
    window.localStorage.setItem("SpeakerId", JSON.stringify(value?.SpeakerId));
};

export const getCamMIc = () => {
  const CamId = localStorage.getItem("CamId").slice(1, -1);
  const MicId = localStorage.getItem("MicId").slice(1, -1);
  const SpeakerId = localStorage.getItem("SpeakerId").slice(1, -1);
  return {
    CamId: CamId,
    MicId: MicId,
    SpeakerId: SpeakerId,
  };
};
