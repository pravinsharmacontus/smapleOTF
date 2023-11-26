import { CURRENT_ORGANISATION_DATA, GET_CUSTOMER_ORGANISATION_DETAILS } from "../actionTypes/customerTypes";

export const organisationMemberListAction = () => {
  return {
    type: GET_CUSTOMER_ORGANISATION_DETAILS,
  };
};

export const currentOrganisation = (data = []) => {
  return{
    type: CURRENT_ORGANISATION_DATA,
    data
  };
};
