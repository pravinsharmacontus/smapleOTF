import React, { useEffect, useState } from 'react';
import '../BannerBackgroundTheme.scss';
import { useSelector } from "react-redux";
import { IconTickLite, Iconplus, ImgBroadcastBgSm1, ImgBroadcastBgSm2, ImgBroadcastBgSm3 } from '../../../../../assets/img';
import { updateBannerBackground } from '../../../../../firebase/firebaseRealtimeFunctions';
import { currentStageArrn, getCurrentOrgId } from '../../../../../helper/utility';
import { updateBannerBG } from '../../../../../aws/broadcastFunction';
import { getStageData } from '../../../../../aws/awsHelper';

function BannerBackgroundTheme(props = {}) {
    const [getSelectedBg, setSelectedBg] = useState(0);
    const { _handleInput = () => { } } = props;
    const awsStageReducer = useSelector((state) => state?.awsStageReducer); //store
    const _stageArn = currentStageArrn(awsStageReducer);
    const temphide = false;
    const broadcastBranding = useSelector((state) => state?.broadcastBranding); //store
    const fbBannerBackground = broadcastBranding?.bannerBackground || "";

    const handleBannerBg = (seletedBg = 0) => {
        const awsStageData = awsStageReducer?.method === "create" ? getStageData(awsStageReducer) : awsStageReducer;
        updateBannerBackground(getCurrentOrgId(), _stageArn, seletedBg);
        setSelectedBg(seletedBg);
        updateBannerBG(seletedBg, awsStageData?.stageArn);
    };

    const handleActiveBaner = () => {
        return (
            <div className='tick_box'>
                <IconTickLite />
            </div>
        );
    };

    useEffect(() => {
        setSelectedBg(fbBannerBackground === "" ? 0 : fbBannerBackground);
    }, [fbBannerBackground]);

    console.log(fbBannerBackground, 'fbBannerBackground');

    return (
        <div className='banner_bg_theme_wraper'>
            <div className="banner_theme_list">
                <button onClick={() => handleBannerBg(0)} type='buton' className={`banner_theme ${getSelectedBg === 0 ? "selected" : " "}`}>
                    <div className='theme_style'>None</div>
                </button>
                <button onClick={() => handleBannerBg(1)} type='buton' className={`banner_theme ${getSelectedBg === 1 ? "selected" : " "}`}>
                    <img src={ImgBroadcastBgSm1} alt="banner1" />
                    {getSelectedBg === 1 ? handleActiveBaner() : null}
                </button>
                <button onClick={() => handleBannerBg(2)} type='buton' className={`banner_theme ${getSelectedBg === 2 ? "selected" : " "}`}>
                    <img src={ImgBroadcastBgSm2} alt="banner2" />
                    {getSelectedBg === 2 ? handleActiveBaner() : null}
                </button>
                <button onClick={() => handleBannerBg(3)} type='buton' className={`banner_theme ${getSelectedBg === 3 ? "selected" : " "}`}>
                    <img src={ImgBroadcastBgSm3} alt="banner3" />
                    {getSelectedBg === 3 ? handleActiveBaner() : null}
                </button>
                {temphide && <button
                    type="button"
                    onClick={(event) => {
                        event.preventDefault();
                        _handleInput();
                    }}
                    className="choose banner_theme"
                >
                    <i className="plus">
                        <Iconplus />
                    </i>
                    <span>Upload</span>
                </button>}
            </div>
        </div>
    );
}

export default BannerBackgroundTheme;
