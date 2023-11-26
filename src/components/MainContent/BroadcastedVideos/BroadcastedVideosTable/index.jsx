import _get from "lodash/get";
import React, { useState, useEffect } from "react";
import store from "../../../../store";
import { StickyTable } from "react-sticky-table";
import { IconNoVideo } from "../../../../assets/img";
import { succToast } from "../../../../helper/ApiToast";
import BroadcasteVideoEdit from "../BroadcasteVideoEdit";
import BroadcastedVideosHead from "./BroadcastedVideosHead";
import BroadcastedVideosBody from "./BroadcastedVideosBody";
import BroadcasteVideoDelete from "../BroadcasteVideoDelete";
import BroadcasteVideoShare from "../BroadcasteVideoShare";
import BroadcasteVideoDownload from "../BroadcasteVideoDownload";
import { userDetailsLocal } from "../../../../helper/RoleConfig";
import BroadcastedVideosSubHead from "./BroadcastedVideosSubHead";
import { Feature, FixedHeaderInTables } from "../../../../const/Feature";
import BroadcastedVideosTableFooter from "./BroadcastedVideosTableFooter";
import { getVideoTableAction, emptyVideo } from "../../../../store/action/videoTableAction";
import { organisationMemberListAction } from "../../../../store/action/organisationAction";
import { useSelector } from "react-redux";
import Loader from "../../../../common/Loader";

const BroadcastedVideosTable = (_props = {}) => {
  const { tableData = [], handleVideoInDetail = () => { } } = _props;
  const [loading, setLoading] = useState(false);
  const [getActionPopup, setActionPopup] = useState("");
  const [searchEnable, setSearchEnable] = useState(false);
  const [getTitle, setTitle] = useState("");
  const currentOrganisation =
    useSelector(
      (state) => state?.currentOrganisationReducer?.currentOrganisation
    );
  const currentOrgList = window.localStorage.getItem("currntOrgid")
    ? JSON.parse(window.localStorage.getItem("currntOrgid"))
    : {};
  const videoList = store.getState()?.videoTableListReducer?.videoTable?.data?.recordedChannels;
  const videoListData = store.getState()?.videoTableListReducer;
  const { videoTable: { totalPages = 1, totalRecords = 0 } = {} } = videoListData;
  const [searchData, setSearchData] = useState({
    page: 1,
    searchTerm: '',
    size: 10,
    defaultState: ''
  });

  const pageSizeChange = (event = {}) => {
    const { name = "", value = 10 } = _get(event, "target", {});
    setSearchData({ ...searchData, page: 1, [name]: value });
  };

  /**
   * open _handle Delete Member
   */
  const _handleAction = (key = "") => {
    switch (key) {
      case "VideoDelete":
        succToast("Video Deleted successfuly");
        setActionPopup(false);
        break;
      case "VideoDownload":
        setActionPopup(false);
        break;
      case "VideoShare":
        setActionPopup(false);
        break;
      case "VideoEdit":
        succToast("Tile changed successfuly");
        setActionPopup(false);
        break;
      default:
        break;
    }
  };

  /**
   * open _handle Delete Member
   */
  const _handleClose = (action = false) => {
    setActionPopup(action);
  };

  const _handleVideoDelete = (ele = {}) => {
    setActionPopup("VideoDelete");
    const { title = "" } = ele;
    setTitle(title);
  };
  const _handleVideoDownload = (ele = {}) => {
    setActionPopup("VideoDownload");
  };
  const _handleVideoShare = (ele = {}) => {
    setActionPopup("VideoShare");
  };
  const _handleVideoEdit = (ele = {}) => {
    setActionPopup("VideoEdit");
    const { title = "" } = ele;
    setTitle(title);
  };

  const onChange = (pageChange, event = {}) => {
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
    onChange(false, {
      target: {
        name: "page",
        value: pageNum,
      },
    });
  };

  useEffect(() => {
    const userDetails = userDetailsLocal() || {}; //logged userDetails
    if (
      (Object.keys(currentOrganisation).length !== 0 ||
        Object.keys(currentOrgList).length !== 0) &&
      currentOrgList.organisationId !== userDetails.data.organisationId
    ) {
      store.dispatch(getVideoTableAction(currentOrgList, searchData));
      store.dispatch({ type: "DO_LOADING_PAGE", loading: true });
      store.dispatch(organisationMemberListAction());
    }
    setSearchData({
      page: 1,
      searchTerm: '',
      size: 10,
    });
  }, [currentOrganisation]);

  useEffect(() => {
    store.dispatch(getVideoTableAction(currentOrgList, searchData)); //api trigger for search and org change
    store.dispatch({ type: "DO_LOADING_PAGE", loading: true });
  }, [searchData, currentOrganisation]);

  useEffect(() => {
    return (() => {
      store.dispatch(emptyVideo());
    });

  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setLoading(true);
  }, []);

  return (
    <React.Fragment>
      {loading && <Loader type={"fixed overlay"} />}
      <div className={` TeamWrapper df-11a df-col ${videoList?.length === 0 ? " empty " : " "}`}>
        <BroadcastedVideosSubHead
          searchTerm={searchData.searchTerm}
          _onChangeData={(e) => {
            onChange(true, e);
            setSearchEnable(true);
          }}
          onCalendarHandle={true}
        />
        <div className={`${FixedHeaderInTables(Feature.FixedHeaderInTables)}`}>
          <div
            className={`table-common stickyHeader
                         ${tableData.length <= 6 ? "minHeight" : ""}
                        `}
          >
            <div className={`table-responsive relative memberTable  ${videoList?.length === 0 ? "  " : " adjustHeight "}`}>
              <StickyTable
                leftStickyColumnCount={0}
                borderColor={"#DEDEDE"}
                borderWidth={"0.5px"}
                stickyHeaderCount={1}
              >
                <BroadcastedVideosHead />
                <BroadcastedVideosBody
                  loading={!loading}
                  handleVideoInDetail={handleVideoInDetail}
                  handleVideoEdit={_handleVideoEdit}
                  handleVideoShare={_handleVideoShare}
                  handleVideoDownload={_handleVideoDownload}
                  handleVideoDelete={_handleVideoDelete}
                />
              </StickyTable>
              {videoList?.length === 0 && (
                <div className="empty_table">
                  <IconNoVideo />
                  <div className="content">
                    <strong>There Are No Videos Yet</strong>
                    <p>
                      There are currently no recordings to display here. Please create a broadcast to record videos.
                    </p>
                  </div>
                </div>
              )}
            </div>
            {videoList?.length !== 0 && !loading && (
              <BroadcastedVideosTableFooter
                pageSizeChange={pageSizeChange}
                changePageactive={changePageactive}
                totalRecords={totalRecords || 0}
                bottomDetails={{ size: searchData.size, totalPages: totalPages, totalRecords: totalRecords, page: searchData.page }}
                searchEnable={searchEnable}
                setSearchEnable={(e) => setSearchEnable(e)}
              />)}
          </div>
        </div>
      </div>
      {getActionPopup === "VideoDelete" && (
        <BroadcasteVideoDelete
          title={getTitle}
          _handleAction={() => {
            _handleAction("VideoDelete");
          }}
          _handleClose={() => {
            _handleClose();
          }}
        />
      )}
      {getActionPopup === "VideoDownload" && (
        <BroadcasteVideoDownload
          _handleAction={() => {
            _handleAction("VideoDownload");
          }}
          _handleClose={() => {
            _handleClose();
          }}
        />
      )}
      {getActionPopup === "VideoShare" && (
        <BroadcasteVideoShare
          _handleAction={() => {
            _handleAction("VideoShare");
          }}
          _handleClose={() => {
            _handleClose();
          }}
        />
      )}
      {getActionPopup === "VideoEdit" && (
        <BroadcasteVideoEdit
          title={getTitle}
          _handleAction={() => {
            _handleAction("VideoEdit");
          }}
          _handleClose={() => {
            _handleClose();
          }}
        />
      )}
    </React.Fragment>
  );
};
export default React.memo(BroadcastedVideosTable);
