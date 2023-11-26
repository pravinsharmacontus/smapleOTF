import './PlaybackSm.scss';
import React, { useEffect, useState } from 'react';
import { FormTextArea } from '../../../common';
import { useTranslation } from "react-i18next";
import { broadcastEmbededURL } from '../../../helper/ApiUrl';
import { IconPlay, ImgVideoThumb } from '../../../assets/img';
import { IconLoaderBlue } from '../../../assets/images';
import CommonFormInput from '../../../common/CommonFormInput';
import { useSelector } from 'react-redux';
import PlaybackVideoHls from '../BroadcastedVideos/BroadcastedVideosDetails/awsPlayer/PlaybackVideoHls';

function ShareVideo(_props = {}) {
    const re = /^[0-9\b]+$/;
    const { _videoId = "", getSelectedUrl = "", shareLiveUrl = false, getvideoDetailsEle = "", getSelectedThumb = '' } = _props;
    const [getResponsive, setResponsive] = useState(false);
    const handleResponsive = () => {
        setResponsive(!getResponsive);
    };
    const awsStageReducer = useSelector((state) => state?.awsStageReducer); //store
    const broadcastBranding = useSelector((state) => state?.broadcastBranding); //store
    const { sessionName = "" } = awsStageReducer;
    const [getWidth, setWidth] = useState(560);
    const [getHeight, setHeight] = useState(315);
    const [getVideoPlay, setVideoPlay] = useState('');
    const [getThumnail, setThumnail] = useState('');
    const [getVideoShow, setVideoShow] = useState(true);
    const [getVideoPx1, setVideoPx1] = useState(getResponsive ? "100%" : "px");
    const [getVideoPx2, setVideoPx2] = useState(getResponsive ? "100%" : "px");
    const fbHlsLink = broadcastBranding?.hlsLink || "";

    const handleWidthChange = (e) => {
        // if value is not blank in width, then test the regex
        if (e.target.value === '' || re.test(e.target.value)) {
            setWidth(e.target.value);
        }
    };

    const handleHeightChange = (e) => {
        // if value is not blank in height, then test the regex
        if (e.target.value === '' || re.test(e.target.value)) {
            setHeight(e.target.value);
        }
    };

    const { t } = useTranslation();
    const handlePlay = () => {
        setVideoShow(false);
        setTimeout(() => {
            setVideoPlay(getSelectedUrl);
            setVideoShow(true);
        }, 5000);
    };
    const handlePx1 = (val = "%") => {
        setVideoPx1(val === "%" ? "px" : "%");
    };
    const handlePx2 = (val = "%") => {
        setVideoPx2(val === "%" ? "px" : "%");
    };

    const capture = () => {
        const canvas = document.createElement("canvas");
        canvas.style.display = "none";
        const video = document.getElementById(_videoId);
        canvas.width = 348;
        canvas.height = 196;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageUrl = canvas.toDataURL("image/png");
        return imageUrl;
    };

    const handleSelectText = (e) => {
        e?.target?.select();
    };

    useEffect(() => {
        if (_videoId && document && document.getElementById(_videoId)) {
            const imagUrl = capture();
            setThumnail(imagUrl);
        }
    }, []);

    return (
        <>
            <div className='broadcaste_video_share_wraper'>

                <div className='playback_video_wraper'>
                    {getVideoPlay === "" && < div className='overlay'>
                        <button className='play_button' onClick={() => handlePlay()} type='button'>

                            {getVideoShow ? <IconPlay fill='#fff' />
                                :
                                <IconLoaderBlue fill='#1367F2' /> }

                        </button>
                    </div>}
                    {getVideoPlay !== "" ?
                        <PlaybackVideoHls
                            livePlayer={true}
                            shareLiveUrl={shareLiveUrl}
                            staticControl={false}
                            controlerHeight={0}
                            playbackUrl={getVideoPlay}
                            enableHeader={false}
                            getSelectedThumb={getSelectedThumb || getThumnail || ImgVideoThumb}
                            getvideoDetailsEle={getvideoDetailsEle} />
                        :
                        <img src={getSelectedThumb || getThumnail || ImgVideoThumb} alt="poster" />
                    }
                </div>

                {!shareLiveUrl ? <fieldset>
                    <CommonFormInput
                        readOnly={true}
                        enableCopyIcon={true}
                        type="text"
                        caps={false}
                        mustFill={false}
                        value={`${broadcastEmbededURL}${fbHlsLink}`}
                        name={"share_video"}
                        palceholder={!shareLiveUrl ? "Copy Video Link" : "Viewer Joining Link"}
                        _onBlur={() => { }}
                        _onchange={() => { }}
                        customClass={""}
                        error={false}
                        className={" mb-0 "}
                    />
                </fieldset> : null}
                <div className="common-input-wrapper copy_icon_hover_top mb-0">

                    <FormTextArea
                        textAreaType2={true}
                        enableCopyIcon={(getWidth && getHeight) ? true : false}
                        mustFill={false}
                        type="textarea"
                        palceholder={"Embed"}
                        className={"mb-0"}
                        disabled={false}
                        value={`<iframe style="border: none" width="${getResponsive ? "100" : getWidth}${getResponsive ? "%" : getVideoPx1}"
height="${getResponsive ? "100" : getHeight}${getResponsive ? "%" : getVideoPx2}" src="${broadcastEmbededURL}${fbHlsLink}"
title="${sessionName}" frameborder="0"></iframe>`}
                        name={"embeded"}
                        id={"embed-value"}
                        _onClick={handleSelectText}
                        customClass={`commonTextarea min-h custom_bg  ${true ? "" : " disabled "}`}
                        _onchange={() => { }}
                        _onBlur={() => { }}
                        error={false}
                        readOnly={true}
                    >
                        <div className="radio_custom_check">
                            <div className={`radio-custom`}>
                                <label className="radio">
                                    <input
                                        type="radio"
                                        id={"responsive_size"}
                                        value={getResponsive}
                                        onChange={handleResponsive}
                                        checked={getResponsive}
                                    />
                                    <label></label>
                                </label>
                                <label htmlFor="responsive_size" className="label">
                                    {t("BROADCAST.LAYOUT_OPTIONS.RESPONSIVE_SIZE")}
                                </label>
                            </div>
                            <div className={`radio-custom`}>
                                <label className="radio">
                                    <input
                                        type="radio"
                                        id={"fixed_size"}
                                        value={!getResponsive}
                                        onChange={handleResponsive}
                                        checked={!getResponsive}
                                    />
                                    <label></label>
                                </label>
                                <label htmlFor="fixed_size" className="label">
                                    {t("BROADCAST.LAYOUT_OPTIONS.FIXED_SIZE")}
                                </label>
                            </div>

                            {!getResponsive && <div className="fixed_size_input ">
                                <fieldset className='mb-0'>
                                    <input placeholder='width' type="text" name="width" maxLength={4} value={getWidth}
                                        onChange={handleWidthChange} />
                                    <div className='floating_action'>
                                        <button onClick={() => handlePx1(getVideoPx1)} type='button' className=''><span>{getVideoPx1}</span></button>
                                    </div>
                                </fieldset>
                                <fieldset className='mb-0'>
                                    <input placeholder='height' type="text" name="height" maxLength={4} value={getHeight} onChange={handleHeightChange} />
                                    <div className='floating_action'>
                                        <button onClick={() => handlePx2(getVideoPx2)} type='button' className=''><span>{getVideoPx2}</span></button>
                                    </div>
                                </fieldset>
                            </div>}
                        </div>
                    </FormTextArea>
                </div>
            </div>
        </>
    );
}

export default ShareVideo;
