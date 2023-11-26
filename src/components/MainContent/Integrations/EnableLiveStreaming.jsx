import React from 'react';
import Modal2 from '../../../common/Modal/Modal2';
import ActionCommonPopup from '../ActionCommonPopup';
import { IconSetting } from '../../../assets/images';
import EnableYoutube from '../BroadcastedVideos/BroadcastedVideosTable/EnableYoutube';

const EnableLiveStreaming = (props = {}) => {
    const { _handleClose = () => { }, editStream = false } = props;
    return (
        <Modal2>
            <ActionCommonPopup
                enableActionButton={false}
                parentClass="md"
                enableCancelButton={false}
                minWidth={"693px"}
                enableScreenHeight={true}
                handleClose={_handleClose}
            >
                <div className="action_head">
                    <i className="delete">
                        <IconSetting />
                    </i>
                    <strong>Enable live streaming on Youtube</strong>
                </div>
                <EnableYoutube hideHeader={true} editStream={editStream} _handleClose={_handleClose} />
            </ActionCommonPopup>
        </Modal2>
    );
};
export default EnableLiveStreaming;
