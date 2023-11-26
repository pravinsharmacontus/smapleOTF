export const initStatelogin = {
  isLoading: false,
  organisations: [],
};

export const organisationMemberListReducer = (
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

    case "DO_GET_ORGANISATION_LIST": {
      return {
        ...state,
        organisations: action.organisationMemberList.data.organisations || [],
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export const initalState = {
  currentOrganisation: [],
};
export const currentOrganisationReducer = (state = initalState ,action = {}) => {
  if(action.type === "CURRENT_ORGANISATION_DATA"){
    return {currentOrganisation : action.data }
  } else {
    return {...state}
  }
}
