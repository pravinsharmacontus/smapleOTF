import React from 'react';
import ActionCommonPopup from '../ActionCommonPopup';
import { IconDeleteType4 } from '../../../assets/images';

function BroadcasteVideoDelete(_props = {}) {
    const { _handleAction = () => { }, _handleClose = () => { }, videoTitle = "", sessionTitle = '' } = _props;
    return (
        <ActionCommonPopup
            handleAction={_handleAction}
            handleClose={_handleClose}
            onExited={() => _handleClose(false)}
            parentClass="md"
        >
            <div className="action_head">
                <i className="delete">
                    <IconDeleteType4 />
                </i>
                <strong>Delete Video?</strong>
            </div>
            <p className="desc">
                <span>Are you sure? You are about to delete the video <wbr /><strong> "{videoTitle}" </strong> from the <strong> {sessionTitle} </strong> folder. </span>
            </p>
        </ActionCommonPopup>
    );
}

export default BroadcasteVideoDelete;
