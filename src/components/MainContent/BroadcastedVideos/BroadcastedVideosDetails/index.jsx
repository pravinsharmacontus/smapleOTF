import Ripples from 'react-ripples';
import React, { useState } from 'react';
import "./BroadcastedVideosDetails.scss";
import { useTranslation } from 'react-i18next';
import BroadcastedVideo from './BroadcastedVideo';
import { IconDownload, IconShareLink, IconThreeDot } from '../../../../assets/img';
import { IconChevronLeft, IconDelete } from '../../../../assets/images';
import { momentUTCtoISTDate, momentUTCtoISTTime } from '../../../../helper';
import OutsideClickHandler from 'react-outside-click-handler';
import BroadcasteVideoDelete from '../BroadcasteVideoDelete';
import { succToast } from '../../../../helper/ApiToast';
import BroadcasteVideoDownload from '../BroadcasteVideoDownload';
import BroadcasteVideoShare from '../BroadcasteVideoShare';
import Image from '../../../../common/Image';

function BroadcastedVideosDetails(_props = {}) {

    const { getvideoDetailsEle = [], handleBackToTable = () => { } } = _props;
    const recordings = getvideoDetailsEle || [];
    const { t } = useTranslation();
    const [getGrid, setGrid] = useState(true);
    const [getDropStatus, setDropStatus] = useState(false);
    const [getActionPopup, setActionPopup] = useState("");
    const [getSelectedIndex, setSelectedIndex] = useState(-1);
    const [getSelectedUrl, setSelectedUrl] = useState('');
    const [getSelectedThumb, setSelectedThumb] = useState('');
    const [getVideoUrl, setVideoUrl] = useState('');
    const handleGridView = (state = false) => {
        setGrid(state);
    };
    const handleVideoPlay = (ele = {}, thumbnail = "") => {
        setVideoUrl(ele);
        setGrid(false);
        setSelectedThumb(thumbnail);
    };
    const handleDropDown = (index = false) => {
        setDropStatus(index);
    };
    const handleDropDownAction = (action = "", index = -1, url = "", thumb = "") => {
        setActionPopup(action);
        handleDropDown(-1);
        setSelectedIndex(index + 1);
        setSelectedUrl(url);
        setSelectedThumb(thumb);
    };

    const playData = {
        playbackUrl: getSelectedUrl,
        sessionName: recordings[0]?.channelName,
    };

    const temHide = false;

    /**
   * open _handle Delete Member
   */

    const _handleAction = (key = "") => {
        switch (key) {
            case "Delete":
                succToast("Video Deleted successfuly");
                setActionPopup(false);
                break;
            case "Download":
                setActionPopup(false);
                break;
            case "Share":
                setActionPopup(false);
                break;
            case "Edit":
                succToast("Tile changed successfuly");
                setActionPopup(false);
                break;
            default:
                break;
        }
    };

    const _handleClose = (action = false) => {
        setActionPopup(action);
    };

    return (
        <>
            <div className='broadcasted_videos_list'>
                <div className='action_1'>
                    <button onClick={() => handleBackToTable(true)} className='action_back' type='button'><IconChevronLeft />{t("COMMON.BACK")}</button>
                </div>
                <div className='video_list_wraper'>
                    {recordings.map((item, index) => {
                        const { thumbnail = "", channelName = "", createdAt = "", url = '' } = item;
                        return (
                            <div key={`recordings-${index.toString()}`} className='video_list_item'>
                                <button onClick={() => handleVideoPlay(url, thumbnail)} type='button' className="video_list_item_inner">
                                    <div className='video_thum'>
                                        <Image width="279px" height="157px" src={thumbnail} alt="" />
                                    </div>
                                    <div className='video_details'>
                                        <div className='video_details_head'>
                                            <h4>{channelName}_Rec {index + 1}</h4>
                                            <div className=''>
                                                {temHide && <Ripples
                                                    className={`action_drop ${getDropStatus === index ? "active" : ""}`}
                                                    onClick={() => handleDropDown(getDropStatus === index ? false : index)}>
                                                    <button className='video_list_item_action' type='button'><IconThreeDot /></button>
                                                </Ripples>}
                                                {getDropStatus === index &&
                                                    <OutsideClickHandler onOutsideClick={() => { handleDropDown(false); }}>
                                                        <div className='dropdown_rec'>
                                                            <Ripples color='#E8FFFA'
                                                                className={`action_drop_list`}
                                                                onClick={() => handleDropDownAction("Share", index, url, thumbnail)}>
                                                                <button className='video_list_item_option' type='button'><IconShareLink /> <span>Share</span></button>
                                                            </Ripples>
                                                            {temHide && <>
                                                                <Ripples color='#E8FFFA'
                                                                    className={`action_drop_list`}
                                                                    onClick={() => handleDropDownAction("Download", index, url, thumbnail)}>
                                                                    <button className='video_list_item_option' type='button'><IconDownload /> <span>Download</span></button>
                                                                </Ripples>
                                                                <Ripples color='#E8FFFA'
                                                                    className={`action_drop_list`}
                                                                    onClick={() => handleDropDownAction("Delete", index, url, thumbnail)}>
                                                                    <button className='video_list_item_option red' type='button'><IconDelete /> <span>Delete</span></button>
                                                                </Ripples>
                                                            </>
                                                            }
                                                        </div>
                                                    </OutsideClickHandler>
                                                }
                                            </div>
                                        </div>
                                        <div className='video_time_info'>
                                            <span className='video_date'>{momentUTCtoISTDate(createdAt)}</span>
                                            <div className='dot'></div>
                                            <span className='video_time'>{momentUTCtoISTTime(createdAt)}</span>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        );
                    })
                    }
                </div>
            </div>
            {!getGrid && <BroadcastedVideo
                getSelectedThumb={getSelectedThumb}
                videoURL={getVideoUrl}
                _handleBack={() => handleGridView(true)} />}
            {getActionPopup === "Delete" && (
                <BroadcasteVideoDelete
                    sessionTitle={channelName}
                    videoTitle={`${channelName}_Rec ${getSelectedIndex}`}
                    _handleAction={() => {
                        _handleAction("VideoDelete");
                    }}
                    _handleClose={() => {
                        _handleClose();
                    }}
                />
            )}
            {getActionPopup === "Download" && (
                <BroadcasteVideoDownload
                    _handleAction={() => {
                        _handleAction("Download");
                    }}
                    _handleClose={() => {
                        _handleClose();
                    }}
                />
            )}
            {getActionPopup === "Share" && (
                <BroadcasteVideoShare
                    getSelectedThumb={getSelectedThumb}
                    getSelectedUrl={getSelectedUrl}
                    getvideoDetailsEle={getvideoDetailsEle}
                    playData={JSON.stringify(playData)}
                    _handleAction={() => {
                        _handleAction("Share");
                    }}
                    _handleClose={() => {
                        _handleClose();
                    }}
                />
            )}
        </>
    );
}

export default BroadcastedVideosDetails;
