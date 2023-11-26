import React from "react";
import "./EmbededVideoPage.scss";
import { ImgBrand } from "../../../../assets/img";
import PlaybackVideoHls from "../BroadcastedVideosDetails/awsPlayer/PlaybackVideoHls";

function EmbededVideoPage(_props = {}) {

    return (
        <React.Fragment>
            <div className="embeded_video_page" style={{ width: "100%", height: "100%" }}>
                <div className="embeded_overlay_top">
                    <div className="img"><img src={ImgBrand} alt="" className="logo" /></div>
                    <div className="video_session_name">
                        <p>MirrorFly Product UI Demo</p>
                    </div>
                </div>
                <PlaybackVideoHls
                    shareLiveUrl={false}
                    staticControl={false}
                    controlerHeight={0}
                    playbackUrl="https://s3.ap-south-1.amazonaws.com/onthefly.ivs.recording/ivs/v1/680703584604/7s2wiQnDIdLY/2023/7/13/7/57/mBQaCZXWC5oK/media/hls/master.m3u8"
                    enableHeader={false}
                    getSelectedThumb=""
                    getvideoDetailsEle={{ title: "temp", createdAt: 123123123 }} />
            </div>
        </React.Fragment>

    );
}

export default EmbededVideoPage;
