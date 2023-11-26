import { Get } from "../common/httpRestServices";
import { apiUrl, broadCastcountList, customerList } from "../helper/ApiUrl";

export const customerListRequest = (obj = {}) => {
  const { data: { searchTerm = "", page = 0, size = 0 } = {} } = obj;
  console.log("obj", obj, size);

  return Get(
    `${apiUrl}${customerList.getCustomerList
    }page=${page}&searchKeyword=${encodeURIComponent(searchTerm)}&size=${size}`,
    true
  );
};
export const broadcastCountListRequest = (obj = {}) => {
  const { data: { searchTerm = "", page = 1, size = 10, orgId = 0 } = {} } = obj;
  console.log("obj", obj, size);

  return Get(
    `${apiUrl}${broadCastcountList.getbroadCastcountList
    }page=${page}&searchKeyword=${encodeURIComponent(searchTerm)}&size=${size}&orgId=${orgId}`,
    true
  );
};
