import axios from "axios";
import _get from "lodash/get";
import { fetchLogin } from "../../services/LoginServices";
import { moveToLoginPage } from "../../helper/RoleConfig";
import {
  Decrypt,
  userDetailsSet,
  EncryptLogInDetails,
  userDataTokenReturn,
  internetStatusEncrypt,
  DecryptLogInDetails,
} from "../../helper/Encypt";
import { apiUrl, loginApi } from "../../helper/ApiUrl";
import { constantValue } from "../../const/errorTypes";
import { failToast } from "../../helper/ApiToast";

let headers = {
  "Content-Type": "application/json",
  // "Access-Control-Allow-Origin": "http://localhost:3000/",
  // "Access-Control-Allow-Credentials": true,
  // "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  // "Access-Control-Allow-Headers":
  //   "Origin, X-Requested-With, Content-Type, Accept, Authortization",
};
const authErrorMsg = [
  //401 token manage
  { msg: constantValue.AUTHORIZATION_TOKEN_INVALID },
  { msg: constantValue.AUTHORIZATION_TOKEN_EMPTY },
  { msg: constantValue.AUTHORIZATION_TOKEN_EXPIRED },
  { msg: constantValue.ACCOUNT_DELETED_CONTACT_SUPPORT_TEAM },
];

const meassageCheck = (msg = "") => {
  return authErrorMsg.some((ele) => ele.msg === msg);
};
/**
 * setToken in header
 */
const setHeaders = () => {
  const authToken = userDataTokenReturn() || "";
  if (authToken) {
    headers["Authorization"] = authToken;
  } else {
    const userDtls = DecryptLogInDetails();
    headers["Authorization"] = userDtls?.data?.jwt || '';
  }
  return headers;
};

/**
 * catch block IF condtion Helps to when JWT token Expire  try to generate new JWT
 * success return Call GET
 * Api fail clr local store and push to login page
 *
 * @param  {string} {url} - Api call url
 * @param  {boolean} {attachToken} - Request Need Header or not ,handle From  Action Created page
 * @return  {object} {data} - when Api success return To Action created page
 * @return  {object} {error} - when Api Fail return To Action created page
 **/
export const Get = async (url = "", attachToken = false) => {
  if (attachToken) headers = { ...headers, ...setHeaders() };
  try {
    return await axios.get(url, { headers });
  } catch (error) {
    const { response = {} } = error || {};
    const { data: { status = 0, message = "" } = {} } = response;
    const callgetData = meassageCheck(message);
    if (status === 401 || callgetData) {
      const GetStatus = await fetchLogin({ data: Decrypt() }); //login data
      const { data = {} } = GetStatus || {};
      if (data.status === 200) {
        EncryptLogInDetails(data); //user Data pass
        internetStatusEncrypt(true); //online status true
        userDetailsSet(data); //if developer environMent store userDetails in local store
        return Get(url, attachToken);
      } else if (status >= 201 && status <= 400) {
        moveToLoginPage(_get(data, "message", ""));
      } else {
        moveToLoginPage(_get(data, "message", ""));
      }
    }
    return response;
  }
};

/**
 * catch block IF condtion Helps to when JWT token Expire  try to generate new JWT
 * success return Call GET
 * Api fail clr local store and push to login page
 *
 * @param  {string} {url} - Api call url
 * @param  {boolean} {attachToken} - Request Need Header or not ,handle From  Action Created page
 * @return  {object} {data} - when Api success return To Action created page
 * @return  {object} {error} - when Api Fail return To Action created page
 **/
export const mediaGet = async (url = "", attachToken = false) => {
  if (attachToken) headers = { ...headers, ...setHeaders() };
  try {
    return await axios.get(url, { headers, responseType: "blob" });
  } catch (error) {
    const { response = {} } = error || {};
    const { data: { status = 0, message = "" } = {} } = response;
    const callLogingData = meassageCheck(message);
    if (status === 401 || callLogingData) {
      const GetmediaGet = await fetchLogin({ data: Decrypt() });
      const { data = {} } = GetmediaGet || {};
      if (data.status === 200) {
        EncryptLogInDetails(data); //user Data pass
        internetStatusEncrypt(true); //online status true
        userDetailsSet(data); //if developer store userDetails in local store
        return mediaGet(url, attachToken);
      } else if (status >= 201 && status <= 400) {
        moveToLoginPage(_get(data, "message", ""));
      } else {
        moveToLoginPage(_get(data, "message", ""));
      }
    }
    return response;
  }
};

/**
 * @param  {string} {url} - Api get call url
 * @param  {object} {params} - passed params is dynamically
 **/
export const Post = async (url = "", params = {}, attachToken = false, jwt = "") => {
  if (attachToken && jwt.length === 0) headers = { ...headers, ...setHeaders() };
  if(attachToken && jwt.length !== 0)  headers = { ...headers, ...setHeaders(),Authorization:jwt }
  console.log("header---",headers)
  try {
    return await axios.post(url, params, { headers });
  } catch (error) {
    const { response = {} } = error || {};
    const { data: { status = 0, message = "" } = {} } = response;
    const callLogingData = meassageCheck(message);
    if ((url === `${apiUrl}${loginApi.logIn}`) && (status === 401 || callLogingData)) {
      moveToLoginPage();
    }
    if (status === 401 || callLogingData) {
      const PostStatus = await fetchLogin({ data: Decrypt() });
      const { data = {} } = PostStatus || {};
      if (data.status === 200) {
        EncryptLogInDetails(data); //user Data pass
        internetStatusEncrypt(true); //online status true
        userDetailsSet(data); //if developer store userDetails in local store
        return Post(url, params, attachToken);
      } else if (status >= 201 && status <= 400) {
        moveToLoginPage(data.status);
        failToast(message);
      } else {
        moveToLoginPage(_get(data, "message", ""));
      }
    }
    return response;
  }
};

/**
 * @param  {string} {url} - Api get call url
 * @param  {object} {params} - passed params is dynamically
 **/
export const Put = async (url = "", params = {}, attachToken = false) => {
  if (attachToken) headers = { ...headers, ...setHeaders() };
  try {
    return await axios.put(url, params, { headers });
  } catch (error) {
    const { response = {} } = error || {};
    const { data: { status = 0, message = "" } = {} } = response;
    const callLogingData = meassageCheck(message);
    if (status === 401 || callLogingData) {
      const PutStatus = await fetchLogin({ data: Decrypt() });
      const { data = {} } = PutStatus || {};
      if (data.status === 200) {
        EncryptLogInDetails(data); //user Data pass
        internetStatusEncrypt(true); //online status true
        userDetailsSet(data); //if developer store userDetails in local store
        return Put(url, params, attachToken);
      } else if (status >= 201 && status <= 400) {
        moveToLoginPage(_get(data, "message", ""));
      } else {
        moveToLoginPage(_get(data, "message", ""));
      }
    }
    return response;
  }
};

/**
 * @param  {string} url
 * @param  {option} params
 * @param  {boolean} attachToken=false
 * delete call
 */
export const Delete = async (url = "", params = "", attachToken = false) => {
  if (attachToken) headers = { ...headers, ...setHeaders() };
  try {
    return await axios.delete(url, { data: params, headers });
  } catch (error) {
    const { response = {} } = error || {};
    const { data: { status = 0, message = "" } = {} } = response;
    const callLogingData = meassageCheck(message);
    if (status === 401 || callLogingData) {
      const deleteStatus = await fetchLogin({ data: Decrypt() });
      const { data = {} } = deleteStatus || {};
      if (data.status === 200) {
        EncryptLogInDetails(data); //user Data pass
        internetStatusEncrypt(true); //online status true
        userDetailsSet(data); //if developer store userDetails in local store
        return Delete(url, params, attachToken);
      } else if (status >= 201 && status <= 400) {
        moveToLoginPage(_get(data, "message", ""));
      } else {
        moveToLoginPage(_get(data, "message", ""));
      }
    }
    return response;
  }
};

export const postWithOutToken = async (url = "", params = {}) => {
  try {
    return await axios.post(url, params, headers);
  } catch (error) {
    const { response = {} } = error || {};
    return response;
  }
};

/**
 * pass without token call service
 * @param {string} url
 */
export const getWithOutToken = async (url = "") => {
  try {
    return await axios.get(url, { headers });
  } catch (error) {
    const { response = {} } = error || {};
    return response;
  }
};
