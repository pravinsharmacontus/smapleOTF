import React from "react";
import SmallVideo from "./smallVideo";
import "./BroadcastParticiapants.scss";
import { getAwsStreamData } from "../../../../aws/awsHelper";

function BroadcastParticiapants(props) {
  const {
    participants = [],
    participantsData = {},
    localMuteStatus = {},
    getSmCanvasWidth = '',
    getSmCanvasHeight = ''
  } = props;
  const videoRender = (participantsRender, participantsDataRender) => {
    return participantsRender.map((ele) => {
      let audioMute = localMuteStatus.audioMute;
      let videoMute = localMuteStatus.videoMute;
      if (!ele?.isLocal) {
        if (participantsDataRender[ele?.id]) {
          audioMute = getAwsStreamData(
            participantsDataRender[ele?.id],
            "audio"
          ).isMuted;
          videoMute = getAwsStreamData(
            participantsDataRender[ele?.id],
            "video"
          ).isMuted;
        }
      }
      return (
        <div key={ele?.id} style={{ width: `${getSmCanvasWidth}px`, height: `${getSmCanvasHeight}px` }} className="broadcast_particiapant">
          <SmallVideo
            type="participants"
            key={ele?.id}
            participantsData={participantsDataRender[ele?.id]}
            wholeParticipantsData={participantsData}
            audioMute={audioMute}
            videoMute={videoMute}
          />
        </div>
      );
    });
  };
  return <>{videoRender(participants, participantsData)}</>;
}

export default BroadcastParticiapants;
