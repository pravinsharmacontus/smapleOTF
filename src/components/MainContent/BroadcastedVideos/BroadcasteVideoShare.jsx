import React from 'react';
import "./BroadcasteVideoShare.scss";
import ShareVideo from '../ShareVideo';
import ActionCommonPopup from '../ActionCommonPopup';
import { IconVideoActive } from '../../../assets/img';

function BroadcasteVideoShare(_props = {}) {
    const { getvideoDetailsEle = {}, getSelectedUrl = "", getSelectedThumb = "",
        _handleAction = () => { }, _handleClose = () => { }, playData = "" } = _props;

    return (
        <ActionCommonPopup
            textActionButton={"Done"}
            enableCancelButton={false}
            handleAction={_handleAction}
            parentClass={"share_video_modal"}
            onExited={() => _handleClose(false)}
            handleClose={() => _handleClose(false)}
        >
            <div className="action_head">
                <i className="delete">
                    <IconVideoActive />
                </i>
                <strong>Share Video</strong>
            </div>
            <ShareVideo
                getvideoDetailsEle={getvideoDetailsEle}
                getSelectedUrl={getSelectedUrl}
                getSelectedThumb={getSelectedThumb}
                playData={playData}
            />
        </ActionCommonPopup>
    );
}

export default BroadcasteVideoShare;
