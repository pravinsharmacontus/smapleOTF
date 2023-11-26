import React, { useEffect, useState } from "react";
import _get from "lodash/get";
import NoOfBroadcastsHead from "./NoOfBroadcastsHead";
import NoOfBroadcastsBody from "./NoOfBroadcastsBody";
import TableFooter from "./TableFooter";
import NoOfBroadcastsSubHead from "./NoOfBroadcastsSubHead";
import { StickyTable } from "react-sticky-table";
import { Feature, FixedHeaderInTables } from "../../../const/Feature";
import { useSelector } from "react-redux";
import { getBroadcastCountAction } from "../../../store/action/customerListAction";
import store from "../../../store";

const NoOfBroadcasts = (props = {}) => {
  const params = new URLSearchParams(window.location.search);
  const orgId1 = params.get('id');
  const { memberData = 0 } = props || {};
  const [searchData, setSearchData] = useState({
    page: 1,
    searchTerm: "",
    size: 10,
    orgId: orgId1,
  });
  const customerListData1 =
    useSelector((state) => state?.broadcastCountListReducer) || {};
  const broadcastCountListData = useSelector((state) => state?.broadcastCountListReducer?.analyticsResponses) || {};
  const [searchEnable, setSearchEnable] = useState(false);
  const { page } = searchData;

  const { totalPages = 0, totalRecords = 0 } = customerListData1;

  const pageSizeChange1 = (event = {}) => {
    const { name = "", value = 10 } = _get(event, "target", {});
    setSearchData({ ...searchData, page: 1, [name]: value });
  };

  const onChange1 = (event = {}, pageChange = false) => {
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
  const changePageactive1 = (pageNum = 1) => {
    onChange1({
      target: {
        name: "page",
        value: pageNum,
      },
    }, false);
  };

  useEffect(() => {
    store.dispatch(getBroadcastCountAction(searchData));
    store.dispatch({ type: "DO_LOADING_PAGE", loading: true });
  }, [searchData]);
  const broadcastCountListDat1 = useSelector((state) => state?.broadcastCountListReducer?.analyticsResponses) || {};

  console.log("***123", searchData.size, totalPages, totalRecords, searchData.page, broadcastCountListDat1);
  return (
    <React.Fragment>
      <div className="ContentWrapper">
        <div className="TeamWrapper df-11a df-col">
          <NoOfBroadcastsSubHead
            _searchTerm={searchData.searchTerm}
            _onChangeTeamsData={(e) => {
              onChange1(e, true);
              setSearchEnable(true);
            }}
            onCalendarHandle={true}
            handleMemberPopupOpen={() => { }}
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
                  <NoOfBroadcastsHead />
                  <NoOfBroadcastsBody
                    broadcastCountListData={broadcastCountListData}
                  />
                </StickyTable>
              </div>
              {broadcastCountListData.length > 0 ?
                <TableFooter
                  initialPage={page}
                  pageSizeChange={pageSizeChange1}
                  changePageactive={changePageactive1}
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
export default React.memo(NoOfBroadcasts);
