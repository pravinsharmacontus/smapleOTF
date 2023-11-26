import React, { useEffect, useState } from "react";
import "./BroadcastedVideos.scss";
import BroadcastedVideosTable from "./BroadcastedVideosTable";
import BroadcastedVideosDetails from "./BroadcastedVideosDetails";
import store from "../../../store";
import { getVideoRecordAction } from "../../../store/action/videoTableAction";
import { organisationMemberListAction } from "../../../store/action/organisationAction";
import { useHistory} from 'react-router-dom';
import { InBroadcastScreenAction } from "../../../store/action/tempAction";

function BroadcastedVideos(_props = {}) {
  const history = useHistory();
  const { history: { location: { search = "" } = {} } = {} } = _props;
  const [getvideoDetails, setvideoDetails] = useState(false);
  const [getvideoDetailsEle, setvideoDetailsEle] = useState({});
  const videoRecordData = store?.getState()?.videoRecordDataListReducer?.res?.data?.recordingList;
  const currentOrganisation =
    store.getState()?.currentOrganisationReducer?.currentOrganisation;
  const handleVideoInDetail = (ele = "") => {
    store.dispatch(getVideoRecordAction(ele));
    store.dispatch({ type: "DO_LOADING_PAGE", loading: true });
    setvideoDetails(true);
  };

  useEffect(() => {
    setvideoDetailsEle(videoRecordData);
  }, [videoRecordData]);

  const handleBackToTable = () => {
    setvideoDetails(false);
    history.push("/videos");
  };

  useEffect(() => {
    store.dispatch(organisationMemberListAction());
  }, [currentOrganisation]);
  useEffect(() => {
    store.dispatch(InBroadcastScreenAction(false));
  }, []);

  useEffect(() => {
    if (search !== "") {
      try {
        const params = search.split('?')[1].split('&');
        const orgId = params.find(param => param.startsWith('orgId=')).split('=')[1];
        const channleArn = params.find(param => param.startsWith('channleArn=')).split('=')[1];
        if (orgId !== "" && channleArn !== "") {
          const ele = {
            orgId,
            channleArn
          };
          handleVideoInDetail(ele);
        }
        else {
        history.push("/videos");
        }

      } catch (e) {
        history.push("/videos");
      }
    }

  }, [search]);

  return (
    <>
      <div className="ContentWrapper">
        {getvideoDetails ? (
          <BroadcastedVideosDetails
            handleBackToTable={() => handleBackToTable()}
            getvideoDetailsEle={getvideoDetailsEle}
          />
        ) : (
          <BroadcastedVideosTable handleVideoInDetail={handleVideoInDetail} />
        )}
      </div>
    </>
  );
}

export default BroadcastedVideos;
