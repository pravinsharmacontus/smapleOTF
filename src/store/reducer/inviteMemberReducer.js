export const initStatelogin = {
  isLoading: false,
  inviteMember: [],
  inviteMemberData: {},
  allInvitedList: [],
};

const constructMemberData = (state, invitesData) => {
  const { responseData = {}, inviteRequestData = [] } = invitesData;
  console.log("@@2", responseData);
  let newInvitedData = {};
  if (responseData?.mailids.length > 0) {
    newInvitedData = {
      userId: null,
      emailVerified: 0,
      emailId: responseData?.mailids[0],
      userRoleId: inviteRequestData?.inviteUserRoleId,
    };
  } else if (responseData?.userIds.length > 0) {
    newInvitedData = {
      userId: responseData?.userIds[0],
      emailVerified: 1,
      emailId: inviteRequestData?.inviteUserEmail,
      userRoleId: inviteRequestData?.inviteUserRoleId,
    };
  }
  return [...state, newInvitedData];
};

export const inviteMemberListReducer = (
  state = initStatelogin,
  action = {}
) => {
  switch (action.type) {
    case "DO_LOADING_LOGIN_PAGE": {
      return {
        ...state,
        isLoading: action.loading,
      };
    }

    case "DO_INVITE_MEMBER_LIST": {
      return {
        ...state,
        inviteMember: action.inviteMember.data.teamMembersDetails,
        ...(action.inviteMember || []),
      };
    }
    case "DO_GET_ALL_INVITE_MEMBER_LIST": {
      console.log(
        "action--",
        action.allInvitedList.data.teamMembersDetails,
        action
      );
      return {
        ...state,
        allInvitedList: action.allInvitedList.data.teamMembersDetails,
      };
    }
    case "INVITE_MEMBER_LIST_DATA": {
      return {
        ...state,
        inviteMember: constructMemberData(
          state?.inviteMember,
          action.inviteMemberData
        ),
      };
    }

    case "ADD_INVITE_LOCAL": {
      return {
        ...state,
        inviteMember: [...state.inviteMember, { ...action.upadateData }],
      };
    }

    case "PASSIVE_INVITE_MEMBER_LIST": {
      return {
        ...state,
        inviteMember: action.data || [],
      };
    }
    case "EMPTY_TEAMS_MEMBERS": {
      return {
        ...state,
        inviteMember: action.list || [],
      };
    }

    default:
      return {
        ...state,
      };
  }
};
