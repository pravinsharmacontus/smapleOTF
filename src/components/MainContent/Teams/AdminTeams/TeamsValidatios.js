import i18next from "i18next";
import {
  checkWhiteSpaces,
  EmailValidate,
  nameValidate,
} from "../../../../helper/Validation";
import store from "../../../../store";
import {
  inviteMemberAction,
  inviteMemberListAction,
} from "../../../../store/action/inviteMemberAction";

export const translate = (key) => {
  return i18next.t(key);
};

export function OwnerValidation(data = "") {
  const state = store.getState()
  const inviteMemberList = state?.inviteMemberListReducer?.allInvitedList
  const filterOwnerData = inviteMemberList.filter(
    (ele) => ele.userRoleId === 1
  );
  return filterOwnerData.filter((ele) => ele.emailId !== data).length > 0;
}

export function teamsValidation(data = {}) {
  switch (data.name) {
    case "email":
      if (!checkWhiteSpaces(data.value)) return "Please enter the email address"
      if (!EmailValidate(data.value)) return translate("LOGIN.EMAIL_ERR");
      if (!nameValidate(data.value)) return translate("ERROR.NAME");
      if (!OwnerValidation(data.value)) return translate("ERROR.Email ID already exists");
      return "";
    case "role":
      if (!checkWhiteSpaces(data.value))
        return translate("ERROR.ROLE_ERR_EMPTY");
      return "";
    default:
      return "";
  }
}

export const submitTeams = (data, hostDetails, currentOrganisation, searchData) => {
  const inviteMember = {
    ...hostDetails,
    currentOrgDetails: currentOrganisation,
  };
  store.dispatch({ type: "DO_LOADING_LOGIN_PAGE", loading: true });
  store.dispatch(inviteMemberAction(data, inviteMember, true));
  setTimeout(() => {
    store.dispatch(inviteMemberListAction(currentOrganisation, searchData));
    store.dispatch({ type: "DO_LOADING_PAGE", loading: true });
  }, 1000);
};
