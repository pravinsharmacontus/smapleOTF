import CryptoJS from "crypto-js";
import { secretKEY } from "../helper/ApiUrl";
import { destructStage, destructStageId } from "../common/helper";
import { updateEncryptUrl } from "../services/aswServices";

/**
 * @param  {} storeName=""
 * @param  {any} value
 * @param  {boolean} fromPassPage=false // from pass word page only not string
 */
export const encryptData = (storeName = "", value = "") => {
  try {
    const payload = JSON.stringify(value);
    const cipherlogUser = CryptoJS.AES.encrypt(payload, secretKEY);
    localStorage.setItem(storeName, cipherlogUser);
    return true;
  } catch (e) {
    return null;
  }
};

/**
 * encrypt value decrypt Here
 */
export const decryptData = (storeName = "") => {
  if (sessionStorage.getItem(storeName) !== null) {
    try {
      const ciphertext = sessionStorage.getItem(storeName);
      const bytes = CryptoJS.AES.decrypt(ciphertext.toString(), secretKEY);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (e) {
      return null;
    }
  }
};

export const dencryptHls = (value = "") => {
  const bytes = CryptoJS.AES.decrypt(value, secretKEY).toString(
    CryptoJS.enc.Utf8
  );
  return bytes;
};

export const encryptHls = async (value = "", channelArn = "") => {
  const excrytpedData = CryptoJS.AES.encrypt(value, secretKEY);
  const responseData = await updateEncryptUrl(channelArn, `${excrytpedData}`);
  if (responseData?.status === 200) {
    return responseData?.data;
  }
};

export const encryptStageArn = (value = "") => {
  const ciphertext = CryptoJS.AES.encrypt(value, secretKEY).toString();
  return ciphertext;
};

export const getStageArnId = (value = "") => {
  return destructStageId(destructStage(value));
};

export const dencryptStageArn = (value = "") => {
  const bytes = CryptoJS.AES.decrypt(value, secretKEY);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};
