import React from 'react';
import ActionCommonPopup from '../ActionCommonPopup';
import { IconDownloadLite } from '../../../assets/img';
import './BroadcasteVideoDownload.scss';

function BroadcasteVideoDownload(_props = {}) {
    const { _handleAction = () => { }, _handleClose = () => { } } = _props;
    return (
        <ActionCommonPopup
            handleAction={_handleAction}
            handleClose={_handleClose}
            onExited={() => _handleClose(false)}
            textActionButton={"Download"}
            parentClass="sm"
        >
            <div className="action_head">
                <i className="delete">
                    <IconDownloadLite />
                </i>
                <strong>Download Video</strong>
            </div>
            <div className="broadcaste_video_download_wraper">
                <div className="common-input-wrapper mb-0">
                    <label class="placeholder font-base">Choose A Size:</label>
                    <div className="radio_custom_group">
                        <div className={`radio-custom`}>
                            <label className="radio" >
                                <input
                                    type="radio"
                                    name={"download_video"}
                                    id={'download_video1'}
                                    value={false}
                                    onChange={() => { }}
                                    checked={true}
                                />
                                <label></label>
                            </label>
                            <label htmlFor='download_video1' className="label" ><strong>Large</strong> Mp4 1080p</label>
                        </div>
                        <div className={`radio-custom`}>
                            <label className="radio" >
                                <input
                                    type="radio"
                                    name={"download_video"}
                                    id={'download_video2'}
                                    value={false}
                                    onChange={() => { }}
                                    checked={true}
                                />
                                <label></label>
                            </label>
                            <label htmlFor='download_video2' className="label" ><strong>Medium</strong> Mp4 720p</label>
                        </div>
                        <div className={`radio-custom mb-0`}>
                            <label className="radio" >
                                <input
                                    type="radio"
                                    name={"download_video"}
                                    id={'download_video3'}
                                    value={false}
                                    onChange={() => { }}
                                    checked={true}
                                />
                                <label></label>
                            </label>
                            <label htmlFor='download_video3' className="label" ><strong>Small</strong> Mp4 480p</label>
                        </div>
                    </div>
                </div>
            </div>
        </ActionCommonPopup>
    );
}

export default BroadcasteVideoDownload;
