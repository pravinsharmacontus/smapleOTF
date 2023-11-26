import React from 'react';
import VideoJsPlayer from "./../../../VideoJsPlayer";
import "./../../../VideoJsPlayer/videojs-theme-2.scss";

const BroadcastVideoPlayer = (_props = {}) => {
    const { videoURL = "" } = _props;
    const playerReference = React.useRef(null);

    // setting the video-js option for the player
    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        techOrder: ["AmazonIVS"],
        fluid: true,
        loop: true,
        sources: [{
            src: { videoURL },
            type: "application/x-mpegURL"
        }]
    };

    const playerReady = (player) => {
        playerReference.current = player;

        // handling video player
        player.on('waiting', () => {
            videojs.log('Video Player is waiting');
        });
        player.on('dispose', () => {
            videojs.log('Video player will dispose');
        });
    };
    return (
        <>
            <VideoJsPlayer options={videoJsOptions} onReady={playerReady} />
        </>
    );
};

export default React.memo(BroadcastVideoPlayer);
