import { Get } from "../common/httpRestServices";
import { apiUrl, organisationList } from "../helper/ApiUrl";

export const getCustomerOrganisationList = () => {
    return Get(`${apiUrl}${organisationList.getOrganisationList}`,true);
};
