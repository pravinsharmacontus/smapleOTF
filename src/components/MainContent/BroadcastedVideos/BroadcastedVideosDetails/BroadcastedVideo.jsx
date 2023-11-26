import React, { useEffect, useState } from 'react';
import "./BroadcastedVideo.scss";
import VideoPlayer from './awsPlayer/VideoPlayer';
import { IconLoader } from '../../../../assets/images';

function BroadcastedVideo(_props = {}) {
    const { getvideoDetailsEle = {}, getSelectedThumb = "", _handleBack = () => { }, videoURL = '' } = _props;
    const [getEnableVideo, setEnableVideo] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setEnableVideo(true);
        }, 800);
    });

  const escFunction = (event) => {
    if (event.key === "Escape") {
        _handleBack(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return (() => {
      document.removeEventListener("keydown", escFunction, false);
    });
  });

    return (
        <>
            <div className={` open broadcasted_videos_details_wraper`}>
                <div className='broadcasted_videos_details_inner'>
                    {getEnableVideo ? <VideoPlayer
                        getSelectedThumb={getSelectedThumb}
                        _handleBack={_handleBack}
                        getvideoDetailsEle={getvideoDetailsEle}
                        playbackURL={videoURL} />

                        : <IconLoader className='loader_video' />
                    }
                </div>
            </div>
        </>
    );
}

export default BroadcastedVideo;
