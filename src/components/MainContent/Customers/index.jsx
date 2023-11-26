import React, { useEffect, useState } from "react";
import _get from "lodash/get";
import CustomerHead from "./CustomerHead";
import CustomerBody from "./CustomerBody";
import TableFooter from "./TableFooter";
import TeamsSubHead from "./TeamsSubHead";
import { StickyTable } from "react-sticky-table";
import { Feature, FixedHeaderInTables } from "../../../const/Feature";
import store from "../../../store";
import { useSelector } from "react-redux";
import { getBroadcastCountActionList, getCustomerListAction } from "../../../store/action/customerListAction";
import Loader from "../../../common/Loader";

const Customers = (props = {}) => {
  const { memberData = 0 } = props || {};
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState({
    page: 1,
    searchTerm: "",
    size: 10,
  });
  const [searchEnable, setSearchEnable] = useState(false);
  const { page } = searchData;

  const customerListData =
    useSelector((state) => state?.customerListReducer) || {};
  const { totalPages = 0, totalRecords = 0, customerList = [] } = customerListData;

  console.log(customerListData, customerList.length, "customerListData");

  const _handleMemberDelete = (ele = {}) => {
    setDeletePopup(true);
    setUserDetails(ele?.email || "");
  };
  const _handleMemberEdit = (ele = {}) => {
    setCreateEditMemberPopup(true);
    setEditMember(true);
  };

  const handleMemberPopupOpen = () => {
    setCreateEditMemberPopup(true);
  };

  const pageSizeChange = (event = {}) => {
    const { name = "", value = 10 } = _get(event, "target", {});
    setSearchData({ ...searchData, page: 1, [name]: value });
  };

  const onChange = (event = {}, pageChange = false) => {
    const { target: { name = "", value = "" } = {} } = event;
    if (pageChange) {
      const newObj = {
        ...searchData,
        [name]: value,
        page: 1
      };
      setSearchData(newObj);
    } else {
      const newObj = {
        ...searchData,
        [name]: value
      };
      setSearchData(newObj);
    }
  };
  const changePageactive = (pageNum = 1) => {
    onChange({
      target: {
        name: "page",
        value: pageNum,
      },
    }, false);
  };

  const handleBroadcastCountInDetail = (ele = "") => {
    store.dispatch(getBroadcastCountActionList(ele));
    store.dispatch({ type: "DO_LOADING_PAGE", loading: true });

  };

  const currentOrgId = window.localStorage.getItem("currntOrgid")
    ? JSON.parse(window.localStorage.getItem("currntOrgid"))
    : {};

  useEffect(() => {
    store.dispatch(getCustomerListAction(searchData));
    store.dispatch({ type: "DO_LOADING_PAGE", loading: true });
  }, [searchData]);
  console.log("searchData", searchData);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setLoading(true);
  }, []);

  return (
    <React.Fragment>
      {loading && <Loader type={"fixed overlay"} />}
      <div className={`ContentWrapper`}>
        <div className="TeamWrapper df-11a df-col">
          <TeamsSubHead
            _searchTerm={searchData.searchTerm}
            _onChangeTeamsData={(e) => {
              onChange(e, true);
              setSearchEnable(true);
            }}
            onCalendarHandle={true}
            handleMemberPopupOpen={handleMemberPopupOpen}
            userRoleId={
              currentOrgId.invitedUserRoleId || currentOrgId.userRoleId
            }
            searchEnable={searchEnable}
            setSearchEnable={(e) => setSearchEnable(e)}
          />
          <div
            className={`${FixedHeaderInTables(Feature.FixedHeaderInTables)}`}
          >
            <div
              className={`table-common stickyHeader
                         ${memberData.length <= 6 ? "minHeight" : ""}
                        `}
            >
              <div className="table-responsive memberTable adjustHeight">
                <StickyTable
                  leftStickyColumnCount={0}
                  borderColor={"#DEDEDE"}
                  borderWidth={"0.5px"}
                  stickyHeaderCount={1}
                >
                  <CustomerHead />
                  <CustomerBody
                    loading={!loading}
                    handleBroadcastCountInDetail={handleBroadcastCountInDetail}
                    handleMemberEdit={_handleMemberEdit}
                    handleMemberDelete={_handleMemberDelete}
                  />
                </StickyTable>
              </div>
              {customerList.length > 0 && !loading ?
                <TableFooter
                  initialPage={page}
                  pageSizeChange={pageSizeChange}
                  changePageactive={changePageactive}
                  bottomDetails={{
                    size: searchData.size,
                    totalPages: totalPages,
                    totalRecords: totalRecords,
                    page: searchData.page
                  }}
                /> : null}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default React.memo(Customers);
