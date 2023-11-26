import React from "react";
import ReactHlsPlayer from "react-hls-player";

function HlsVideoPlayer(props = {}) {
  const { playbackURL = "" } = props;
  return (
    <ReactHlsPlayer
      preload="metadata"
      ref={this.videoRef}
      id="video-player"
      className="video"
      src={playbackURL}
      autoPlay={false}
      controls={true}
      width="100%"
      height="auto"
    />
  );
}

export default HlsVideoPlayer;
