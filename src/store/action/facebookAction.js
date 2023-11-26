import {
  FACEBOOK_PAGE_LIST,
  FACEBOOK_PAGE_CONNECTED,
  FACEBOOK_GROUP_LIST,
  FACEBOOK_PROFILE_LIST,
  FACEBOOK_GROUP_CONNECTED,
  FACEBOOK_PROFILE_CONNECTED } from "../actionTypes/facebookTypes";

export const facebookPageListAction = (data = "") => {
  return {
    type: FACEBOOK_PAGE_LIST,
    data,
  };
};

export const facebookPageConnectedAction = (data = "") => {
  return {
    type: FACEBOOK_PAGE_CONNECTED,
    data,
  };
};

export const facebookGroupListAction = (data = "") => {
  return {
    type: FACEBOOK_GROUP_LIST,
    data,
  };
};

export const facebookGroupConnectedAction = (data = "") => {
  return {
    type: FACEBOOK_GROUP_CONNECTED,
    data,
  };
};

export const facebookProfileListAction = (data = "") => {
  return {
    type: FACEBOOK_PROFILE_LIST,
    data,
  };
};

export const facebookProfileConnectedAction = (data = "") => {
  return {
    type: FACEBOOK_PROFILE_CONNECTED,
    data,
  };
};
