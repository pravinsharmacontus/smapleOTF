import React, { Fragment, useEffect, useState } from "react";
import "./Player-overrides.scss";
import PlayBackHls from "../../playBackHls/PlayBackHls";
import { utcToISOConvertTime } from "../../../../../helper";
import { IconDownloadLite } from "../../../../../assets/img";
import BroadcasteVideoShare from "../../BroadcasteVideoShare";
import { IconCloseAlert, } from "../../../../../assets/images";

const PlaybackVideoHls = (props = {}) => {
  const { controlerHeight = 0, playbackUrl = "", livePlayer = false, enableHeader = "", createdAt = "",
    title = "", _handlePopup = () => { }, _handleBack = () => { }, getSelectedThumb = '' } = props;
  const [getState, setState] = useState({
    eleWidth: 0,
    eleHeight: 0,
    getVideoShare: false,
  });
  const { eleWidth = 0, eleHeight = 0, getVideoShare = false } = getState;
  const _handleClose = () => {
    setState({
      ...getState,
      getVideoShare: false
    });
  };

  const handleResizeByVideoSize = () => {
    console.log("handleResizeByVideoSize resize by video size");
    const ratio = "16:9";
    const ratioWidth = ratio.split(":")[0];
    const ratioHeight = ratio.split(":")[1];
    const parentEle = document.getElementById("container-custom-vplayer");
    const parentEleTop = document.getElementById("video_parent_top");
    const parentEleWidth = parentEle.offsetWidth;
    const parentEleHeight = parentEle.offsetHeight - parentEleTop.offsetHeight - controlerHeight;
    const ratioCalculatedWidth = (ratioWidth * parentEleHeight) / ratioHeight;
    const ratioCalculatedHeight = (ratioHeight * parentEleWidth) / ratioWidth;

    if (
      parentEleWidth > ratioCalculatedWidth &&
      parentEleHeight > ratioCalculatedHeight
    ) {
      setState({
        ...getState,
        eleWidth: ratioCalculatedWidth,
        eleHeight: ratioCalculatedHeight
      });
    } else if (
      parentEleWidth < ratioCalculatedWidth &&
      parentEleHeight > ratioCalculatedHeight
    ) {
      setState({
        ...getState,
        eleWidth: (ratioWidth * ratioCalculatedHeight) / ratioHeight,
        eleHeight: ratioCalculatedHeight
      });
    } else if (
      parentEleWidth > ratioCalculatedWidth &&
      parentEleHeight < ratioCalculatedHeight
    ) {
      setState({
        ...getState,
        eleWidth: (ratioWidth * parentEleHeight) / ratioHeight,
        eleHeight: parentEleHeight
      });
    }
  };

  useEffect(() => {
    handleResizeByVideoSize();
    window.addEventListener('resize', handleResizeByVideoSize);
    return (() => {
      window.removeEventListener('resize', handleResizeByVideoSize);
    });
  }, []);

  return (
    <Fragment>
      <div style={{ display: enableHeader === false ? "none" : "" }} id="video_parent_top" className='broadcasted_videos_head'>
        <div className='action_1'>
          <button title='Close' onClick={_handleBack} className='action_back' type='button'><IconCloseAlert /></button>
        </div>
        <div style={{ width: `${Math.round(eleWidth)}px`, visibility: "hidden" }} className='action_2'>
          <div className='action_2_left'>
            <h2>{title}</h2>
            <span>{utcToISOConvertTime(createdAt)}</span>
          </div>
          <div className='action_2_right relative'>
            <div className='relative'>
              <button className='action_download' type='button'><span>Download</span><IconDownloadLite /></button>
            </div>
            <button onClick={_handlePopup} className='' type='button'>Share</button>
          </div>
        </div>
      </div>
      <div className='video_parent_wraper'>
        <div
          className='broadcasted_videos_body'>
          <div
            id="big_video_wraper" className='broadcasted_video'>
            <div className="viewers_broadcast_video">
              <div id="container-custom-vplayer" className="container-custom-vplayer">
                <div style={{ width: `${Math.round(eleWidth)}px`, height: `${Math.round(eleHeight)}px` }} className="video-container" id="video-container">
                  <PlayBackHls livePlayer={livePlayer} getSelectedThumb={getSelectedThumb} playbackUrl={playbackUrl} />
                </div>
              </div>
            </div >
          </div>
        </div>
      </div>
      {getVideoShare &&
        <BroadcasteVideoShare
          _handleAction={() => { _handleClose(); }}
          _handleClose={() => { _handleClose(); }}
        />
      }
    </Fragment>
  );
};
export default PlaybackVideoHls;
