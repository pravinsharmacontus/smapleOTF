import React from 'react';
import "./ShareLiveBroadcast.scss";
import './PlaybackSm.scss';
import ShareVideo from '../../../ShareVideo';

function ShareLiveBroadcast(_props) {
    const { getvideoDetailsEle = {}, _videoId = "", getMenusOpen = false, getSelectedUrl = "", playData = {}, getSelectedThumb = "", } = _props;

    return (
        <div className='share_live_broadcast_wraper'>
            <div className='content_head'>
                <h4>Share Live Broadcast</h4>
                <p>Use the below embed code link to stream in other websites.</p>
            </div>
            {getMenusOpen &&
                <ShareVideo
                    _videoId={_videoId}
                    shareLiveUrl={true}
                    getvideoDetailsEle={getvideoDetailsEle}
                    getSelectedUrl={getSelectedUrl}
                    getSelectedThumb={getSelectedThumb}
                    playData={playData}
                />
            }
        </div>
    );
}

export default ShareLiveBroadcast;
