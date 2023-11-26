import React from "react";
import PlaybackVideoHls from "./PlaybackVideoHls";

const VideoPlayer = (_props = {}) => {
  const { playbackURL = "", getSelectedThumb = "", _handleBack = () => { }, getvideoDetailsEle = {} } = _props;
  console.log(getSelectedThumb, _handleBack, getvideoDetailsEle);
  return (<>
    <PlaybackVideoHls
      getSelectedThumb={getSelectedThumb}
      getvideoDetailsEle={{ title: "temp", createdAt: 123123123 }}
      playbackUrl={playbackURL}
      _handleBack={_handleBack}
    />
  </>
  );
};

export default React.memo(VideoPlayer);
