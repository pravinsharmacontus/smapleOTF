import {
  DO_INVITE_MEMBER,
  DO_INVITE_MEMBER_LIST_WITHOUT_SEARCH,
  DO_INVITE_MEMBER_List,
  PASSIVE_INVITE_MEMBER_LIST,
  EMPTY_TEAMS_MEMBERS,
} from "../actionTypes/inviteMemberTypes";

export const inviteMemberAction = (
  data = [],
  hostDetails = {},
  teams = false
) => {
  return {
    type: DO_INVITE_MEMBER,
    data,
    hostDetails,
    teams,
  };
};

export const inviteMemberListAction = (
  data = {},
  searchData = {},
  fromAddcohost = false
) => {
  return {
    type: DO_INVITE_MEMBER_List,
    data,
    searchData,
    fromAddcohost,
  };
};
export const inviteMemberListWithoutSearchAction = (data = {}) => {
  return {
    type: DO_INVITE_MEMBER_LIST_WITHOUT_SEARCH,
    data,
  };
};

export const passiveTeamMemberUpdate = (data = {}) => {
  return {
    type: PASSIVE_INVITE_MEMBER_LIST,
    data,
  };
};

export const emptyMembers = (data = []) => {
  return {
    type: EMPTY_TEAMS_MEMBERS,
    list: data,
  };
};
