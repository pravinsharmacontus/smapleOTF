import { Get, Post } from "../common/httpRestServices";
import { apiUrl, inviteMember } from "../helper/ApiUrl";
import { checkWhiteSpaces } from "../helper/Validation";

export const inviteMemberReques = (obj = []) => {
  console.log("host---", obj.hostDetails.currentOrgDetails, obj.hostDetails);
  return Post(
    `${apiUrl}${inviteMember.inviteMemberApi}?orgId=${obj?.hostDetails?.currentOrgDetails?.organisationId
    }&userRoleId=${obj.hostDetails.currentOrgDetails.invitedUserRoleId ||
    obj.hostDetails.currentOrgDetails.userRoleId
    }`,
    obj.data,
    true
  );
};

export const inviteMemberListResquest = (obj = {}) => {
  console.log(
    obj?.searchData,
    obj,
    obj?.fromAddcohost,
    "inviteMemberListResquest"
  );
  const {
    data: { organisationId = 0, invitedUserRoleId = 0, userRoleId = 0 } = {},
    searchData: { page = 1, searchTerm = "", size = 10 } = {},
    fromAddcohost,
  } = obj;
  if (
    checkWhiteSpaces(obj.searchData.searchTerm) &&
    obj.searchData.searchTerm
  ) {
    console.log("inviteMemberListResquest-----1");
    return Get(
      `${apiUrl}${inviteMember.inviteMemberListApi
      }orgId=${organisationId}&page=${page}
      &searchName=${encodeURIComponent(searchTerm)}&size=${size}
      &sort=${(invitedUserRoleId === 4 || userRoleId === 4 || invitedUserRoleId === 5 || userRoleId === 5) ? "desc" : "asc"}`,
      true
    );
  } else if (fromAddcohost) {
    console.log("inviteMemberListResquest-----2");
    return Get(
      `${apiUrl}${inviteMember.inviteMemberListApi
      }orgId=${organisationId}&size=${1000}&sort=${(invitedUserRoleId === 4 || userRoleId === 4 || invitedUserRoleId === 5 || userRoleId === 5) ? "desc" : "asc"}`,
      true
    );
  } else {
    console.log("inviteMemberListResquest-----4");
    return Get(
      `${apiUrl}${inviteMember.inviteMemberListApi}orgId=${organisationId}&page=${page}&size=${size}
      &sort=${(invitedUserRoleId === 4 || userRoleId === 4 || invitedUserRoleId === 5 || userRoleId === 5) ? "desc" : "asc"}`,
      true
    );
  }
};
export const InviteMemberWithoutSearchResquest = (obj = {}) => {
  console.log("inviteMemberListResquestwithoutsearch-----1");
  const {
    data: { organisationId = 0 } = {}
  } = obj;
  return Get(
    `${apiUrl}${inviteMember.inviteMemberListApi
    }orgId=${organisationId}&size=${1000}`,
    true
  );
};
export const getTeamMembers = async (organisationId) => {
  const listResponse = Get(
    `${apiUrl}${inviteMember.inviteMemberListApi
    }orgId=${organisationId}&size=${500}`,
    true
  );
  return listResponse;
};
