import React from 'react';
import SmallVideo from '../BroadcastParticiapants/smallVideo';

const ComponentParticipant = (_props = {}) => {
    const {
        _participantsData = {},
        participantsId,
        videoMute,
        largeVideo = false,
        getCanvasHeight = 0,
        fbBannerStyle = "",
        fbBannerBgColor = "",
        FbBannerTextColor = ""
    } = _props;
    return (
        <>
            <div className="broadcast_particiapant_wrap">
                <div
                    width="474px"
                    height="329px"
                    className="broadcast_particiapant large"
                >
                    <SmallVideo
                        fbBannerBgColor={fbBannerBgColor}
                        fbBannerStyle={fbBannerStyle}
                        FbBannerTextColor={FbBannerTextColor}
                        largeVideo={largeVideo}
                        getCanvasHeight={getCanvasHeight}
                        type="broadcast-participants"
                        key={participantsId}
                        participantsData={_participantsData[participantsId]}
                        wholeParticipantsData={_participantsData}
                        videoMute={videoMute}
                    />
                </div>
            </div>
        </>
    );
};

export default React.memo(ComponentParticipant);
