import * as loginTypes from "../actionTypes/loginTypes";

export const doLogin = (data = {}) => {
  return {
    type: loginTypes.DO_LOGIN,
    data,
  };
};

export const doLoginSuccess = (data = {}) => {
  return {
    type: loginTypes.DO_LOGIN_SUCCESS,
    data,
  };
};

export const doLoginFail = (data = {}) => {
  return {
    type: loginTypes.DO_LOGIN_FAIL,
    data,
  };
};

export const doRegisterNewUserAction = (data = {}) => {
  return {
    type: loginTypes.REGISTER_NEW_USER,
    data,
  };
};

export const doLogout = (data = {}, ownUser ={}) => {
  return {
    type: loginTypes.DO_LOGOUT,
    data,
    ownUser,
  };
};
