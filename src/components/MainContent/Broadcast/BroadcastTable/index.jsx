import React, { useEffect, useState } from "react";
import BroadcastTableHead from "./BroadcastTableHead";
import BroadcastTableBody from "./BroadcastTableBody";
import BroadcastTableFooter from "./BroadcastTableFooter";
import BroadcastTableSubHead from "./BroadcastTableSubHead";
import { useSelector } from "react-redux";
import _get from "lodash/get";
import DeletePopup from "../../DeletePopup";
import { StickyTable } from "react-sticky-table";
import { Feature, FixedHeaderInTables } from "../../../../const/Feature";
import store from "../../../../store";
import { deleteStageAction } from "../../../../store/action/deleteAction";
import { cusTableSelectedDeleteItem } from "../../../../common/helper";
import Loader from "../../../../common/Loader";
import { IconNoPastVideo } from "../../../../assets/img";
import { diableDevicesEndBC } from "../../../../helper/AwsDeviceAccess";
import { InBroadcastScreenAction } from "../../../../store/action/tempAction";
import moment from "moment";

const BroadcastTable = (props = {}) => {
  const {
    handleBroadcastInfo = () => { },
    handleJoinMeeting = () => { },
    sessionInfo = [],
    _handleTableBroadcastCreate = () => { },
    userRoleId,
    resetMuiltipleClick,
    searchTerm = "",
    _onChangeData = "",
    initialPage = 0,
    pageSizeChange = () => { },
    changePageactive = () => { },
    bottomDetails = {},
    searchEnable,
    setSearchEnable = () => { },
    setNoDeviceFound,
    _userRoleId,
    handleTableType,
    enableEdits = () => { },
    userId = 0,
    currentOrg = 0,
    _searchData = {}
  } = props || {};

  const teamDeleteManage = {
    userID: {},
    bulkDelete: false,
  };
  const [getDeletePopup, setDeletePopup] = useState(false);
  const [getAnimate, setAnimate] = useState(false);
  const [getSessionName, setSessionName] = useState("");
  const [tabParent, SetTabParent] = useState("Upcoming");
  const [deleteItem, setDeleteItem] = useState(2); //initial Total Record count
  const [buttonClicked, setButtonClicked] = useState(false);
  const [memberData, setMemberData] = useState([]);
  const [singleDelete, setSingleDelte] = useState([]);
  const [allSelect, setAllSelect] = useState(false);
  const [animatePopup, setAnimatePopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [manageDelete, setManageDelete] = useState(teamDeleteManage); //Edit member,store userDetails
  const deviceGrant = useSelector((state) => state?.deviceGrant);
  const isLoading = useSelector((state) => state?.deleteReducer?.isLoading);
  const currentOrganisation = useSelector(
    (state) => state?.currentOrganisationReducer?.currentOrganisation
  );
  /**
   * open _handle Delete Member
   */
  const _handleDeleteClose = (state = false) => {
    if (state) {
      store.dispatch(deleteStageAction(singleDelete, {
        userId: userId,
        orgId: currentOrg,
        searchData:_searchData,
        position: tabParent,
      }));
      store.dispatch({ type: "DO_LOADING_PAGE", loading: true });
      setDeletePopup(false);
      setAllSelect(false); //delete confirm unCheck Bulk delete
    } else {
      //cancel
      setDeletePopup(state);
    }
  };
  const bulkDeleteMemberDatareturn = (array = []) => {
    const memberListDada = cusTableSelectedDeleteItem(array);
    setDeleteItem(_get(memberListDada, "length", 0));
    //inCase all CheckBox unselect on by one ,still header All check enble this condition help to avoid issue
    setAllSelect(memberListDada.length <= 1 ? false : true);
    return memberListDada;
  };

  //for customer tabs handle
  const tabHandleParent = (val = "") => {
    handleTableType(val);
    SetTabParent(val);
    setMemberData(sessionInfo);
  };

  const handleSingleCheckboxChange = (index) => {
    const newArray = [...memberData];
    newArray[index] = {
      ...newArray[index],
      isCheck: !_get(newArray[index], "isCheck", false),
    };
    setMemberData(newArray);
    bulkDeleteMemberDatareturn(newArray);
  };
  const commonFindTeams = (value = false) => {
    setAllSelect(value);
    const newArray = [...memberData]; //monck new array with old data
    newArray.forEach((e) => {
      e.isCheck = value;
      return e;
    });
    setMemberData(newArray); //append new array
    //inCase all CheckBox unselect on by one still header All check enble this condition help to avoid
    bulkDeleteMemberDatareturn(newArray);
  };
  const allCheckData = () => {
    if (allSelect) {
      //all uncheck
      commonFindTeams(false);
    } else {
      // all check
      commonFindTeams(true);
    }
  };

  const _handleBroadcastDelete = (ele = {}, type = "") => {
    if (type === "singleDelete") {
      setSingleDelte([ele.stageArn]);
      setSessionName(ele.sessionName);
      setDeletePopup(true);
      setManageDelete({
        ...manageDelete,
        bulkDelete: false,
      });
    } else {
      setManageDelete({
        ...manageDelete,
        bulkDelete: true,
      });
      setSingleDelte(ele); //store in state beacuse delete popUp name details Showing
      setDeletePopup(true); //delete popUp visible
    }
  };
  useEffect(() => {
    setTimeout(() => {
      diableDevicesEndBC();
      setAnimatePopup(true);
      setLoading(false);
    }, 1000);
    setLoading(true);
  }, []);

  /**
   * userId filtered and create call c
   * Bulk delete
   **/
  const bulkDeleteCusData = () => {
    const deleteData = bulkDeleteMemberDatareturn(memberData);
    _handleBroadcastDelete(deleteData, "bulk");
  };
  const _handleBroadcastEdit = (sessionDate) => {
    enableEdits(sessionDate)
    console.log(sessionDate, "sessionDate");
  };
  const handleMultipleClick = (e) => {
    if (!buttonClicked) {
      handleJoinMeeting(e);
      setButtonClicked(true);
    }
  };
  const setDelPopupCall = (value = false) => {
    setDeletePopup(value);
  };
  const orderedList = (sessionInforeOrder) => {
    const schSession = sessionInforeOrder?.filter(ele => ele?.scheduledTime);
    const createSession = sessionInforeOrder?.filter(ele => !ele?.scheduledTime);
    const arr1 = schSession?.map(obj => {
      return { ...obj, date: new Date(moment(obj.scheduledTime).toDate()) };
    });
    const sortedDesc = arr1?.sort(
      (objA, objB) => Number(moment(objB.date).toDate()) - Number(moment(objA.date).toDate()),
    );
    return [...sortedDesc, ...createSession];

  }
  useEffect(() => {
    setMemberData(orderedList(sessionInfo));
    setAllSelect(false);

  }, [sessionInfo, isLoading, currentOrganisation, tabParent]);
  useEffect(() => {
    store.dispatch(InBroadcastScreenAction(false));
    return () => {
      setAnimatePopup(false);
      setButtonClicked(false);
      setAllSelect(false);
      setMemberData([]);
    };
  }, []);

  useEffect(() => {
    setButtonClicked(false);
  }, [resetMuiltipleClick]);

  useEffect(() => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 500);
  }, [tabParent]);

  useEffect(() => {
    setButtonClicked(false);
  }, [deviceGrant]);
  useEffect(() => {
    if (setNoDeviceFound) {
      setButtonClicked(false);
    }
  }, [setNoDeviceFound]);
  return (
    <React.Fragment>
      {loading && <Loader type={"fixed overlay"} />}
      <div className='custom-tab'>
        <div className="ul">
          <button
            type="button"
            className={` li ${tabParent === "Upcoming" ? "active" : ""}`}
            onClick={() => tabHandleParent("Upcoming")} >
            Upcoming
          </button>
          <button
            type="button"
            className={`li ${tabParent === "Past" ? "active" : ""}`}
            onClick={() => tabHandleParent("Past")}>
            Past
          </button>
        </div>
      </div>
      <div className={`ContentWrapper ${getAnimate ? " fadeIn-exit-active_ " : " fadeIn-enter-active_ "}`} style={{ paddingTop: "60px" }}>
        <div className={`TeamWrapper df-11a df-col  ${sessionInfo?.length === 0 ? " empty " : " "} `}>
          <BroadcastTableSubHead
            onCalendarHandle={true}
            handleMemberPopupOpen={_handleTableBroadcastCreate}
            userRoleId={userRoleId}
            searchTerm={searchTerm}
            _onChangeTeamsData={_onChangeData}
            tabParent={tabParent}
          />
          <div
            className={`${FixedHeaderInTables(Feature.FixedHeaderInTables)}`}
          >
            <div
              className={`table-common stickyHeader
                         ${sessionInfo.length > 0 && sessionInfo.length <= 6 ? "minHeight" : ""}
                        `}
            >
              <div className={`table-responsive memberTable  ${sessionInfo?.length === 0 ? " " : " adjustHeight "}`}>
                <StickyTable
                  leftStickyColumnCount={0}
                  borderColor={"#DEDEDE"}
                  borderWidth={"0.5px"}
                  stickyHeaderCount={1}
                >
                  <BroadcastTableHead
                    tabParent={tabParent}
                    checked={allSelect}
                    deleteItem={deleteItem} //delete item count for bulk delete option
                    allCheckData={allCheckData}
                    bulkDeleteCusData={bulkDeleteCusData}
                    userRoleId={_userRoleId}
                  />
                  <BroadcastTableBody
                    loading={!loading}
                    tabParent={tabParent}
                    handleMemberEdit={(e) => _handleBroadcastEdit(e)}
                    handleBroadcastInfo={handleBroadcastInfo}
                    handleJoinMeeting={(e) => handleMultipleClick(e)}
                    handleDelete={_handleBroadcastDelete}
                    handleSingleCheckboxChange={handleSingleCheckboxChange}
                    sessionInfo={memberData}
                    userRoleId={_userRoleId}
                  />
                </StickyTable>
                {memberData?.length === 0 && (
                  <div className="empty_table" style={{ opacity: animatePopup ? 1 : 0 }}>
                    <IconNoPastVideo />
                    {tabParent === "Past" ?
                      <div className="content">
                        <strong>No Past Events Yet</strong>
                        <p>
                          There are currently no past events to display here.
                        </p>
                      </div>
                      :
                      <div className="content">
                        <strong>No Upcoming Events Yet</strong>
                        <p>
                          There are currently no upcoming events to display here.
                        </p>
                      </div>
                    }
                  </div>
                )}
              </div>
              {memberData.length > 0 && !loading ? (
                <BroadcastTableFooter
                  initialPage={initialPage}
                  pageSizeChange={pageSizeChange}
                  changePageactive={changePageactive}
                  bottomDetails={{
                    size: bottomDetails.size,
                    totalPages: bottomDetails.totalPages,
                    totalRecords: bottomDetails.totalRecords,
                    page: bottomDetails.page,
                  }}
                  searchEnable={searchEnable}
                  setSearchEnable={(e) => setSearchEnable(e)}
                />
              ) : null}
            </div>
          </div>
        </div>
        {getDeletePopup && (
          <DeletePopup
            maxWidth="520px"
            minWidth="0"
            _bulkContent={manageDelete.bulkDelete ? <>
              <span>Are you sure? You're about to <strong>bulk delete</strong> selected events from the broadcast list. </span></> :
              <> <span>Are you sure you want to delete the current broadcast<strong> "{`${getSessionName}`}"?</strong></span></>}
            heading={manageDelete.bulkDelete ? "Delete?" : "Delete Broadcast?"}
            hightlightText={getSessionName}
            handleDeleteClose={_handleDeleteClose}
            onExited={() => setDelPopupCall(false)}
          />
        )}
      </div>
    </React.Fragment>
  );
};
export default React.memo(BroadcastTable);
